import { GetNotes } from "@shared/types";
import { contextBridge, ipcRenderer } from "electron";

if (!process.contextIsolated) {
  throw new Error('Context isolation must be enabled in the main process to use the preload script.');
}


try {
  contextBridge.exposeInMainWorld("context", {
    local: navigator.language,
    getNotes: (...args: Parameters<GetNotes>) => ipcRenderer.invoke("get-notes", ...args),
    readNote: (...args: Parameters<GetNotes>) => ipcRenderer.invoke("read-note", ...args),
    writeNote: (...args: Parameters<GetNotes>) => ipcRenderer.invoke("write-note", ...args),
    createNote: (...args: Parameters<GetNotes>) => ipcRenderer.invoke("create-note", ...args),
    deleteNote: (...args: Parameters<GetNotes>) => ipcRenderer.invoke("delete-note", ...args),

  });
} catch (error) {
  console.log(error);
}
