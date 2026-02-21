import { NoteContent, NoteInfo } from "./models";

export type GetNotes = () => Promise<NoteInfo[]>;

export type ReadNote = (filename: string) => Promise<NoteContent>;

export type WriteNote = (filename: string, content: NoteContent) => Promise<void>;


export type CreateNote = () => Promise<NoteInfo[ "title" ] | false>;

export type DeleteNote = (filename: string) => Promise<Boolean>;
