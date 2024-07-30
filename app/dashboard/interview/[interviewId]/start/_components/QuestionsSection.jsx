import { Lightbulb, Volume2 } from 'lucide-react'
import React from 'react'

function QuestionsSection({mockInterviewQuestion, activeQuestionIndex}) {
// console.log(mockInterviewQuestion[activeQuestionIndex])

const texttoSpeech = (text)=>{
  if('speechSynthesis' in window){
    const speech= new SpeechSynthesisUtterance(text);
    window.speechSynthesis.speak(speech);
  }
  else{
    alert('Sorry, your browser does not support text-to-speech')
  }
}

  return mockInterviewQuestion && (
    <div className='pt-5 px-1 py-2 border rounded-lg bg-white shadow-md my-10'>
        <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
          {mockInterviewQuestion && mockInterviewQuestion.map((question, index)=>
            <div key={index+1}>
                <h2 className={`p-2  rounded-full lg:text-xs md:text-sm 
                text-center cursor-pointer ${activeQuestionIndex==index&&'bg-primary text-white'}`}>
                    Question #{index+1}
                </h2>
             </div>
          )}
        </div>
        <h2 className='my-5 md:text-lg'>{mockInterviewQuestion[activeQuestionIndex]}</h2>
        <Volume2 className="cursor-pointer" onClick={()=>texttoSpeech(mockInterviewQuestion[activeQuestionIndex])}/>
        <div className='border rounded-lg p-4 bg-blue-100 mt-20'>
            <h2 className='flex gap-2 items-center text-primary'>
                <Lightbulb/>
                <strong>Note:</strong>
            </h2>
            <h2 className='text-sm text-primary my-2'>{process.env.NEXT_PUBLIC_QUESTION_NOTE}</h2>
        </div>
    </div>
  )
}

export default QuestionsSection