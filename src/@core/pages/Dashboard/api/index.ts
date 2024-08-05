import { api } from "@/@core/application/utils/api";

export const postChangeRazdel = async (id: number | string) => {
  try {
    const response = await api.get(`/SectionCategories/one/${id}`, {
      params: {
        page: 1,
        pageSize: 1000000,
        search: "null",
      },
    });

    return response;
  } catch (error) {
    console.error(error);
  }
};

// GET-DATA
export const getDataWithRegion = async (params: {
  region?: string;
  page?: string;
  pageSize?: string;
}) => {
  try {
    const response = await api.get(
      "/SectionCategories/Allstatistics/filterWithRegion",
      { params: params }
    );

    return response;
  } catch (error) {
    console.error(error);
  }
};

// GET-WARNING
export const getWarning = async () => {
  try {
    const response = await api.get(
      "/SectionCategories/AllstatisticsWithRegion"
    );

    return response;
  } catch (error) {
    console.error(error);
  }
};

// GET-TABLE-DATA
export const getTableData = async (params: {
  categoryId?: string | null;
  subCategoryId?: string | null;
  region?: string | null;
  page?: string;
  pageSize?: string;
}) => {
  try {
    const response = await api.get("/SectionCategories/statistics/filter", {
      params: params,
    });

    return response;
  } catch (error) {
    console.error(error);
  }
};

// GET-LINE-GRAPH
export const getLineGraph = async (query?: any) => {
  try {
    const response = await api.get("/SectionCategories/statisticsWithRegion", {
      params: query,
    });

    return response;
  } catch (error) {
    console.error(error);
  }
};

// GET-BAR-GRAPH
export const getBarGraph = async (query?:any) => {
  try {
    const response = await api.get(
      "/SectionCategories/statisticsWithCategory",
      {
        params: query,
      }
    );

    return response;
  } catch (error) {
    console.error(error);
  }
};
