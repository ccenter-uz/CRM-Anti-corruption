import { useLayoutEffect, useState } from "react";
import Cookies from "js-cookie";

export const useAuth = () => {
  const [isAuth, setIsAuth] = useState(false);

  useLayoutEffect(() => {
    if (Cookies.get("access_token")) return setIsAuth(true);
  }, []);

  return {
    isAuth,
  };
};
