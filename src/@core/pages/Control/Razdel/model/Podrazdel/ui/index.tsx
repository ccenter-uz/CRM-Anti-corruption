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
import { toast } from "react-toastify";
import { FilterControlpage } from "@/@core/features/FilterControlpage";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { create, postChangePodrazdel, update } from "../api";
import { ModalRazdel } from "./modal";

export const Podrazdel: FC = () => {
  const params = useSearchParams();
  const router = useRouter();
  const query = useParams();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const { isOpen, onClose, onOpen } = useDisclosure();
  const { total, current, pageSize, setTotal } = usePagination();
  const [podrazdel, setPodrazdel] = useState<any>([]);
  const [editId, setEditid] = useState<number | null>();
  const breadcrumb = [
    {
      id: 0,
      title: "<- Ортга",
      href: "/control/razdel",
    },
    {
      id: 1,
      title: "Бошқарув",
    },
    {
      id: 2,
      title: "Таснифлар",
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
      title: "Номи",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Яратилган санаси",
      dataIndex: "update_date",
      key: "update_date",
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
                  reset({ title: record?.title }),
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
  const get = async () => {
    const send_params = {
      page: current || 1,
      pageSize: pageSize || 10,
      search: params.get("search") || "null",
    };
    const res = await postChangePodrazdel(
      query.podrazdel as string,
      send_params
    );

    setPodrazdel(
      res?.data.results.map((item: any, index: number) => ({
        ...item,
        index: index + 1,
      }))
    );

    setTotal(res?.data?.pagination?.totalItems);
  };

  // CREATE
  const handleFinish = async (values: any) => {
    const body = {
      category_id: query.podrazdel,
      ...values,
    };
    if (editId) {
      const res = await update(body, editId);
      res?.status === 204 &&
        (toast.success("Маълумот янгиланди", { position: "bottom-right" }),
        handleCloseModal(),
        get());
    } else {
      const res = await create(body);
      res?.status === 201 &&
        (toast.success("Маълумот сақланди", { position: "bottom-right" }),
        handleCloseModal(),
        get());
    }
  };

  // OPEN
  const handleOpen = () => {
    reset({ title: "" });
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

  // LOAD
  useEffect(() => {
    get();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params]);

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
            Таснифлар рўйхати
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
          <TableGen columns={columns} dataSource={podrazdel} />
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
        title="Йўналиш яратиш"
      >
        <form onSubmit={handleSubmit(handleFinish)} id="razdel-form">
          <FormControl isInvalid={!!errors.name}>
            <FormLabel
              htmlFor="title"
              fontSize={scssVariables.fonts.parag}
              fontWeight={400}
            >
              Номи
            </FormLabel>
            <Input
              sx={inputStyle}
              fontSize={scssVariables.fonts.span}
              id="title"
              type="text"
              placeholder="Номи"
              {...register("title", { required: true })}
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
