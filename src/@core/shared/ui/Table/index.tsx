"use client";
import {
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  useColorMode,
} from "@chakra-ui/react";
import { FC } from "react";

type Props = {
  columns: any;
  dataSource: any;
  border?: boolean;
  RowBg?: string;
  ColBg?: string;
  boxShadow?: string;
};

/* 
columns=[
  {
    title:'example',
    dataIndex:'example',
    key:'example',
    align:'center'
  }
] 
dataSource=[
    {
      key:string,
      title:string
    }
  ]
*/

const TableGen: FC<Props> = ({
  columns,
  dataSource,
  border = false,
  RowBg,
  ColBg,
  boxShadow = "0px 5px 8px 0px rgba(0, 0, 0, 0.10)",
}) => {
  const { colorMode } = useColorMode();

  return (
    <>
      <TableContainer
        borderRadius={"4px"}
        border={border ? "1px solid #E2E8F0" : "none"}
        boxShadow={boxShadow}
      >
        <Table aria-label="table">
          <Thead>
            <Tr
              style={
                colorMode === "dark"
                  ? { background: "#484a4a" }
                  : { background: ColBg || "whitesmoke" }
              }
            >
              {columns.map((col: any) => (
                <Th
                  fontWeight={600}
                  textTransform={"capitalize"}
                  fontSize={{
                    base: "12px",
                    sm: "12px",
                    md: "16px",
                    xl: "16px",
                  }}
                  p={{
                    base: "8px 10px",
                    sm: "8px 10px",
                    md: "16px 24px",
                    xl: "16px 24px",
                  }}
                  borderRight={border ? "1px solid #E2E8F0" : "none"}
                  textAlign={col.align}
                  w={col.width}
                  key={col.key}
                >
                  {col.title}
                </Th>
              ))}
            </Tr>
          </Thead>
          <Tbody>
            {dataSource.map((row: any, rowIndex: any) => (
              <Tr
                _even={
                  colorMode === "dark"
                    ? { background: "#484a4a" }
                    : { background: RowBg || "whitesmoke" }
                }
                key={rowIndex}
              >
                {columns.map((column: any, colIndex: any) => (
                  <Td
                    fontSize={{
                      base: "11px",
                      sm: "11px",
                      md: "14px",
                      xl: "14px",
                    }}
                    p={{
                      base: "8px 10px",
                      sm: "8px 10px",
                      md: "16px 24px",
                      xl: "16px 24px",
                    }}
                    borderRight={border ? "1px solid #E2E8F0" : "none"}
                    textAlign={column.align}
                    key={colIndex}
                  >
                    {column?.render
                      ? column?.render(row[column.key], row, rowIndex)
                      : row[column.key]}
                  </Td>
                ))}
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </>
  );
};

export default TableGen;
