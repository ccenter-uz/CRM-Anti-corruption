import { api } from "@/@core/application/utils/api";
import { create } from "zustand";

const useRequestStore = create((set) => ({
  data: [],
  pagination: {},
  razdel: [],
  podrazdel: [],

  GET: async (params: any) => {
    const res = await api.get(`/organization/allNotDrafts`, { params });
    set({
      data: res.data.results.map((item: any, index: any) => ({
        ...item,
        index: index + 1,
      })),
    });
    set({ pagination: res.data.pagination });

    return res;
  },
}));

export const useRequest = () => {
  const data = useRequestStore((state: any) => state.data);
  const GET = useRequestStore((state: any) => state.GET);
  const pagination = useRequestStore((state: any) => state.pagination);

  return { data, GET, pagination };
};
