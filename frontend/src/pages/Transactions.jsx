import React, { useState } from 'react';
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
  Menu,
  Avatar,
  Skeleton,
} from '@mui/material';

import {
  Add,
  Search,
  FileDownload,
  TrendingUp,
  TrendingDown,
  AccountBalance,
  Receipt,
  KeyboardArrowDown,
  KeyboardArrowUp,
  Visibility,
  Edit,
  Delete,
  AccountBalanceWallet,
  CreditCard,
  Money,
  MoreVert,
  CalendarToday,
  Person,
  CheckCircle,
  Warning,
  Cancel,
  Description,
} from '@mui/icons-material';

/* ======================================================
   MOCK DATA
====================================================== */

const transactionData = [
  {
    id: 1,
    date: '2026-01-06',
    time: '10:30 AM',
    customer: 'Rajesh Kumar',
    type: 'credit',
    amount: 45000,
    paymentMode: 'upi',
    reference: 'Invoice #1245',
    note: 'Payment for textile order',
    status: 'completed',
    gstApplied: true,
    gstAmount: 5400,
    createdBy: 'Suresh Kumar',
    linkedInvoice: 'INV-001245',
  },
  {
    id: 2,
    date: '2026-01-06',
    time: '09:15 AM',
    customer: 'Priya Sharma',
    type: 'debit',
    amount: 12000,
    paymentMode: 'cash',
    reference: 'Purchase materials',
    note: 'Raw material purchase',
    status: 'completed',
    gstApplied: true,
    gstAmount: 1440,
    createdBy: 'Suresh Kumar',
    linkedInvoice: null,
  },
  {
    id: 3,
    date: '2026-01-05',
    time: '03:45 PM',
    customer: 'Amit Patel',
    type: 'credit',
    amount: 78500,
    paymentMode: 'bank',
    reference: 'Loan repayment',
    note: 'Monthly EMI payment',
    status: 'completed',
    gstApplied: false,
    gstAmount: 0,
    createdBy: 'Suresh Kumar',
    linkedInvoice: 'LOAN-456',
  },
  {
    id: 4,
    date: '2026-01-05',
    time: '11:20 AM',
    customer: 'Sneha Reddy',
    type: 'credit',
    amount: 25000,
    paymentMode: 'upi',
    reference: 'Invoice #1246',
    note: 'Sale payment',
    status: 'pending',
    gstApplied: true,
    gstAmount: 3000,
    createdBy: 'Suresh Kumar',
    linkedInvoice: 'INV-001246',
  },
  {
    id: 5,
    date: '2026-01-04',
    time: '02:30 PM',
    customer: 'Vikram Singh',
    type: 'debit',
    amount: 8500,
    paymentMode: 'cash',
    reference: 'Office supplies',
    note: 'Monthly office expenses',
    status: 'completed',
    gstApplied: false,
    gstAmount: 0,
    createdBy: 'Suresh Kumar',
    linkedInvoice: null,
  },
];

/* ======================================================
   HELPERS
====================================================== */

const formatCurrency = (amount) =>
  `₹${Math.abs(amount).toLocaleString('en-IN')}`;

const paymentIcon = (mode) => {
  switch (mode) {
    case 'upi':
      return <CreditCard fontSize="small" />;
    case 'cash':
      return <Money fontSize="small" />;
    case 'bank':
      return <AccountBalance fontSize="small" />;
    case 'cheque':
      return <Description fontSize="small" />;
    default:
      return <AccountBalanceWallet fontSize="small" />;
  }
};

const statusChip = (status) => {
  if (status === 'completed')
    return (
      <Chip
        label="Completed"
        icon={<CheckCircle />}
        size="small"
        sx={{ bgcolor: '#e8f5e9', color: '#2e7d32', fontWeight: 600 }}
      />
    );
  if (status === 'pending')
    return (
      <Chip
        label="Pending"
        icon={<Warning />}
        size="small"
        sx={{ bgcolor: '#fff3e0', color: '#f57c00', fontWeight: 600 }}
      />
    );
  return (
    <Chip
      label="Failed"
      icon={<Cancel />}
      size="small"
      sx={{ bgcolor: '#ffebee', color: '#c62828', fontWeight: 600 }}
    />
  );
};

/* ======================================================
   TRANSACTION ROW
====================================================== */

