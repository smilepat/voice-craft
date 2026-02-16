
import { VoiceCanvas } from "@/components/features/VoiceCanvas";
import { MakeMeWorkshop } from "@/components/features/Workshop";
import { FutureLeader } from "@/components/features/FutureLeader";
import { GlobalEcho } from "@/components/features/GlobalEcho";
import { Roadmap } from "@/components/features/Roadmap";

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-50 flex flex-col items-center py-12 px-4 selection:bg-indigo-100">
      <div className="max-w-4xl w-full text-center mb-12 space-y-4">
        <h1 className="text-4xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600 tracking-tight">
          Voice Craft
        </h1>
        <p className="text-xl text-slate-600 font-medium">
          Find your voice. Make yourself. Connect with the world.
        </p>
      </div>

      <VoiceCanvas />

      <div className="w-full max-w-4xl border-t border-slate-200 my-12 pt-12">
        <MakeMeWorkshop />
      </div>

      <div className="w-full max-w-4xl border-t border-slate-200 my-12 pt-12">
        <FutureLeader />
      </div>

      <div className="w-full max-w-6xl border-t border-slate-200 my-12 pt-12">
        <GlobalEcho />
      </div>

      <div className="w-full border-t border-slate-200 my-12 pt-12">
        <Roadmap />
      </div>

      <footer className="mt-20 text-slate-400 text-sm text-center">
        <p>© 2026 Voice Craft. Built for the dreamers.</p>
      </footer>
    </main>
  );
}
