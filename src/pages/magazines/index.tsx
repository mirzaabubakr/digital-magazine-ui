import React, { useCallback, useEffect, useState } from "react";
import DashboardCard from "../../shared/dashboard-card";
import BlankCard from "../../shared/blank-card";
import {
  Box,
  Button,
  CardContent,
  CardMedia,
  Chip,
  CircularProgress,
  Grid,
  MenuItem,
  Pagination,
  SelectChangeEvent,
  Stack,
  Typography,
} from "@mui/material";
import CustomSelect from "../../components/custom-select";
import { useSelector, useDispatch } from "../../store/hooks";
import { AppState } from "../../store/store";
import {
  fetchMagazines,
  updateMagazines,
} from "../../store/magazine/magazineSlice";

export default function Magazines() {
  const dispatch = useDispatch();
  const [pageCount, setPageCount] = useState<number>(1);
  const [subscribe, setSubscribe] = useState<boolean>(false);

  const [viewFilter, setViewFilter] = useState("all");
  const magazines = useSelector((state: AppState) => state.magazines.data);
  const totalRecords = useSelector(
    (state: AppState) => state.magazines.totalRecords
  );

  const pageLimit = 8;

  useEffect(() => {
    const fetchData = async () => {
      dispatch(fetchMagazines(pageCount, pageLimit, viewFilter));
    };
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageCount, pageLimit, viewFilter, subscribe]);

  const handleStatusFilterChange = useCallback((event: SelectChangeEvent) => {
    setViewFilter(event.target.value);
  }, []);

  const handlePageChange = useCallback(
    (event: React.ChangeEvent<unknown>, newPage: number) => {
      setPageCount(newPage);
    },
    []
  );

  const handleSubscribe = useCallback(
    async (id: number, status: boolean) => {
      await dispatch(updateMagazines(id, !status));
      setSubscribe(!subscribe);
    },
    [dispatch, subscribe]
  );

  return (
    <DashboardCard title={"Magazines"}>
      <>
        <BlankCard>
          <Box margin={2}>
            <Grid item lg={3} xs={12}>
              <CustomSelect
                value={viewFilter}
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
                  {magazines && magazines.length > 0 ? (
                    <Grid container spacing={3} border={0} marginTop={2}>
                      {magazines.map((magazine, index) => (
                        <Grid
                          key={index}
                          item
                          lg={3}
                          md={6}
                          sm={6}
                          minWidth={"absolute"}
                        >
                          <BlankCard className="hoverCard">
                            <>
                              <CardMedia
                                component="img"
                                height="240"
                                image={magazine.imgUrl}
                                alt={magazine.title}
                              />
                              <CardContent>
                                <Stack
                                  direction="row"
                                  sx={{ marginTop: "-45px" }}
                                >
                                  <Chip
                                    sx={{
                                      marginLeft: "auto",
                                      marginTop: "-200px",
                                      backgroundColor: "white",
                                    }}
                                    label={`${magazine.price} $`}
                                    size="small"
                                  />
                                </Stack>
                                <Box marginTop={4}>
                                  <Typography
                                    gutterBottom
                                    variant="h5"
                                    color="inherit"
                                    sx={{ textDecoration: "none" }}
                                  >
                                    {magazine.title}
                                  </Typography>
                                </Box>
                                <Box sx={{ marginTop: 2 }}>
                                  <Typography
                                    sx={{
                                      fontSize: 20,
                                      color: "#1162b7",
                                      fontWeight: "bold",
                                    }}
                                  >
                                    {magazine.description}
                                  </Typography>
                                </Box>
                                <Box sx={{ marginTop: 3 }}>
                                  <Stack
                                    direction="row"
                                    gap={3}
                                    alignItems="center"
                                    justifyContent={"space-between"}
                                    marginTop={2}
                                    marginBottom={1}
                                  >
                                    <Button
                                      fullWidth
                                      variant="outlined"
                                      onClick={() =>
                                        handleSubscribe(
                                          magazine.id,
                                          magazine.subscribed
                                        )
                                      }
                                      color={
                                        magazine.subscribed
                                          ? "error"
                                          : "success"
                                      }
                                    >
                                      {magazine.subscribed
                                        ? "Unsubscribe"
                                        : "Subscribe"}
                                    </Button>
                                  </Stack>
                                </Box>
                              </CardContent>
                            </>
                          </BlankCard>
                        </Grid>
                      ))}
                    </Grid>
                  ) : (
                    <Grid
                      container
                      padding={10}
                      justifyContent="center"
                      alignItems="center"
                    >
                      {magazines.length === 0 ? (
                        <Typography variant="h5">{"No Data Found!"}</Typography>
                      ) : (
                        <CircularProgress />
                      )}
                    </Grid>
                  )}

                  <Pagination
                    count={Math.ceil(totalRecords / pageLimit)}
                    onChange={handlePageChange}
                    color="primary"
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      margin: "12px",
                    }}
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
