import { api } from "@/@core/application/utils/api";

// GET
export const get = async (params: {
  page: string;
  pageSize: string;
  search: string;
}) => {
  try {
    const response = await api.get(`/SendeOrganization/all`, {
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
    const response = await api.post(`/SendeOrganization/create`, values);

    return response;
  } catch (error) {
    console.error(error);
  }
};

// UPDATE
export const update = async (values: unknown, id: number) => {
  try {
    const response = await api.patch(`/SendeOrganization/update/${id}`, values);

    return response;
  } catch (error) {
    console.error(error);
  }
};
