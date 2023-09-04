import { create } from "zustand";
import { getAllReport } from "@/services/reportService";
import { IReport } from "@/interface/report";
interface ReportState {
  listAllReport: IReport[] | null;
  getListReport: (skip: number, limit: number, sort: string) => void;
}
export const useReportStore = create<ReportState>((set) => ({
  listAllReport: null,
  getListReport: async (skip: number, limit: number, sort: string) => {
    try {
      const token = localStorage.getItem("accessToken");
      if (token) {
        const response = await getAllReport(skip, limit, sort);
        set(() => ({ listAllReport: response.data.data }));
      }
    } catch (error) {
      console.error("Error getting report:", error);
    }
  },
}));
