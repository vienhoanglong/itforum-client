import { create } from "zustand";
import IDocument from "@/interface/document";
import { getAllDocument } from "@/services/documentService";
interface DocumentState {
  listAllDocument: IDocument[] | null;
  getListDocument: (
    topicId: string,
    skip: number,
    limit: number,
    sort: string,
    type?: string
  ) => void;
}
export const useDocumentStore = create<DocumentState>((set) => ({
  listAllDocument: null,
  getListDocument: async (
    topicId: string,
    skip: number,
    limit: number,
    sort: string,
    type?: string
  ) => {
    try {
      const token = localStorage.getItem("accessToken");
      if (token) {
        const response = await getAllDocument(topicId, skip, limit, sort, type);
        set(() => ({ listAllDocument: response }));
      }
    } catch (error) {
      console.error("Error getting topic:", error);
    }
  },
}));
