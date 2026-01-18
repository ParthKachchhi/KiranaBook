import { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Button,
  Card,
  CardContent,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
  Avatar,
  Stack,
  TextField,
  InputAdornment,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  IconButton,
  Collapse,
  Divider,
} from "@mui/material";

import {
  Add,
  Search,
  Phone,
  MoreVert,
  KeyboardArrowDown,
  KeyboardArrowUp,
  Payment,
  AccountBalance,
  TrendingUp,
  TrendingDown,
  CheckCircle,
  Warning,
  Upload,
  Storefront,
} from "@mui/icons-material";

import { getCustomers } from "../services/customerService";
import { AddCustomerDialog } from "../components/AddCustomerDialog";


/* ================= HELPERS ================= */

const formatCurrency = (amount) =>
  `₹${Math.abs(amount).toLocaleString("en-IN")}`;

const avatarColors = ["#1976d2", "#388e3c", "#f57c00", "#7b1fa2", "#c62828"];

/* ================= ROW COMPONENT ================= */

function CustomerRow({ customer, index }) {
  const [open, setOpen] = useState(false);

  const statusChip = () => {
    if (customer.balance > 0)
      return <Chip label="Receivable" color="success" size="small" />;

    if (customer.balance < 0)
      return <Chip label="Payable" color="error" size="small" />;

    return <Chip label="Settled" size="small" />;

  };

  return (
    <>
      <TableRow hover onClick={() => setOpen(!open)} sx={{ cursor: "pointer" }}>
        <TableCell>
          <IconButton size="small">
            {open ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
          </IconButton>
        </TableCell>

        <TableCell>
          <Stack direction="row" spacing={2}>
            <Avatar
              sx={{
                bgcolor: avatarColors[index % avatarColors.length],
                fontWeight: 600,
              }}
            >
              {customer.initials}
            </Avatar>
            <Box>
              <Typography fontWeight={600}>{customer.name}</Typography>
              <Stack direction="row" spacing={1} alignItems="center">
                <Phone sx={{ fontSize: 14 }} />
                <Typography variant="caption">{customer.mobile}</Typography>
              </Stack>
            </Box>
          </Stack>
        </TableCell>

        <TableCell>
          {customer.balance === 0 ? (
            <Chip label="Settled" size="small" />
          ) : (
            <Typography
              fontWeight={700}
              color={customer.balance > 0 ? "success.main" : "error.main"}
            >
              {customer.balance > 0 ? "+" : "-"}
              {formatCurrency(customer.balance)}
            </Typography>
          )}
        </TableCell>

        <TableCell>
          {customer.lastTransaction?.date
            ? new Date(customer.lastTransaction.date).toLocaleDateString("en-IN")
            : "—"}

          {customer.lastTransaction?.type && (
            <Chip
              label={customer.lastTransaction.type.toUpperCase()}
              size="small"
              variant="outlined"
              sx={{ ml: 1 }}
            />
          )}

        </TableCell>

        <TableCell>{statusChip()}</TableCell>

        <TableCell onClick={(e) => e.stopPropagation()}>
          <Stack direction="row" spacing={1}>
            {customer.balance > 0 && (
              <Button
                size="small"
                variant="contained"
                startIcon={<Payment />}
                sx={{ bgcolor: "#2e7d32" }}
              >
                Collect
              </Button>
            )}
            {customer.balance < 0 && (
              <Button
                size="small"
                variant="contained"
                startIcon={<AccountBalance />}
                sx={{ bgcolor: "#d32f2f" }}
              >
                Pay
              </Button>
            )}
            <IconButton>
              <MoreVert />
            </IconButton>
          </Stack>
        </TableCell>
      </TableRow>

      <TableRow>
        <TableCell colSpan={6} sx={{ p: 0 }}>
          <Collapse in={open}>
            <Box sx={{ p: 3, bgcolor: "#fafafa" }}>
              <Typography fontWeight={700} mb={2}>
                Customer Details
              </Typography>

              <Box
                sx={{
                  display: "grid",
                  gridTemplateColumns: "repeat(4, 1fr)",
                  gap: 2,
                }}
              >
                <Box>
                  <Typography variant="caption">Total Sales</Typography>
                  <Typography fontWeight={700}>
                    {formatCurrency(customer.totalSales)}
                  </Typography>
                </Box>
                <Box>
                  <Typography variant="caption">Total Payments</Typography>
                  <Typography fontWeight={700}>
                    {formatCurrency(customer.totalPayments)}
                  </Typography>
                </Box>
                <Box>
                  <Typography variant="caption">Outstanding Since</Typography>
                  <Typography fontWeight={700}>
                    {customer.outstandingSince}
                  </Typography>
                </Box>
                <Box>
                  <Typography variant="caption">Last Reminder</Typography>
                  <Typography fontWeight={700}>
                    {customer.lastReminder}
                  </Typography>
                </Box>
              </Box>

              <Divider sx={{ my: 2 }} />

              <Typography variant="caption">GSTIN</Typography>
              <Typography fontWeight={500}>{customer.gstin}</Typography>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
}

/* ================= EMPTY STATE ================= */

function EmptyState({ message, submessage }) {
  return (
    <Box textAlign="center" py={8}>
      <Storefront sx={{ fontSize: 80, color: "#bdbdbd" }} />
      <Typography fontWeight={600}>{message}</Typography>
      {submessage && <Typography color="text.secondary">{submessage}</Typography>}
    </Box>
  );
}

/* ================= MAIN PAGE ================= */

export default function CustomersPage() {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const [customers, setCustomers] = useState([]);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    loadCustomers();
  }, []);

  const loadCustomers = async () => {
    const data = await getCustomers();
    setCustomers(data);
  };

  const filtered = customers.filter((c) => {
    if (
      !c.name.toLowerCase().includes(search.toLowerCase()) &&
      !c.mobile.includes(search)
    )
      return false;
    if (filter === "all") return true;
    return c.type === filter;
  });

  const receivable = customers.filter((c) => c.type === "receivable");
  const payable = customers.filter((c) => c.type === "payable");
  const settled = customers.filter((c) => c.type === "settled");

  return (
    <Box>
      {/* HEADER */}
      <Stack direction="row" justifyContent="space-between" mb={4}>
        <Box>
          <Typography variant="h4" fontWeight={700}>
            Customers
          </Typography>
          <Typography color="text.secondary">
            Manage customer balances and activity
          </Typography>
        </Box>

        <Stack direction="row" spacing={2}>
          <Button startIcon={<Upload />} variant="outlined">
            Import
          </Button>
          <Button onClick={() => setOpen(true)} startIcon={<Add />} variant="contained">
            Add Customer
          </Button>

          <AddCustomerDialog
            open={open}
            onClose={() => setOpen(false)}
            onSuccess={loadCustomers}
          />
        </Stack>
      </Stack>
      {/* KPI CARDS */}
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: 3,
          mb: 4,
        }}
      >
        <Card>
          <CardContent>
            <Typography>Total Customers</Typography>
            <Typography variant="h4">{customers.length}</Typography>
          </CardContent>
        </Card>

        <Card>
          <CardContent>
            <Stack direction="row" spacing={1}>
              <TrendingUp color="success" />
              <Typography>Receivable</Typography>
            </Stack>
            <Typography variant="h4">{receivable.length}</Typography>
          </CardContent>
        </Card>

        <Card>
          <CardContent>
            <Stack direction="row" spacing={1}>
              <TrendingDown color="error" />
              <Typography>Payable</Typography>
            </Stack>
            <Typography variant="h4">{payable.length}</Typography>
          </CardContent>
        </Card>

        <Card>
          <CardContent>
            <Stack direction="row" spacing={1}>
              <CheckCircle />
              <Typography>Settled</Typography>
            </Stack>
            <Typography variant="h4">{settled.length}</Typography>
          </CardContent>
        </Card>
      </Box>


      {/* FILTERS */}
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Stack direction="row" spacing={2}>
            <TextField
              placeholder="Search name or mobile"
              size="small"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Search />
                  </InputAdornment>
                ),
              }}
              sx={{ flexGrow: 1 }}
            />

            <FormControl size="small" sx={{ minWidth: 180 }}>
              <InputLabel>Filter</InputLabel>
              <Select
                value={filter}
                label="Filter"
                onChange={(e) => setFilter(e.target.value)}
              >
                <MenuItem value="all">All</MenuItem>
                <MenuItem value="receivable">Receivable</MenuItem>
                <MenuItem value="payable">Payable</MenuItem>
                <MenuItem value="settled">Settled</MenuItem>
              </Select>
            </FormControl>
          </Stack>
        </CardContent>
      </Card>

      {/* TABLE */}
      {filtered.length === 0 ? (
        <Paper>
          <EmptyState message="No customers found" />
        </Paper>
      ) : (
        <TableContainer component={Paper}>
          <Table>
            <TableHead sx={{ bgcolor: "#f5f5f5" }}>
              <TableRow>
                <TableCell />
                <TableCell>Customer</TableCell>
                <TableCell>Balance</TableCell>
                <TableCell>Last Transaction</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filtered.map((c, i) => (
                <CustomerRow key={c.id} customer={c} index={i} />
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Box>
  );
}
