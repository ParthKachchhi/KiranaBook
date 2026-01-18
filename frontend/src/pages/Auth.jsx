import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import {
    Box,
    Typography,
    TextField,
    Button,
    Card,
    CardContent,
    Stack,
    Divider,
    Checkbox,
    FormControlLabel,
    InputAdornment,
    IconButton,
    Link,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    LinearProgress,
    Alert,
} from '@mui/material';

import {
    Visibility,
    VisibilityOff,
    Lock,
    Phone,
    Email,
    Business,
    Person,
    CheckCircle,
    Shield,
    AccountBalance,
} from '@mui/icons-material';
import { useNavigate } from "react-router-dom";
import { loginUser, signupUser, sendForgotOTP, resetPassword, sendLoginOTP, verifyLoginOTP } from "../services/authService";
import { setAuth } from "../utils/authStorage";


// ============================================
// LOGIN PAGE COMPONENT
// ============================================

function LoginPage({ onSwitchToSignup }) {
    const [loginMethod, setLoginMethod] = useState('password');
    const [mobileOrEmail, setMobileOrEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [rememberMe, setRememberMe] = useState(false);
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const [forgotMode, setForgotMode] = useState(false);
    const [otpSent, setOtpSent] = useState(false);
    const [otp, setOtp] = useState("");
    const [newPassword, setNewPassword] = useState("");


    const validateForm = () => {
        const newErrors = {};

        if (!mobileOrEmail.trim()) {
            newErrors.mobileOrEmail = 'Mobile number or email is required';
        }

        if (loginMethod === 'password' && !password) {
            newErrors.password = 'Password is required';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleLogin = async () => {

        if (!validateForm()) return;

        try {

            setLoading(true);
            setErrors({});

            const payload = {
                identifier: mobileOrEmail, // mobile OR email
                password,
            };

            const data = await loginUser(payload);

            // SAVE TOKEN + USER
            setAuth(data, rememberMe);

            // REDIRECT
            navigate("/dashboard", { replace: true });

        } catch (err) {
            setErrors({
                form: err.response?.data?.message || "Login failed",
            });
        } finally {
            setLoading(false);
        }
    };

    // ================= LOGIN VIA OTP =================
    const handleSendLoginOTP = async () => {
        if (!mobileOrEmail.trim()) {
            setErrors({ mobileOrEmail: "Mobile or email required" });
            return;
        }

        try {
            setLoading(true);
            setErrors({});
            await sendLoginOTP({ identifier: mobileOrEmail });
            setOtpSent(true);
        } catch (err) {
            setErrors({ form: err.response?.data?.message || "Failed to send OTP" });
        } finally {
            setLoading(false);
        }
    };

    const handleVerifyLoginOTP = async () => {
        if (!otp.trim()) {
            setErrors({ form: "OTP is required" });
            return;
        }

        try {
            setLoading(true);
            const data = await verifyLoginOTP({
                identifier: mobileOrEmail,
                otp,
            });

            setAuth(data, true);
            navigate("/dashboard", { replace: true });

        } catch (err) {
            setErrors({ form: err.response?.data?.message || "Invalid OTP" });
        } finally {
            setLoading(false);
        }
    };


    const isFormValid = mobileOrEmail.trim() && (loginMethod === 'otp' || password);

    return (
        <Box>
            <Typography variant="h4" sx={{ fontWeight: 700, mb: 1, color: '#1a1a1a' }}>
                Welcome back
            </Typography>

            <Typography variant="body2" sx={{ color: '#757575', mb: 4 }}>
                Manage your business accounts securely
            </Typography>

            {errors.form && (
                <Alert severity="error" sx={{ mb: 3 }}>
                    {errors.form}
                </Alert>
            )}
            {/* ================= FORGOT PASSWORD UI ================= */}
            {forgotMode && (
                <Stack spacing={3} sx={{ mb: 2 }}>
                    {!otpSent ? (
                        <>
                            <Typography variant="subtitle1" fontWeight={600}>
                                Reset your password
                            </Typography>

                            <TextField
                                fullWidth
                                label="Mobile Number or Email"
                                value={mobileOrEmail}
                                onChange={(e) => setMobileOrEmail(e.target.value)}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <Phone />
                                        </InputAdornment>
                                    ),
                                }}
                            />

                            <Button
                                variant="contained"
                                onClick={async () => {
                                    try {
                                        setLoading(true);
                                        await sendForgotOTP({ identifier: mobileOrEmail });
                                        setOtpSent(true);
                                        setErrors({});
                                    } catch {
                                        setErrors({ form: "Failed to send OTP" });
                                    } finally {
                                        setLoading(false);
                                    }
                                }}
                            >
                                Send OTP
                            </Button>
                        </>
                    ) : (
                        <>
                            <TextField
                                fullWidth
                                label="OTP"
                                value={otp}
                                onChange={(e) => setOtp(e.target.value)}
                            />

                            <TextField
                                fullWidth
                                type="password"
                                label="New Password"
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                            />

                            <Button
                                variant="contained"
                                onClick={async () => {
                                    try {
                                        setLoading(true);
                                        await resetPassword({
                                            identifier: mobileOrEmail,
                                            otp,
                                            newPassword,
                                        });
                                        setForgotMode(false);
                                        setOtpSent(false);
                                        setOtp("");
                                        setNewPassword("");
                                    } catch {
                                        setErrors({ form: "Invalid or expired OTP" });
                                    } finally {
                                        setLoading(false);
                                    }
                                }}
                            >
                                Reset Password
                            </Button>
                        </>
                    )}

                    <Button
                        variant="text"
                        onClick={() => {
                            setForgotMode(false);
                            setOtpSent(false);
                        }}
                    >
                        Back to Login
                    </Button>
                </Stack>
            )}

            {!otpSent && !forgotMode && (
                <Stack spacing={3}>
                    {/* Mobile / Email Input */}
                    <TextField
                        fullWidth
                        label="Mobile Number / Email"
                        placeholder="Enter your mobile or email"
                        value={mobileOrEmail}
                        onChange={(e) => setMobileOrEmail(e.target.value)}
                        error={!!errors.mobileOrEmail}
                        helperText={errors.mobileOrEmail}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <Phone sx={{ color: '#757575' }} />
                                </InputAdornment>
                            ),
                        }}
                    />

                    {/* Password Input (only for password login) */}
                    {loginMethod === 'password' && (
                        <TextField
                            fullWidth
                            type={showPassword ? 'text' : 'password'}
                            label="Password"
                            placeholder="Enter your password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            error={!!errors.password}
                            helperText={errors.password}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <Lock sx={{ color: '#757575' }} />
                                    </InputAdornment>
                                ),
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton
                                            onClick={() => setShowPassword(!showPassword)}
                                            edge="end"
                                        >
                                            {showPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                ),
                            }}
                        />
                    )}

                    {/* Remember Me & Forgot Password */}
                    {loginMethod === 'password' && (
                        <Stack direction="row" justifyContent="space-between" alignItems="center">
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={rememberMe}
                                        onChange={(e) => setRememberMe(e.target.checked)}
                                        color="primary"
                                    />
                                }
                                label={<Typography variant="body2">Remember me</Typography>}
                            />
                            <Link
                                component="button"
                                onClick={() => setForgotMode(true)}
                                sx={{ fontSize: 14, color: '#1976d2', fontWeight: 500 }}
                            >
                                Forgot password?
                            </Link>
                        </Stack>
                    )}

                    {/* Login Button */}
                    <Button
                        fullWidth
                        variant="contained"
                        size="large"
                        onClick={loginMethod === "password" ? handleLogin : handleSendLoginOTP}
                        disabled={!isFormValid || loading}
                        sx={{
                            textTransform: 'none',
                            fontWeight: 600,
                            py: 1.5,
                            backgroundColor: '#1976d2',
                            '&:hover': {
                                backgroundColor: '#1565c0',
                            },
                        }}
                    >
                        {loading
                            ? 'Please wait...'
                            : loginMethod === 'password'
                                ? 'Login'
                                : 'Send OTP'}
                    </Button>

                    {/* Divider */}
                    <Divider>
                        <Typography variant="body2" sx={{ color: '#757575' }}>
                            or
                        </Typography>
                    </Divider>

                    {/* Toggle Login Method */}
                    {loginMethod === 'password' ? (
                        <Button
                            fullWidth
                            variant="outlined"
                            size="large"
                            onClick={() => setLoginMethod('otp')}
                            sx={{
                                textTransform: 'none',
                                fontWeight: 600,
                                py: 1.5,
                                borderColor: '#1976d2',
                                color: '#1976d2',
                            }}
                        >
                            Login with OTP
                        </Button>
                    ) : (
                        <Button
                            fullWidth
                            variant="outlined"
                            size="large"
                            onClick={() => setLoginMethod('password')}
                            sx={{
                                textTransform: 'none',
                                fontWeight: 600,
                                py: 1.5,
                                borderColor: '#1976d2',
                                color: '#1976d2',
                            }}
                        >
                            Login with Password
                        </Button>
                    )}

                    {/* Sign Up Link */}
                    <Box sx={{ textAlign: 'center', mt: 2 }}>
                        <Typography variant="body2" color="text.secondary">
                            New to the app?{' '}
                            <Link
                                component="button"
                                onClick={onSwitchToSignup}
                                sx={{
                                    color: '#1976d2',
                                    fontWeight: 600,
                                    textDecoration: 'none',
                                    cursor: 'pointer',
                                }}
                            >
                                Create an account
                            </Link>
                        </Typography>
                    </Box>
                </Stack>
            )}
            {/* ================= LOGIN OTP VERIFY UI ================= */}
            {otpSent && !forgotMode && (
                <Stack spacing={3} mt={3}>
                    <Typography fontWeight={600}>
                        Enter OTP sent to your mobile/email
                    </Typography>

                    <TextField
                        fullWidth
                        label="OTP"
                        value={otp}
                        onChange={(e) => setOtp(e.target.value)}
                    />

                    <Button
                        fullWidth
                        variant="contained"
                        onClick={handleVerifyLoginOTP}
                        disabled={loading}
                    >
                        Verify OTP
                    </Button>

                    <Button
                        variant="text"
                        onClick={handleSendLoginOTP}
                    >
                        Resend OTP
                    </Button>

                    <Button
                        variant="text"
                        onClick={() => {
                            setOtpSent(false);
                            setOtp("");
                        }}
                    >
                        Back to Login
                    </Button>
                </Stack>
            )}
        </Box>
    );
}
// ============================================
// SIGNUP PAGE COMPONENT
// ============================================

