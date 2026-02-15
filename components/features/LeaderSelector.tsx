"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { motion, AnimatePresence } from "framer-motion";
import { useLeader } from "@/context/LeaderContext";
import { LEADER_ROLES, COLOR_CLASSES, LeaderRole } from "@/lib/leaderRoles";
import { generateConstructivistGuidance } from "@/lib/ai/ConstructivistGuide";
import {
    FlaskConical, Handshake, TreePine, HeartHandshake,
    Lightbulb, Palette, BookOpen, Compass,
} from "lucide-react";
import { type LucideIcon } from "lucide-react";

const ICON_MAP: Record<string, LucideIcon> = {
    FlaskConical, Handshake, TreePine, HeartHandshake,
    Lightbulb, Palette, BookOpen, Compass,
};

export function LeaderSelector() {
    const {
        selectedRole,
        selectRole,
        setGuidanceContent,
        setIsLoadingGuidance,
    } = useLeader();

    const [, setHoveredRole] = useState<string | null>(null);

    const handleSelectRole = async (role: LeaderRole) => {
        selectRole(role);
        setIsLoadingGuidance(true);

        const guidance = await generateConstructivistGuidance(role);
        setGuidanceContent(guidance);
        setIsLoadingGuidance(false);
    };

    return (
        <div className="space-y-6">
            <div className="text-center space-y-2">
                <h3 className="text-xl font-bold text-slate-700">
                    What kind of world leader do you want to be?
                </h3>
                <p className="text-slate-500 text-sm">
                    Pick the future that excites you most. You can always explore another!
                </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <AnimatePresence>
                    {LEADER_ROLES.map((role, index) => {
                        const IconComp = ICON_MAP[role.icon] || Compass;
                        const colors = COLOR_CLASSES[role.color];
                        const isSelected = selectedRole?.id === role.id;

                        return (
                            <motion.div
                                key={role.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.08 }}
                                whileHover={{ scale: 1.05, y: -4 }}
                                whileTap={{ scale: 0.97 }}
                                onHoverStart={() => setHoveredRole(role.id)}
                                onHoverEnd={() => setHoveredRole(null)}
                                onClick={() => handleSelectRole(role)}
                                className="cursor-pointer"
                            >
                                <Card className={`
                                    h-full text-center transition-all duration-300 border-2
                                    ${isSelected
                                        ? `${colors.border} ${colors.bgLighter} ring-4 ${colors.ring} shadow-xl`
                                        : `border-slate-200 bg-white hover:shadow-lg`
                                    }
                                `}>
                                    <CardContent className="p-4 flex flex-col items-center gap-2">
                                        <div className={`
                                            w-12 h-12 rounded-full flex items-center justify-center
                                            transition-colors duration-300
                                            ${isSelected
                                                ? `${colors.bg} text-white`
                                                : `${colors.bgLight} ${colors.text}`
                                            }
                                        `}>
                                            <IconComp className="w-6 h-6" />
                                        </div>
                                        <h4 className={`font-bold text-sm ${isSelected ? colors.textDark : "text-slate-700"}`}>
                                            {role.title}
                                        </h4>
                                        <p className="text-xs text-slate-500 leading-relaxed">
                                            {role.description}
                                        </p>
                                    </CardContent>
                                </Card>
                            </motion.div>
                        );
                    })}
                </AnimatePresence>
            </div>
        </div>
    );
}
