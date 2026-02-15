
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Sparkles } from "lucide-react";
import { motion } from "framer-motion";

interface AiMirrorProps {
    feedback: {
        strength: string;
        potential: string;
        message: string;
    } | null;
    loading: boolean;
}

export function AiMirror({ feedback, loading }: AiMirrorProps) {
    if (loading) {
        return (
            <Card className="w-full max-w-md mt-6 border-blue-200 bg-blue-50/50">
                <CardContent className="p-6 flex items-center justify-center space-x-2 text-blue-600">
                    <Sparkles className="w-5 h-5 animate-spin" />
                    <p>Listening specifically to you...</p>
                </CardContent>
            </Card>
        );
    }

    if (!feedback) return null;

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="w-full max-w-md mt-6"
        >
            <Card className="border-indigo-200 bg-white/80 backdrop-blur-sm shadow-xl">
                <CardHeader className="bg-gradient-to-r from-violet-100 to-indigo-100 rounded-t-lg pb-4">
                    <CardTitle className="flex items-center gap-2 text-indigo-800 text-lg">
                        <Sparkles className="w-5 h-5 text-indigo-600" />
                        The Mirror Sees...
                    </CardTitle>
                </CardHeader>
                <CardContent className="p-6 space-y-4">
                    <div className="space-y-1">
                        <h4 className="text-xs font-semibold text-indigo-400 uppercase tracking-wider">Your Strength</h4>
                        <p className="text-xl font-bold text-indigo-900">{feedback.strength}</p>
                    </div>

                    <div className="space-y-1">
                        <h4 className="text-xs font-semibold text-purple-400 uppercase tracking-wider">Your Potential</h4>
                        <p className="text-md font-medium text-gray-700">{feedback.potential}</p>
                    </div>

                    <div className="bg-indigo-50 p-4 rounded-lg text-indigo-800 text-sm italic">
                        "{feedback.message}"
                    </div>
                </CardContent>
            </Card>
        </motion.div>
    );
}
