import { contextBridge } from "electron";

if (!process.contextIsolated) {
  throw new Error('Context isolation must be enabled in the main process to use the preload script.');
}


try {
  contextBridge.exposeInMainWorld("context", {});
} catch (error) {
  console.log(error);
}
