import { create } from "zustand";

const DashboardDraftSlicer = create((set) => ({
  id: null,
  setId: (id: string | number) => set({ id }),
  dataWithRegion: null,
  setDataWithRegion: (dataWithRegion: any) => set({ dataWithRegion }),
  tableData: [],
  setTableData: (tableData: any) => set({ tableData }),
}));

export const useDashboardDraftSlicer = () => {
  const id = DashboardDraftSlicer((state: any) => state.id);
  const setId = DashboardDraftSlicer((state: any) => state.setId);
  const dataWithRegion = DashboardDraftSlicer(
    (state: any) => state.dataWithRegion
  );
  const setDataWithRegion = DashboardDraftSlicer(
    (state: any) => state.setDataWithRegion
  );
  const tableData = DashboardDraftSlicer((state: any) => state.tableData);
  const setTableData = DashboardDraftSlicer((state: any) => state.setTableData);

  return {
    id,
    setId,
    dataWithRegion,
    setDataWithRegion,
    tableData,
    setTableData,
  };
};
