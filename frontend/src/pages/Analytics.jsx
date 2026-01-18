import { useState } from "react";
import {
  Box,
  Typography,
  Button,
  Card,
  CardContent,
  Stack,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  Divider,
  Grid,
  Paper,
} from "@mui/material";
import {
  FileDownload,
  TrendingUp,
  AccountBalance,
  Receipt,
  AttachMoney,
  Description,
  Warning,
  CheckCircle,
} from "@mui/icons-material";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  AreaChart,
  Area,
} from "recharts";

/* -------------------- DATA -------------------- */

const monthlyRevenueExpenseData = [
  { month: "Jul", revenue: 245000, expenses: 145000 },
  { month: "Aug", revenue: 312000, expenses: 178000 },
  { month: "Sep", revenue: 289000, expenses: 165000 },
  { month: "Oct", revenue: 356000, expenses: 198000 },
  { month: "Nov", revenue: 423000, expenses: 234000 },
  { month: "Dec", revenue: 498000, expenses: 267000 },
  { month: "Jan", revenue: 542000, expenses: 289000 },
];

const cashFlowData = monthlyRevenueExpenseData.map((m) => ({
  month: m.month,
  inflow: m.revenue,
  outflow: m.expenses,
}));

const loanPortfolioData = [
  { name: "Active Loans", value: 45, amount: 3250000 },
  { name: "Overdue Loans", value: 12, amount: 945000 },
  { name: "Closed Loans", value: 28, amount: 2100000 },
];

const paymentModeData = [
  { name: "Cash", value: 35, amount: 875000 },
  { name: "UPI", value: 42, amount: 1050000 },
  { name: "Bank Transfer", value: 18, amount: 450000 },
  { name: "Cheque", value: 5, amount: 125000 },
];

const topCustomersData = [
  { id: 1, name: "Rajesh Kumar", sales: 485000, paid: 425000, due: 60000, status: "on-time" },
  { id: 2, name: "Amit Patel", sales: 378000, paid: 298000, due: 80000, status: "overdue" },
  { id: 3, name: "Priya Sharma", sales: 325000, paid: 325000, due: 0, status: "on-time" },
];

const gstMonthlyData = [
  { month: "Jul", collected: 29400, paid: 17400 },
  { month: "Aug", collected: 37440, paid: 21360 },
  { month: "Sep", collected: 34680, paid: 19800 },
  { month: "Oct", collected: 42720, paid: 23760 },
  { month: "Nov", collected: 50760, paid: 28080 },
  { month: "Dec", collected: 59760, paid: 32040 },
  { month: "Jan", collected: 65040, paid: 34680 },
];

/* -------------------- HELPERS -------------------- */

const formatCurrency = (n) => `₹${n.toLocaleString("en-IN")}`;

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <Paper sx={{ p: 1.5 }}>
      <Typography variant="subtitle2" fontWeight={700}>
        {label}
      </Typography>
      {payload.map((p, i) => (
        <Typography key={i} variant="body2" sx={{ color: p.color }}>
          {p.name}: {formatCurrency(p.value)}
        </Typography>
      ))}
    </Paper>
  );
};

/* -------------------- MAIN PAGE -------------------- */

