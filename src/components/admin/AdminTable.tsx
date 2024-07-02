"use client";
import { Box } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { arSD } from "@mui/x-data-grid/locales/arSD";
import { useTheme } from "next-themes";
import { Dispatch, SetStateAction } from "react";
import { def } from "../../styles/styles";
import "../../styles/table.css";

type Props = {
  columns: GridColDef[];
  data: any;
  rowCount: number;
  page: number;
  small: boolean;
  setPage: Dispatch<SetStateAction<number>>;
  pageSize: number;
  setPageSize: Dispatch<SetStateAction<number>>;
};

export default function AdminTable({
  columns,
  data,
  rowCount,
  page,
  pageSize,
  small,
  setPage,
  setPageSize,
}: Props) {
  const { theme } = useTheme();

  const adjustedColumns = !small
    ? columns
    : columns.map((col) => ({
        ...col,
        flex: col.flex || 1,
        minWidth: col.minWidth || 150,
      }));

  return (
    <Box m="20px 20px 0 20px">
      <Box
        height="87vh"
        sx={{
          "& .MuiDataGrid-root": {
            border:
              theme === "dark"
                ? "1px solid #ffffff30 !important"
                : "1px solid #ccc !important",
            outline: "none",
            backgroundColor: "transparent !important",
            boxShadow:
              "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)",
          },
          "& .MuiDataGrid-menuIcon .MuiButtonBase-root": {
            color: theme === "dark" ? "#fff !important" : "#000 !important",
          },
          "& .MuiDataGrid-sortIcon": {
            color: theme === "dark" ? "#fff" : "#000",
          },
          "& .MuiDataGrid-row": {
            color: theme === "dark" ? "#fff" : "#000",
            borderBottom:
              theme === "dark"
                ? "1px solid #ffffff30 !important"
                : "1px solid #ccc !important",
          },
          "& .MuiTablePagination-root": {
            color: theme === "dark" ? "#fff" : "#000",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .name-column-cell": {
            color: theme === "dark" ? "#fff" : "#000",
          },
          "& .MuiDataGrid-topContainer .MuiDataGrid-columnHeaders .css-yrdy0g-MuiDataGrid-columnHeaderRow":
            {
              color: theme === "dark" ? "#fff" : "#000",
              backgroundColor: "transparent !important",
              borderBottom: "none !important",
              backdropFilter: "blur(30px)",
            },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: "transparent !important",
          },
          "& .MuiDataGrid-footerContainer": {
            color: theme === "dark" ? "#fff" : "#000",
            backgroundColor: "transparent !important",
            borderBottom: "none",
          },
          "& .MuiCheckbox-root": {
            color: theme === "dark" ? "#b7ebde !important" : "#000 !important",
          },
          "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
            color: "#fff !important",
          },
          "& .MuiDataGrid-overlay.css-1w53k9d-MuiDataGrid-overlay": {
            backgroundColor: "transparent !important",
          },
        }}
      >
        <DataGrid
          className={`${def.text}`}
          columns={adjustedColumns}
          rows={data}
          getRowId={(row) => row._id}
          localeText={arSD.components.MuiDataGrid.defaultProps.localeText}
          rowCount={rowCount}
          paginationMode="server"
          pageSizeOptions={[5, 10, 20, 30]}
          paginationModel={{ page, pageSize }}
          checkboxSelection
          pagination
          onPaginationModelChange={(newModel) => {
            setPage(newModel.page);
            setPageSize(newModel.pageSize);
          }}
        />
      </Box>
    </Box>
  );
}
