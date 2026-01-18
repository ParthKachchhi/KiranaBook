import {
  Box,
  Paper,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Avatar,
  Chip,
  IconButton,
} from "@mui/material";

import MoreVertIcon from "@mui/icons-material/MoreVert";

export function LoansTable() {
  const loans = [
    {
      id: "1",
      customerName: "Amit Sharma",
      amount: "₹5,00,000",
      interestRate: "12%",
      dueDate: "15 Jan 2025",
      status: "Active",
    },
    {
      id: "2",
      customerName: "Priya Patel",
      amount: "₹3,50,000",
      interestRate: "10.5%",
      dueDate: "20 Jan 2025",
      status: "Active",
    },
    {
      id: "3",
      customerName: "Rahul Verma",
      amount: "₹2,00,000",
      interestRate: "11%",
      dueDate: "28 Dec 2024",
      status: "Overdue",
    },
    {
      id: "4",
      customerName: "Sneha Reddy",
      amount: "₹7,50,000",
      interestRate: "9.5%",
      dueDate: "05 Jan 2025",
      status: "Pending",
    },
    {
      id: "5",
      customerName: "Vikram Singh",
      amount: "₹4,25,000",
      interestRate: "12.5%",
      dueDate: "10 Jan 2025",
      status: "Active",
    },
  ];

  const statusColor = {
    Active: "success",
    Pending: "warning",
    Overdue: "error",
  };

  const getInitials = (name) =>
    name
      .split(" ")
      .map((n) => n[0])
      .join("");

  return (
    <Paper elevation={0} sx={{ border: 1, borderColor: "divider" }}>
      {/* Header */}
      <Box px={3} py={2} borderBottom={1} borderColor="divider">
        <Typography variant="h6" fontWeight={600}>
          Active Loans
        </Typography>
      </Box>

      {/* Table */}
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Customer</TableCell>
              <TableCell>Loan Amount</TableCell>
              <TableCell>Interest Rate</TableCell>
              <TableCell>Due Date</TableCell>
              <TableCell>Status</TableCell>
              <TableCell align="right">Action</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {loans.map((loan) => (
              <TableRow
                key={loan.id}
                hover
                sx={{ "&:last-child td": { borderBottom: 0 } }}
              >
                {/* Customer */}
                <TableCell>
                  <Box display="flex" alignItems="center" gap={2}>
                    <Avatar sx={{ bgcolor: "primary.main", width: 32, height: 32 }}>
                      {getInitials(loan.customerName)}
                    </Avatar>
                    <Typography fontWeight={500}>
                      {loan.customerName}
                    </Typography>
                  </Box>
                </TableCell>

                <TableCell>
                  <Typography fontWeight={500}>
                    {loan.amount}
                  </Typography>
                </TableCell>

                <TableCell>{loan.interestRate}</TableCell>

                <TableCell>{loan.dueDate}</TableCell>

                {/* Status */}
                <TableCell>
                  <Chip
                    label={loan.status}
                    color={statusColor[loan.status]}
                    variant="outlined"
                    size="small"
                  />
                </TableCell>

                {/* Action */}
                <TableCell align="right">
                  <IconButton>
                    <MoreVertIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
}
