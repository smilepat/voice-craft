
"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Globe, Heart, MessageCircle } from "lucide-react";
import { motion } from "framer-motion";
import { checkSafety } from "@/lib/ai/SafetyFilter";


import { useGlobalEcho } from "@/context/GlobalEchoContext";

export function GlobalEcho() {
    const { posts, likePost } = useGlobalEcho();

    return (
        <div className="w-full max-w-4xl mx-auto mt-12 md:mt-16 p-4 md:p-6 bg-slate-50/50 rounded-2xl md:rounded-3xl">
            <div className="text-center mb-10">
                <h2 className="text-2xl font-bold text-slate-800 flex items-center justify-center gap-2">
                    <Globe className="w-6 h-6 text-blue-500" />
                    Global Echo
                </h2>
                <p className="text-slate-500">Listen to the world. Share your voice.</p>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {posts.map((post) => (
                    <motion.div
                        key={post.id}
                        layout
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        whileHover={{ y: -8, transition: { duration: 0.2 } }}
                        className="h-full"
                    >
                        <Card className="h-full border-none shadow-sm hover:shadow-2xl transition-all duration-300 bg-white/90 backdrop-blur-sm overflow-hidden group">
                            <CardContent className="p-6 flex flex-col h-full justify-between relative">
                                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-400 to-purple-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
                                <div>
                                    <div className="flex items-center justify-between mb-3">
                                        <span className="text-xs font-bold px-3 py-1 bg-slate-100 text-slate-600 rounded-full group-hover:bg-blue-50 group-hover:text-blue-600 transition-colors">
                                            {post.country}
                                        </span>
                                        <Globe className="w-4 h-4 text-slate-300 group-hover:text-blue-300 transition-colors" />
                                    </div>
                                    <p className="text-lg text-slate-700 font-medium leading-relaxed mb-6">
                                        "{post.text}"
                                    </p>
                                </div>

                                <div className="flex items-center justify-between pt-4 border-t border-slate-50">
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        onClick={() => likePost(post.id)}
                                        className="text-slate-400 hover:text-pink-500 hover:bg-pink-50 gap-1.5 transition-all group-hover:text-slate-500"
                                    >
                                        <Heart className={`w-4 h-4 ${post.likes > 0 ? 'fill-pink-500 text-pink-500' : 'group-hover:text-pink-400'}`} />
                                        <span className="text-xs font-medium">{post.likes > 0 ? `${post.likes} Hearts` : 'Send Love'}</span>
                                    </Button>
                                    <MessageCircle className="w-4 h-4 text-slate-200" />
                                </div>
                            </CardContent>
                        </Card>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}
