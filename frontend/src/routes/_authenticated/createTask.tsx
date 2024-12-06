import * as React from "react";
import { useForm } from "@tanstack/react-form";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Label } from "../../components/ui/label";
import { Input } from "../../components/ui/input";
import { Button } from "../../components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "../../components/ui/card";
import { Calendar as CalendarIcon } from "lucide-react";
import { Calendar } from "../../components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "../../components/ui/popover";
import { format } from "date-fns";
import { Textarea } from "../../components/ui/textarea";
import { api } from "../../lib/api";
import type { FieldApi } from "@tanstack/react-form";
import { QueryClient } from "@tanstack/react-query";

export const Route = createFileRoute("/_authenticated/createTask")({
  component: CreateTask,
});

function FieldInfo({ field }: { field: FieldApi<any, any, any, any> }) {
  return (
    <>
      {field.state.meta.isTouched && field.state.meta.errors.length > 0 ? (
        <p className="text-red-600 mt-2">
          <em>{field.state.meta.errors.join(", ")}</em>
        </p>
      ) : null}
      {field.state.meta.isValidating && <p className="text-blue-600 mt-2">Validating...</p>}
    </>
  );
}

const taskStatusOptions = ["pending", "completed", "in_progress"] as const;

type TaskFormValues = {
  courseName: string;
  description: string;
  status: boolean | null;
  dueDate: string;
};

function CreateTask() {
  const navigate = useNavigate();
  const queryClient = new QueryClient();

  const form = useForm<TaskFormValues>({
    defaultValues: {
      courseName: "",
      description: "",
      status: false,
      dueDate: new Date().toISOString().split("T")[0],
    },
    onSubmit: async (values) => {
      await new Promise((r) => setTimeout(r, 3000));
      console.log("Submitted values:", values);

      // const status = values.value.status === true ? "completed" : values.value.status === false ? "pending" : null;

      const res = await api.BcitTasks.$post({ json: values.value });
      if (!res.ok) {
        throw new Error("Server error");
      }

      const newTask = await res.json();
      const existingTasks = await queryClient.ensureQueryData({ queryKey: ["tasks"] });

      queryClient.setQueryData(["tasks"], (oldTasks: any) => ({
        ...oldTasks,
        tasks: [...oldTasks.tasks, newTask],
      }));

      console.log("Task Created:", values);
      navigate({ to: "/tasks" });
    },
  });

  return (
    <div className="flex justify-center items-center px-4">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          void form.handleSubmit();
        }}
        className="w-full max-w-lg"
      >
        <Card className="w-full p-8 shadow-xl border-none rounded-2xl bg-gradient-to-br from-blue-50 to-indigo-100 transition-all duration-300 hover:shadow-2xl">
          <CardHeader className="text-center">
            <CardTitle className="text-3xl font-bold text-indigo-800">✨ New Task</CardTitle>
            <p className="text-indigo-600 text-lg mt-2">Let's conquer BCIT together!</p>
          </CardHeader>
          <CardContent className="space-y-6 mt-6">
            {/* Course Name Field */}
            <form.Field
              name="courseName"
              validators={{
                onChange: ({ value }) => (!value ? "A course name is required." : undefined),
              }}
            >
              {(field) => (
                <div>
                  <Label htmlFor={field.name} className="text-lg font-semibold text-indigo-700 mb-2 block">
                    📘 Course Name
                  </Label>
                  <Input id={field.name} value={field.state.value} onBlur={field.handleBlur} onChange={(e) => field.handleChange(e.target.value)} placeholder="e.g. BCIT1234" className="w-full px-4 py-3 border-2 border-indigo-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-300" />
                  <FieldInfo field={field} />
                </div>
              )}
            </form.Field>

            {/* Description Field */}
            <form.Field
              name="description"
              validators={{
                onChange: ({ value }) => (!value ? "A description is required." : undefined),
              }}
            >
              {(field) => (
                <div>
                  <Label htmlFor={field.name} className="text-lg font-semibold text-indigo-700 mb-2 block">
                    📝 Description
                  </Label>
                  <Textarea id={field.name} value={field.state.value} onBlur={field.handleBlur} onChange={(e) => field.handleChange(e.target.value)} placeholder="e.g. Complete chapter 3 exercises" className="w-full px-4 py-3 border-2 border-indigo-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-300 min-h-[100px]" />
                  <FieldInfo field={field} />
                </div>
              )}
            </form.Field>

            {/* Status Field */}
            <form.Field
              name="status"
              validators={{
                onChange: ({ value }) => {
                  if (value === null || value === false || value === true) {
                    return undefined;
                  }
                  return "A status is required.";
                },
              }}
            >
              {(field) => (
                <div>
                  <Label htmlFor={field.name} className="text-lg font-semibold text-indigo-700 mb-2 block">
                    📊 Status
                  </Label>
                  <div className="flex space-x-4">
                    <Button
                      type="button"
                      onClick={() => {
                        field.handleChange(true); // "Completed"
                      }}
                      className={`px-4 py-2 rounded-md font-semibold ${field.state.value === true ? "bg-indigo-600 text-white" : "bg-gray-200 text-gray-700 hover:bg-gray-300"}`}
                    >
                      Completed
                    </Button>
                    <Button
                      type="button"
                      onClick={() => {
                        field.handleChange(null); // "In Progress"
                      }}
                      className={`px-4 py-2 rounded-md font-semibold ${field.state.value === null ? "bg-indigo-600 text-white" : "bg-gray-200 text-gray-700 hover:bg-gray-300"}`}
                    >
                      In Progress
                    </Button>
                    <Button
                      type="button"
                      onClick={() => {
                        field.handleChange(false); // "Pending"
                      }}
                      className={`px-4 py-2 rounded-md font-semibold ${field.state.value === false ? "bg-indigo-600 text-white" : "bg-gray-200 text-gray-700 hover:bg-gray-300"}`}
                    >
                      Pending
                    </Button>
                  </div>
                  <FieldInfo field={field} />
                </div>
              )}
            </form.Field>

            {/* Due Date Field */}
            <form.Field
              name="dueDate"
              validators={{
                onChange: ({ value }) => (!value ? "A due date is required." : undefined),
              }}
            >
              {(field) => (
                <div>
                  <Label htmlFor={field.name} className="text-lg font-semibold text-indigo-700 mb-2 block">
                    ⏰ Due Date
                  </Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="outline" className="w-full justify-start text-left font-normal border-2 border-indigo-300 text-gray-400 hover:bg-indigo-100 transition-all duration-300">
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {field.state.value ? <span>{format(new Date(field.state.value), "PPP")}</span> : <span>Select a date</span>}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={new Date(field.state.value)}
                        onSelect={(date) => {
                          field.handleChange((date ?? new Date()).toISOString());
                        }}
                        initialFocus
                        className="rounded-lg border-2 border-indigo-300"
                      />
                    </PopoverContent>
                  </Popover>
                  <FieldInfo field={field} />
                </div>
              )}
            </form.Field>
          </CardContent>

          <CardFooter className="flex justify-center mt-8">
            <Button type="submit" disabled={form.state.isSubmitting} className="w-full max-w-xs bg-gradient-to-r from-indigo-600 to-blue-600 text-white px-6 py-4 rounded-lg font-bold text-lg hover:from-indigo-700 hover:to-blue-700 shadow-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-all transform hover:scale-105 hover:shadow-xl">
              {form.state.isSubmitting ? "Submitting..." : "🚀 Create Task"}
            </Button>
          </CardFooter>
        </Card>
      </form>
    </div>
  );
}

export default CreateTask;
