"use client";

import { Button } from '@/components/ui/button'
import { db } from '@/utils/db';
import { chatSession } from '@/utils/GeminiAIModal';
import { UserAnswer } from '@/utils/schema';
import { useUser } from '@clerk/nextjs';
import { Mic, StopCircle } from 'lucide-react';
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import useSpeechToText from 'react-hook-speech-to-text';
import Webcam from 'react-webcam'
import { toast } from 'sonner';
import moment from 'moment';
import Link from 'next/link';

function RecordAnswerSection({ mockInterviewQuestion, mockInterviewAnswer, activeQuestionIndex, interviewData, onNextQuestion, onPrevQuestion, totalQuestions }) {
    
    const [userAnswer, setUserAnswer]= useState('');
    const {user}= useUser();
    const [loading, setLoading]= useState(false);
    const {
        error,
        interimResult,
        isRecording,
        results,
        startSpeechToText,
        stopSpeechToText,
        setResults
      } = useSpeechToText({
        continuous: true,
        useLegacyResults: false
      });

      useEffect(()=>{
         results.map((result)=>setUserAnswer(prevAns=>prevAns+" "+result?.transcript))
      }, [results])

      useEffect(()=>{
         if(!isRecording && userAnswer.length>10){
           UpdateUserAnswer();
         }
      },[userAnswer])

      //functionality start or stop the recording
      const StartStopRecording= async()=>{

        if(isRecording){
          
          stopSpeechToText()
       }else{
          startSpeechToText()
        }
      }

      //Update user answer
      const UpdateUserAnswer= async()=>{
        // console.log(userAnswer);
        setLoading(true)

        const feedbackPrompt= "Question: "+mockInterviewQuestion[activeQuestionIndex]+", User Answer: "+userAnswer+", Depends upon question and user answer for given interview question"+
        "please give us rating for answer and feedback as area of improvement if any."+
       "in just 3 to 5 lines to improve it in JSON format with rating field and feedback field" 
       
       const result= await chatSession.sendMessage(feedbackPrompt);

       const mockJsonResp= (result.response.text()).replace('```json', '').replace('```', '');
      //  console.log(mockJsonResp)
       const jsonFeedbackResp= JSON.parse(mockJsonResp);

       const resp= await db.insert(UserAnswer)
       .values({
         mockIdRef: interviewData?.mockId,
         question: mockInterviewQuestion[activeQuestionIndex],
         correctAns:mockInterviewAnswer[activeQuestionIndex],
         userAns:userAnswer,
         feedback:jsonFeedbackResp?.feedback,
         rating:jsonFeedbackResp?.rating,
         userEmail:user.primaryEmailAddress?.emailAddress,
         createdAt:moment().format('DD-MM-YYYY')
       })

       if(resp){
         toast("User Answer recorded successfully !!")
         setUserAnswer('');
         setResults([]);
       }
       setResults([])
       setLoading(false);
      }


  return (
    <div className='flex items-center justify-center flex-col'>
        <div className='flex flex-col mt-20 justify-center items-center rounded-lg p-5 bg-black'>
          <Image src={'/webcam.png'} width={200} height={200}
            className='absolute' alt="WebCam"
            />

          <Webcam
          mirrored={true}
           style={{
            height:300,
            width:'100%',
            zIndex:10,
          }}
          />
        </div>
        <Button 
        disabled={loading}
        variant="outline" className="my-10" 
        onClick={StartStopRecording}>
            {isRecording?
            <h2 className='text-red-600 flex gap-2'>
               <StopCircle/>Stop Recording
            </h2>
            :
            <h2 className='text-primary flex gap-2 items-center'>
                <Mic/> Record Answer
            </h2>
            }
          </Button>

          <div className='flex justify-end gap-6'>
        {activeQuestionIndex > 0 &&
          <Button onClick={onPrevQuestion}>Previous Question</Button>
        }
        {activeQuestionIndex !== totalQuestions - 1 &&
          <Button onClick={onNextQuestion}>Next Question</Button>
        }
        {activeQuestionIndex === totalQuestions - 1 &&
          <Link href={`/dashboard/interview/${interviewData?.mockId}/feedback`}>
            <Button>End Interview</Button>
          </Link>
        }
      </div>
          
    </div>
    
  )
}

export default RecordAnswerSection