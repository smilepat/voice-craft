"use client";

import { createContext, useContext, useState, ReactNode } from "react";
import { LeaderRole } from "@/lib/leaderRoles";

export type JourneyPhase = "selecting" | "exploring" | "reflecting";

export interface ConstructivistContent {
    wonderQuestions: string[];
    explorationActivity: {
        title: string;
        steps: string[];
    };
    reflectionPrompts: string[];
    knowledgeChallenge: {
        title: string;
        description: string;
    };
    connectionToWorld: string;
}

interface LeaderContextType {
    selectedRole: LeaderRole | null;
    journeyPhase: JourneyPhase;
    guidanceContent: ConstructivistContent | null;
    isLoadingGuidance: boolean;
    selectRole: (role: LeaderRole) => void;
    clearRole: () => void;
    setGuidanceContent: (content: ConstructivistContent) => void;
    setJourneyPhase: (phase: JourneyPhase) => void;
    setIsLoadingGuidance: (loading: boolean) => void;
}

const LeaderContext = createContext<LeaderContextType | undefined>(undefined);

export function LeaderProvider({ children }: { children: ReactNode }) {
    const [selectedRole, setSelectedRole] = useState<LeaderRole | null>(null);
    const [journeyPhase, setJourneyPhase] = useState<JourneyPhase>("selecting");
    const [guidanceContent, setGuidanceContent] = useState<ConstructivistContent | null>(null);
    const [isLoadingGuidance, setIsLoadingGuidance] = useState(false);

    const selectRole = (role: LeaderRole) => {
        setSelectedRole(role);
        setJourneyPhase("exploring");
        setGuidanceContent(null);
    };

    const clearRole = () => {
        setSelectedRole(null);
        setJourneyPhase("selecting");
        setGuidanceContent(null);
    };

    return (
        <LeaderContext.Provider
            value={{
                selectedRole,
                journeyPhase,
                guidanceContent,
                isLoadingGuidance,
                selectRole,
                clearRole,
                setGuidanceContent,
                setJourneyPhase,
                setIsLoadingGuidance,
            }}
        >
            {children}
        </LeaderContext.Provider>
    );
}

export function useLeader() {
    const context = useContext(LeaderContext);
    if (context === undefined) {
        throw new Error("useLeader must be used within a LeaderProvider");
    }
    return context;
}
