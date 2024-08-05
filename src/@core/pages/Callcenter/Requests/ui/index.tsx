"use client";
import { scssVariables } from "@/@core/application/utils/vars";
import { usePagination } from "@/@core/shared/hook/usePaginate";
import BreadCrumb from "@/@core/shared/ui/Breadcrumb";
import Pagination from "@/@core/shared/ui/Pagination";
import { PaperContent } from "@/@core/shared/ui/PaperContent";
import TableGen from "@/@core/shared/ui/Table";
import { Box, Button, Flex, Image, Text } from "@chakra-ui/react";
import { FC, useEffect } from "react";
import { useGlobal } from "@/@core/application/store/global";
import { useRouter, useSearchParams } from "next/navigation";
import { useRequest } from "../model/Slicer";
import { postChangeRazdel } from "../api";
import { getcallcenterforExcel } from "../api/getExcel";
import { FilterTable } from "@/@core/features/FilterTable";
import { callcenterColumns } from "@/@core/application/helper/callCenterColumns";

export const Requests: FC = () => {
  const breadcrumb = [
    {
      id: 1,
      title: "Мурожаатлар",
    },
    {
      id: 2,
      title: "Колл-маркази",
    },
  ];
  const params = useSearchParams();
  const router = useRouter();
  const { current, pageSize, total, setTotal } = usePagination();

  const {
    setPodrazdel,
    getPodrazdel,
    getDistrictByRegionId,
    setDistrict,
    getDistrict,
    getOperators,
    getRegions,
    getRazdel,
    getOrganizations,
  } = useGlobal();
  const { data, GET } = useRequest();

  const getData = async () => {
    const query = {
      page: current,
      pageSize: pageSize,
      operators: params.get("operators") || "null",
      applicant: params.get("applicant") || "null",
      response: params.get("response") || "null",
      income_number: params.get("income_number") || "null",
      region: params.get("region") || "null",
      district: params.get("district") || "null",
      categoryId: params.get("categoryId") || "null",
      subCategoryId: params.get("subCategoryId") || "null",
      date_from:
        params.get("date_from") !== "null" && params.get("date_from")
          ? new Intl.DateTimeFormat("ru-RU").format(
              new Date(params.get("date_from") || "null")
            )
          : "null",
      date_to:
        params.get("date_to") !== "null" && params.get("date_to")
          ? new Intl.DateTimeFormat("ru-RU").format(
              new Date(params.get("date_to") || "null")
            )
          : "null",
    };
    const res = await GET(query);

    res.status === 200 && setTotal(res?.data?.pagination?.totalItems);
  };

  // get-all-data
  useEffect(() => {
    Promise.all([
      getRazdel(),
      getPodrazdel(),
      getRegions(),
      getDistrict(),
      getOrganizations({ page: 1, pageSize: 100000, search: "null" }),
      getOperators({
        page: 1,
        pageSize: 1000000,
        search: "null",
        role: "operator",
      }),
    ]);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    Promise.all([getData()]).then(() => {});

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params]);

  // FINISH
  const handleFinish = (values: any) => {
    const query = `?page=1&pageSize=${pageSize}&operators=${
      values.operators || "null"
    }&applicant=${values.applicant || "null"}&response=${
      values.response || "null"
    }&income_number=${values.income_number || "null"}&region=${
      values.region || "null"
    }&district=${values.district || "null"}&categoryId=${
      values.categoryId || "null"
    }&subCategoryId=${values.subCategoryId || "null"}&date_from=${
      values.date_from || "null"
    }&date_to=${values.date_to || "null"}`;

    router.push(query);
  };
  // PAGINATION
  const handlePageChange = (page: number) => {
    router.push(
      `?page=${page}&pageSize=${pageSize}&operators=${params.get(
        "operators"
      )}&applicant=${params.get("applicant") || "null"}&response=${params.get(
        "response"
      )}&income_number=${params.get("income_number") || "null"}&region=${
        params.get("region") || "null"
      }&district=${params.get("district") || "null"}&categoryId=${
        params.get("categoryId") || "null"
      }&subCategoryId=${params.get("subCategoryId") || "null"}&date_from=${
        params.get("date_from") || "null"
      }&date_to=${params.get("date_to") || "null"}`
    );
  };
  const handlePageSizeChange = (pageSize: number) => {
    router.push(
      `?page=1&pageSize=${pageSize}&operators=${params.get(
        "operators"
      )}&applicant=${params.get("applicant") || "null"}&response=${params.get(
        "response"
      )}&income_number=${params.get("income_number") || "null"}&region=${
        params.get("region") || "null"
      }&district=${params.get("district") || "null"}&categoryId=${
        params.get("categoryId") || "null"
      }&subCategoryId=${params.get("subCategoryId") || "null"}&date_from=${
        params.get("date_from") || "null"
      }&date_to=${params.get("date_to") || "null"}`
    );
  };

  // CHANGE
  const handleChangeRazdel = async (e: any) => {
    if (e?.value === "null") {
      await getPodrazdel();
    } else {
      const data = await postChangeRazdel(e?.value);

      data?.status === 200 && setPodrazdel(data?.data.results);
    }
  };

  const handleChangeRegion = async (e: any) => {
    if (e?.value === "null") {
      await getDistrict();
    } else {
      const data = await getDistrictByRegionId(e?.value);
      data?.status === 200 &&
        setDistrict(
          data?.results.map((d: any, index: number) => ({
            index: index + 1,
            ...d,
          }))
        );
    }
  };

  return (
    <Box
      p={{ base: "5px 10px", sm: "5px 10px", md: "8px 16px", xl: "8px 16px" }}
    >
      <BreadCrumb item={breadcrumb} />
      <PaperContent>
        <Flex align={"center"} justify="space-between">
          <Text
            my={{ base: "8px", sm: "8px", md: "16px", xl: "16px" }}
            fontWeight={500}
            color={scssVariables.textGreyColor}
            fontSize={{ base: "18px", sm: "18px", md: "24px", xl: "24px" }}
          >
            Мурожаатлар руйхати: Колл-центр
          </Text>
          <Button
            leftIcon={
              <Image src="/excel.png" alt="excel" w={"18px"} h={"18px"} />
            }
            color={"green.300"}
            variant={"link"}
            fontSize={scssVariables.fonts.span}
            onClick={() => getcallcenterforExcel(callcenterColumns, data)}
          >
            Excel
          </Button>
        </Flex>
        {/* FILTER */}
        <FilterTable
          handleChangeRazdel={handleChangeRazdel}
          handleFinish={handleFinish}
          handleChangeRegion={handleChangeRegion}
        />
        <TableGen columns={callcenterColumns} dataSource={data} />
        <Pagination
          total={total}
          current={current}
          pageSize={pageSize}
          onChange={handlePageChange}
          onPageSizeChange={handlePageSizeChange}
        />
      </PaperContent>
    </Box>
  );
};
