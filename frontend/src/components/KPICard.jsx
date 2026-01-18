import {
  Card,
  CardContent,
  Box,
  Typography,
} from "@mui/material";

import { LineChart, Line, ResponsiveContainer } from "recharts";

export function KPICard({
  title,
  amount,
  change,
  icon: Icon,
  trend,
  color = "primary",
  sparklineData = [],
}) {
  const sparkData = sparklineData.map((value, index) => ({
    value,
    index,
  }));

  const trendColor =
    trend === "up" ? "success.main" : "error.main";

  return (
    <Card
      elevation={0}
      sx={{
        borderRadius: 3,
        border: 1,
        borderColor: "divider",
        transition: "box-shadow 0.2s ease",
        "&:hover": {
          boxShadow: 3,
        },
      }}
    >
      <CardContent>
        {/* Top Row */}
        <Box
          display="flex"
          alignItems="flex-start"
          justifyContent="space-between"
          mb={2}
        >
          {/* Icon */}
          <Box
            sx={{
              width: 48,
              height: 48,
              borderRadius: 2,
              bgcolor: `${color}.lighter`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: `${color}.main`,
            }}
          >
            {Icon && <Icon size={24} />}
          </Box>

          {/* Trend */}
          <Typography
            variant="body2"
            fontWeight={600}
            sx={{ color: trendColor }}
          >
            {trend === "up" ? "▲" : "▼"} {Math.abs(change)}%
          </Typography>
        </Box>

        {/* Title & Amount */}
        <Box mb={2}>
          <Typography
            variant="body2"
            color="text.secondary"
          >
            {title}
          </Typography>

          <Typography
            variant="h5"
            fontWeight={600}
          >
            {amount}
          </Typography>
        </Box>

        {/* Sparkline */}
        <Box height={48}>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={sparkData}>
              <Line
                type="monotone"
                dataKey="value"
                strokeWidth={2}
                stroke={
                  trend === "up"
                    ? "#10b981"
                    : "#ef4444"
                }
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </Box>
      </CardContent>
    </Card>
  );
}
