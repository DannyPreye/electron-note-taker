import { NoteInfo } from "@shared/models";

export const notesMocks: NoteInfo[] = [
    {
        title: "Shopping List",
        lastEditTime: Date.now() - 1000 * 60 * 60 * 2, // 2 hours ago
    },
    {
        title: "Meeting Notes",
        lastEditTime: Date.now() - 1000 * 60 * 30, // 30 minutes ago
    },
    {
        title: "Project Ideas",
        lastEditTime: Date.now() - 1000 * 60 * 60 * 24, // 1 day ago
    },
];