function TransactionRow({ transaction }) {
  const [open, setOpen] = useState(false);
  const [menuEl, setMenuEl] = useState(null);

  return (
    <>
      <TableRow
        hover
        onClick={() => setOpen(!open)}
        sx={{
          cursor: 'pointer',
          bgcolor:
            transaction.type === 'credit' ? '#f1f8f4' : '#fff5f5',
          '&:hover': {
            bgcolor:
              transaction.type === 'credit'
                ? '#e8f5e9'
                : '#ffebee',
          },
        }}
      >
        <TableCell>
          <IconButton size="small">
            {open ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
          </IconButton>
        </TableCell>

        <TableCell>
          <Typography fontWeight={600}>
            {new Date(transaction.date).toLocaleDateString('en-IN')}
          </Typography>
          <Typography variant="caption" color="text.secondary">
            {transaction.time}
          </Typography>
        </TableCell>

        <TableCell>
          <Stack direction="row" spacing={1} alignItems="center">
            <Avatar sx={{ bgcolor: '#1976d2', width: 32, height: 32 }}>
              {transaction.customer[0]}
            </Avatar>
            <Typography fontWeight={500}>
              {transaction.customer}
            </Typography>
          </Stack>
        </TableCell>

        <TableCell>
          <Chip
            label={transaction.type.toUpperCase()}
            size="small"
            sx={{
              bgcolor:
                transaction.type === 'credit'
                  ? '#e8f5e9'
                  : '#ffebee',
              color:
                transaction.type === 'credit'
                  ? '#2e7d32'
                  : '#c62828',
              fontWeight: 700,
            }}
          />
        </TableCell>

        <TableCell>
          <Typography
            fontWeight={700}
            color={
              transaction.type === 'credit'
                ? '#2e7d32'
                : '#c62828'
            }
          >
            {transaction.type === 'credit' ? '+' : '-'}
            {formatCurrency(transaction.amount)}
          </Typography>
        </TableCell>

        <TableCell>
          <Stack direction="row" spacing={1} alignItems="center">
            {paymentIcon(transaction.paymentMode)}
            <Typography>{transaction.paymentMode.toUpperCase()}</Typography>
          </Stack>
        </TableCell>

        <TableCell>
          <Typography fontWeight={500}>
            {transaction.reference}
          </Typography>
          <Typography variant="caption" color="text.secondary">
            {transaction.note}
          </Typography>
        </TableCell>

        <TableCell>{statusChip(transaction.status)}</TableCell>

        <TableCell onClick={(e) => e.stopPropagation()}>
          <IconButton>
            <Visibility />
          </IconButton>
          <IconButton>
            <Edit />
          </IconButton>
          <IconButton onClick={(e) => setMenuEl(e.currentTarget)}>
            <MoreVert />
          </IconButton>

          <Menu
            open={Boolean(menuEl)}
            anchorEl={menuEl}
            onClose={() => setMenuEl(null)}
          >
            <MenuItem>
              <Delete sx={{ mr: 1 }} /> Delete
            </MenuItem>
            <MenuItem>
              <FileDownload sx={{ mr: 1 }} /> Download
            </MenuItem>
          </Menu>
        </TableCell>
      </TableRow>

      <TableRow>
        <TableCell colSpan={9} sx={{ p: 0 }}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box
              sx={{
                m: 2,
                p: 3,
                bgcolor: '#ffffff',
                borderRadius: 2,
                border: '1px solid #e0e0e0',
              }}
            >
              <Typography variant="h6" fontWeight={700} mb={3}>
                Transaction Details
              </Typography>

              {/* TOP GRID */}
              <Box
                sx={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(3, 1fr)',
                  gap: 3,
                  mb: 3,
                }}
              >
                <Box>
                  <Typography variant="caption" color="text.secondary">
                    Customer
                  </Typography>
                  <Stack direction="row" spacing={1} alignItems="center" mt={0.5}>
                    <Person fontSize="small" color="action" />
                    <Typography fontWeight={600}>
                      {transaction.customer}
                    </Typography>
                  </Stack>
                </Box>

                <Box>
                  <Typography variant="caption" color="text.secondary">
                    Created By
                  </Typography>
                  <Typography fontWeight={600} mt={0.5}>
                    {transaction.createdBy}
                  </Typography>
                </Box>

                <Box>
                  <Typography variant="caption" color="text.secondary">
                    Linked Invoice / Loan
                  </Typography>
                  <Typography fontWeight={600} mt={0.5}>
                    {transaction.linkedInvoice || '—'}
                  </Typography>
                </Box>
              </Box>

              <Divider sx={{ my: 3 }} />

              {/* BOTTOM GRID */}
              <Box
                sx={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(3, 1fr)',
                  gap: 3,
                }}
              >
                <Box>
                  <Typography variant="caption" color="text.secondary">
                    GST Applied
                  </Typography>
                  <Typography fontWeight={600} mt={0.5}>
                    {transaction.gstApplied ? 'Yes' : 'No'}
                  </Typography>
                </Box>

                {transaction.gstApplied && (
                  <Box>
                    <Typography variant="caption" color="text.secondary">
                      GST Amount
                    </Typography>
                    <Typography fontWeight={600} mt={0.5}>
                      ₹{transaction.gstAmount.toLocaleString('en-IN')}
                    </Typography>
                  </Box>
                )}

                <Box>
                  <Typography variant="caption" color="text.secondary">
                    Internal Note
                  </Typography>
                  <Typography fontWeight={600} mt={0.5}>
                    {transaction.note || '—'}
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Collapse>

        </TableCell>
      </TableRow>
    </>
  );
}

