"use client";
import { db } from '@/utils/db';
import { MockInterview } from '@/utils/schema';
import { eq } from 'drizzle-orm';
import React, { useEffect, useState } from 'react'
import QuestionsSection from './_components/QuestionsSection';
import RecordAnswerSection from './_components/RecordAnswerSection';
import { Button } from '@/components/ui/button';

function StartInterview({params}) {

const [interviewData, setInterviewData] = useState();
const[mockInterviewQuestion, setMockInterviewQuestion]= useState([]);
const [mockInterviewAnswer, setMockInterviewAnswer]= useState([]);
const [activeQuestionIndex, setActiveQuestionIndex]= useState(0);
console.log(mockInterviewQuestion[activeQuestionIndex])
// console.log(mockInterviewAnswer[activeQuestionIndex]);
useEffect(()=>{
    GetInterviewDetails();
},[])

const GetInterviewDetails = async () => {
    const result = await db
        .select()
        .from(MockInterview)
        .where(eq(MockInterview.mockId, params.interviewId));
    // console.log("Result:", result);
    const jsonMockResponse= JSON.parse(result[0].jsonMockResp)
    // console.log("jsonMockResponse",jsonMockResponse.questions);
    setMockInterviewQuestion(jsonMockResponse.questions);
    setMockInterviewAnswer(jsonMockResponse.answers);
    console.log(result[0]);
    setInterviewData(result[0]);
};

const handleNextQuestion = () => {
    if (activeQuestionIndex < mockInterviewQuestion?.length - 1) {
      setActiveQuestionIndex(activeQuestionIndex + 1);
    }
  }

  const handlePrevQuestion = () => {
    if (activeQuestionIndex > 0) {
      setActiveQuestionIndex(activeQuestionIndex - 1);
    }
  }
  return (
    <div>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-10'>
            {/* Questions */}
            <QuestionsSection 
            mockInterviewQuestion= {mockInterviewQuestion}
            mockInterviewAnswer={mockInterviewAnswer}
            activeQuestionIndex={activeQuestionIndex}
            />
            {/* Video/Audio Recording */}
            <RecordAnswerSection
            mockInterviewQuestion= {mockInterviewQuestion}
            activeQuestionIndex={activeQuestionIndex}
            mockInterviewAnswer={mockInterviewAnswer}
            interviewData={interviewData}
            onNextQuestion={handleNextQuestion}
            onPrevQuestion={handlePrevQuestion}
            totalQuestions={mockInterviewQuestion?.length}
            />
        </div>
        {/* <div className='flex justify-end gap-6'>
            {activeQuestionIndex>0 &&
            <Button
            onClick={()=>setActiveQuestionIndex(activeQuestionIndex-1)}
            >Previous Question</Button>
            }

           {activeQuestionIndex!== mockInterviewQuestion?.length-1 &&
            <Button
            onClick={()=>setActiveQuestionIndex(activeQuestionIndex+1)}
            > Next Question</Button>
            }
            
            {activeQuestionIndex===mockInterviewQuestion?.length-1 &&
                <Button>End Interview</Button>
            }
        </div> */}
    </div>
  )
}

export default StartInterview