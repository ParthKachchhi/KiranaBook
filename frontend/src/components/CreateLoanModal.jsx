import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  MenuItem,
  Stack,
  CircularProgress,
} from "@mui/material";
import { useEffect, useState } from "react";
import { getCustomers } from "../services/customerService";
import { createLoan } from "../services/loanService";

export default function CreateLoanModal({ open, onClose, onSuccess }) {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    customerId: "",
    principal: "",
    interestRate: "",
    interestType: "flat",
    interestPeriod: "monthly",
    startDate: "",
    dueDate: "",
  });


  // ==========================
  // LOAD CUSTOMERS
  // ==========================
  useEffect(() => {
    if (!open) return;

    (async () => {
      const data = await getCustomers();
      setCustomers(data);
    })();
  }, [open]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // ==========================
  // SUBMIT LOAN
  // ==========================
  const handleSubmit = async () => {
    try {
      setLoading(true);
      await createLoan({
        ...form,
        principal: Number(form.principal),
        interestRate: Number(form.interestRate),
      });
      onSuccess(); // reload loans
      onClose();
    } catch (err) {
      alert("Failed to create loan");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Create Loan</DialogTitle>

      <DialogContent>
        <Stack spacing={2} mt={1}>
          <TextField
            select
            label="Customer"
            name="customerId"
            value={form.customerId}
            onChange={handleChange}
            fullWidth
            required
          >
            {customers.map((c) => (
              <MenuItem key={c._id} value={c._id}>
                {c.name} ({c.mobile})
              </MenuItem>
            ))}
          </TextField>

          <TextField
            label="Principal Amount"
            name="principal"
            type="number"
            value={form.principal}
            onChange={handleChange}
            required
          />

          <TextField
            label="Interest Rate (%)"
            name="interestRate"
            type="number"
            value={form.interestRate}
            onChange={handleChange}
            required
          />
          <TextField
            select
            label="Interest Period"
            name="interestPeriod"
            value={form.interestPeriod}
            onChange={handleChange}
            required
          >
            <MenuItem value="daily">Per Day</MenuItem>
            <MenuItem value="monthly">Per Month</MenuItem>
            <MenuItem value="yearly">Per Year</MenuItem>
          </TextField>


          <TextField
            select
            label="Interest Type"
            name="interestType"
            value={form.interestType}
            onChange={handleChange}
          >
            <MenuItem value="flat">Flat</MenuItem>
            <MenuItem value="reducing">Reducing</MenuItem>
          </TextField>

          <TextField
            type="date"
            label="Start Date"
            name="startDate"
            InputLabelProps={{ shrink: true }}
            value={form.startDate}
            onChange={handleChange}
            required
          />

          <TextField
            type="date"
            label="Due Date"
            name="dueDate"
            InputLabelProps={{ shrink: true }}
            value={form.dueDate}
            onChange={handleChange}
            required
          />
        </Stack>
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button
          variant="contained"
          onClick={handleSubmit}
          disabled={loading}
        >
          {loading ? <CircularProgress size={20} /> : "Create Loan"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
