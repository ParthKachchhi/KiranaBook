import {
  Stack,
  Button,
} from "@mui/material";

import {
  Add,
  PersonAdd,
  Payments,
  Description,
} from "@mui/icons-material";

export function QuickActions() {
  const actions = [
    {
      icon: <Add />,
      label: "New Loan",
      color: "primary",
    },
    {
      icon: <PersonAdd />,
      label: "Add Customer",
      color: "success",
    },
    {
      icon: <Payments />,
      label: "Record Payment",
      color: "warning",
    },
    {
      icon: <Description />,
      label: "Generate Statement",
      color: "inherit",
    },
  ];

  return (
    <Stack
      direction="row"
      spacing={2}
      useFlexGap
      flexWrap="wrap"
    >
      {actions.map((action) => (
        <Button
          key={action.label}
          variant="contained"
          color={action.color}
          startIcon={action.icon}
          sx={{
            px: 3,
            py: 1.5,
            borderRadius: 2,
            textTransform: "none",
            fontWeight: 600,
          }}
        >
          {action.label}
        </Button>
      ))}
    </Stack>
  );
}
