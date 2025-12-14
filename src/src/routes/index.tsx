import { Chat } from "@/components/Chat";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({ component: App });

function App() {
  return (
    <main className="flex flex-col bg-slate-700 text-white p-6 flex-1">
      <h1 className="text-foreground text-2xl font-bold">Tanstack AI demo</h1>
      <div className="flex-1">
        <Chat />
      </div>
    </main>
  );
}
