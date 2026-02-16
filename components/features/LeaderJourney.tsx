"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { useLeader } from "@/context/LeaderContext";
import {
    HelpCircle, Activity, Brain, Trophy,
    Globe, ArrowLeft, ChevronLeft, ChevronRight, Sparkles,
} from "lucide-react";

export function LeaderJourney() {
    const {
        selectedRole,
        guidanceContent,
        isLoadingGuidance,
        clearRole,
    } = useLeader();

    const [activeSection, setActiveSection] = useState(0);

    if (isLoadingGuidance) {
        return (
            <Card className="w-full border-indigo-200 bg-indigo-50/50">
                <CardContent className="p-8 flex items-center justify-center space-x-3 text-indigo-600">
                    <Sparkles className="w-6 h-6 animate-spin" />
                    <p className="text-lg font-medium">
                        Preparing your {selectedRole?.title} journey...
                    </p>
                </CardContent>
            </Card>
        );
    }

    if (!guidanceContent || !selectedRole) return null;

    const sections = [
        {
            id: "wonder",
            icon: HelpCircle,
            title: "Wonder Questions",
            content: guidanceContent.wonderQuestions,
        },
        {
            id: "explore",
            icon: Activity,
            title: guidanceContent.explorationActivity.title,
            content: guidanceContent.explorationActivity.steps,
        },
        {
            id: "reflect",
            icon: Brain,
            title: "Reflect & Connect",
            content: guidanceContent.reflectionPrompts,
        },
        {
            id: "challenge",
            icon: Trophy,
            title: guidanceContent.knowledgeChallenge.title,
            content: [guidanceContent.knowledgeChallenge.description],
        },
    ];

    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
        >
            <Button
                variant="ghost"
                onClick={clearRole}
                className="text-slate-400 hover:text-slate-600"
            >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Choose a different path
            </Button>

            <div className="text-center space-y-1">
                <h3 className="text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">
                    Your {selectedRole.title} Journey
                </h3>
                <p className="text-slate-500">Follow the steps below to start your discovery!</p>
            </div>

            <div className="flex gap-2 justify-center flex-wrap">
                {sections.map((section, i) => {
                    const Icon = section.icon;
                    return (
                        <Button
                            key={section.id}
                            variant={activeSection === i ? "default" : "outline"}
                            size="sm"
                            onClick={() => setActiveSection(i)}
                            className={activeSection === i
                                ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white"
                                : "text-slate-500"
                            }
                        >
                            <Icon className="w-4 h-4 mr-1" />
                            {section.title}
                        </Button>
                    );
                })}
            </div>

            <AnimatePresence mode="wait">
                <motion.div
                    key={activeSection}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                >
                    <Card className="border-2 border-slate-200 bg-white shadow-lg">
                        <CardHeader className="bg-gradient-to-r from-slate-50 to-indigo-50">
                            <CardTitle className="flex items-center gap-2 text-slate-800">
                                {(() => {
                                    const Icon = sections[activeSection].icon;
                                    return <Icon className="w-5 h-5 text-indigo-500" />;
                                })()}
                                {sections[activeSection].title}
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="p-6 space-y-4">
                            {sections[activeSection].content.map((item, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: i * 0.15 }}
                                    className="flex items-start gap-3 p-3 rounded-lg bg-slate-50 hover:bg-indigo-50 transition-colors"
                                >
                                    <span className="flex-shrink-0 w-7 h-7 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center text-sm font-bold">
                                        {i + 1}
                                    </span>
                                    <p className="text-slate-700 font-medium leading-relaxed">{item}</p>
                                </motion.div>
                            ))}

                            <div className="flex justify-between pt-4">
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    disabled={activeSection === 0}
                                    onClick={() => setActiveSection(prev => prev - 1)}
                                >
                                    <ChevronLeft className="w-4 h-4 mr-1" />
                                    Previous
                                </Button>
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    disabled={activeSection === sections.length - 1}
                                    onClick={() => setActiveSection(prev => prev + 1)}
                                >
                                    Next
                                    <ChevronRight className="w-4 h-4 ml-1" />
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                </motion.div>
            </AnimatePresence>

            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="text-center p-4 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl border border-indigo-100"
            >
                <Globe className="w-5 h-5 text-indigo-400 mx-auto mb-2" />
                <p className="text-sm text-indigo-700 italic font-medium">
                    {guidanceContent.connectionToWorld}
                </p>
            </motion.div>
        </motion.div>
    );
}
