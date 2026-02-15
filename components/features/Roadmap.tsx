
"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle2, Circle, Lock } from "lucide-react";
import { motion } from "framer-motion";

const STAGES = [
    { id: 1, title: "My Room", status: "unlocked", desc: "Finding my voice" },
    { id: 2, title: "My House", status: "current", desc: "Exploring my potential" },
    { id: 3, title: "My Town", status: "locked", desc: "Connecting with neighbors" },
    { id: 4, title: "The World", status: "locked", desc: "Global Echo" },
];

export function Roadmap() {
    return (
        <div className="w-full max-w-4xl mx-auto mt-12 mb-20">
            <h2 className="text-2xl font-bold text-center text-slate-800 mb-8">My Journey Map</h2>

            <div className="relative flex flex-col md:flex-row justify-between items-center w-full px-4 md:px-12">
                {/* Progress Line Desktop */}
                <div className="absolute top-1/2 left-0 w-full h-1 bg-slate-200 -z-10 hidden md:block transform -translate-y-1/2" />

                {/* Progress Line Mobile */}
                <div className="absolute top-0 bottom-0 left-1/2 w-1 bg-slate-200 -z-10 md:hidden transform -translate-x-1/2" />

                {STAGES.map((stage, index) => (
                    <motion.div
                        key={stage.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.2 }}
                        className="flex flex-col items-center bg-white p-4 rounded-xl shadow-sm border border-slate-100 w-full md:w-48 mb-6 md:mb-0 relative z-10"
                    >
                        <div className={`
              w-12 h-12 rounded-full flex items-center justify-center mb-3 text-white font-bold text-xl
              ${stage.status === 'unlocked' ? 'bg-green-500' :
                                stage.status === 'current' ? 'bg-indigo-500 ring-4 ring-indigo-100' :
                                    'bg-slate-300'}
            `}>
                            {stage.status === 'unlocked' && <CheckCircle2 className="w-6 h-6" />}
                            {stage.status === 'current' && <Circle className="w-6 h-6 fill-current" />}
                            {stage.status === 'locked' && <Lock className="w-5 h-5" />}
                        </div>

                        <h3 className="font-bold text-slate-800">{stage.title}</h3>
                        <p className="text-xs text-slate-500 text-center">{stage.desc}</p>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}
