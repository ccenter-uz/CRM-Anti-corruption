"use client";
import { scssVariables } from "@/@core/application/utils/vars";
import BreadCrumb from "@/@core/shared/ui/Breadcrumb";
import { PaperContent } from "@/@core/shared/ui/PaperContent";
import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Select,
  Text,
  Textarea,
} from "@chakra-ui/react";
import {
  applicationTypeList,
  buttonStyle,
  inputStyle,
  labelStyle,
  organizationTypeList,
  resend_applicationList,
  responseList,
  selectStyle,
} from "../model/helper";
import { Controller, useForm } from "react-hook-form";
import { useGlobal } from "@/@core/application/store/global";
import {
  getItemById,
  postChangeRazdel,
  create,
  createDraft,
  edit,
  editDraft,
} from "../api";
import { toast } from "react-toastify";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import AutocompleteSelect from "@/@core/shared/ui/Autocomplete";
import InputMask from "react-input-mask";

export const Leaverequest = () => {
  const params = useSearchParams();
  const breadcrumb = [
    {
      id: 0,
      title: params.get("edit") ? "<- Ортга" : "",
      href: "/callcenter/requests",
    },
    {
      id: 1,
      title: "Мурожаат қолдириш",
    },
    {
      id: 2,
      title: "Колл-маркази",
    },
  ];
  const {
    razdel,
    podrazdel,
    setPodrazdel,
    getRazdel,
    getPodrazdel,
    getOrganizations,
    regions,
    district,
    getDistrictByRegionId,
    setDistrict,
    getDistrict,
    organizations,
    getRegions,
  } = useGlobal();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    control,
  } = useForm();
  const router = useRouter();
  const [data, setData] = useState<any>([]);

  // BTNS
  const handleButtons = useCallback(() => {
    if (params.get("edit")) {
      if (data[0]?.IsDraf === "false") {
        return (
          <Box
            w={"100%"}
            display={"flex"}
            justifyContent={"flex-end"}
            gap={"8px"}
          >
            <Button
              id="save"
              sx={buttonStyle}
              onClick={handleSubmit(handleEdit)}
            >
              Сақлаш
            </Button>
          </Box>
        );
      } else {
        return (
          <Box
            w={"100%"}
            display={"flex"}
            justifyContent={"flex-end"}
            gap={"8px"}
          >
            <Button
              id="draft"
              sx={{
                ...buttonStyle,
                bg: "transparent",
                color: scssVariables.primary,
                borderColor: scssVariables.primary,
                _hover: { bgColor: "transparent" },
              }}
              onClick={handleSubmit(handleEditDraft)}
              variant={"outline"}
            >
              Қоралама сақлаш
            </Button>
            <Button
              id="save"
              sx={buttonStyle}
              onClick={handleSubmit(handleEdit)}
            >
              Сақлаш
            </Button>
          </Box>
        );
      }
    } else {
      return (
        <Box
          w={"100%"}
          display={"flex"}
          justifyContent={"flex-end"}
          gap={"8px"}
        >
          <Button
            id="draft"
            sx={{
              ...buttonStyle,
              bg: "transparent",
              color: scssVariables.primary,
              borderColor: scssVariables.primary,
              _hover: { bgColor: "transparent" },
            }}
            onClick={handleSubmit(handleCreateDraft)}
            variant={"outline"}
          >
            Қоралама сақлаш
          </Button>
          <Button
            id="save"
            sx={buttonStyle}
            onClick={handleSubmit(handleCreate)}
          >
            Сақлаш
          </Button>
        </Box>
      );
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, params]);

  // CREATE
  const handleCreate = async (values: any) => {
    const data = await create({ ...values, IsDraf: "false" });
    data?.status === 201 &&
      (toast.success("Success", { position: "bottom-right" }),
      reset(),
      router.push("/callcenter/requests"));
  };
  // CREATE-DRAFT
  const handleCreateDraft = async (values: any) => {
    const data = await createDraft({ ...values, IsDraf: "true" });
    data?.status === 201 &&
      (toast.success("Success", { position: "bottom-right" }),
      reset(),
      router.push("/callcenter/drafts"));
  };
  // EDIT
  const handleEdit = async (values: any) => {
    const data = await edit(
      { ...values, IsDraf: "false" },
      params.get("edit") as string
    );
    data?.status === 204 &&
      (toast.success("Success", { position: "bottom-right" }),
      reset(),
      router.push("/callcenter/requests"));
  };
  // EDIT-DRAFT
  const handleEditDraft = async (values: any) => {
    const data = await editDraft(
      { ...values, IsDraf: "true" },
      params.get("edit") as string
    );
    data?.status === 204 &&
      (toast.success("Success", { position: "bottom-right" }),
      reset(),
      router.push("/callcenter/drafts"));
  };

  // CHANGE
  const handleChangeRazdel = async (e: { value: string }) => {
    if (e?.value === "null") {
      await getPodrazdel();
    } else {
      const data = await postChangeRazdel(e?.value);

      data?.status === 200 && setPodrazdel(data?.data.results);
    }
  };

  const handleChangeRegion = async (e: { value: string }) => {
    if (e?.value === "null") {
      await getDistrict();
    } else {
      const data = await getDistrictByRegionId(e?.value);

      data?.status === 200 && setDistrict(data?.results);
    }
  };

  // get-all-data
  useEffect(() => {
    Promise.all([
      getRazdel(),
      getPodrazdel(),
      getRegions(),
      getDistrict(),
      getOrganizations({ page: 1, pageSize: 100000, search: "null" }),
    ]);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (params.get("edit")) {
      getItemById(params.get("edit") || "").then((res) => {
        setData(res?.data);
        res?.data.map((item: any) => {
          return reset({
            region: item.districts?.region?.id,
            district_id: item.districts?.id,
            IsDraf: item.IsDraf,
            organization_name: item.organization_name,
            organization_type: item.organization_type,
            application_type: item.application_type,
            applicant: item.applicant,
            phone: item.phone,
            comment: item.comment,
            resend_application: item.resend_application,
            sub_category_id: item.sub_category_call_center?.id,
            category_org: item.sub_category_call_center?.category_org?.id,
            income_date: item.income_date,
            id: item.id,
            perform_date: item.perform_date,
            performer: item.performer,
            response: item.response,
            sended_to_organizations: item?.seded_to_Organization?.id,
          });
        });
      });
    } else {
      reset({
        region: null,
        district_id: null,
        IsDraf: "",
        organization_name: "",
        organization_type: "",
        application_type: "",
        applicant: "",
        phone: "",
        comment: "",
        resend_application: "",
        sub_category_id: null,
        category_org: null,
        income_date: "",
        id: "",
        perform_date: "",
        performer: "",
        response: "",
        sended_to_organizations: "null",
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params]);

  return (
    <Box
      p={{ base: "5px 10px", sm: "5px 10px", md: "8px 16px", xl: "8px 16px" }}
    >
      <BreadCrumb item={breadcrumb} />
      <PaperContent>
        <Text
          textAlign={"center"}
          my={{ base: "8px", sm: "8px", md: "16px", xl: "16px" }}
          fontWeight={500}
          color={scssVariables.textGreyColor}
          fontSize={scssVariables.fonts.titleSize}
        >
          {params.get("edit") ? "Мурожаатни тахрирлаш" : "Мурожаат яратиш"}
        </Text>
        <Box p={{ base: "5px", sm: "5px", md: "16px", xl: " 16px" }}>
          <form id="application-form">
            <FormControl isInvalid={!!errors.region}>
              <FormLabel htmlFor="region" sx={labelStyle}>
                Вилоят
              </FormLabel>
              <AutocompleteSelect
                required
                name="region"
                control={control}
                options={[
                  { value: "null", label: "Барчаси" },
                  ...regions?.map((region: any) => ({
                    value: region.id,
                    label:
                      region.title[0].toUpperCase() + region.title.slice(1),
                  })),
                ]}
                onChange={handleChangeRegion}
              />

              <FormErrorMessage
                color={"red.300"}
                fontSize={scssVariables.fonts.span}
              >
                мажбурий катак
              </FormErrorMessage>
            </FormControl>
            <FormControl isInvalid={!!errors.district_id}>
              <FormLabel htmlFor="district_id" sx={labelStyle}>
                Туман
              </FormLabel>
              <AutocompleteSelect
                required
                name="district_id"
                control={control}
                options={[
                  { value: "null", label: "Барчаси" },
                  ...district?.map((dist: any) => ({
                    value: dist.id,
                    label: dist.title,
                  })),
                ]}
              />

              <FormErrorMessage
                color={"red.300"}
                fontSize={scssVariables.fonts.span}
              >
                мажбурий катак
              </FormErrorMessage>
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="income_date" sx={labelStyle}>
                Келиб тушган вақти (рўйхатга олинган сана)
              </FormLabel>
              <Input
                sx={inputStyle}
                id="income_date"
                type="date"
                {...register("income_date")}
              />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="organization_type" sx={labelStyle}>
                Юридик / Жисмоний шахс
              </FormLabel>
              <Select
                sx={selectStyle}
                id="organization_type"
                {...register("organization_type")}
              >
                <option value={"null"}>Танланг</option>
                {organizationTypeList.map((organizationType) => (
                  <option
                    key={organizationType.id}
                    value={organizationType.label}
                  >
                    {organizationType.label}
                  </option>
                ))}
              </Select>
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="applicant" sx={labelStyle}>
                Мурожаатчи
              </FormLabel>
              <Input
                sx={inputStyle}
                id="applicant"
                type="text"
                {...register("applicant")}
              />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="phone" sx={labelStyle}>
                Телефон рақам
              </FormLabel>
              <Controller
                name="phone"
                control={control}
                render={({ field }) => (
                  <Input
                    sx={inputStyle}
                    as={InputMask}
                    mask="+(999)99 999-99-99"
                    maskChar=""
                    value={field.value}
                    onChange={field.onChange}
                    placeholder="+(999)99 999-99-99"
                  />
                )}
              />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="application_type" sx={labelStyle}>
                Мурожаат тури
              </FormLabel>
              <Select
                sx={selectStyle}
                id="application_type"
                {...register("application_type")}
              >
                <option value={"null"}>Танланг</option>
                {applicationTypeList.map((applicationType) => (
                  <option
                    key={applicationType.id}
                    value={applicationType.label}
                  >
                    {applicationType.label}
                  </option>
                ))}
              </Select>
            </FormControl>
            <FormControl isInvalid={!!errors.category_org}>
              <FormLabel htmlFor="category_org" sx={labelStyle}>
                Йўналиш
              </FormLabel>
              <AutocompleteSelect
                required
                name="category_org"
                control={control}
                options={[
                  { value: "null", label: "Барчаси" },
                  ...razdel?.map((field: any) => ({
                    value: field.id,
                    label: field.title,
                  })),
                ]}
                onChange={handleChangeRazdel}
              />
              <FormErrorMessage
                color={"red.300"}
                fontSize={scssVariables.fonts.span}
              >
                мажбурий катак
              </FormErrorMessage>
            </FormControl>
            <FormControl isInvalid={!!errors.sub_category_id}>
              <FormLabel htmlFor="sub_category_id" sx={labelStyle}>
                Тасниф
              </FormLabel>
              <AutocompleteSelect
                required
                name="sub_category_id"
                control={control}
                options={[
                  { value: "null", label: "Барчаси" },
                  ...podrazdel?.map((field: any) => ({
                    value: field.id,
                    label: field.title,
                  })),
                ]}
              />
              <FormErrorMessage
                color={"red.300"}
                fontSize={scssVariables.fonts.span}
              >
                мажбурий катак
              </FormErrorMessage>
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="comment" sx={labelStyle}>
                Мурожаатнинг қисқача мазмуни
              </FormLabel>
              <Textarea sx={inputStyle} id="comment" {...register("comment")} />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="resend_application" sx={labelStyle}>
                Янги мурожаат ёки Такрорий мурожаатлар
              </FormLabel>
              <Select
                sx={selectStyle}
                id="resend_application"
                {...register("resend_application")}
              >
                <option value={"null"}>Танланг</option>
                {resend_applicationList.map((resend_application) => (
                  <option
                    key={resend_application.id}
                    value={resend_application.label}
                  >
                    {resend_application.label}
                  </option>
                ))}
              </Select>
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="performer" sx={labelStyle}>
                Ижрочи
              </FormLabel>
              <Input
                sx={inputStyle}
                id="performer"
                type="text"
                {...register("performer")}
              />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="perform_date" sx={labelStyle}>
                Ижро қилинган сана
              </FormLabel>
              <Input
                sx={inputStyle}
                id="perform_date"
                type="date"
                {...register("perform_date")}
              />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="sended_to_organizations" sx={labelStyle}>
                Тегишли идораларга юборилган
              </FormLabel>
              <AutocompleteSelect
                name="sended_to_organizations"
                control={control}
                options={[
                  { value: "null", label: "Барчаси" },
                  ...organizations?.map((dist: any) => ({
                    value: dist.id,
                    label: dist.title[0].toUpperCase() + dist.title.slice(1),
                  })),
                ]}
              />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="response" sx={labelStyle}>
                Мурожаатни жавоби
              </FormLabel>
              <Select sx={selectStyle} id="response" {...register("response")}>
                <option value={"null"}>Танланг</option>
                {responseList.map((response) => (
                  <option key={response.id} value={response.label}>
                    {response.label}
                  </option>
                ))}
              </Select>
            </FormControl>
          </form>
        </Box>
      </PaperContent>
      {handleButtons()}
    </Box>
  );
};
