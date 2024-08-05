"use client";
import { scssVariables } from "@/@core/application/utils/vars";
import { usePagination } from "@/@core/shared/hook/usePaginate";
import BreadCrumb from "@/@core/shared/ui/Breadcrumb";
import Pagination from "@/@core/shared/ui/Pagination";
import { PaperContent } from "@/@core/shared/ui/PaperContent";
import TableGen from "@/@core/shared/ui/Table";
import {
  Box,
  Button,
  Divider,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Icon,
  Input,
  Text,
  Tooltip,
} from "@chakra-ui/react";
import { FC, useEffect, useState } from "react";
import { Check, PenTool, Plus, X } from "react-feather";
import { useDisclosure } from "@/@core/shared/hook/useDisclosure";
import { useForm } from "react-hook-form";
import { inputStyle } from "@/@core/pages/Callcenter/Leaverequest/model/helper";
import { useGlobal } from "@/@core/application/store/global";
import { create, get, update } from "../api";
import { toast } from "react-toastify";
import { ModalRazdel } from "../../Razdel/ui/modal";
import { FilterControlpage } from "@/@core/features/FilterControlpage";
import { useRouter, useSearchParams } from "next/navigation";

export const Operators: FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const { isOpen, onClose, onOpen } = useDisclosure();
  const { total, current, pageSize, setTotal } = usePagination();
  const params = useSearchParams();
  const router = useRouter();
  const { operators, setOperators } = useGlobal();
  const [editId, setEditid] = useState<number | null>();
  const breadcrumb = [
    {
      id: 1,
      title: "Бошқарув",
    },
    {
      id: 2,
      title: "Операторлар",
    },
  ];

  const columns = [
    {
      title: "№",
      dataIndex: "index",
      key: "index",
      width: 50,
      align: "center",
      render: (text: string) => <a>{text}</a>,
    },
    {
      title: "Ф.И.Ш",
      dataIndex: "full_name",
      key: "full_name",
    },
    {
      title: "№ Оператор рақами",
      dataIndex: "operator_number",
      key: "operator_number",
    },
    {
      title: "Логин",
      dataIndex: "username",
      key: "username",
    },
    {
      title: "Яратилган санаси",
      dataIndex: "create_data",
      key: "create_data",
      align: "center",
    },
    {
      title: "Имкониятлар",
      dataIndex: "action",
      key: "action",
      align: "center",
      render: (t: any, record: any) => {
        return (
          <Flex w={"100%"} justifyContent={"center"}>
            <Tooltip label="Таҳрирлаш">
              <Icon
                onClick={() => {
                  reset({
                    full_name: record?.full_name,
                    operator_number: record?.operator_number,
                    password: record?.password,
                    username: record?.username,
                  }),
                    setEditid(record?.id),
                    onOpen();
                }}
                as={PenTool}
                color={scssVariables.primary}
                cursor={"pointer"}
              />
            </Tooltip>
          </Flex>
        );
      },
    },
  ];

  // GET
  const getData = async () => {
    const query = {
      page: current.toString() || "1",
      pageSize: pageSize.toString() || "10",
      search: params.get("search") || "null",
      role: "operator",
    };

    const res = await get(query);

    setOperators(
      res?.data.results.map((item: any, index: number) => ({
        ...item,
        index: index + 1,
      }))
    );

    setTotal(res?.data.pagination.totalItems);
  };

  // LOAD
  useEffect(() => {
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params]);

  // CREATE
  const handleFinish = async (values: any) => {
    if (editId) {
      const res = await update({ ...values, role: "operator" }, editId);
      res?.status === 204 &&
        (toast.success("Маълумот янгиланди", { position: "bottom-right" }),
        handleCloseModal(),
        getData());
    } else {
      const res = await create({ ...values, role: "operator" });
      res?.status === 201 &&
        (toast.success("Маълумот сақланди", { position: "bottom-right" }),
        handleCloseModal(),
        getData());
    }
  };

  // OPEN
  const handleOpen = () => {
    reset({ full_name: "", operator_number: "", password: "", username: "" });
    setEditid(null);
    onOpen();
  };

  // CLOSE
  const handleCloseModal = () => {
    reset();
    setEditid(null);
    onClose();
  };

  // PAGINATION
  const handlePageChange = (newPage: number) => {
    router.push(
      `?page=${newPage}&pageSize=${pageSize}&search=${
        params.get("search") || "null"
      }`
    );
  };
  const handlePageSizeChange = (pageSize: number) => {
    router.push(
      `?page=1&pageSize=${pageSize}&search=${params.get("search") || "null"}`
    );
  };

  return (
    <Box
      p={{ base: "5px 10px", sm: "5px 10px", md: "8px 16px", xl: "8px 16px" }}
    >
      <BreadCrumb item={breadcrumb} />
      <PaperContent>
        <Flex align={"center"} justifyContent={"space-between"}>
          <Text
            my={{ base: "8px", sm: "8px", md: "16px", xl: "16px" }}
            fontWeight={500}
            color={scssVariables.textGreyColor}
            fontSize={{ base: "18px", sm: "18px", md: "24px", xl: "24px" }}
          >
            Операторлар рўйхати
          </Text>
          <Button
            onClick={handleOpen}
            variant={"outline"}
            color={scssVariables.primary}
            h={{ base: "30px", sm: "30px", md: "35px", xl: "35px" }}
            leftIcon={<Plus width={18} height={18} />}
            fontSize={scssVariables.fonts.span}
            fontWeight={500}
          >
            Яратиш
          </Button>
        </Flex>
        <Divider
          borderColor={"lightgrey"}
          mb={{ base: "8px", sm: "8px", md: "2em", xl: "2em" }}
        />
        <FilterControlpage />
        <Box>
          <TableGen columns={columns} dataSource={operators} />
          <Pagination
            total={total}
            current={current}
            pageSize={pageSize}
            onChange={handlePageChange}
            onPageSizeChange={handlePageSizeChange}
          />
        </Box>
      </PaperContent>
      <ModalRazdel
        isOpen={isOpen}
        onClose={handleCloseModal}
        title="Оператор яратиш"
      >
        <form onSubmit={handleSubmit(handleFinish)} id="razdel-form">
          <FormControl isInvalid={!!errors.name}>
            <FormLabel
              htmlFor="full_name"
              fontSize={scssVariables.fonts.span}
              fontWeight={400}
              mb={"2px"}
              mt={"10px"}
              color={"grey"}
            >
              Ф.И.Ш
            </FormLabel>
            <Input
              sx={inputStyle}
              fontSize={scssVariables.fonts.span}
              id="full_name"
              type="text"
              {...register("full_name", { required: true })}
            />
            <FormErrorMessage color={"red.300"}>
              мажбурий катак
            </FormErrorMessage>
          </FormControl>
          <FormControl isInvalid={!!errors.name}>
            <FormLabel
              htmlFor="username"
              fontSize={scssVariables.fonts.span}
              fontWeight={400}
              mb={"2px"}
              mt={"10px"}
              color={"grey"}
            >
              Логин
            </FormLabel>
            <Input
              sx={inputStyle}
              fontSize={scssVariables.fonts.span}
              id="username"
              type="text"
              {...register("username", { required: true })}
            />
            <FormErrorMessage color={"red.300"}>
              мажбурий катак
            </FormErrorMessage>
          </FormControl>
          <FormControl isInvalid={!!errors.name}>
            <FormLabel
              htmlFor="password"
              fontSize={scssVariables.fonts.span}
              fontWeight={400}
              mb={"2px"}
              mt={"10px"}
              color={"grey"}
            >
              Пароль
            </FormLabel>
            <Input
              sx={inputStyle}
              fontSize={scssVariables.fonts.span}
              id="password"
              type="text"
              {...register("password", { required: true })}
            />
            <FormErrorMessage color={"red.300"}>
              мажбурий катак
            </FormErrorMessage>
          </FormControl>
          <FormControl isInvalid={!!errors.name}>
            <FormLabel
              htmlFor="operator_number"
              fontSize={scssVariables.fonts.span}
              fontWeight={400}
              mb={"2px"}
              mt={"10px"}
              color={"grey"}
            >
              № Операторнинг рақами
            </FormLabel>
            <Input
              sx={inputStyle}
              fontSize={scssVariables.fonts.span}
              id="operator_number"
              type="text"
              {...register("operator_number", { required: true })}
            />
            <FormErrorMessage color={"red.300"}>
              мажбурий катак
            </FormErrorMessage>
          </FormControl>
        </form>
        <Flex align={"center"} justifyContent={"space-between"} mt={5}>
          <Button
            leftIcon={<X width={18} height={18} />}
            variant={"outline"}
            color={scssVariables.primary}
            borderColor={scssVariables.primary}
            h={{ base: "30px", sm: "30px", md: "35px", xl: "35px" }}
            fontSize={scssVariables.fonts.span}
            fontWeight={500}
            onClick={onClose}
          >
            Бекор қилиш
          </Button>
          <Button
            type="submit"
            leftIcon={<Check width={18} height={18} />}
            form="razdel-form"
            bg={scssVariables.primary}
            color={"whitesmoke"}
            h={{ base: "30px", sm: "30px", md: "35px", xl: "35px" }}
            fontSize={scssVariables.fonts.span}
            fontWeight={500}
            _focus={{ bg: scssVariables.primary }}
            _hover={{ bg: scssVariables.primary, opacity: 0.8 }}
          >
            Яратиш
          </Button>
        </Flex>
      </ModalRazdel>
    </Box>
  );
};
