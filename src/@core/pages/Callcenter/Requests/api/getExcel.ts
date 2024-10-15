import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import { api } from "@/@core/application/utils/api";

export const getcallcenterforExcel = async (columns: any, data: any) => {
  try {
    console.log(data, "data");

    // const params = {
    //   page: 1,
    //   pageSize: 9999999999,
    //   operators: "null",
    //   response: "null",
    //   income_number: "null",
    //   region: "null",
    //   district: "null",
    //   categoryId: "null",
    //   subCategoryId: "null",
    //   date_from: "null",
    //   date_to: "null",
    // };

    // const res = await api.get(`/organization/allNotDrafts`, { params });
    // const data = res.data.results.map((item: any, index: any) => ({
    //   index: index + 1,
    //   incoming_number: item?.incoming_number,
    //   region: item?.districts?.region?.title,
    //   district_id: item?.districts?.title,
    //   income_date: item?.income_date,
    //   organization_type: item?.organization_type,
    //   applicant: item?.applicant,
    //   phone: item?.phone,
    //   application_type: item?.application_type,
    //   category_org: item?.sub_category_call_center?.category_org?.title,
    //   sub_category_id: item?.sub_category_call_center?.title,
    //   comment: item?.comment,
    //   resend_application: item?.resend_application,
    //   organization_name: item?.organization_name,
    //   performer: item?.performer,
    //   perform_date: item?.perform_date,
    //   sended_to_organizations: item?.sended_to_organizations,
    //   response: item?.response,
    // }));

    const headers = columns
      .filter((col: any) => col.title !== "")
      .map((col: any) => col.title);

      const worksheetData = [
        headers,
        ...data.map((item: any) => [
          item.index,
          item.incoming_number,
          item.districts?.region?.title,
          item.districts?.title,
          item?.applicant,
          item.income_date,
          item.organization_type,
          item.applicant,
          item.phone,
          item.application_type,
          item.sub_category_call_center?.category_org?.title,
          item.sub_category_call_center?.title,
          item.comment,
          item.resend_application,
          item.organization_name,
          item.performer,
          item.perform_date,
          item.sended_to_organizations,
          item.response,
        ]),
      ];

    const worksheet = XLSX.utils.aoa_to_sheet(worksheetData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");

    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });

    const dataBlob = new Blob([excelBuffer], {
      type: "application/octet-stream",
    });
    saveAs(dataBlob, "Мурожаатлар(Колл-марказ).xlsx");
  } catch (err) {
    console.error(err);
  }
};