function SignupPage({ onSwitchToLogin }) {
    const [formData, setFormData] = useState({
        businessName: '',
        ownerName: '',
        mobile: '',
        email: '',
        password: '',
        confirmPassword: '',
        businessType: '',
    });

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [agreeToTerms, setAgreeToTerms] = useState(false);
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleChange = (field, value) => {
        setFormData({ ...formData, [field]: value });
        // Clear error when user types
        if (errors[field]) {
            setErrors({ ...errors, [field]: '' });
        }
    };

    const getPasswordStrength = (password) => {
        let strength = 0;
        if (password.length >= 8) strength += 25;
        if (password.length >= 12) strength += 25;
        if (/[a-z]/.test(password) && /[A-Z]/.test(password)) strength += 25;
        if (/[0-9]/.test(password)) strength += 15;
        if (/[^a-zA-Z0-9]/.test(password)) strength += 10;
        return Math.min(strength, 100);
    };

    const passwordStrength = getPasswordStrength(formData.password);

    const getPasswordStrengthColor = () => {
        if (passwordStrength < 40) return '#d32f2f';
        if (passwordStrength < 70) return '#f57c00';
        return '#2e7d32';
    };

    const getPasswordStrengthLabel = () => {
        if (passwordStrength < 40) return 'Weak';
        if (passwordStrength < 70) return 'Medium';
        return 'Strong';
    };

    const validateForm = () => {
        const newErrors = {};

        if (!formData.businessName.trim()) {
            newErrors.businessName = 'Business name is required';
        }

        if (!formData.ownerName.trim()) {
            newErrors.ownerName = 'Owner name is required';
        }

        if (!formData.mobile.trim()) {
            newErrors.mobile = 'Mobile number is required';
        } else if (!/^[6-9]\d{9}$/.test(formData.mobile)) {
            newErrors.mobile = 'Please enter a valid 10-digit Indian mobile number';
        }

        if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            newErrors.email = 'Please enter a valid email address';
        }

        if (!formData.password) {
            newErrors.password = 'Password is required';
        } else if (formData.password.length < 8) {
            newErrors.password = 'Password must be at least 8 characters';
        }

        if (formData.password !== formData.confirmPassword) {
            newErrors.confirmPassword = 'Passwords do not match';
        }

        if (!formData.businessType) {
            newErrors.businessType = 'Please select a business type';
        }

        if (!agreeToTerms) {
            newErrors.terms = 'You must agree to the Terms & Privacy Policy';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSignup = async () => {
        if (!validateForm()) return;

        try {
            setLoading(true);
            setErrors({});

            const payload = {
                businessName: formData.businessName,
                ownerName: formData.ownerName,
                mobile: formData.mobile,
                email: formData.email,
                password: formData.password,
                businessType: formData.businessType,
            };

            const data = await signupUser(payload);

            // AUTO LOGIN AFTER SIGNUP
            setAuth(data, true);

            navigate("/dashboard", { replace: true });

        } catch (err) {
            setErrors({
                form: err.response?.data?.message || "Signup failed",
            });
        } finally {
            setLoading(false);
        }
    };

    const isFormValid =
        formData.businessName &&
        formData.ownerName &&
        formData.mobile &&
        formData.password &&
        formData.confirmPassword &&
        formData.businessType &&
        agreeToTerms;

    return (
        <Box>
            <Typography variant="h4" sx={{ fontWeight: 700, mb: 1, color: '#1a1a1a' }}>
                Create your business account
            </Typography>

            <Typography variant="body2" sx={{ color: '#757575', mb: 4 }}>
                Start tracking sales, loans, payments & GST
            </Typography>

            {errors.form && (
                <Alert severity="error">{errors.form}</Alert>
            )}

            <Stack spacing={3}>
                {/* Business Name */}
                <TextField
                    fullWidth
                    label="Business Name"
                    placeholder="Enter your business name"
                    value={formData.businessName}
                    onChange={(e) => handleChange('businessName', e.target.value)}
                    error={!!errors.businessName}
                    helperText={errors.businessName}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <Business sx={{ color: '#757575' }} />
                            </InputAdornment>
                        ),
                    }}
                />

                {/* Owner Name */}
                <TextField
                    fullWidth
                    label="Owner Name"
                    placeholder="Enter your full name"
                    value={formData.ownerName}
                    onChange={(e) => handleChange('ownerName', e.target.value)}
                    error={!!errors.ownerName}
                    helperText={errors.ownerName}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <Person sx={{ color: '#757575' }} />
                            </InputAdornment>
                        ),
                    }}
                />

                {/* Mobile Number */}
                <TextField
                    fullWidth
                    label="Mobile Number"
                    placeholder="Enter 10-digit mobile number"
                    value={formData.mobile}
                    onChange={(e) => handleChange('mobile', e.target.value)}
                    error={!!errors.mobile}
                    helperText={errors.mobile || 'This will be your primary login ID'}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <Phone sx={{ color: '#757575' }} />
                            </InputAdornment>
                        ),
                    }}
                />

                {/* Email (Optional) */}
                <TextField
                    fullWidth
                    label="Email (Optional)"
                    placeholder="Enter your email address"
                    value={formData.email}
                    onChange={(e) => handleChange('email', e.target.value)}
                    error={!!errors.email}
                    helperText={errors.email}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <Email sx={{ color: '#757575' }} />
                            </InputAdornment>
                        ),
                    }}
                />

                {/* Business Type */}
                <FormControl fullWidth error={!!errors.businessType}>
                    <InputLabel>Business Type</InputLabel>
                    <Select
                        value={formData.businessType}
                        label="Business Type"
                        onChange={(e) => handleChange('businessType', e.target.value)}
                    >
                        <MenuItem value="retail">Retail Shop</MenuItem>
                        <MenuItem value="wholesale">Wholesale / Distribution</MenuItem>
                        <MenuItem value="service">Service Business</MenuItem>
                        <MenuItem value="manufacturer">Manufacturing</MenuItem>
                        <MenuItem value="other">Other</MenuItem>
                    </Select>

                    {errors.businessType && (
                        <Typography variant="caption" color="error" sx={{ mt: 0.5, ml: 1.5 }}>
                            {errors.businessType}
                        </Typography>
                    )}
                </FormControl>

                {/* Password */}
                <Box>
                    <TextField
                        fullWidth
                        type={showPassword ? 'text' : 'password'}
                        label="Password"
                        placeholder="Create a strong password"
                        value={formData.password}
                        onChange={(e) => handleChange('password', e.target.value)}
                        error={!!errors.password}
                        helperText={errors.password}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <Lock sx={{ color: '#757575' }} />
                                </InputAdornment>
                            ),
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                                        {showPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            ),
                        }}
                    />

                    {/* Password Strength Indicator */}
                    {formData.password && (
                        <Box sx={{ mt: 1 }}>
                            <Stack direction="row" justifyContent="space-between" mb={0.5}>
                                <Typography variant="caption" color="text.secondary">
                                    Password Strength:
                                </Typography>
                                <Typography
                                    variant="caption"
                                    sx={{ fontWeight: 600, color: getPasswordStrengthColor() }}
                                >
                                    {getPasswordStrengthLabel()}
                                </Typography>
                            </Stack>

                            <LinearProgress
                                variant="determinate"
                                value={passwordStrength}
                                sx={{
                                    height: 6,
                                    borderRadius: 3,
                                    backgroundColor: '#e0e0e0',
                                    '& .MuiLinearProgress-bar': {
                                        backgroundColor: getPasswordStrengthColor(),
                                        borderRadius: 3,
                                    },
                                }}
                            />
                        </Box>
                    )}
                </Box>

                {/* Confirm Password */}
                <TextField
                    fullWidth
                    type={showConfirmPassword ? 'text' : 'password'}
                    label="Confirm Password"
                    placeholder="Re-enter your password"
                    value={formData.confirmPassword}
                    onChange={(e) => handleChange('confirmPassword', e.target.value)}
                    error={!!errors.confirmPassword}
                    helperText={errors.confirmPassword}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <Lock sx={{ color: '#757575' }} />
                            </InputAdornment>
                        ),
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton
                                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                    edge="end"
                                >
                                    {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                            </InputAdornment>
                        ),
                    }}
                />

                {/* Terms & Privacy */}
                <Box>
                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={agreeToTerms}
                                onChange={(e) => setAgreeToTerms(e.target.checked)}
                                color="primary"
                            />
                        }
                        label={
                            <Typography variant="body2">
                                I agree to the{' '}
                                <Link href="#" sx={{ color: '#1976d2', fontWeight: 500 }}>
                                    Terms of Service
                                </Link>{' '}
                                and{' '}
                                <Link href="#" sx={{ color: '#1976d2', fontWeight: 500 }}>
                                    Privacy Policy
                                </Link>
                            </Typography>
                        }
                    />

                    {errors.terms && (
                        <Typography variant="caption" color="error" sx={{ display: 'block', ml: 4 }}>
                            {errors.terms}
                        </Typography>
                    )}
                </Box>

                {/* Trust Indicators */}
                <Stack
                    direction="row"
                    spacing={2}
                    sx={{ backgroundColor: '#f5f7fa', p: 2, borderRadius: 2 }}
                >
                    <Stack direction="row" spacing={1} alignItems="center" flex={1}>
                        <Shield sx={{ color: '#2e7d32', fontSize: 20 }} />
                        <Typography variant="caption" color="text.secondary">
                            Secure Login
                        </Typography>
                    </Stack>

                    <Stack direction="row" spacing={1} alignItems="center" flex={1}>
                        <Lock sx={{ color: '#2e7d32', fontSize: 20 }} />
                        <Typography variant="caption" color="text.secondary">
                            Data Encrypted
                        </Typography>
                    </Stack>
                </Stack>

                {/* Create Account Button */}
                <Button
                    fullWidth
                    variant="contained"
                    size="large"
                    onClick={handleSignup}
                    disabled={!isFormValid || loading}
                    sx={{
                        textTransform: 'none',
                        fontWeight: 600,
                        py: 1.5,
                        backgroundColor: '#1976d2',
                        '&:hover': {
                            backgroundColor: '#1565c0',
                        },
                    }}
                >
                    {loading ? 'Creating Account...' : 'Create Account'}
                </Button>

                {/* Login Link */}
                <Box sx={{ textAlign: 'center', mt: 2 }}>
                    <Typography variant="body2" color="text.secondary">
                        Already have an account?{' '}
                        <Link
                            component="button"
                            onClick={onSwitchToLogin}
                            sx={{
                                color: '#1976d2',
                                fontWeight: 600,
                                textDecoration: 'none',
                                cursor: 'pointer',
                            }}
                        >
                            Login
                        </Link>
                    </Typography>
                </Box>
            </Stack>
        </Box>
    );
}
// ============================================
// MAIN AUTH PAGE COMPONENT
// ============================================

