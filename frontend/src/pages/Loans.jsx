import {
  Box,
  Typography,
  Paper,
  Grid,
  Tabs,
  Tab,
  TextField,
  MenuItem,
  Chip,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Avatar,
  Stack,
  CircularProgress,
} from "@mui/material";

import AddIcon from "@mui/icons-material/Add";
import PaymentsIcon from "@mui/icons-material/Payments";
import { useEffect, useState } from "react";
import { fetchLoans } from "../services/loanService";

export default function Loans() {
  const [status, setStatus] = useState("all");
  const [loans, setLoans] = useState([]);
  const [loading, setLoading] = useState(true);

  // ==========================
  // LOAD LOANS FROM BACKEND
  // ==========================
  useEffect(() => {
    loadLoans();
  }, [status]);

  const loadLoans = async () => {
    try {
      setLoading(true);
      const data = await fetchLoans({ status });
      setLoans(data);
    } catch (err) {
      console.error("LOAD LOANS ERROR", err);
    } finally {
      setLoading(false);
    }
  };

  const statusColor = (status) => {
    switch (status) {
      case "ACTIVE":
        return "success";
      case "OVERDUE":
        return "error";
      case "CLOSED":
        return "default";
      default:
        return "default";
    }
  };

  return (
    <>
      {/* ================= PAGE HEADER ================= */}
      <Box
        mb={4}
        display="flex"
        justifyContent="space-between"
        alignItems="center"
      >
        <Box>
          <Typography variant="h4" fontWeight={600}>
            Loans
          </Typography>
          <Typography color="text.secondary">
            Manage active, overdue, and closed loans
          </Typography>
        </Box>

        <Button
          variant="contained"
          startIcon={<AddIcon />}
          size="large"
        >
          Add Loan
        </Button>
      </Box>

      {/* ================= FILTERS ================= */}
      <Paper sx={{ p: 2, mb: 3 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={4}>
            <TextField
              fullWidth
              placeholder="Search customer or mobile"
            />
          </Grid>

          <Grid item xs={12} md={4}>
            <TextField
              sx={{ width: "150px" }}
              select
              label="Overdue Filter"
            >
              <MenuItem value="all">All</MenuItem>
              <MenuItem value="0-30">0–30 Days</MenuItem>
              <MenuItem value="31-60">31–60 Days</MenuItem>
              <MenuItem value="60+">60+ Days</MenuItem>
            </TextField>
          </Grid>

          <Grid item xs={12} md={4}>
            <TextField
              sx={{ width: "150px" }}
              select
              label="Interest Type"
            >
              <MenuItem value="all">All</MenuItem>
              <MenuItem value="flat">Flat</MenuItem>
              <MenuItem value="reducing">Reducing</MenuItem>
            </TextField>
          </Grid>
        </Grid>
      </Paper>

      {/* ================= STATUS TABS ================= */}
      <Tabs
        value={status}
        onChange={(e, v) => setStatus(v)}
        sx={{ mb: 3 }}
      >
        <Tab value="all" label="All Loans" />
        <Tab value="ACTIVE" label="Active" />
        <Tab value="OVERDUE" label="Overdue" />
        <Tab value="CLOSED" label="Closed" />
      </Tabs>

      {/* ================= TABLE ================= */}
      <Paper>
        {loading ? (
          <Box p={5} textAlign="center">
            <CircularProgress />
          </Box>
        ) : (
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Customer</TableCell>
                  <TableCell>Principal</TableCell>
                  <TableCell>Outstanding</TableCell>
                  <TableCell>Interest %</TableCell>
                  <TableCell>Due Date</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell align="right">Action</TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {loans.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={7} align="center">
                      No loans found
                    </TableCell>
                  </TableRow>
                ) : (
                  loans.map((loan) => (
                    <TableRow key={loan._id} hover>
                      {/* Customer */}
                      <TableCell>
                        <Stack direction="row" spacing={1} alignItems="center">
                          <Avatar>
                            {loan.customerId?.name?.charAt(0) || "C"}
                          </Avatar>
                          <Typography fontWeight={500}>
                            {loan.customerId?.name}
                          </Typography>
                        </Stack>
                      </TableCell>

                      <TableCell>
                        ₹{loan.principalAmount.toLocaleString()}
                      </TableCell>

                      <TableCell>
                        ₹{loan.outstandingAmount.toLocaleString()}
                      </TableCell>

                      <TableCell>{loan.interestRate}%</TableCell>

                      <TableCell>
                        {new Date(loan.dueDate).toLocaleDateString()}
                      </TableCell>

                      <TableCell>
                        <Chip
                          label={loan.status}
                          color={statusColor(loan.status)}
                          size="small"
                        />
                      </TableCell>

                      <TableCell align="right">
                        {loan.status !== "CLOSED" && (
                          <Button
                            size="small"
                            startIcon={<PaymentsIcon />}
                          >
                            Collect
                          </Button>
                        )}
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </Paper>
    </>
  );
}
