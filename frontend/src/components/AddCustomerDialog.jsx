import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  Button,
  Stack,
} from "@mui/material";
import { useState } from "react";
import { createCustomer } from "../services/customerService";

export function AddCustomerDialog({ open, onClose, onSuccess }) {
  const [form, setForm] = useState({
    name: "",
    mobile: "",
    gstin: "",
    balance: 0,
  });

  const handleSubmit = async () => {
    await createCustomer(form);
    onSuccess();
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth>
      <DialogTitle>Add Customer</DialogTitle>

      <DialogContent>
        <Stack spacing={2} mt={1}>
          <TextField
            label="Customer Name"
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />
          <TextField
            label="Mobile"
            onChange={(e) => setForm({ ...form, mobile: e.target.value })}
          />
          <TextField
            label="GSTIN"
            onChange={(e) => setForm({ ...form, gstin: e.target.value })}
          />
          <TextField
            label="Opening Balance"
            type="number"
            onChange={(e) =>
              setForm({ ...form, balance: Number(e.target.value) })
            }
          />
        </Stack>
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button variant="contained" onClick={handleSubmit}>
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
}
