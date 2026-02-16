
"use client";

import { GlobalEchoProvider } from "@/context/GlobalEchoContext";
import { LeaderProvider } from "@/context/LeaderContext";

export function Providers({ children }: { children: React.ReactNode }) {
    return (
        <GlobalEchoProvider>
            <LeaderProvider>
                {children}
            </LeaderProvider>
        </GlobalEchoProvider>
    );
}
