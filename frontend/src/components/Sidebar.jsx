import {
  Drawer,
  Box,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  Divider,
} from "@mui/material";

import {
  Dashboard,
  CreditCard,
  People,
  SwapHoriz,
  BarChart,
  Notifications,
  Settings,
} from "@mui/icons-material";

import { NavLink } from "react-router-dom";

const drawerWidth = 260;

const menuItems = [
  { icon: Dashboard, label: "Dashboard", path: "/dashboard" },
  { icon: CreditCard, label: "Loans", path: "/loans" },
  { icon: People, label: "Customers", path: "/customers" },
  { icon: SwapHoriz, label: "Transactions", path: "/transactions" },
  { icon: BarChart, label: "Analytics", path: "/analytics" },
  { icon: Notifications, label: "Notifications", path: "/notifications" },
  { icon: Settings, label: "Settings", path: "/settings" },
];

export function Sidebar() {
  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        [`& .MuiDrawer-paper`]: {
          width: drawerWidth,
          boxSizing: "border-box",
        },
      }}
    >
      {/* Logo */}
      <Box sx={{ height: 64, px: 2, display: "flex", alignItems: "center", gap: 1.5 }}>
        <Box
          sx={{
            width: 32,
            height: 32,
            bgcolor: "primary.main",
            color: "primary.contrastText",
            borderRadius: 1,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontWeight: 700,
          }}
        >
          K
        </Box>

        <Typography variant="h6" fontWeight={600}>
          KiranaBook
        </Typography>
      </Box>

      <Divider />

      {/* Menu */}
      <List sx={{ px: 1, py: 1 }}>
        {menuItems.map((item) => {
          const Icon = item.icon;

          return (
            <NavLink
              key={item.label}
              to={item.path}
              style={{ textDecoration: "none", color: "inherit" }}
            >
              {({ isActive }) => (
                <ListItemButton
                  selected={isActive}
                  sx={{ borderRadius: 2, mb: 0.5 }}
                >
                  <ListItemIcon
                    sx={{
                      color: isActive ? "primary.main" : "text.secondary",
                      minWidth: 40,
                    }}
                  >
                    <Icon />
                  </ListItemIcon>

                  <ListItemText
                    primary={item.label}
                    primaryTypographyProps={{
                      fontWeight: isActive ? 600 : 500,
                    }}
                  />
                </ListItemButton>
              )}
            </NavLink>
          );
        })}
      </List>
    </Drawer>
  );
}
