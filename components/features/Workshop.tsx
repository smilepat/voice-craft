
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Compass, RefreshCw, CheckCircle2, Star, Share2 } from "lucide-react";
import { generateQuests, Quest } from "@/lib/ai/QuestGenerator";
import { motion, AnimatePresence } from "framer-motion";
import { useGlobalEcho } from "@/context/GlobalEchoContext";


export function MakeMeWorkshop() {
    const [quests, setQuests] = useState<Quest[]>([]);
    const [loading, setLoading] = useState(false);
    const [activeQuest, setActiveQuest] = useState<Quest | null>(null);
    const [missionStatus, setMissionStatus] = useState<'idle' | 'active' | 'completed'>('idle');
    const { addPost } = useGlobalEcho();

    const handleGetQuests = async () => {
        setLoading(true);
        setMissionStatus('idle');
        setActiveQuest(null);
        const newQuests = await generateQuests();
        setQuests(newQuests);
        setLoading(false);
    };

    const startMission = () => {
        setMissionStatus('active');
    };

    const completeMission = () => {
        setMissionStatus('completed');
    };

    const shareAchievement = () => {
        if (!activeQuest) return;
        addPost(`I just completed a mission: ${activeQuest.title} - ${activeQuest.description}`, "Junior Explorer");
        alert("Mission Shared!");
    };

    return (
        <div className="w-full max-w-4xl mx-auto mt-12 md:mt-20 p-4 md:p-6 relative">
            <div className="text-center mb-10 space-y-2">
                <h2 className="text-3xl font-extrabold text-slate-800 flex items-center justify-center gap-3">
                    <Compass className="w-8 h-8 text-orange-500" />
                    The "Make Me" Workshop
                </h2>
                <p className="text-slate-500 text-lg">Don't know what to do? Let's find a secret mission.</p>
            </div>

            {missionStatus === 'idle' && (
                <div className="space-y-8">
                    <div className="flex justify-center">
                        <Button
                            onClick={handleGetQuests}
                            disabled={loading}
                            size="lg"
                            className="bg-white border-2 border-orange-200 text-orange-600 hover:bg-orange-50 hover:border-orange-300 shadow-sm transition-all rounded-full px-8 py-6 text-lg font-bold"
                        >
                            {loading ? <RefreshCw className="w-5 h-5 animate-spin mr-2" /> : <Compass className="w-5 h-5 mr-2" />}
                            {quests.length > 0 ? "Spin the Compass Again" : "Find Me a Mission"}
                        </Button>
                    </div>

                    <div className="grid gap-6 md:grid-cols-2">
                        <AnimatePresence mode="wait">
                            {quests.map((quest) => (
                                <motion.div
                                    key={quest.id}
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.9 }}
                                    whileHover={{ scale: 1.03, y: -5 }}
                                    whileTap={{ scale: 0.98 }}
                                    onClick={() => setActiveQuest(quest)}
                                    className="cursor-pointer"
                                >
                                    <Card className={`h-full border-2 transition-all duration-300 ${activeQuest?.id === quest.id
                                        ? 'border-orange-500 bg-orange-50 ring-4 ring-orange-100 shadow-xl'
                                        : 'border-slate-200 hover:border-orange-300 bg-white hover:shadow-lg'}`}>
                                        <CardHeader>
                                            <CardTitle className={`text-xl font-bold flex items-center gap-2 ${activeQuest?.id === quest.id ? 'text-orange-700' : 'text-slate-700'}`}>
                                                {quest.type === 'creative' ? <Star className="w-5 h-5 text-yellow-500" /> : <Compass className="w-5 h-5 text-blue-500" />}
                                                {quest.title}
                                            </CardTitle>
                                        </CardHeader>
                                        <CardContent>
                                            <p className="text-slate-600 leading-relaxed font-medium">{quest.description}</p>
                                        </CardContent>
                                    </Card>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </div>

                    {activeQuest && (
                        <motion.div
                            initial={{ opacity: 0, y: 50 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="flex justify-center pt-4"
                        >
                            <Button
                                onClick={startMission}
                                className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white px-10 py-6 rounded-full text-xl font-bold shadow-lg shadow-orange-500/30 transform transition-transform hover:scale-105"
                            >
                                Accept Mission
                            </Button>
                        </motion.div>
                    )}
                </div>
            )}

            {missionStatus === 'active' && activeQuest && (
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="max-w-xl mx-auto"
                >
                    <Card className="border-4 border-orange-400 bg-orange-50/50 shadow-2xl overflow-hidden relative">
                        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-orange-400 to-red-400 animate-pulse"></div>
                        <CardHeader className="text-center pt-8">
                            <CardTitle className="text-2xl font-black text-orange-800 uppercase tracking-widest">
                                Mission In Progress
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="text-center p-8 space-y-8">
                            <div>
                                <h3 className="text-3xl font-bold text-slate-800 mb-4">{activeQuest.title}</h3>
                                <p className="text-xl text-slate-600 leading-relaxed">{activeQuest.description}</p>
                            </div>

                            <div className="p-4 bg-white/60 rounded-xl border border-orange-100">
                                <p className="text-sm text-orange-600 font-semibold animate-pulse">
                                    GO! GO! GO! Come back when you're done!
                                </p>
                            </div>

                            <Button
                                onClick={completeMission}
                                className="w-full bg-green-500 hover:bg-green-600 text-white text-lg py-6 rounded-xl font-bold shadow-green-500/20 shadow-lg"
                            >
                                <CheckCircle2 className="w-6 h-6 mr-2" />
                                Mission Accomplished!
                            </Button>
                        </CardContent>
                    </Card>
                </motion.div>
            )}

            {missionStatus === 'completed' && activeQuest && (
                <motion.div
                    initial={{ opacity: 0, scale: 0.5, rotate: -10 }}
                    animate={{ opacity: 1, scale: 1, rotate: 0 }}
                    className="max-w-lg mx-auto text-center"
                >
                    <div className="mb-6 flex justify-center">
                        <div className="relative">
                            <Star className="w-24 h-24 text-yellow-400 fill-yellow-400 animate-bounce" />
                            <Star className="w-12 h-12 text-yellow-300 fill-yellow-300 absolute -top-2 -right-4 animate-pulse" />
                            <Star className="w-8 h-8 text-yellow-200 fill-yellow-200 absolute bottom-0 -left-4 animate-pulse delay-75" />
                        </div>
                    </div>

                    <h2 className="text-3xl md:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 to-orange-500 mb-4">
                        FANTASTIC WORK!
                    </h2>
                    <p className="text-xl text-slate-600 mb-8">
                        You completed <span className="font-bold text-orange-600">"{activeQuest.title}"</span>.
                        <br />The world is a little bit more interesting because of you.
                    </p>

                    <div className="flex flex-col gap-3">
                        <Button
                            onClick={shareAchievement}
                            className="bg-blue-500 hover:bg-blue-600 text-white text-lg py-6 rounded-xl font-bold shadow-lg"
                        >
                            <Share2 className="w-5 h-5 mr-2" />
                            Share Achievement to Echo
                        </Button>
                        <Button
                            onClick={handleGetQuests}
                            variant="ghost"
                            className="text-slate-400 hover:text-slate-600"
                        >
                            Find a New Mission
                        </Button>
                    </div>
                </motion.div>
            )}
        </div>
    );
}
