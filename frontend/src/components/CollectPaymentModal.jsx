import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  MenuItem,
  Stack,
} from "@mui/material";
import { useState } from "react";
import { collectPayment } from "../services/paymentService";

export default function CollectPaymentModal({
  open,
  onClose,
  loan,
  onSuccess,
}) {
  const [form, setForm] = useState({
    amount: "",
    paymentDate: "",
    method: "cash",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    await collectPayment({
      loanId: loan._id,
      amount: Number(form.amount),
      paymentDate: form.paymentDate,
      method: form.method,
    });

    onSuccess();
    onClose();
  };

  if (!loan) return null;

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Collect Payment</DialogTitle>

      <DialogContent>
        <Stack spacing={2} mt={1}>
          <TextField
            label="Amount"
            name="amount"
            type="number"
            value={form.amount}
            onChange={handleChange}
          />

          <TextField
            label="Payment Date"
            name="paymentDate"
            type="date"
            InputLabelProps={{ shrink: true }}
            value={form.paymentDate}
            onChange={handleChange}
          />

          <TextField
            select
            label="Payment Method"
            name="method"
            value={form.method}
            onChange={handleChange}
          >
            <MenuItem value="cash">Cash</MenuItem>
            <MenuItem value="upi">UPI</MenuItem>
            <MenuItem value="bank">Bank</MenuItem>
            <MenuItem value="cheque">Cheque</MenuItem>
          </TextField>
        </Stack>
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button variant="contained" onClick={handleSubmit}>
          Collect
        </Button>
      </DialogActions>
    </Dialog>
  );
}
