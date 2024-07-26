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

function AddNewInterview() {
    const [openDialog, setOpenDialog] = useState(false);
    const [jobPosition, setJobPosition] = useState('');
    const [jobDesc, setJobDesc] = useState('');
    const [jobExperience, setJobExperience] = useState('');
    const [loading, setLoading]= useState();

    const onSubmit = async (e) => {
        e.preventDefault();
        console.log(jobPosition, jobDesc, jobExperience);
       
        const InputPrompt ="Job Position: "+jobPosition+", Job Description:"+jobDesc+", Job Experience: "+jobExperience+" depending on Job Position, Job Description & Job Expirence give us"+process.env.NEXT_PUBLIC_INTERVIEW_QUESTION_COUNT+" interview questions along with answer in JSON format. Give Questions and Answer as field in JSON."

        const result= await chatSession.sendMessage(InputPrompt);

        const MockJsonResp= (result.response.text()).replace('```json','').replace('```','');
        console.log(JSON(MockJsonResp));
    };

    return (
        <div>
            <div
                className='p-10 border rounded-lg bg-secondary hover:scale-105 hover:shadow-md cursor-pointer transition-all'
                onClick={() => setOpenDialog(true)}
            >
                <h2 className='text-lg text-center'>+ Add New</h2>
            </div>
            <Dialog open={openDialog}>
                <DialogContent className="max-w-2xl">
                    <DialogHeader>
                        <DialogTitle className='text-2xl'>Tell us more about your job interviewing</DialogTitle>
                        <DialogDescription>
                            <h2>Add Details about your job position/role, Job description, and years of experience</h2>
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
                                    <Button type="submit">Start Interview</Button>
                                </div>
                            </form>
                        </DialogDescription>
                    </DialogHeader>
                </DialogContent>
            </Dialog>
        </div>
    );
}

export default AddNewInterview;
