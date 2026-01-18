import {
  Box,
  Paper,
  Typography,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Avatar,
  Divider,
  Button,
} from "@mui/material";

import {
  ArrowDownward,
  ArrowUpward,
} from "@mui/icons-material";

export function RecentTransactions() {
  const transactions = [
    {
      id: "1",
      customer: "Amit Sharma",
      type: "credit",
      amount: "₹25,000",
      date: "31 Dec, 10:30 AM",
      method: "UPI",
    },
    {
      id: "2",
      customer: "Priya Patel",
      type: "credit",
      amount: "₹15,000",
      date: "31 Dec, 09:15 AM",
      method: "Bank Transfer",
    },
    {
      id: "3",
      customer: "New Loan - Vikram Singh",
      type: "debit",
      amount: "₹4,25,000",
      date: "30 Dec, 03:45 PM",
      method: "Cash",
    },
    {
      id: "4",
      customer: "Rahul Verma",
      type: "credit",
      amount: "₹10,000",
      date: "30 Dec, 11:20 AM",
      method: "Cheque",
    },
    {
      id: "5",
      customer: "New Loan - Sneha Reddy",
      type: "debit",
      amount: "₹7,50,000",
      date: "29 Dec, 02:00 PM",
      method: "Bank Transfer",
    },
  ];

  return (
    <Paper elevation={0} sx={{ border: 1, borderColor: "divider" }}>
      {/* Header */}
      <Box px={3} py={2} borderBottom={1} borderColor="divider">
        <Typography variant="h6" fontWeight={600}>
          Recent Transactions
        </Typography>
      </Box>

      {/* List */}
      <List disablePadding>
        {transactions.map((tx, index) => {
          const isCredit = tx.type === "credit";

          return (
            <Box key={tx.id}>
              <ListItem
                sx={{
                  px: 3,
                  py: 2,
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <Box display="flex" alignItems="center" gap={2}>
                  <ListItemAvatar>
                    <Avatar
                      sx={{
                        bgcolor: isCredit
                          ? "success.light"
                          : "error.light",
                        color: isCredit
                          ? "success.main"
                          : "error.main",
                      }}
                    >
                      {isCredit ? <ArrowDownward /> : <ArrowUpward />}
                    </Avatar>
                  </ListItemAvatar>

                  <ListItemText
                    primary={
                      <Typography fontWeight={500}>
                        {tx.customer}
                      </Typography>
                    }
                    secondary={
                      <Typography variant="body2" color="text.secondary">
                        {tx.date} • {tx.method}
                      </Typography>
                    }
                  />
                </Box>

                <Typography
                  fontWeight={600}
                  color={isCredit ? "success.main" : "error.main"}
                >
                  {isCredit ? "+" : "-"}
                  {tx.amount}
                </Typography>
              </ListItem>

              {index < transactions.length - 1 && <Divider />}
            </Box>
          );
        })}
      </List>

      {/* Footer */}
      <Box px={3} py={2} borderTop={1} borderColor="divider">
        <Button
          size="small"
          sx={{ textTransform: "none", fontWeight: 600 }}
        >
          View All Transactions →
        </Button>
      </Box>
    </Paper>
  );
}
