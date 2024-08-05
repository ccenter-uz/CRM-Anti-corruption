import { api } from "@/@core/application/utils/api";

export const postChangeRazdel = async (id: number | string) => {
  try {
    const response = await api.get(`/SectionCategories/one/${id}`, {
      params: {
        page: 1,
        pageSize: 1000000,
        search: "null",
      },
    });

    return response;
  } catch (error) {
    console.error(error);
  }
};
