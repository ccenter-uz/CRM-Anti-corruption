import { api } from "@/@core/application/utils/api";

// GET
export const get = async (params: {
  page: string;
  pageSize: string;
  search: string;
  role: string;
}) => {
  try {
    const response = await api.get(`/Auth/getUser/all`, {
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
    const response = await api.post(`/Auth/user/register`, values);

    return response;
  } catch (error) {
    console.error(error);
  }
};

// UPDATE
export const update = async (values: unknown, id: number) => {
  try {
    const response = await api.patch(`/Auth/updateUser/${id}`, values);

    return response;
  } catch (error) {
    console.error(error);
  }
};
