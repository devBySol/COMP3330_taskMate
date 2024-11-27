import * as React from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Label } from "../components/ui/label";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "../components/ui/card";
import { Calendar as CalendarIcon } from "lucide-react";
import { Calendar } from "../components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "../components/ui/popover";
import { format } from "date-fns";
import { cn } from "../lib/utils";
import { Textarea } from "../components/ui/textarea";

export const Route = createFileRoute("/createTask")({
  component: CreateTask,
});

function CreateTask() {
  const [date, setDate] = React.useState<Date | undefined>(undefined);
  const [courseName, setCourseName] = React.useState("");
  const [description, setDescription] = React.useState("");

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (!courseName || !description || !date) {
      alert("Please fill out all required fields.");
      return;
    }

    console.log("Task Created:", { courseName, description, date });

    setCourseName("");
    setDescription("");
    setDate(undefined);
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <Card className="w-full max-w-lg p-8 shadow-xl border-none rounded-2xl bg-gradient-to-br from-blue-50 to-indigo-100 transition-all duration-300 hover:shadow-2xl">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-bold text-indigo-800">✨ New Task</CardTitle>
          <p className="text-indigo-600 text-lg mt-2">Let's conquer BCIT together!</p>
        </CardHeader>
        <CardContent className="space-y-6 mt-6">
          <div>
            <Label htmlFor="courseName" className="text-lg font-semibold text-indigo-700 mb-2 block">
              📘 Course
            </Label>
            <Input type="text" id="courseName" value={courseName} onChange={(e) => setCourseName(e.target.value)} placeholder="e.g., Math 101" className="w-full px-4 py-3 border-2 border-indigo-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-300" />
          </div>
          <div>
            <Label htmlFor="description" className="text-lg font-semibold text-indigo-700 mb-2 block">
              📝 Description
            </Label>
            <Textarea id="description" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="e.g., Complete chapter 3 exercises" className="w-full px-4 py-3 border-2 border-indigo-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-300 min-h-[100px]" />
          </div>
          <div>
            <Label htmlFor="date" className="text-lg font-semibold text-indigo-700 mb-2 block">
              ⏰ deadline
            </Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className="w-full justify-start text-left font-normal border-2 border-indigo-300 text-indigo-700 hover:bg-indigo-100 transition-all duration-300">
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {date ? format(date, "PPP") : <span>Select a date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar mode="single" selected={date} onSelect={setDate} initialFocus className="rounded-lg border-2 border-indigo-300" />
              </PopoverContent>
            </Popover>
          </div>
        </CardContent>
        <CardFooter className="flex justify-center mt-8">
          <Button type="submit" className="w-full max-w-xs bg-gradient-to-r from-indigo-600 to-blue-600 text-white px-6 py-4 rounded-lg font-bold text-lg hover:from-indigo-700 hover:to-blue-700 shadow-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-all transform hover:scale-105 hover:shadow-xl" onClick={handleSubmit} disabled={!courseName || !description || !date}>
            🚀 Create Task
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}

export default CreateTask;