/* ======================================================
   MAIN PAGE
====================================================== */

export default function TransactionsPage() {
  const totalIn = transactionData
    .filter((t) => t.type === 'credit')
    .reduce((s, t) => s + t.amount, 0);

  const totalOut = transactionData
    .filter((t) => t.type === 'debit')
    .reduce((s, t) => s + t.amount, 0);

  const [search, setSearch] = useState('');
  const [type, setType] = useState('all');
  const [mode, setMode] = useState('all');
  const [status, setStatus] = useState('all');

  const filtered = transactionData.filter((t) => {
    if (search && !t.customer.toLowerCase().includes(search.toLowerCase())) return false;
    if (type !== 'all' && t.type !== type) return false;
    if (mode !== 'all' && t.paymentMode !== mode) return false;
    if (status !== 'all' && t.status !== status) return false;
    return true;
  });

  return (
    <Box>
      <Stack direction="row" justifyContent="space-between" mb={4}>
        <Box>
          <Typography variant="h4" fontWeight={700}>
            Transactions
          </Typography>
          <Typography color="text.secondary">
            Track all money in & out
          </Typography>
        </Box>
        <Button variant="contained" startIcon={<Add />}>
          Add Transaction
        </Button>
      </Stack>

      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4,1fr)',
          gap: 3,
          mb: 4,
        }}
      >
        <Card>
          <CardContent>
            <TrendingUp color="success" /> Inflow
            <Typography variant="h5" color="success.main">
              {formatCurrency(totalIn)}
            </Typography>
          </CardContent>
        </Card>

        <Card>
          <CardContent>
            <TrendingDown color="error" /> Outflow
            <Typography variant="h5" color="error.main">
              {formatCurrency(totalOut)}
            </Typography>
          </CardContent>
        </Card>

        <Card>
          <CardContent>
            <AccountBalance /> Net
            <Typography variant="h5">
              {formatCurrency(totalIn - totalOut)}
            </Typography>
          </CardContent>
        </Card>

        <Card>
          <CardContent>
            <Receipt /> Count
            <Typography variant="h5">
              {transactionData.length}
            </Typography>
          </CardContent>
        </Card>
      </Box>

      {/* FILTER BAR */}
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Stack spacing={2}>
            <TextField
              placeholder="Search by customer or reference"
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
            />

            <Stack direction="row" spacing={2}>
              <FormControl size="small" fullWidth>
                <InputLabel>Type</InputLabel>
                <Select value={type} label="Type" onChange={(e) => setType(e.target.value)}>
                  <MenuItem value="all">All</MenuItem>
                  <MenuItem value="credit">Credit</MenuItem>
                  <MenuItem value="debit">Debit</MenuItem>
                </Select>
              </FormControl>

              <FormControl size="small" fullWidth>
                <InputLabel>Mode</InputLabel>
                <Select value={mode} label="Mode" onChange={(e) => setMode(e.target.value)}>
                  <MenuItem value="all">All</MenuItem>
                  <MenuItem value="cash">Cash</MenuItem>
                  <MenuItem value="upi">UPI</MenuItem>
                </Select>
              </FormControl>

              <FormControl size="small" fullWidth>
                <InputLabel>Status</InputLabel>
                <Select value={status} label="Status" onChange={(e) => setStatus(e.target.value)}>
                  <MenuItem value="all">All</MenuItem>
                  <MenuItem value="completed">Completed</MenuItem>
                  <MenuItem value="pending">Pending</MenuItem>
                </Select>
              </FormControl>
            </Stack>
          </Stack>
        </CardContent>
      </Card>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow sx={{ bgcolor: '#f5f5f5' }}>
              <TableCell />
              <TableCell>Date</TableCell>
              <TableCell>Customer</TableCell>
              <TableCell>Type</TableCell>
              <TableCell>Amount</TableCell>
              <TableCell>Mode</TableCell>
              <TableCell>Reference</TableCell>
              <TableCell>Status</TableCell>
              <TableCell />
            </TableRow>
          </TableHead>
          <TableBody>
            {filtered.map((t) => (
              <TransactionRow key={t.id} transaction={t} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
