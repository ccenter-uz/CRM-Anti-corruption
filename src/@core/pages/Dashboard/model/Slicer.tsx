import { create } from "zustand";

const DashboardSlicer = create((set) => ({
  id: null,
  setId: (id: string | number) => set({ id }),
  dataWithRegion: null,
  setDataWithRegion: (dataWithRegion: any) => set({ dataWithRegion }),
  tableData: [],
  setTableData: (tableData: any) => set({ tableData }),
}));

export const useDashboardSlicer = () => {
  const id = DashboardSlicer((state: any) => state.id);
  const setId = DashboardSlicer((state: any) => state.setId);
  const dataWithRegion = DashboardSlicer((state: any) => state.dataWithRegion);
  const setDataWithRegion = DashboardSlicer(
    (state: any) => state.setDataWithRegion
  );
  const tableData = DashboardSlicer((state: any) => state.tableData);
  const setTableData = DashboardSlicer((state: any) => state.setTableData);

  return {
    id,
    setId,
    dataWithRegion,
    setDataWithRegion,
    tableData,
    setTableData,
  };
};
