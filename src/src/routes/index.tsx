import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({ component: App });

function App() {
  return (
    <main className="flex bg-slate-700 text-white p-6 flex-1">
      <h1 className="text-foreground text-2xl font-bold">Home</h1>
    </main>
  );
}
