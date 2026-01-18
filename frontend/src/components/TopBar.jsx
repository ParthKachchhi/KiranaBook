import {
  AppBar,
  Toolbar,
  Box,
  TextField,
  IconButton,
  Typography,
  Avatar,
  Badge,
  Menu,
  MenuItem,
  Button,
} from "@mui/material";

import {
  Search,
  Notifications,
  ExpandMore,
} from "@mui/icons-material";

import { useEffect, useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { clearAuth, getAuth } from "../utils/authStorage";
// import { getProfile } from "../services/profileService";
import { useAuth } from "../context/AuthContext";

const drawerWidth = 260;

export function TopBar() {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const { user, loading, logout } = useAuth();
  // const [user, setUser] = useState(null);

  // 🔐 Get logged-in user
  // useEffect(() => {
  //   const load = async () => {
  //     try {
  //       const auth = getAuth();
  //       if (!auth?.token) return;

  //       const profile = await getProfile();
  //       setUser(profile);
  //     } catch {
  //       clearAuth();
  //       navigate("/auth", { replace: true });
  //     }
  //   };

  //   load();
  // }, [navigate]);
  // const auth = getAuth();
  // const user = auth?.user;

  // 🔤 Avatar initials (safe)
  // const initials = useMemo(() => {
  //   if (!user?.ownerName) return "U";
  //   return user.ownerName
  //     .split(" ")
  //     .map(n => n[0])
  //     .join("")
  //     .toUpperCase();
  // }, [user]);
  if (loading || !user) return null;

  const initials = user.ownerName
    ?.split(" ")
    .map(n => n[0])
    .join("")
    .toUpperCase();

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    handleMenuClose();
    // clearAuth();
    logout();
    navigate("/auth", { replace: true });
  };

  // 🚨 Safety: if no auth, don’t render TopBar
  // if (!auth?.token) return null;
  // if (loading) return null;
  // if (!user) return null;

  return (
    <AppBar
      position="fixed"
      elevation={0}
      color="inherit"
      sx={{
        width: `calc(100% - ${drawerWidth}px)`,
        ml: `${drawerWidth}px`,
        borderBottom: 1,
        borderColor: "divider",
      }}
    >
      <Toolbar sx={{ gap: 2 }}>
        {/* 🔍 Search */}
        <TextField
          size="small"
          placeholder="Search customers, loans, transactions…"
          InputProps={{
            startAdornment: (
              <Search sx={{ color: "text.secondary", mr: 1 }} />
            ),
          }}
          sx={{ width: 360 }}
        />

        <Box sx={{ flexGrow: 1 }} />

        {/* 📅 Financial Year */}
        <Button
          endIcon={<ExpandMore />}
          sx={{ textTransform: "none" }}
        >
          FY 2024–25
        </Button>

        {/* 🔔 Notifications */}
        <IconButton>
          <Badge variant="dot" color="error">
            <Notifications />
          </Badge>
        </IconButton>

        {/* 👤 User Menu */}
        <Button
          onClick={handleMenuOpen}
          endIcon={<ExpandMore />}
          sx={{ textTransform: "none", pl: 1, pr: 2 }}
        >
          {/* <Avatar
            src={user.avatar || ""}
            sx={{
              width: 32,
              height: 32,
              bgcolor: "primary.main",
              mr: 1,
              fontSize: 14,
            }}
          >
            {!user?.avatar && initials}
          </Avatar> */}
          <Avatar src={user.avatar || ""}>
            {!user.avatar && initials}
          </Avatar>

          <Box textAlign="left">
            <Typography variant="body2" fontWeight={600}>
              {user?.ownerName}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              {user?.businessType}
            </Typography>
          </Box>
        </Button>


        {/* ⬇️ Dropdown */}
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
          transformOrigin={{ vertical: "top", horizontal: "right" }}
        >
          <MenuItem
            onClick={() => {
              handleMenuClose();
              navigate("/profile");
            }}
          >
            Profile
          </MenuItem>

          <MenuItem onClick={handleMenuClose}>
            Settings
          </MenuItem>

          <MenuItem onClick={handleLogout}>
            🚪 Logout
          </MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
}
