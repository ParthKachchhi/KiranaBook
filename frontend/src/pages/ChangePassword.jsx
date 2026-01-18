import { useState } from "react";
import { TextField, Button, Alert, Stack } from "@mui/material";
import { changePassword } from "../services/authService";

export default function ChangePassword() {
  const [currentPassword, setCurrent] = useState("");
  const [newPassword, setNew] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async () => {
    try {
      setError("");
      setSuccess("");
      await changePassword({ currentPassword, newPassword });
      setSuccess("Password updated successfully");
    } catch (err) {
      setError(err.response?.data?.message || "Failed");
    }
  };

  return (
    <Stack spacing={3} maxWidth={400}>
      {error && <Alert severity="error">{error}</Alert>}
      {success && <Alert severity="success">{success}</Alert>}

      <TextField
        label="Current Password"
        type="password"
        value={currentPassword}
        onChange={(e) => setCurrent(e.target.value)}
      />

      <TextField
        label="New Password"
        type="password"
        value={newPassword}
        onChange={(e) => setNew(e.target.value)}
      />

      <Button variant="contained" onClick={handleSubmit}>
        Change Password
      </Button>
    </Stack>
  );
}
