import {
  Box,
  Grid,
  Typography,
  Paper,
} from "@mui/material";

import { KPICard } from "../components/KPICard";
import { QuickActions } from "../components/QuickActions";
import { LoansTable } from "../components/LoansTable";
import { RecentTransactions } from "../components/RecentTransactions";
import { AnalyticsCharts } from "../components/AnalyticsCharts";

import {
  Wallet,
  TrendingUp,
  CircleDollarSign,
  AlertCircle,
} from "lucide-react";

export default function Dashboard() {
  const sparklineData1 = [20, 25, 22, 30, 28, 35, 32, 38, 42, 45];
  const sparklineData2 = [45, 42, 40, 38, 35, 33, 30, 28, 25, 22];
  const sparklineData3 = [15, 18, 20, 22, 25, 23, 28, 30, 32, 35];
  const sparklineData4 = [10, 12, 15, 12, 10, 8, 10, 12, 15, 13];

  return (
    <>
      {/* Page Header */}
      <Box mb={4}>
        <Typography variant="h4" fontWeight={600}>
          Dashboard
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Welcome back, here's your lending overview
        </Typography>
      </Box>

      {/* KPI Cards */}
      <Grid container spacing={3} mb={4}>
        <Grid item xs={12} sm={6} lg={3}>
          <KPICard title="Total Amount Lent"
            amount="₹2.45 Cr"
            change={12.5}
            icon={Wallet}
            trend="up" />
        </Grid>

        <Grid item xs={12} sm={6} lg={3}>
          <KPICard title="Outstanding Amount"
            amount="₹1.82 Cr"
            change={-5.2}
            icon={TrendingUp}
            trend="down" />
        </Grid>

        <Grid item xs={12} sm={6} lg={3}>
          <KPICard title="Monthly Interest Earned"
            amount="₹18.5 L"
            change={8.3}
            icon={CircleDollarSign}
            trend="up" />
        </Grid>

        <Grid item xs={12} sm={6} lg={3}>
          <KPICard title="Overdue Loans"
            amount="₹12.3 L"
            change={3.1}
            icon={AlertCircle}
            trend="up" />
        </Grid>
      </Grid>

      {/* Quick Actions */}
      <Paper sx={{ p: 3, mb: 4 }}>
        <Typography variant="h6" fontWeight={600} mb={2}>
          Quick Actions
        </Typography>
        <QuickActions />
      </Paper>

      {/* Loans Table */}
      <Paper sx={{ mb: 4 }}>
        <LoansTable />
      </Paper>

      {/* Bottom Section */}
      <Grid container spacing={3}>
        <Grid item xs={12} lg={4}>
          <Paper>
            <RecentTransactions />
          </Paper>
        </Grid>

        <Grid item xs={12} lg={8}>
          <Paper>
            <AnalyticsCharts />
          </Paper>
        </Grid>
      </Grid>
    </>
  );
}
