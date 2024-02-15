import {
  Card,
  CardContent,
  Tooltip,
  Typography,
  styled,
  tooltipClasses,
  Box,
  TooltipProps,
} from "@mui/material";
import { Response } from "../@types/response.interface";

type Props = {
  response: Response;
  color: {
    color: string;
    font: string;
  };
  adversityColor: {
    color: string;
    font: string;
  };
  children: JSX.Element;
};

const CustomTooltip = styled(({ className, ...props }: TooltipProps) => (
  <Tooltip {...props} classes={{ popper: className || "" }} />
))({
  [`& .${tooltipClasses.tooltip}`]: {
    padding: 0, // Removes padding
    boxShadow: "none", // Removes shadow if you want a flat card with no shadow
    // Any other styles you want to override can be added here
  },
});

export const StringToolTip = ({
  response,
  color,
  adversityColor,
  children,
}: Props) => {
  const { weight, reason } = response.analyzed;
  let adversity = null;
  if (response.adversity.threshold >= 0.5) {
    adversity = (
      <>
        <Typography>
          <span style={{ color: adversityColor.color }}>Warning: </span>
          {response.adversity.reason}
        </Typography>
      </>
    );
  }
  const weightStr = weight > 0.7 ? "High" : weight > 0.5 ? "Medium" : "Low";
  return (
    <CustomTooltip
      title={
        <Card>
          <CardContent>
            <Typography component="div">
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <Box sx={{ fontWeight: "bold", m: "0 1", typography: "h6" }}>
                  {weightStr}
                </Box>
                <Box
                  sx={{
                    color: color.font,
                    backgroundColor: color.color,
                    paddingTop: 0,
                    paddingBottom: 0,
                    paddingLeft: 1,
                    paddingRight: 1,
                    margin: 0,
                    borderRadius: 3,
                    typography: "h6",
                  }}
                >
                  {weight}
                </Box>
              </Box>

              <Box sx={{ m: "1rem 0" }}>{reason}</Box>
              {adversity}
            </Typography>
          </CardContent>
        </Card>
      }
    >
      {children}
    </CustomTooltip>
  );
};
