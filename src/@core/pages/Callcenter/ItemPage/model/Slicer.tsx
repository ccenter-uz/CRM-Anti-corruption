import { api } from "@/@core/application/utils/api";
import { create } from "zustand";

const useItemPageSlicer = create((set) => ({
  data: [],
  getData: async (id: string) => {
    const res = await api.get(`/organization/one/${id}`);

    set({
      data: res.data,
    });

    return res.data;
  },
}));

export const useItemPage = () => {
  const data = useItemPageSlicer((state: any) => state.data);
  const getData = useItemPageSlicer((state: any) => state.getData);

  return {
    data,
    getData,
  };
};
