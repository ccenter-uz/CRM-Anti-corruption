"use client";
import {
  Box,
  Button,
  Divider,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Select,
  Text,
} from "@chakra-ui/react";
import { useSignin } from "../model/Slicer";
import { useEffect } from "react";
import {
  buttonStyle,
  inputStyle,
  labelStyle,
  selectStyle,
} from "@/@core/features/FilterTable/model/helper";
import { useForm } from "react-hook-form";
import { signin } from "../api";
import { scssVariables } from "@/@core/application/utils/vars";
import { toast } from "react-toastify";
import Cookie from "js-cookie";
import { useGlobal } from "@/@core/application/store/global";
import { useRouter } from "next/navigation";

export const Signin = () => {
  const { getUsers, users } = useSignin();
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();
  const { setRole } = useGlobal();
  const router = useRouter();

  useEffect(() => {
    users?.length === 0 && getUsers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Signin
  const handleSignin = async (values: any) => {
    const res = await signin(values);

    res?.status === 200 &&
      (toast.success("Тизимга кириш муваффақиятли кирилди", {
        position: "bottom-right",
      }),
      Cookie.set("access_token", res.data?.token),
      Cookie.set("role", res.data?.role),
      localStorage.setItem("role", res.data?.role),
      setRole(res.data?.role),
      router.push("/"));
  };

  return (
    <Box
      w={"100%"}
      h={"100%"}
      display={"flex"}
      justifyContent={"center"}
      pt={{ base: "24px", sm: "24px", md: "5em", xl: "5em" }}
      bg={"#7080901f"}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          maxW: "440px",
          w: "100%",
          h: {
            base: "fit-content",
            sm: "fit-content",
            md: "340px",
            xl: "340px",
          },
          bg: "white",
          boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.15)",
          borderRadius: "10px",
          p: "20px",
        }}
      >
        <Text
          fontSize={{ base: "16px", sm: "16px", md: "20px", xl: "20px" }}
          fontWeight={600}
        >
          Тизимга кириш
        </Text>

        <Divider
          mt={{ base: "8px", sm: "8px", md: "16px", xl: "16px" }}
          borderColor={"lightgrey"}
        />
        <form onSubmit={handleSubmit(handleSignin)} id="sign-form">
          <FormControl isInvalid={!!errors.username}>
            <FormLabel sx={labelStyle}>Логин:</FormLabel>
            <Select
              sx={selectStyle}
              placeholder="Выберите пользователя"
              {...register("username", { required: true })}
            >
              {users?.map((user: any) => {
                return (
                  <option key={user.id} value={user.username}>
                    {user.username}
                  </option>
                );
              })}
            </Select>
          </FormControl>
          <FormControl isInvalid={!!errors.password}>
            <FormLabel sx={labelStyle}>Пароль:</FormLabel>
            <Input
              autoComplete="off"
              sx={inputStyle}
              placeholder="Пароль"
              type="password"
              {...register("password", { required: true, minLength: 3 })}
            />
            <FormErrorMessage
              fontSize={scssVariables.fonts.span}
              color={"red.300"}
            >
              пароль нотоғри, илтимос қайта киритинг
            </FormErrorMessage>
          </FormControl>
        </form>
        <Button
          sx={{ ...buttonStyle, mt: "24px" }}
          type="submit"
          form="sign-form"
        >
          Кириш
        </Button>
      </Box>
    </Box>
  );
};
