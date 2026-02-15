"use client";

import { createContext, useContext, useState, ReactNode } from "react";

export interface Post {
    id: number;
    text: string;
    likes: number;
    country: string;
}

interface GlobalEchoContextType {
    posts: Post[];
    addPost: (text: string, country?: string) => void;
    likePost: (id: number) => void;
}

const INITIAL_POSTS: Post[] = [
    { id: 1, text: "I want to plant a million trees!", likes: 12, country: "Korea" },
    { id: 2, text: "My dream is to fly to Mars.", likes: 8, country: "USA" },
    { id: 3, text: "I love drawing cats.", likes: 24, country: "France" },
];

const GlobalEchoContext = createContext<GlobalEchoContextType | undefined>(undefined);

export function GlobalEchoProvider({ children }: { children: ReactNode }) {
    const [posts, setPosts] = useState<Post[]>(INITIAL_POSTS);

    const addPost = (text: string, country: string = "Global") => {
        const newPost: Post = {
            id: Date.now(),
            text,
            likes: 0,
            country
        };
        // Add new post to the beginning
        setPosts((prev) => [newPost, ...prev]);
    };

    const likePost = (id: number) => {
        setPosts((prev) => prev.map(post =>
            post.id === id ? { ...post, likes: post.likes + 1 } : post
        ));
    };

    return (
        <GlobalEchoContext.Provider value={{ posts, addPost, likePost }}>
            {children}
        </GlobalEchoContext.Provider>
    );
}

export function useGlobalEcho() {
    const context = useContext(GlobalEchoContext);
    if (context === undefined) {
        throw new Error("useGlobalEcho must be used within a GlobalEchoProvider");
    }
    return context;
}
