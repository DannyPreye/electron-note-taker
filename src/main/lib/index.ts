import { APP_DIR_NAME, FILE_ENCODING } from "@shared/constants";
import { NoteInfo } from "@shared/models";
import { GetNotes } from "@shared/types";
import { ensureDir, readdir, stat } from "fs-extra";
import { homedir } from "os";

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
