import { api } from "@/@core/application/utils/api";

// SIGNIN
export const signin = async (body: any) => {
  try {
    const res = await api.post("/Auth/user/signIn", body);

    return res;
  } catch (error) {
    console.error(error);
  }
};
