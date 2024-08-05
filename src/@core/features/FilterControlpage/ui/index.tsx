import { Box, Button, Flex, FormControl, Input } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { Search } from "react-feather";
import { buttonStyle, inputStyle } from "../model/helper";
import { useRouter, useSearchParams } from "next/navigation";

export const FilterControlpage = () => {
  const params = useSearchParams();
  const { register, handleSubmit } = useForm({
    defaultValues: {
      search:
        params.get("search") === "null" ? "" : (params.get("search") as string),
    },
  });
  const router = useRouter();

  // FINISH
  const handleFinish = async (values: { search: string }) => {
    const query = `?page=1&pageSize=10&search=${values.search || "null"}`;
    router.push(query);
  };

  return (
    <Box mb={{ base: "8px", sm: "8px", md: "16px", xl: "16px" }}>
      <form
        id="control-form"
        onSubmit={handleSubmit(handleFinish)}
        onKeyDown={(e) => e.key === "Enter" && handleSubmit(handleFinish)}
      >
        <Flex
          align={"center"}
          gap={"10px"}
          flexDirection={{ base: "column", sm: "column", md: "row", xl: "row" }}
        >
          <FormControl>
            <Input
              sx={inputStyle}
              type="text"
              placeholder="Қидириш"
              {...register("search")}
            />
          </FormControl>
          <Button
            type="submit"
            form="control-form"
            sx={buttonStyle}
            leftIcon={<Search width={"16px"} height={"16px"} />}
          >
            Қидириш
          </Button>
        </Flex>
      </form>
    </Box>
  );
};
