"use client";

import { useLeader } from "@/context/LeaderContext";
import { LeaderSelector } from "./LeaderSelector";
import { LeaderJourney } from "./LeaderJourney";
import { Crown } from "lucide-react";

export function FutureLeader() {
    const { journeyPhase } = useLeader();

    return (
        <div className="w-full max-w-4xl mx-auto space-y-8">
            <div className="text-center space-y-2">
                <h2 className="text-3xl font-extrabold text-slate-800 flex items-center justify-center gap-3">
                    <Crown className="w-8 h-8 text-amber-500" />
                    Future Leader
                </h2>
                <p className="text-slate-500 text-lg">
                    Choose your path. Discover your world. Build your future.
                </p>
            </div>

            {journeyPhase === "selecting" && <LeaderSelector />}
            {(journeyPhase === "exploring" || journeyPhase === "reflecting") && <LeaderJourney />}
        </div>
    );
}