export default function AnalyticsPage() {
  const [range, setRange] = useState("this-month");

  const totalRevenue = 542000;
  const totalExpenses = 289000;
  const profit = totalRevenue - totalExpenses;

  return (
    <Box sx={{ p: 4, backgroundColor: "#F5F7FA", minHeight: "100vh" }}>
      {/* HEADER */}
      <Stack direction="row" justifyContent="space-between" mb={4}>
        <Box>
          <Typography variant="h4" fontWeight={700}>
            Analytics
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Business performance & financial insights
          </Typography>
        </Box>

        <Stack direction="row" spacing={2}>
          <FormControl size="small" sx={{ minWidth: 160, bgcolor: "white" }}>
            <InputLabel>Date Range</InputLabel>
            <Select value={range} label="Date Range" onChange={(e) => setRange(e.target.value)}>
              <MenuItem value="today">Today</MenuItem>
              <MenuItem value="this-month">This Month</MenuItem>
              <MenuItem value="last-3-months">Last 3 Months</MenuItem>
            </Select>
          </FormControl>

          <Button variant="contained" startIcon={<FileDownload />} sx={{ textTransform: "none" }}>
            Export Report
          </Button>
        </Stack>
      </Stack>

      {/* KPI CARDS */}
      <Grid container spacing={3} mb={4}>
        {[
          { title: "Total Revenue", value: totalRevenue, color: "#2e7d32", icon: <AttachMoney /> },
          { title: "Total Expenses", value: totalExpenses, color: "#d32f2f", icon: <Receipt /> },
          { title: "Net Profit", value: profit, color: "#2e7d32", icon: <AccountBalance /> },
          { title: "GST Liability", value: 30360, color: "#1976d2", icon: <Description /> },
        ].map((k, i) => (
          <Grid item xs={12} md={3} key={i}>
            <Card sx={{ borderLeft: `4px solid ${k.color}` }}>
              <CardContent sx={{ p: 3 }}>
                <Stack spacing={1}>
                  <Stack direction="row" spacing={1} alignItems="center">
                    {k.icon}
                    <Typography variant="body2" color="text.secondary">
                      {k.title}
                    </Typography>
                  </Stack>
                  <Typography variant="h4" fontWeight={700} sx={{ color: k.color }}>
                    {formatCurrency(k.value)}
                  </Typography>
                </Stack>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* CHARTS */}
      <Grid container spacing={3} mb={4}>
        <Grid item xs={12} md={8}>
          <Card>
            <CardContent sx={{ p: 3 }}>
              <Typography variant="h6" fontWeight={700}>
                Monthly Revenue vs Expenses
              </Typography>
              <Divider sx={{ my: 2 }} />
              <ResponsiveContainer height={300}>
                <BarChart data={monthlyRevenueExpenseData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend />
                  <Bar dataKey="revenue" fill="#2e7d32" />
                  <Bar dataKey="expenses" fill="#d32f2f" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={4}>
          <Card>
            <CardContent sx={{ p: 3 }}>
              <Typography variant="h6" fontWeight={700}>
                Cash Flow Trend
              </Typography>
              <Divider sx={{ my: 2 }} />
              <ResponsiveContainer height={300}>
                <AreaChart data={cashFlowData}>
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip content={<CustomTooltip />} />
                  <Area dataKey="inflow" fill="#2e7d32" stroke="#2e7d32" />
                  <Area dataKey="outflow" fill="#d32f2f" stroke="#d32f2f" />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* TOP CUSTOMERS */}
      <Card>
        <CardContent sx={{ p: 3 }}>
          <Typography variant="h6" fontWeight={700} mb={2}>
            Top Customers
          </Typography>
          <TableContainer>
            <Table size="small">
              <TableHead>
                <TableRow sx={{ bgcolor: "#f5f5f5" }}>
                  <TableCell>Customer</TableCell>
                  <TableCell>Sales</TableCell>
                  <TableCell>Paid</TableCell>
                  <TableCell>Outstanding</TableCell>
                  <TableCell>Status</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {topCustomersData.map((c) => (
                  <TableRow key={c.id} hover sx={{ "& td": { py: 1.25 } }}>
                    <TableCell>{c.name}</TableCell>
                    <TableCell>{formatCurrency(c.sales)}</TableCell>
                    <TableCell>{formatCurrency(c.paid)}</TableCell>
                    <TableCell>{c.due ? formatCurrency(c.due) : "—"}</TableCell>
                    <TableCell>
                      {c.status === "on-time" ? (
                        <Chip icon={<CheckCircle />} label="On Time" size="small" color="success" />
                      ) : (
                        <Chip icon={<Warning />} label="Overdue" size="small" color="error" />
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>
    </Box>
  );
}
