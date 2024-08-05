import { scssVariables } from "@/@core/application/utils/vars";
import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Select,
  SimpleGrid,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import {
  buttonStyle,
  inputStyle,
  labelStyle,
  selectStyle,
} from "../model/helper";
import { useGlobal } from "@/@core/application/store/global";
import { useRouter, useSearchParams } from "next/navigation";
import { FC, useEffect } from "react";
import { responseList } from "@/@core/pages/Callcenter/Leaverequest/model/helper";
import AutocompleteSelect from "@/@core/shared/ui/Autocomplete";

type Props = {
  handleFinish: (data: any) => void;
  handleChangeRazdel: (data: any) => void;
  handleChangeRegion: (data: any) => void;
};

export const FilterTable: FC<Props> = (props) => {
  const { handleFinish, handleChangeRazdel, handleChangeRegion } = props;
  const params = useSearchParams();
  const {
    razdel,
    podrazdel,
    setPodrazdel,
    setDistrict,
    regions,
    district,
    operators,
    getPodrazdel,
    getDistrict,
  } = useGlobal();
  const { handleSubmit, register, reset, control } = useForm();
  const router = useRouter();

  // CLEAR
  const handleClear = async () => {
    setPodrazdel([]);
    setDistrict([]);
    reset({
      income_number: "",
      district: "null",
      region: "null",
      categoryId: "null",
      subCategoryId: "null",
      date_from: "null",
      date_to: "null",
      response: "null",
      operators: "null",
      applicant: "",
    });
    await Promise.all([getPodrazdel(), getDistrict()]);
    router.push(`?page=1&pageSize=10`);
  };

  useEffect(() => {
    setTimeout(() => {
      reset({
        applicant: params.get("applicant") || "",
        operators: params.get("operators") || "null",
        response: params.get("response") || "null",
        income_number:
          params.get("income_number") === "null"
            ? ""
            : params.get("income_number"),
        region: params.get("region") || "null",
        district: params.get("district") || "null",
        categoryId: params.get("categoryId") || "null",
        subCategoryId: params.get("subCategoryId") || "null",
        date_from: params.get("date_from") || "null",
        date_to: params.get("date_to") || "null",
      });
    }, 1000);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <form onSubmit={handleSubmit(handleFinish)} id="filter-callcenter">
      <SimpleGrid
        columns={{ base: 1, sm: 2, md: 3, xl: 6 }}
        my={"8px"}
        alignItems={"flex-end"}
        justifyContent={"space-between"}
        gap={"8px"}
        borderTop={"1px solid lightgrey"}
      >
        <FormControl>
          <FormLabel htmlFor="income_number" sx={labelStyle}>
            Қидириш:
          </FormLabel>
          <Input
            sx={inputStyle}
            id="income_number"
            {...register("income_number")}
            placeholder="Кирувчи рақам"
          />
        </FormControl>
        <FormControl>
          <FormLabel htmlFor="applicant" sx={labelStyle}>
            Аризачи Ф.И.Ш:
          </FormLabel>
          <Input
            sx={inputStyle}
            id="applicant"
            {...register("applicant")}
            placeholder="Ф.И.Ш"
          />
        </FormControl>
        <FormControl>
          <FormLabel htmlFor="operators" sx={labelStyle}>
            Операторлар
          </FormLabel>
          <AutocompleteSelect
            name="operators"
            control={control}
            options={[
              { value: "null", label: "Барчаси" },
              ...operators?.map((field: any) => ({
                value: field.id,
                label: field?.full_name,
              })),
            ]}
          />
        </FormControl>
        <FormControl>
          <FormLabel htmlFor="response" sx={labelStyle}>
            Мурожаатни жавоби
          </FormLabel>
          <AutocompleteSelect
            name="response"
            control={control}
            options={[
              { value: "null", label: "Барчаси" },
              ...responseList?.map((field: any) => ({
                value: field.label,
                label: field.label,
              })),
            ]}
          />
        </FormControl>
        <FormControl>
          <FormLabel htmlFor="region" sx={labelStyle}>
            Вилоят:
          </FormLabel>
          <AutocompleteSelect
            name="region"
            control={control}
            options={[
              { value: "null", label: "Барчаси" },
              ...regions?.map((region: any) => ({
                value: region.id,
                label: region.title,
              })),
            ]}
            onChange={handleChangeRegion}
          />
        </FormControl>
        <FormControl>
          <FormLabel htmlFor="district" sx={labelStyle}>
            Туман:
          </FormLabel>
          <AutocompleteSelect
            name="district"
            control={control}
            options={[
              { value: "null", label: "Барчаси" },
              ...district?.map((dist: any) => ({
                value: dist.id,
                label: dist.title,
              })),
            ]}
          />
        </FormControl>
        <FormControl>
          <FormLabel htmlFor="categoryId" sx={labelStyle}>
            Йўналиш:
          </FormLabel>
          <AutocompleteSelect
            name="categoryId"
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
        </FormControl>
        <FormControl>
          <FormLabel htmlFor="subCategoryId" sx={labelStyle}>
            Тасниф:
          </FormLabel>
          <AutocompleteSelect
            name="subCategoryId"
            control={control}
            options={[
              { value: "null", label: "Барчаси" },
              ...podrazdel?.map((field: any) => ({
                value: field.id,
                label: field.title,
              })),
            ]}
          />
        </FormControl>
        <FormControl>
          <FormLabel htmlFor="date_from" sx={labelStyle}>
            Бошланиш санаси:
          </FormLabel>
          <Input
            type="date"
            id="date_from"
            sx={inputStyle}
            {...register("date_from")}
          />
        </FormControl>
        <FormControl>
          <FormLabel htmlFor="date_to" sx={labelStyle}>
            Тугаш санаси:
          </FormLabel>
          <Input
            type="date"
            id="date_to"
            sx={inputStyle}
            {...register("date_to")}
          />
        </FormControl>
      </SimpleGrid>
      <Flex align={"center"} gap={"8px"} mb={"8px"} justifyContent={"flex-end"}>
        <Button
          variant={"outline"}
          sx={{
            w: {
              base: "100%",
              sm: "100%",
              md: "248px",
              xl: "248px",
            },
            h: { base: "30px", sm: "30px", md: "35px", xl: "35px" },
            borderColor: scssVariables.primary,
            color: scssVariables.primary,
            fontSize: scssVariables.fonts.span,
            fontWeight: 400,
          }}
          onClick={handleClear}
        >
          Тозалаш
        </Button>
        <Button sx={buttonStyle} type="submit" form="filter-callcenter">
          Қидириш
        </Button>
      </Flex>
    </form>
  );
};