function AuthPage() {
    const [isLogin, setIsLogin] = useState(true);
    const [searchParams] = useSearchParams();


    useEffect(() => {
        const mode = searchParams.get('mode');

        if (mode === 'signup') {
            setIsLogin(false);
        } else {
            setIsLogin(true);
        }
    }, [searchParams]);

    return (
        <Box
            sx={{
                minHeight: '100vh',
                display: 'flex',
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                position: 'relative',
                overflow: 'hidden',
            }}
        >
            {/* Background Decoration */}
            <Box
                sx={{
                    position: 'absolute',
                    top: -100,
                    right: -100,
                    width: 400,
                    height: 400,
                    borderRadius: '50%',
                    background: 'rgba(255, 255, 255, 0.1)',
                    filter: 'blur(80px)',
                }}
            />
            <Box
                sx={{
                    position: 'absolute',
                    bottom: -150,
                    left: -150,
                    width: 500,
                    height: 500,
                    borderRadius: '50%',
                    background: 'rgba(255, 255, 255, 0.1)',
                    filter: 'blur(80px)',
                }}
            />

            {/* Left Side - Branding */}
            <Box
                sx={{
                    flex: 1,
                    display: { xs: 'none', md: 'flex' },
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    color: 'white',
                    p: 8,
                    position: 'relative',
                    zIndex: 1,
                }}
            >
                <AccountBalance sx={{ fontSize: 80, mb: 3 }} />
                <Typography
                    variant="h3"
                    sx={{ fontWeight: 700, mb: 2, textAlign: 'center' }}
                >
                    KhataBook
                </Typography>
                <Typography
                    variant="h6"
                    sx={{ mb: 4, textAlign: 'center', opacity: 0.9 }}
                >
                    Business Accounting Made Simple
                </Typography>

                <Stack spacing={3} sx={{ mt: 4, maxWidth: 400 }}>
                    <Stack direction="row" spacing={2} alignItems="center">
                        <Box
                            sx={{
                                backgroundColor: 'rgba(255, 255, 255, 0.2)',
                                borderRadius: '50%',
                                p: 1,
                                display: 'flex',
                            }}
                        >
                            <CheckCircle />
                        </Box>
                        <Box>
                            <Typography variant="body1" sx={{ fontWeight: 600 }}>
                                Track Sales & Payments
                            </Typography>
                            <Typography variant="body2" sx={{ opacity: 0.8 }}>
                                Manage customer receivables & payables
                            </Typography>
                        </Box>
                    </Stack>

                    <Stack direction="row" spacing={2} alignItems="center">
                        <Box
                            sx={{
                                backgroundColor: 'rgba(255, 255, 255, 0.2)',
                                borderRadius: '50%',
                                p: 1,
                                display: 'flex',
                            }}
                        >
                            <CheckCircle />
                        </Box>
                        <Box>
                            <Typography variant="body1" sx={{ fontWeight: 600 }}>
                                GST Compliance
                            </Typography>
                            <Typography variant="body2" sx={{ opacity: 0.8 }}>
                                Automated GST calculations & reports
                            </Typography>
                        </Box>
                    </Stack>

                    <Stack direction="row" spacing={2} alignItems="center">
                        <Box
                            sx={{
                                backgroundColor: 'rgba(255, 255, 255, 0.2)',
                                borderRadius: '50%',
                                p: 1,
                                display: 'flex',
                            }}
                        >
                            <CheckCircle />
                        </Box>
                        <Box>
                            <Typography variant="body1" sx={{ fontWeight: 600 }}>
                                Loan Management
                            </Typography>
                            <Typography variant="body2" sx={{ opacity: 0.8 }}>
                                Track loans with automated reminders
                            </Typography>
                        </Box>
                    </Stack>
                </Stack>
            </Box>

            {/* Right Side - Auth Card */}
            <Box
                sx={{
                    flex: 1,
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    p: { xs: 2, md: 4 },
                    position: 'relative',
                    zIndex: 1,
                }}
            >
                <Card
                    sx={{
                        maxWidth: 500,
                        width: '100%',
                        boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)',
                        borderRadius: 3,
                    }}
                >
                    <CardContent sx={{ p: { xs: 3, md: 5 } }}>
                        {/* Logo */}
                        <Box sx={{ textAlign: 'center', mb: 4 }}>
                            <AccountBalance sx={{ fontSize: 48, color: '#1976d2', mb: 1 }} />
                            <Typography
                                variant="h5"
                                sx={{ fontWeight: 700, color: '#1976d2' }}
                            >
                                KhataBook
                            </Typography>
                        </Box>

                        {/* Switch between Login and Signup */}
                        {isLogin ? (
                            <LoginPage onSwitchToSignup={() => setIsLogin(false)} />
                        ) : (
                            <SignupPage onSwitchToLogin={() => setIsLogin(true)} />
                        )}
                    </CardContent>
                </Card>
            </Box>
        </Box>
    );
}

export default AuthPage;
