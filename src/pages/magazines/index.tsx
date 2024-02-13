import React from "react";
import DashboardCard from "../../shared/dashboard-card";
import BlankCard from "../../shared/blank-card";
import {
  Box,
  CardContent,
  Grid,
  MenuItem,
  Pagination,
  SelectChangeEvent,
  Typography,
} from "@mui/material";
import CustomSelect from "../../components/custom-select";
import { useSelector } from "../../store/hooks";
import { AppState } from "../../store/store";

export default function Magazines() {
  const [statusFilter, setStatusFilter] = React.useState("all");
  const magazinesData = useSelector((state: AppState) => state.magazines.data);
  console.log("magazinesData", magazinesData);

  const handleStatusFilterChange = React.useCallback(
    (event: SelectChangeEvent) => {
      setStatusFilter(event.target.value);
    },
    []
  );

  return (
    <DashboardCard title={"Magazines"}>
      <>
        <BlankCard>
          <Box margin={2}>
            <Grid item lg={3} xs={12}>
              <CustomSelect
                value={statusFilter}
                fullWidth
                onChange={handleStatusFilterChange}
                displayEmpty
              >
                <MenuItem value={"all"}>All</MenuItem>
                <MenuItem value={"current"}>Current</MenuItem>
                <MenuItem value={"past"}>Past</MenuItem>
              </CustomSelect>
            </Grid>
          </Box>
        </BlankCard>
        <Box mt={1} width={"100%"}>
          <Grid container spacing={2}>
            <Grid item lg={12} xs={12}>
              <BlankCard>
                <CardContent>
                  <Typography variant="h6" fontSize={20}>
                    Listing Board
                  </Typography>
                  <Grid container spacing={3} border={0} marginTop={2}></Grid>
                  <Pagination
                    count={Math.ceil(20 / 9)}
                    //   onChange={handlePageChange}
                    color="primary"
                    sx={{ display: "flex", justifyContent: "center" }}
                  />
                </CardContent>
              </BlankCard>
            </Grid>
          </Grid>
        </Box>
      </>
    </DashboardCard>
  );
}
