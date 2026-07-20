import { create } from "zustand";

interface FileStore {
    file: File | null;
    type: "kmeans" | "frecuency";
    addFile: (file: File) => void;
    addType: (type: "kmeans" | "frecuency") => void;
}

const initialState = {
    file: null as File | null,
    type: "kmeans" as  "kmeans" | "frecuency"
};

const useFileStore = create<FileStore>((set) => ({
    ...initialState,
    addFile: (file: File) => set({ file }),
    addType: (type: "kmeans" | "frecuency") => set({ type })
}));

export {
    useFileStore
}