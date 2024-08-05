import { api } from "@/@core/application/utils/api";

// CREATE
// NEW
export const create = async (body: any) => {
  try {
    const response = await api.post(`/organization/create`, body);

    return response;
  } catch (error) {
    console.error(error);
  }
};
// DRAFT
export const createDraft = async (body: any) => {
  try {
    const response = await api.post(`/organization/create`, body);

    return response;
  } catch (error) {
    console.error(error);
  }
};
// UPDATE
// NEW
export const edit = async (body: any, id: string) => {
  try {
    const response = await api.patch(`/organization/update/${id}`, body);

    return response;
  } catch (error) {
    console.error(error);
  }
};
// DRAFT
export const editDraft = async (body: any, id: string) => {
  try {
    const response = await api.patch(`/organization/update/${id}`, body);

    return response;
  } catch (error) {
    console.error(error);
  }
};

// GET-RAZDEL
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

// GET-EDITED-ONE
export const getItemById = async (id: number | string) => {
  try {
    const response = await api.get(`/organization/one/${id}`);

    return response;
  } catch (error) {
    console.error(error);
  }
};
