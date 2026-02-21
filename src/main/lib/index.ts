import { APP_DIR_NAME, FILE_ENCODING, WELCOME_NOTE_FILENAME } from "@shared/constants";
import { NoteInfo } from "@shared/models";
import { CreateNote, DeleteNote, GetNotes, ReadNote, WriteNote } from "@shared/types";
import { dialog } from "electron";
import { ensureDir, readdir, readFile, readFileSync, remove, stat, writeFile } from "fs-extra";
import { isEmpty } from "lodash";
import { homedir } from "os";
import path from "path";
import welcomeNoteFile from "../../../resources/welcomeNote.md?asset";

export const getRootDir: () => string = () =>
{
    return `${homedir()}/${APP_DIR_NAME}`;

};


export const getNotes: GetNotes = async () =>
{
    const rootDir = getRootDir();
    await ensureDir(rootDir);

    const noteFilesNames = await readdir(rootDir, { encoding: FILE_ENCODING, withFileTypes: false });

    const notes = noteFilesNames.filter((fileName) => fileName.endsWith(".md"));

    if (isEmpty(notes)) {
        console.info("No notes found in the directory.");

        // Creating welcome note
        const content = await readFileSync(welcomeNoteFile, { encoding: FILE_ENCODING });

        await writeFile(`${rootDir}/${WELCOME_NOTE_FILENAME}`, content, { encoding: FILE_ENCODING });

        notes.push(WELCOME_NOTE_FILENAME);


    }

    return Promise.all(notes.map(async (noteFileName) =>
    {
        const noteInfo = await getNoteInfoFromFileName(noteFileName);
        return noteInfo;
    }));
};


export const getNoteInfoFromFileName = async (fileName: string): Promise<NoteInfo> =>
{
    const fileStats = await stat(`${getRootDir()}/${fileName}`);

    return {
        title: fileName.replace(".md", ""),
        lastEditTime: fileStats.mtime.getTime(),

    };

};

export const readNote: ReadNote = async (filename) =>
{
    const rootDir = getRootDir();


    return readFile(`${rootDir}/${filename}.md`, { encoding: FILE_ENCODING });

};

export const writeNote: WriteNote = async (filename, content) =>
{
    const rootDir = getRootDir();

    console.log("writing with", filename);

    return writeFile(`${rootDir}/${filename}.md`, content, { encoding: FILE_ENCODING });
};


export const createNote: CreateNote = async () =>
{
    const rootDir = getRootDir();

    console.log("This is the root dir", rootDir);

    await ensureDir(rootDir);

    const { filePath, canceled } = await dialog.showSaveDialog({
        title: "New Note",
        defaultPath: `${rootDir}/Untitled.md`,
        buttonLabel: "Create Note",
        properties: [ "showOverwriteConfirmation" ],
        showsTagField: false,
        filters: [ {
            name: "Markdown",
            extensions: [ "md" ]
        } ]
    });

    console.log("filePath", filePath, canceled);

    if (canceled || !filePath) return false;

    const { name: filename, dir: parentDir } = path.parse(filePath);

    console.log("parentDir", parentDir, "rootDir", rootDir);

    if (path.normalize(parentDir) !== path.normalize(rootDir)) {
        await dialog.showMessageBox({
            type: "error",
            title: "Creation Failed",
            message: "All notes must be saved in the Notes directory. Please select a location inside the Notes folder.",
        });
        return false;
    }



    await writeFile(filePath, "");

    return filename;
};


export const deleteNote: DeleteNote = async (filename) =>
{
    const rootDir = getRootDir();

    const { response } = await dialog.showMessageBox({
        type: "warning",
        title: "Delete Note",
        message: `Are you sure you want to delete the note "${filename}"? This action cannot be undone.`,
        buttons: [ "Delete", "Cancel" ],
        defaultId: 1,
        cancelId: 1
    });

    if (response === 1) {
        return false;
    }

    await remove(`${rootDir}/${filename}.md`);

    return true;
};
