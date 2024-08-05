import { api } from "@/@core/application/utils/api";

export const get = async (params: any) => {
  try {
    const response = await api.get("/RegionCategories/all", {
      params,
    });

    return response;
  } catch (error) {
    console.error(error);
  }
};


// UPDATE
export const update = async (values: unknown, id: number) => {
  try {
    const response = await api.patch(`/RegionCategories/update/${id}`, values);

    return response;
  } catch (error) {
    console.error(error);
  }
};
