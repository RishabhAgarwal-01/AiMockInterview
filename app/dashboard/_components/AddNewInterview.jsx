"use client";
import React, { useState } from 'react';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { chatSession } from '@/utils/GeminiAIModal';
import { LoaderCircle } from "lucide-react";
import { db } from '@/utils/db';
import { MockInterview } from '@/utils/schema';
import { v4 as uuidv4 } from 'uuid';
import { useUser } from '@clerk/nextjs';
import moment from 'moment/moment';
import { useRouter } from 'next/navigation';

function AddNewInterview() {
    const [openDialog, setOpenDialog] = useState(false);
    const [jobPosition, setJobPosition] = useState('');
    const [jobDesc, setJobDesc] = useState('');
    const [jobExperience, setJobExperience] = useState('');
    const [loading, setLoading] = useState(false);
    const [jsonResponse, setJsonResponse] = useState([]);
    const {user} = useUser();
    const router= useRouter();

    const onSubmit = async (e) => {
        setLoading(true);
        e.preventDefault();
        console.log(jobPosition, jobDesc, jobExperience);

        const InputPrompt = `Job Position: ${jobPosition}, Job Description: ${jobDesc}, Job Experience: ${jobExperience}. Depending on Job Position, Job Description & Job Experience, give us ${process.env.NEXT_PUBLIC_INTERVIEW_QUESTION_COUNT} interview questions along with answers in JSON format. Give Questions and Answers as fields in JSON.`;
        const result = await chatSession.sendMessage(InputPrompt);
            const MockJsonResp = (result.response.text()).replace('```json', '').replace('```', '');
            // console.log(MockJsonResp);
            setJsonResponse(MockJsonResp);
            if(MockJsonResp){
                const resp= await db.insert(MockInterview).values({
                    mockId:uuidv4(),
                    jsonMockResp: MockJsonResp,
                    jobPosition:jobPosition,
                    jobDesc:jobDesc,
                    jobExperience:jobExperience,
                    createdBy:user?.primaryEmailAddress?.emailAddress,
                    createdAt:moment().format('DD-MM-YYYY')
                }).returning({mockId:MockInterview.mockId});
                console.log("Inserted Id", resp);
                if(resp){
                    setOpenDialog(false);
                    console.log(resp[0]?.mockId)
                    router.push(`/dashboard/interview/${resp[0]?.mockId}`);
                }
            }
            else{
                console.log(error);
            }
            setLoading(false);
    };

    return (
        <div>
            <div
                className='p-10 border rounded-lg bg-secondary hover:scale-105 hover:shadow-md cursor-pointer transition-all'
                onClick={() => setOpenDialog(true)}
            >
                <h2 className='text-lg text-center'>+ Add New</h2>
            </div>
            <Dialog open={openDialog} onOpenChange={setOpenDialog}>
                <DialogContent className="max-w-2xl">
                    <DialogHeader>
                        <DialogTitle className='text-2xl'>Tell us more about your job interviewing</DialogTitle>
                        <DialogDescription>
                            <h2>Add Details about your job position/role, Job description, and years of experience</h2>
                        </DialogDescription>
                    </DialogHeader>
                    <form onSubmit={onSubmit}>
                        <div>
                            <div className='mt-7 my-3'>
                                <label>Job Role/Job Position</label>
                                <Input
                                    placeholder="Ex. Full Stack Developer"
                                    required
                                    value={jobPosition}
                                    onChange={(e) => setJobPosition(e.target.value)}
                                />
                            </div>
                            <div className='my-3'>
                                <label>Job Description/Tech Stack (In Short)</label>
                                <Textarea
                                    placeholder='Ex. React, Angular, NodeJs, Java, SQL etc'
                                    required
                                    value={jobDesc}
                                    onChange={(e) => setJobDesc(e.target.value)}
                                />
                            </div>
                            <div className='my-3'>
                                <label>Years of Experience</label>
                                <Input
                                    placeholder="Ex. 5"
                                    type="number"
                                    max="50"
                                    required
                                    value={jobExperience}
                                    onChange={(e) => setJobExperience(e.target.value)}
                                />
                            </div>
                        </div>
                        <div className='flex gap-5 justify-end'>
                            <Button type="button" variant="ghost" onClick={() => setOpenDialog(false)}>Cancel</Button>
                            <Button type="submit" disabled={loading}>
                                {loading ? <>
                                    <LoaderCircle className="animate-spin">Generating from AI</LoaderCircle>
                                </> : "Start Interview"}
                            </Button>
                        </div>
                    </form>
                </DialogContent>
            </Dialog>
        </div>
    );
}

export default AddNewInterview;
