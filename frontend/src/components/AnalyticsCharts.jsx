import {
  Grid,
  Paper,
  Box,
  Typography,
} from "@mui/material";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";

export function AnalyticsCharts() {
  const monthlyData = [
    { month: "Jul", amount: 18 },
    { month: "Aug", amount: 25 },
    { month: "Sep", amount: 22 },
    { month: "Oct", amount: 32 },
    { month: "Nov", amount: 28 },
    { month: "Dec", amount: 35 },
  ];

  const loanStatusData = [
    { name: "Paid", value: 68, color: "#10b981" },
    { name: "Pending", value: 24, color: "#f59e0b" },
    { name: "Overdue", value: 8, color: "#ef4444" },
  ];

  return (
    <Grid container spacing={3}>
      {/* Monthly Lending */}
      <Grid item xs={12} lg={6}>
        <Paper
          elevation={0}
          sx={{
            p: 3,
            border: 1,
            borderColor: "divider",
            height: "100%",
          }}
        >
          <Box mb={3}>
            <Typography variant="h6" fontWeight={600}>
              Monthly Lending
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Amount disbursed in lakhs (₹)
            </Typography>
          </Box>

          <Box height={260}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#eee" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Bar
                  dataKey="amount"
                  fill="#6366f1"
                  radius={[8, 8, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </Box>
        </Paper>
      </Grid>

      {/* Loan Status Distribution */}
      <Grid item xs={12} lg={6}>
        <Paper
          elevation={0}
          sx={{
            p: 3,
            border: 1,
            borderColor: "divider",
            height: "100%",
          }}
        >
          <Box mb={3}>
            <Typography variant="h6" fontWeight={600}>
              Loan Status Distribution
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Current portfolio breakdown
            </Typography>
          </Box>

          <Box height={260}>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={loanStatusData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={90}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {loanStatusData.map((entry, index) => (
                    <Cell key={index} fill={entry.color} />
                  ))}
                </Pie>

                <Tooltip />

                <Legend
                  verticalAlign="bottom"
                  formatter={(value, entry) =>
                    `${value}: ${entry?.payload?.value}%`
                  }
                />
              </PieChart>
            </ResponsiveContainer>
          </Box>
        </Paper>
      </Grid>
    </Grid>
  );
}
