import { useState } from 'react';
import {
  Box,
  Typography,
  Button,
  Card,
  CardContent,
  Stack,
  TextField,
  InputAdornment,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  IconButton,
  Chip,
  Divider,
  Badge,
  List,
  ListItem,
  Collapse,
  Avatar,
} from '@mui/material';
import {
  Search,
  Settings,
  CheckCircle,
  Warning,
  Receipt,
  Info,
  Visibility,
  Send,
  Delete,
  Circle,
  KeyboardArrowDown,
  KeyboardArrowUp,
  Payment,
  Person,
  NotificationsActive,
  Done,
} from '@mui/icons-material';

// ============================================
// MOCK DATA
// ============================================

const notificationsData = [
  {
    id: 1,
    type: 'payment-due',
    priority: 'high',
    title: 'Payment overdue from Rajesh Kumar',
    description: '₹45,000 pending since 12 days – Invoice #1245',
    timestamp: '2 hours ago',
    date: '2026-01-06T08:30:00',
    isRead: false,
    customerName: 'Rajesh Kumar',
    invoiceId: 'INV-001245',
    amount: 45000,
    dueDate: '2025-12-25',
    overdueDays: 12,
  },
  {
    id: 2,
    type: 'payment-received',
    priority: 'medium',
    title: 'Payment received from Priya Sharma',
    description: '₹78,500 received via UPI – Invoice #1246',
    timestamp: '3 hours ago',
    date: '2026-01-06T07:15:00',
    isRead: false,
    customerName: 'Priya Sharma',
    invoiceId: 'INV-001246',
    amount: 78500,
    paymentMode: 'UPI',
  },
  {
    id: 3,
    type: 'gst-tax',
    priority: 'high',
    title: 'GST Return filing due in 5 days',
    description: 'GSTR-3B for December 2025 must be filed by Jan 20, 2026',
    timestamp: '5 hours ago',
    date: '2026-01-06T05:00:00',
    isRead: false,
    gstPeriod: 'December 2025',
    dueDate: '2026-01-20',
    returnType: 'GSTR-3B',
  },
  {
    id: 4,
    type: 'payment-due',
    priority: 'high',
    title: 'Payment overdue from Amit Patel',
    description: '₹1,25,000 pending since 28 days – Invoice #1243',
    timestamp: 'Yesterday',
    date: '2026-01-05T14:20:00',
    isRead: false,
    customerName: 'Amit Patel',
    invoiceId: 'INV-001243',
    amount: 125000,
    dueDate: '2025-12-09',
    overdueDays: 28,
  },
  {
    id: 5,
    type: 'payment-received',
    priority: 'medium',
    title: 'Payment received from Sneha Reddy',
    description: '₹32,000 received via Bank Transfer – Invoice #1247',
    timestamp: 'Yesterday',
    date: '2026-01-05T11:45:00',
    isRead: true,
    customerName: 'Sneha Reddy',
    invoiceId: 'INV-001247',
    amount: 32000,
    paymentMode: 'Bank Transfer',
  },
  {
    id: 6,
    type: 'system',
    priority: 'low',
    title: 'Data backup completed successfully',
    description: 'Your business data was backed up on Jan 5, 2026 at 11:30 PM',
    timestamp: 'Yesterday',
    date: '2026-01-05T23:30:00',
    isRead: true,
  },
  {
    id: 7,
    type: 'payment-due',
    priority: 'medium',
    title: 'Payment due from Vikram Singh in 3 days',
    description: '₹56,000 due on Jan 9, 2026 – Invoice #1248',
    timestamp: '2 days ago',
    date: '2026-01-04T10:00:00',
    isRead: true,
    customerName: 'Vikram Singh',
    invoiceId: 'INV-001248',
    amount: 56000,
    dueDate: '2026-01-09',
  },
  {
    id: 8,
    type: 'gst-tax',
    priority: 'medium',
    title: 'GST payment of ₹30,360 is due',
    description: 'Net GST liability for December 2025 – Due by Jan 20, 2026',
    timestamp: '3 days ago',
    date: '2026-01-03T09:00:00',
    isRead: true,
    amount: 30360,
    dueDate: '2026-01-20',
  },
  {
    id: 9,
    type: 'system',
    priority: 'low',
    title: 'New feature: Export to Excel available',
    description: 'You can now export all reports to Excel format',
    timestamp: '4 days ago',
    date: '2026-01-02T15:00:00',
    isRead: true,
  },
  {
    id: 10,
    type: 'payment-received',
    priority: 'medium',
    title: 'Payment received from Anita Desai',
    description: '₹1,56,000 received via Cheque – Invoice #1244',
    timestamp: '5 days ago',
    date: '2026-01-01T16:30:00',
    isRead: true,
    customerName: 'Anita Desai',
    invoiceId: 'INV-001244',
    amount: 156000,
    paymentMode: 'Cheque',
  },
];

