import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/about")({
  component: About,
});

function About() {
  return (
    <div className="p-5 flex items-center justify-center">
      <div className="max-w-3xl bg-white shadow-md rounded-lg p-6">
        <h1 className="text-3xl font-bold text-indigo-600 text-center mb-4">📘 About BCIT TaskMate</h1>
        <p className="text-gray-700 text-lg leading-relaxed">BCIT TaskMate is a task management application designed specifically for BCIT students. It aims to help students, particularly those enrolled in the Full Stack Web Development (FSWD) program, stay organized and on top of their assignments, quizzes, and project deadlines.</p>
        <p className="mt-4 text-gray-700 text-lg leading-relaxed">Our mission is to make academic life a little less stressful and more productive by providing a simple yet powerful tool to track and manage tasks. With BCIT TaskMate, we hope to empower FSWD students to excel in their studies and prepare for a successful career in web development.</p>
        <p className="mt-6 text-center text-indigo-500 font-semibold">Organize, focus, and succeed with BCIT TaskMate!</p>
      </div>
    </div>
  );
}
