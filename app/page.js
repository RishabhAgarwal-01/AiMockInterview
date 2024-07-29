import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import Header from "./dashboard/_components/Header";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />

      <main className="flex flex-col items-center mt-16 px-6 text-center flex-grow">
        <h1 className="text-5xl font-extrabold text-gray-800 mb-6">
          Prepare for Your Next Interview with AI
        </h1>
        <p className="text-lg text-gray-600 mb-12 max-w-2xl">
          Practice and improve your interview skills with our AI-powered mock interview platform. Get instant feedback and track your progress.
        </p>

        <Link href={`/dashboard`}>
          <Button className="mb-16 px-8 py-4 text-lg">Get Started</Button>
        </Link>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16 max-w-5xl w-full">
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle>AI-Powered Feedback</CardTitle>
              <CardDescription>Get detailed feedback on your answers.</CardDescription>
            </CardHeader>
            <CardContent>
              <p>Our AI analyzes your responses and provides insights to help you improve.</p>
            </CardContent>
          </Card>

          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle>Realistic Questions</CardTitle>
              <CardDescription>Practice with real interview questions.</CardDescription>
            </CardHeader>
            <CardContent>
              <p>Our platform offers a wide range of questions from various industries.</p>
            </CardContent>
          </Card>

          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle>Track Your Progress</CardTitle>
              <CardDescription>Monitor your improvement over time.</CardDescription>
            </CardHeader>
            <CardContent>
              <p>Keep track of your performance and see how you improve with each session.</p>
            </CardContent>
          </Card>
        </div>

        <Image src="/mock-interview.webp" alt="Mock Interview" width={600} height={400} className="rounded-lg shadow-lg mb-16" />

        <div className="flex flex-col items-center space-y-4">
          <h2 className="text-3xl font-bold text-gray-800">Why Choose MockMate?</h2>
          <p className="text-gray-600 max-w-2xl">
            MockMate offers a unique AI-driven approach to help you prepare for your interviews. With personalized feedback, a vast question bank, and progress tracking, you can be sure you're ready for any interview.
          </p>
        </div>
      </main>

      <footer className="w-full bg-gray-800 py-6 mt-16 shadow">
        <div className="container mx-auto text-center text-gray-300">
          &copy; 2024 MockMateAI. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