// ============================================
// UTILITY FUNCTIONS
// ============================================

const formatCurrency = (amount) => {
  return `₹${Math.abs(amount).toLocaleString('en-IN')}`;
};

const getNotificationIcon = (type) => {
  switch (type) {
    case 'payment-due':
      return <Warning sx={{ fontSize: 24 }} />;
    case 'payment-received':
      return <CheckCircle sx={{ fontSize: 24 }} />;
    case 'gst-tax':
      return <Receipt sx={{ fontSize: 24 }} />;
    case 'system':
      return <Info sx={{ fontSize: 24 }} />;
    default:
      return <Info sx={{ fontSize: 24 }} />;
  }
};

const getNotificationColor = (type) => {
  switch (type) {
    case 'payment-due':
      return '#f57c00';
    case 'payment-received':
      return '#2e7d32';
    case 'gst-tax':
      return '#1976d2';
    case 'system':
      return '#757575';
    default:
      return '#757575';
  }
};

const getPriorityColor = (priority) => {
  switch (priority) {
    case 'high':
      return '#d32f2f';
    case 'medium':
      return '#f57c00';
    case 'low':
      return '#757575';
    default:
      return '#757575';
  }
};

// ============================================
// NOTIFICATION ITEM COMPONENT
// ============================================

function NotificationItem({ notification, onMarkAsRead, onDelete }) {
  const [expanded, setExpanded] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const iconColor = getNotificationColor(notification.type);
  const priorityColor = getPriorityColor(notification.priority);

  return (
    <Card
      sx={{
        mb: 2,
        borderLeft: `4px solid ${priorityColor}`,
        backgroundColor: notification.isRead ? '#fafafa' : '#fff',
        position: 'relative',
        '&:hover': {
          boxShadow: 3,
        },
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <CardContent>
        <Stack direction="row" spacing={2} alignItems="flex-start">
          {/* Icon */}
          <Box
            sx={{
              backgroundColor: `${iconColor}15`,
              borderRadius: 2,
              p: 1,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {getNotificationIcon(notification.type)}
          </Box>

          {/* Content */}
          <Box sx={{ flex: 1 }}>
            <Stack direction="row" spacing={1} alignItems="center" mb={0.5}>
              <Typography variant="body1" sx={{ fontWeight: 600 }}>
                {notification.title}
              </Typography>
              {!notification.isRead && (
                <Circle sx={{ fontSize: 10, color: '#1976d2' }} />
              )}
            </Stack>

            <Typography variant="body2" color="text.secondary" mb={1}>
              {notification.description}
            </Typography>

            <Stack direction="row" spacing={2} alignItems="center">
              <Typography variant="caption" color="text.secondary">
                {notification.timestamp}
              </Typography>
              {notification.priority === 'high' && (
                <Chip
                  label="High Priority"
                  size="small"
                  color="error"
                  sx={{ height: 20 }}
                />
              )}
            </Stack>

            {/* Expanded Details */}
            <Collapse in={expanded} timeout="auto" unmountOnExit>
              <Divider sx={{ my: 2 }} />
              <Box
                sx={{
                  backgroundColor: '#f5f5f5',
                  borderRadius: 2,
                  p: 2,
                }}
              >
                <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 2 }}>
                  Details
                </Typography>

                <Box
                  sx={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(2, 1fr)',
                    gap: 2,
                  }}
                >
                  {notification.customerName && (
                    <Box>
                      <Typography variant="caption" color="text.secondary">
                        Customer
                      </Typography>
                      <Typography variant="body2" sx={{ fontWeight: 600 }}>
                        {notification.customerName}
                      </Typography>
                    </Box>
                  )}

                  {notification.invoiceId && (
                    <Box>
                      <Typography variant="caption" color="text.secondary">
                        Invoice ID
                      </Typography>
                      <Typography variant="body2" sx={{ fontWeight: 600 }}>
                        {notification.invoiceId}
                      </Typography>
                    </Box>
                  )}

                  {notification.amount && (
                    <Box>
                      <Typography variant="caption" color="text.secondary">
                        Amount
                      </Typography>
                      <Typography variant="body2" sx={{ fontWeight: 600 }}>
                        {formatCurrency(notification.amount)}
                      </Typography>
                    </Box>
                  )}

                  {notification.dueDate && (
                    <Box>
                      <Typography variant="caption" color="text.secondary">
                        Due Date
                      </Typography>
                      <Typography variant="body2" sx={{ fontWeight: 600 }}>
                        {new Date(notification.dueDate).toLocaleDateString('en-IN')}
                      </Typography>
                    </Box>
                  )}

                  {notification.overdueDays && (
                    <Box>
                      <Typography variant="caption" color="text.secondary">
                        Overdue By
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{ fontWeight: 600, color: '#d32f2f' }}
                      >
                        {notification.overdueDays} days
                      </Typography>
                    </Box>
                  )}

                  {notification.paymentMode && (
                    <Box>
                      <Typography variant="caption" color="text.secondary">
                        Payment Mode
                      </Typography>
                      <Typography variant="body2" sx={{ fontWeight: 600 }}>
                        {notification.paymentMode}
                      </Typography>
                    </Box>
                  )}
                </Box>

                {/* Quick Actions */}
                <Stack direction="row" spacing={1} mt={2}>
                  {notification.type === 'payment-due' && (
                    <Button
                      size="small"
                      variant="contained"
                      startIcon={<Payment />}
                      sx={{
                        backgroundColor: '#2e7d32',
                        textTransform: 'none',
                        fontWeight: 600,
                      }}
                    >
                      Collect Payment
                    </Button>
                  )}

                  {notification.customerName && (
                    <Button
                      size="small"
                      variant="outlined"
                      startIcon={<Person />}
                      sx={{ textTransform: 'none' }}
                    >
                      View Customer
                    </Button>
                  )}

                  {notification.invoiceId && (
                    <Button
                      size="small"
                      variant="outlined"
                      startIcon={<Visibility />}
                      sx={{ textTransform: 'none' }}
                    >
                      Open Transaction
                    </Button>
                  )}
                </Stack>
              </Box>
            </Collapse>
          </Box>

          {/* Action Buttons */}
          <Stack
            direction="row"
            spacing={0.5}
            sx={{
              opacity: isHovered ? 1 : 0,
              transition: 'opacity 0.2s',
            }}
          >
            <IconButton
              size="small"
              onClick={() => setExpanded(!expanded)}
              sx={{ color: '#1976d2' }}
            >
              {expanded ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
            </IconButton>

            {notification.type === 'payment-due' && (
              <IconButton size="small" sx={{ color: '#1976d2' }} title="Send Reminder">
                <Send />
              </IconButton>
            )}

            <IconButton
              size="small"
              onClick={() => onMarkAsRead(notification.id)}
              sx={{ color: '#1976d2' }}
              title={notification.isRead ? 'Mark as Unread' : 'Mark as Read'}
            >
              <Done />
            </IconButton>

            <IconButton
              size="small"
              onClick={() => onDelete(notification.id)}
              sx={{ color: '#d32f2f' }}
              title="Dismiss"
            >
              <Delete />
            </IconButton>
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  );
}
// ============================================
// EMPTY STATE COMPONENT
// ============================================

function EmptyState({ message, submessage }) {
  return (
    <Box
      sx={{
        textAlign: 'center',
        py: 8,
      }}
    >
      <NotificationsActive
        sx={{ fontSize: 80, color: '#bdbdbd', mb: 2 }}
      />
      <Typography
        variant="h6"
        sx={{ fontWeight: 600, color: '#757575', mb: 1 }}
      >
        {message}
      </Typography>
      {submessage && (
        <Typography variant="body2" color="text.secondary">
          {submessage}
        </Typography>
      )}
    </Box>
  );
}

// ============================================
// MAIN NOTIFICATIONS PAGE COMPONENT
// ============================================

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState(notificationsData);
  const [searchQuery, setSearchQuery] = useState('');
  const [typeFilter, setTypeFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [priorityFilter, setPriorityFilter] = useState('all');
  const [activeCategory, setActiveCategory] = useState('all');

  // Calculate summary counts
  const paymentDueCount = notifications.filter(
    (n) => n.type === 'payment-due' && !n.isRead
  ).length;

  const paymentReceivedCount = notifications.filter(
    (n) => n.type === 'payment-received' && !n.isRead
  ).length;

  const gstTaxCount = notifications.filter(
    (n) => n.type === 'gst-tax' && !n.isRead
  ).length;

  const systemCount = notifications.filter(
    (n) => n.type === 'system' && !n.isRead
  ).length;

  const unreadCount = notifications.filter((n) => !n.isRead).length;

  // Mark all as read
  const handleMarkAllAsRead = () => {
    setNotifications(
      notifications.map((n) => ({ ...n, isRead: true }))
    );
  };

  // Mark individual as read/unread
  const handleMarkAsRead = (id) => {
    setNotifications(
      notifications.map((n) =>
        n.id === id ? { ...n, isRead: !n.isRead } : n
      )
    );
  };

  // Delete notification
  const handleDelete = (id) => {
    setNotifications(
      notifications.filter((n) => n.id !== id)
    );
  };

  // Filter notifications
  const filteredNotifications = notifications.filter((notification) => {
    const searchLower = searchQuery.toLowerCase();

    const matchesSearch =
      notification.title.toLowerCase().includes(searchLower) ||
      notification.description.toLowerCase().includes(searchLower) ||
      notification.customerName?.toLowerCase().includes(searchLower) ||
      notification.invoiceId?.toLowerCase().includes(searchLower);

    if (!matchesSearch) return false;

    if (
      activeCategory !== 'all' &&
      notification.type !== activeCategory
    ) {
      return false;
    }

    if (
      typeFilter !== 'all' &&
      notification.type !== typeFilter
    ) {
      return false;
    }

    if (statusFilter === 'unread' && notification.isRead)
      return false;

    if (statusFilter === 'read' && !notification.isRead)
      return false;

    if (
      priorityFilter !== 'all' &&
      notification.priority !== priorityFilter
    ) {
      return false;
    }

    return true;
  });

  return (
    <Box sx={{ backgroundColor: '#F5F7FA', minHeight: '100vh', p: 4 }}>
      {/* PAGE HEADER */}
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        mb={4}
      >
        <Box>
          <Typography
            variant="h4"
            sx={{ fontWeight: 700, mb: 0.5, color: '#1a1a1a' }}
          >
            Notifications
          </Typography>
          <Typography variant="body2" sx={{ color: '#757575' }}>
            Important alerts & reminders for your business
          </Typography>
        </Box>

        <Stack direction="row" spacing={2} alignItems="center">
          <Badge badgeContent={unreadCount} color="error">
            <Chip
              label={`${unreadCount} Unread`}
              sx={{
                fontWeight: 600,
                backgroundColor: '#e3f2fd',
              }}
            />
          </Badge>

          <Button
            variant="text"
            onClick={handleMarkAllAsRead}
            sx={{ textTransform: 'none', fontWeight: 600 }}
            disabled={unreadCount === 0}
          >
            Mark all as read
          </Button>

          <IconButton sx={{ color: '#1976d2' }}>
            <Settings />
          </IconButton>
        </Stack>
      </Stack>

      {/* NOTIFICATION SUMMARY CARDS */}
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: 3,
          mb: 4,
        }}
      >
        {/* Payment Due */}
        <Card
          sx={{
            borderLeft: '4px solid #f57c00',
            cursor: 'pointer',
            backgroundColor:
              activeCategory === 'payment-due'
                ? '#fff3e0'
                : 'white',
            '&:hover': { boxShadow: 3 },
          }}
          onClick={() =>
            setActiveCategory(
              activeCategory === 'payment-due'
                ? 'all'
                : 'payment-due'
            )
          }
        >
          <CardContent>
            <Stack direction="row" spacing={2} alignItems="center">
              <Box
                sx={{
                  backgroundColor: '#fff3e0',
                  borderRadius: 2,
                  p: 1.5,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Warning sx={{ color: '#f57c00', fontSize: 32 }} />
              </Box>
              <Box sx={{ flex: 1 }}>
                <Typography variant="body2" color="text.secondary">
                  Payment Due
                </Typography>
                <Typography
                  variant="h4"
                  sx={{ fontWeight: 700, color: '#f57c00' }}
                >
                  {paymentDueCount}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  payments overdue
                </Typography>
              </Box>
            </Stack>
          </CardContent>
        </Card>

        {/* Payment Received */}
        <Card
          sx={{
            borderLeft: '4px solid #2e7d32',
            cursor: 'pointer',
            backgroundColor:
              activeCategory === 'payment-received'
                ? '#e8f5e9'
                : 'white',
            '&:hover': { boxShadow: 3 },
          }}
          onClick={() =>
            setActiveCategory(
              activeCategory === 'payment-received'
                ? 'all'
                : 'payment-received'
            )
          }
        >
          <CardContent>
            <Stack direction="row" spacing={2} alignItems="center">
              <Box
                sx={{
                  backgroundColor: '#e8f5e9',
                  borderRadius: 2,
                  p: 1.5,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <CheckCircle sx={{ color: '#2e7d32', fontSize: 32 }} />
              </Box>
              <Box sx={{ flex: 1 }}>
                <Typography variant="body2" color="text.secondary">
                  Payment Received
                </Typography>
                <Typography
                  variant="h4"
                  sx={{ fontWeight: 700, color: '#2e7d32' }}
                >
                  {paymentReceivedCount}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  new payments today
                </Typography>
              </Box>
            </Stack>
          </CardContent>
        </Card>

        {/* GST & Tax */}
        <Card
          sx={{
            borderLeft: '4px solid #1976d2',
            cursor: 'pointer',
            backgroundColor:
              activeCategory === 'gst-tax'
                ? '#e3f2fd'
                : 'white',
            '&:hover': { boxShadow: 3 },
          }}
          onClick={() =>
            setActiveCategory(
              activeCategory === 'gst-tax' ? 'all' : 'gst-tax'
            )
          }
        >
          <CardContent>
            <Stack direction="row" spacing={2} alignItems="center">
              <Box
                sx={{
                  backgroundColor: '#e3f2fd',
                  borderRadius: 2,
                  p: 1.5,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Receipt sx={{ color: '#1976d2', fontSize: 32 }} />
              </Box>
              <Box sx={{ flex: 1 }}>
                <Typography variant="body2" color="text.secondary">
                  GST & Tax Alerts
                </Typography>
                <Typography
                  variant="h4"
                  sx={{ fontWeight: 700, color: '#1976d2' }}
                >
                  {gstTaxCount}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  GST due in 5 days
                </Typography>
              </Box>
            </Stack>
          </CardContent>
        </Card>

        {/* System */}
        <Card
          sx={{
            borderLeft: '4px solid #757575',
            cursor: 'pointer',
            backgroundColor:
              activeCategory === 'system'
                ? '#f5f5f5'
                : 'white',
            '&:hover': { boxShadow: 3 },
          }}
          onClick={() =>
            setActiveCategory(
              activeCategory === 'system' ? 'all' : 'system'
            )
          }
        >
          <CardContent>
            <Stack direction="row" spacing={2} alignItems="center">
              <Box
                sx={{
                  backgroundColor: '#f5f5f5',
                  borderRadius: 2,
                  p: 1.5,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Info sx={{ color: '#757575', fontSize: 32 }} />
              </Box>
              <Box sx={{ flex: 1 }}>
                <Typography variant="body2" color="text.secondary">
                  System / Account
                </Typography>
                <Typography
                  variant="h4"
                  sx={{ fontWeight: 700, color: '#757575' }}
                >
                  {systemCount}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  system notifications
                </Typography>
              </Box>
            </Stack>
          </CardContent>
        </Card>
      </Box>

      {/* FILTER & SEARCH BAR */}
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Stack spacing={2}>
            <TextField
              placeholder="Search by customer, invoice, or message"
              size="small"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              fullWidth
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Search />
                  </InputAdornment>
                ),
              }}
            />

            <Stack direction="row" spacing={2}>
              <FormControl size="small" sx={{ flex: 1 }}>
                <InputLabel>Notification Type</InputLabel>
                <Select
                  value={typeFilter}
                  label="Notification Type"
                  onChange={(e) => setTypeFilter(e.target.value)}
                >
                  <MenuItem value="all">All</MenuItem>
                  <MenuItem value="payment-due">Payment Due</MenuItem>
                  <MenuItem value="payment-received">
                    Payment Received
                  </MenuItem>
                  <MenuItem value="gst-tax">GST & Tax</MenuItem>
                  <MenuItem value="system">System</MenuItem>
                </Select>
              </FormControl>

              <FormControl size="small" sx={{ flex: 1 }}>
                <InputLabel>Status</InputLabel>
                <Select
                  value={statusFilter}
                  label="Status"
                  onChange={(e) => setStatusFilter(e.target.value)}
                >
                  <MenuItem value="all">All</MenuItem>
                  <MenuItem value="unread">Unread</MenuItem>
                  <MenuItem value="read">Read</MenuItem>
                </Select>
              </FormControl>

              <FormControl size="small" sx={{ flex: 1 }}>
                <InputLabel>Priority</InputLabel>
                <Select
                  value={priorityFilter}
                  label="Priority"
                  onChange={(e) => setPriorityFilter(e.target.value)}
                >
                  <MenuItem value="all">All</MenuItem>
                  <MenuItem value="high">High</MenuItem>
                  <MenuItem value="medium">Medium</MenuItem>
                  <MenuItem value="low">Low</MenuItem>
                </Select>
              </FormControl>

              <FormControl size="small" sx={{ flex: 1 }}>
                <InputLabel>Date Range</InputLabel>
                <Select defaultValue="all" label="Date Range">
                  <MenuItem value="all">All Time</MenuItem>
                  <MenuItem value="today">Today</MenuItem>
                  <MenuItem value="this-week">This Week</MenuItem>
                  <MenuItem value="custom">Custom Range</MenuItem>
                </Select>
              </FormControl>
            </Stack>
          </Stack>
        </CardContent>
      </Card>

      {/* NOTIFICATIONS LIST */}
      {filteredNotifications.length === 0 ? (
        <Card>
          <CardContent>
            <EmptyState
              message={
                unreadCount === 0 &&
                  searchQuery === '' &&
                  activeCategory === 'all'
                  ? "You're all caught up 🎉"
                  : 'No notifications match your filters'
              }
              submessage={
                searchQuery || activeCategory !== 'all'
                  ? 'Try adjusting your search or filters'
                  : 'All your notifications have been read'
              }
            />
          </CardContent>
        </Card>
      ) : (
        <Box>
          {filteredNotifications.map((notification) => (
            <NotificationItem
              key={notification.id}
              notification={notification}
              onMarkAsRead={handleMarkAsRead}
              onDelete={handleDelete}
            />
          ))}
        </Box>
      )}
    </Box>
  );
}

