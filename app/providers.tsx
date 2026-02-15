
"use client";

import { GlobalEchoProvider } from "@/context/GlobalEchoContext";

export function Providers({ children }: { children: React.ReactNode }) {
    return (
        <GlobalEchoProvider>
            {children}
        </GlobalEchoProvider>
    );
}
