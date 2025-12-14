import { Chat } from "@/components/Chat";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({ component: App });

function App() {
  return (
    <main className="flex flex-col bg-[#0a0a0a] text-white h-full">
      <h1 className="absolute top-4 left-4 z-50 text-foreground text-2xl font-bold">Tanstack AI demo</h1>
      <div className="flex-1 overflow-hidden">
        <Chat />
      </div>
    </main>
  );
}
