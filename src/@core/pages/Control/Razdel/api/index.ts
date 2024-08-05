import { api } from "@/@core/application/utils/api";

export const get = async (params: any) => {
  try {
    const response = await api.get("/SectionCategories/all", {
      params,
    });

    return response;
  } catch (error) {
    console.error(error);
  }
};

// CREATE
export const create = async (values: unknown) => {
  try {
    const response = await api.post(`/SectionCategories/create`, values);

    return response;
  } catch (error) {
    console.error(error);
  }
};

// UPDATE
export const update = async (values: unknown, id: number) => {
  try {
    const response = await api.patch(`/SectionCategories/update/${id}`, values);

    return response;
  } catch (error) {
    console.error(error);
  }
};
