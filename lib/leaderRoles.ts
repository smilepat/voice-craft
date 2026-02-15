export interface LeaderRole {
    id: string;
    title: string;
    icon: string;
    description: string;
    color: string;
    domains: string[];
}

export const LEADER_ROLES: LeaderRole[] = [
    {
        id: "scientist",
        title: "Scientist",
        icon: "FlaskConical",
        description: "Discover how the universe works, from tiny atoms to giant galaxies!",
        color: "emerald",
        domains: ["physics", "biology", "chemistry", "space", "experiments"],
    },
    {
        id: "diplomat",
        title: "Diplomat",
        icon: "Handshake",
        description: "Bring people together and solve problems with words, not walls.",
        color: "sky",
        domains: ["cultures", "languages", "peace", "negotiation", "global cooperation"],
    },
    {
        id: "environmentalist",
        title: "Environmentalist",
        icon: "TreePine",
        description: "Protect our planet and help every living thing thrive!",
        color: "green",
        domains: ["ecology", "climate", "oceans", "wildlife", "sustainability"],
    },
    {
        id: "humanitarian",
        title: "Humanitarian",
        icon: "HeartHandshake",
        description: "Make sure every person is safe, healthy, and heard.",
        color: "rose",
        domains: ["human rights", "health", "education", "community", "empathy"],
    },
    {
        id: "innovator",
        title: "Innovator",
        icon: "Lightbulb",
        description: "Invent amazing things that change how we live and play!",
        color: "amber",
        domains: ["technology", "engineering", "design", "problem-solving", "creativity"],
    },
    {
        id: "artist",
        title: "Artist",
        icon: "Palette",
        description: "Express ideas and emotions that move hearts and open minds.",
        color: "violet",
        domains: ["music", "visual arts", "storytelling", "performance", "imagination"],
    },
    {
        id: "educator",
        title: "Educator",
        icon: "BookOpen",
        description: "Help others learn, grow, and believe in themselves!",
        color: "indigo",
        domains: ["teaching", "mentorship", "knowledge sharing", "curiosity", "growth"],
    },
    {
        id: "explorer",
        title: "Explorer",
        icon: "Compass",
        description: "Journey to unknown places and bring back new ideas!",
        color: "teal",
        domains: ["geography", "adventure", "discovery", "anthropology", "nature"],
    },
];

export const COLOR_CLASSES: Record<string, {
    bg: string;
    bgLight: string;
    bgLighter: string;
    text: string;
    textDark: string;
    border: string;
    ring: string;
}> = {
    emerald: { bg: "bg-emerald-500", bgLight: "bg-emerald-100", bgLighter: "bg-emerald-50", text: "text-emerald-600", textDark: "text-emerald-700", border: "border-emerald-500", ring: "ring-emerald-100" },
    sky: { bg: "bg-sky-500", bgLight: "bg-sky-100", bgLighter: "bg-sky-50", text: "text-sky-600", textDark: "text-sky-700", border: "border-sky-500", ring: "ring-sky-100" },
    green: { bg: "bg-green-500", bgLight: "bg-green-100", bgLighter: "bg-green-50", text: "text-green-600", textDark: "text-green-700", border: "border-green-500", ring: "ring-green-100" },
    rose: { bg: "bg-rose-500", bgLight: "bg-rose-100", bgLighter: "bg-rose-50", text: "text-rose-600", textDark: "text-rose-700", border: "border-rose-500", ring: "ring-rose-100" },
    amber: { bg: "bg-amber-500", bgLight: "bg-amber-100", bgLighter: "bg-amber-50", text: "text-amber-600", textDark: "text-amber-700", border: "border-amber-500", ring: "ring-amber-100" },
    violet: { bg: "bg-violet-500", bgLight: "bg-violet-100", bgLighter: "bg-violet-50", text: "text-violet-600", textDark: "text-violet-700", border: "border-violet-500", ring: "ring-violet-100" },
    indigo: { bg: "bg-indigo-500", bgLight: "bg-indigo-100", bgLighter: "bg-indigo-50", text: "text-indigo-600", textDark: "text-indigo-700", border: "border-indigo-500", ring: "ring-indigo-100" },
    teal: { bg: "bg-teal-500", bgLight: "bg-teal-100", bgLighter: "bg-teal-50", text: "text-teal-600", textDark: "text-teal-700", border: "border-teal-500", ring: "ring-teal-100" },
};
