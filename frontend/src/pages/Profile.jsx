import { useEffect, useState } from "react";
import {
    Box,
    Typography,
    TextField,
    Button,
    Card,
    Stack,
    Divider,
    Avatar,
    IconButton,
    Chip,
    Alert,
} from "@mui/material";

import {
    Edit,
    Close,
    Save,
    CameraAlt,
    Security,
} from "@mui/icons-material";

import {
    getProfile,
    updateProfile,
    changePassword,
} from "../services/profileService";
import { uploadAvatar } from "../services/profileService";
// import { getAuth, setAuth } from "../utils/authStorage"
import { useAuth } from "../context/AuthContext";

export default function Profile() {
    const [profile, setProfile] = useState(null);
    const [draft, setDraft] = useState(null);
    const [file, setFile] = useState(null);
    const [editMode, setEditMode] = useState(false);

    const [avatarPreview, setAvatarPreview] = useState(null);

    const [passwords, setPasswords] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const { user, updateUser } = useAuth();


    // ==========================
    // LOAD PROFILE
    // ==========================
    useEffect(() => {
        loadProfile();
    }, []);

    const loadProfile = async () => {
        try {
            setLoading(true);
            const data = await getProfile();
            setProfile(data);
            setDraft(data);
        } catch {
            setError("Failed to load profile");
        } finally {
            setLoading(false);
        }
    };

    // ==========================
    // AUTO CLEAR ALERTS
    // ==========================
    useEffect(() => {
        if (error || success) {
            const timer = setTimeout(() => {
                setError("");
                setSuccess("");
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [error, success]);

    // ==========================
    // UPDATE PROFILE
    // ==========================
    const handleSave = async () => {
        try {
            const updatedUser = await updateProfile(draft);

            setProfile(updatedUser);
            setDraft(updatedUser);
            setEditMode(false);

            updateUser(updatedUser); // 🔥 ONE SOURCE OF TRUTH

            setSuccess("Profile updated successfully");
        } catch {
            setError("Update failed");
        }
    };



    // ==========================
    // CHANGE PASSWORD
    // ==========================
    const handlePasswordChange = async () => {
        try {
            await changePassword(passwords);
            setPasswords({});
            setSuccess("Password changed successfully");
        } catch {
            setError("Password change failed");
        }
    };


    if (loading || !profile) return null;

    const hasChanges =
        JSON.stringify(profile) !== JSON.stringify(draft) ||
        Boolean(avatarPreview);

    return (
        <Box maxWidth={900}>
            {/* ================= HEADER ================= */}
            <Stack
                direction="row"
                alignItems="center"
                justifyContent="space-between"
                mb={4}
            >
                <Typography variant="h4" fontWeight={700}>
                    Profile
                </Typography>

                {!editMode ? (
                    <Button startIcon={<Edit />} onClick={() => setEditMode(true)}>
                        Edit Profile
                    </Button>
                ) : (
                    <Stack direction="row" spacing={1}>
                        <Button
                            startIcon={<Close />}
                            color="inherit"
                            onClick={() => {
                                setDraft(profile);
                                setAvatarPreview(null);
                                setEditMode(false);
                            }}
                        >
                            Cancel
                        </Button>
                        <Button
                            startIcon={<Save />}
                            variant="contained"
                            disabled={!hasChanges}
                            onClick={handleSave}
                        >
                            Save
                        </Button>
                    </Stack>
                )}
            </Stack>

            {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
            {success && <Alert severity="success" sx={{ mb: 2 }}>{success}</Alert>}

            {/* ================= BASIC INFO ================= */}
            <Card sx={{ p: 4, mb: 4 }}>
                <Stack direction="row" spacing={4} alignItems="center">
                    {/* Avatar */}
                    <Box position="relative">
                        <Avatar
                            src={avatarPreview || profile.avatar || ""}
                            sx={{ width: 96, height: 96, fontSize: 36 }}
                        >
                            {!avatarPreview && !profile.avatar && profile.ownerName?.[0]}
                        </Avatar>

                        {editMode && (
                            <IconButton
                                size="small"
                                sx={{
                                    position: "absolute",
                                    bottom: 0,
                                    right: 0,
                                    bgcolor: "background.paper",
                                    border: 1,
                                }}
                                component="label"
                            >
                                <CameraAlt fontSize="small" />
                                <input
                                    hidden
                                    type="file"
                                    accept="image/*"
                                    onChange={async (e) => {
                                        const selectedFile = e.target.files[0];
                                        if (!selectedFile) return;

                                        const preview = URL.createObjectURL(selectedFile);
                                        setAvatarPreview(preview);

                                        try {
                                            const updatedUser = await uploadAvatar(selectedFile);

                                            setProfile(updatedUser);
                                            setDraft(updatedUser);
                                            updateUser(updatedUser); // 🚀 TOPBAR UPDATES INSTANTLY

                                            setAvatarPreview(null);
                                            setSuccess("Avatar updated successfully");
                                        } catch {
                                            setError("Avatar upload failed");
                                        }
                                    }}
                                />
                            </IconButton>
                        )}
                    </Box>

                    {/* Info */}
                    <Box flex={1}>
                        <Typography variant="h6" fontWeight={600}>
                            {profile.ownerName}
                        </Typography>

                        <Stack direction="row" spacing={1} mt={1}>
                            <Chip
                                icon={<Security />}
                                label={profile.role || "Admin"}
                                color="primary"
                                size="small"
                            />
                            <Chip
                                label={profile.businessType}
                                size="small"
                                variant="outlined"
                            />
                        </Stack>
                    </Box>
                </Stack>

                <Divider sx={{ my: 3 }} />

                <Stack spacing={2}>
                    <TextField
                        label="Business Name"
                        value={draft.businessName}
                        disabled={!editMode}
                        onChange={(e) =>
                            setDraft({ ...draft, businessName: e.target.value })
                        }
                    />

                    <TextField
                        label="Owner Name"
                        value={draft.ownerName}
                        disabled={!editMode}
                        onChange={(e) =>
                            setDraft({ ...draft, ownerName: e.target.value })
                        }
                    />

                    <TextField
                        label="Email"
                        value={draft.email || ""}
                        disabled={!editMode}
                        onChange={(e) =>
                            setDraft({ ...draft, email: e.target.value })
                        }
                    />

                    <TextField
                        label="Mobile Number"
                        value={profile.mobile}
                        disabled
                        helperText="Mobile number cannot be changed"
                    />
                </Stack>
            </Card>

            {/* ================= ACCOUNT INFO ================= */}
            <Card sx={{ p: 4, mb: 4 }}>
                <Typography fontWeight={700} mb={2}>
                    Account Information
                </Typography>

                <Stack spacing={1}>
                    <Typography variant="body2">
                        <b>Status:</b> Active
                    </Typography>
                    <Typography variant="body2">
                        <b>Login Method:</b> Password
                    </Typography>
                    <Typography variant="body2">
                        <b>Account Created:</b>{" "}
                        {new Date(profile.createdAt).toLocaleDateString()}
                    </Typography>
                    <Typography variant="body2">
                        <b>Last Updated:</b>{" "}
                        {new Date(profile.updatedAt).toLocaleDateString()}
                    </Typography>
                </Stack>
            </Card>

            {/* ================= ROLE & PERMISSIONS ================= */}
            <Card sx={{ p: 4, mb: 4 }}>
                <Typography fontWeight={700} mb={2}>
                    Role & Permissions
                </Typography>

                <Stack direction="row" spacing={1} mb={2}>
                    <Chip label="Admin" color="primary" />
                    <Chip label="Full Access" variant="outlined" />
                </Stack>

                <Stack spacing={1}>
                    <Typography variant="body2">✔ Manage Customers</Typography>
                    <Typography variant="body2">✔ Manage Loans</Typography>
                    <Typography variant="body2">✔ View Analytics</Typography>
                    <Typography variant="body2">✔ System Settings</Typography>
                </Stack>
            </Card>

            {/* ================= SECURITY ================= */}
            <Card sx={{ p: 4 }}>
                <Typography fontWeight={700} mb={2}>
                    Security
                </Typography>

                <Stack spacing={2}>
                    <TextField
                        type="password"
                        label="Current Password"
                        value={passwords.currentPassword || ""}
                        onChange={(e) =>
                            setPasswords({ ...passwords, currentPassword: e.target.value })
                        }
                    />
                    <TextField
                        type="password"
                        label="New Password"
                        value={passwords.newPassword || ""}
                        onChange={(e) =>
                            setPasswords({ ...passwords, newPassword: e.target.value })
                        }
                    />
                    <Button
                        variant="outlined"
                        sx={{ alignSelf: "flex-start" }}
                        onClick={handlePasswordChange}
                    >
                        Update Password
                    </Button>
                </Stack>
            </Card>
        </Box>
    );
}
