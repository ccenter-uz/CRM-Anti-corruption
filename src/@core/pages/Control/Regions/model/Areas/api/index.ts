import { api } from "@/@core/application/utils/api";

// CREATE
export const create = async (values: unknown) => {
  try {
    const response = await api.post(`/District/create`, values);

    return response;
  } catch (error) {
    console.error(error);
  }
};

// UPDATE
export const update = async (values: unknown, id: number) => {
  try {
    const response = await api.patch(`/District/update/${id}`, values);

    return response;
  } catch (error) {
    console.error(error);
  }
};

export const postChangePodrazdel = async (id: number | string, params: any) => {
  try {
    const response = await api.get(`/RegionCategories/one/${id}`, {
      params,
    });

    return response;
  } catch (error) {
    console.error(error);
  }
};
