import { NoteContent, NoteInfo } from "@shared/models";
import { atom } from "jotai";
import { unwrap } from "jotai/utils";


const loadNotes = async () =>
{
    const notes = await window.context.getNotes();

    // Sort notes by lastEditTime in descending order

    return notes.sort((a, b) => b.lastEditTime - a.lastEditTime);
};

const notesAtomAsync = atom<NoteInfo[] | Promise<NoteInfo[]>>(loadNotes());


export const notesAtom = unwrap(notesAtomAsync, (prev) => prev);


export const selectedNoteIndexAtom = atom<number | null>(0);

const selectedNoteAtomAsync = atom(async (get) =>
{
    const notes = get(notesAtom);
    const idx = get(selectedNoteIndexAtom);


    if (idx === null || !notes) return null;
    const selectedNote = notes[ idx ];

    const noteContent = await window.context.readNote(selectedNote.title);

    return {
        ...selectedNote,
        content: noteContent
    };
});


export const selectedNoteAtom = unwrap(selectedNoteAtomAsync, (prev) => prev ?? {
    title: "",
    content: "",
    lastEditTime: Date.now()
});

export const createEmptyNoteAtom = atom(null, async (get, set) =>
{
    const notes = get(notesAtom);
    if (!notes) return;
    const title = await window.context.createNote();

    if (!title) return;
    const newNote: NoteInfo = {
        title,
        lastEditTime: Date.now()
    };
    set(notesAtom, [ newNote, ...notes.filter(note => note.title !== newNote.title) ]);
    set(selectedNoteIndexAtom, 0); // Select the newly created note

});


export const deleteSelectedNoteAtom = atom(null, async (get, set) =>
{
    const notes = get(notesAtom);
    const idx = get(selectedNoteIndexAtom);
    if (idx === null || !notes) return; // No note selected

    const isDeleted = await window.context.deleteNote(notes[ idx ].title);


    if (!isDeleted) return; // Deletion failed, maybe show an error message

    const noteToDelete = notes[ idx ];
    const updatedNotes = notes.filter(note => note.title !== noteToDelete.title);
    set(notesAtom, updatedNotes);
    set(selectedNoteIndexAtom, updatedNotes.length > 0 ? 0 : null); // Select the first note or null if no notes left
});


export const saveNoteAtom = atom(null, async (get, set, note: NoteContent) =>
{
    const notes = get(notesAtom);
    const idx = get(selectedNoteIndexAtom);
    if (idx === null || !notes) return; // No note selected

    // Save
    await window.context.writeNote(notes[ idx ].title, note);

    // Update lastEditTime
    const updatedNote: NoteInfo = {
        ...notes[ idx ],
        lastEditTime: Date.now()
    };
    set(notesAtom, notes.map((note) => note.title === updatedNote.title ? updatedNote : note));
});
