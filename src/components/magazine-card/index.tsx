import {
  Grid,
  CardMedia,
  CardContent,
  Chip,
  Typography,
  Box,
  Stack,
  Button,
} from "@mui/material";
import BlankCard from "../../shared/blank-card";
import MagazineCardProps from "../../services/constants/magazine";

const MagazineCard: React.FC<MagazineCardProps> = ({
  magazine,
  handleSubscribe,
}) => {
  return (
    <Grid item lg={3} md={4} sm={6} xs={12} minWidth="absolute">
      <BlankCard className="hoverCard">
        <>
          <CardMedia
            component="img"
            height="240"
            image={magazine.imgUrl}
            alt={magazine.title}
          />
          <CardContent>
            <Stack direction="row" sx={{ marginTop: "-45px" }}>
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
                sx={{ fontSize: 20, color: "#1162b7", fontWeight: "bold" }}
              >
                {magazine.description}
              </Typography>
            </Box>
            <Box sx={{ marginTop: 3 }}>
              <Stack
                direction="row"
                gap={3}
                alignItems="center"
                justifyContent="space-between"
                marginTop={2}
                marginBottom={1}
              >
                <Button
                  fullWidth
                  variant="outlined"
                  onClick={() =>
                    handleSubscribe(magazine.id, magazine.subscribed)
                  }
                  color={magazine.subscribed ? "error" : "success"}
                >
                  {magazine.subscribed ? "Unsubscribe" : "Subscribe"}
                </Button>
              </Stack>
            </Box>
          </CardContent>
        </>
      </BlankCard>
    </Grid>
  );
};

export default MagazineCard;
