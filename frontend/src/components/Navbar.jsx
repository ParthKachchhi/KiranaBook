import { AppBar, Toolbar, Typography } from "@mui/material";

export default function Navbar() {
  return (
    <AppBar
      position="static"
      sx={{
        background: "linear-gradient(90deg, #673ab7, #2196f3)"
      }}
    >
      <Toolbar>
        <Typography variant="h6">KhataBook</Typography>
      </Toolbar>
    </AppBar>
  );
}
