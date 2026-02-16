import { NoteInfo } from "@shared/models";
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

export const selectedNoteAtom = atom(get =>
{
    const notes = get(notesAtom);
    const idx = get(selectedNoteIndexAtom);


    if (idx === null || !notes) return null;
    const selectedNote = notes[ idx ];

    return {
        ...selectedNote,
        content: selectedNote ? `# ${selectedNote?.title}\n\nLast edited: ${new Date(selectedNote?.lastEditTime).toLocaleString()}\n\n---\n\nThis is the content of the note. You can edit this markdown content in the editor on the right.` : ""
    };
});

export const createEmptyNoteAtom = atom(null, (get, set) =>
{
    const notes = get(notesAtom);
    if (!notes) return;
    const title = `Untitled Note ${notes.length + 1}`;
    const newNote: NoteInfo = {
        title,
        lastEditTime: Date.now()
    };
    set(notesAtom, [ newNote, ...notes.filter(note => note.title !== newNote.title) ]);
    set(selectedNoteIndexAtom, 0); // Select the newly created note

});


export const deleteSelectedNoteAtom = atom(null, (get, set) =>
{
    const notes = get(notesAtom);
    const idx = get(selectedNoteIndexAtom);
    if (idx === null || !notes) return; // No note selected

    const noteToDelete = notes[ idx ];
    const updatedNotes = notes.filter(note => note.title !== noteToDelete.title);
    set(notesAtom, updatedNotes);
    set(selectedNoteIndexAtom, updatedNotes.length > 0 ? 0 : null); // Select the first note or null if no notes left
});
