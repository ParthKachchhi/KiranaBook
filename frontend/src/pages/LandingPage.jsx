import { useEffect, useRef, useState } from "react";
import { Box, Grid, Typography, Button, Stack, Link, Container, IconButton } from "@mui/material";
import { motion, useMotionValue, useTransform, useInView, AnimatePresence } from "framer-motion";
// import gsap from "gsap";
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

// import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useNavigate } from "react-router-dom";
import { gsap, ScrollTrigger } from "gsap/all";

gsap.registerPlugin(ScrollTrigger);

/* =========================================================
   PRELOADER
========================================================= */

function PreLoader({ onComplete }) {
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setProgress((prev) => {
                if (prev >= 100) {
                    clearInterval(interval);
                    setTimeout(onComplete, 500);
                    return 100;
                }
                return prev + 2;
            });
        }, 30);

        return () => clearInterval(interval);
    }, [onComplete]);

    return (
        <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
            style={{
                position: 'fixed',
                inset: 0,
                zIndex: 50,
            }}
        >
            <Box
                sx={{
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    position: 'relative',
                    background:
                        'linear-gradient(135deg, #0B0F1A 0%, #121826 50%, #1A2238 100%)',
                }}
            >
                {/* Animated Background Blobs */}
                <Box
                    sx={{
                        position: 'absolute',
                        inset: 0,
                        overflow: 'hidden',
                    }}
                >
                    <motion.div
                        animate={{
                            scale: [1, 1.2, 1],
                            x: [0, 100, 0],
                            y: [0, -50, 0],
                        }}
                        transition={{ duration: 8, repeat: Infinity }}
                        style={{
                            position: 'absolute',
                            top: '25%',
                            left: '25%',
                            width: 384,
                            height: 384,
                            backgroundColor: '#00E5FF',
                            opacity: 0.2,
                            borderRadius: '50%',
                            filter: 'blur(120px)',
                        }}
                    />

                    <motion.div
                        animate={{
                            scale: [1, 1.3, 1],
                            x: [0, -100, 0],
                            y: [0, 100, 0],
                        }}
                        transition={{ duration: 10, repeat: Infinity }}
                        style={{
                            position: 'absolute',
                            bottom: '25%',
                            right: '25%',
                            width: 384,
                            height: 384,
                            backgroundColor: '#7C4DFF',
                            opacity: 0.2,
                            borderRadius: '50%',
                            filter: 'blur(120px)',
                        }}
                    />
                </Box>

                {/* Logo Mark */}
                <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.5 }}
                    style={{ position: 'relative', zIndex: 10 }}
                >
                    <Box
                        sx={{
                            width: 96,
                            height: 96,
                            borderRadius: 3,
                            padding: '4px',
                            background:
                                'linear-gradient(135deg, #00E5FF 0%, #7C4DFF 100%)',
                        }}
                    >
                        <Box
                            sx={{
                                width: '100%',
                                height: '100%',
                                borderRadius: 2,
                                backgroundColor: '#0B0F1A',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}
                        >
                            <svg
                                width="48"
                                height="48"
                                viewBox="0 0 24 24"
                                fill="currentColor"
                                style={{ color: '#00E5FF' }}
                            >
                                <path d="M12 2L2 7v10c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-10-5z" />
                                <path d="M10.5 13.5l-2-2L7 13l3 3 6-6-1.5-1.5z" />
                            </svg>
                        </Box>
                    </Box>
                </motion.div>

                {/* Progress Ring */}
                <Box sx={{ position: 'relative', marginTop: 6, zIndex: 10 }}>
                    <svg
                        width="128"
                        height="128"
                        style={{ transform: 'rotate(-90deg)' }}
                    >
                        <circle
                            cx="64"
                            cy="64"
                            r="56"
                            stroke="rgba(0,229,255,0.2)"
                            strokeWidth="4"
                            fill="none"
                        />

                        <motion.circle
                            cx="64"
                            cy="64"
                            r="56"
                            stroke="url(#gradient)"
                            strokeWidth="4"
                            fill="none"
                            strokeLinecap="round"
                            strokeDasharray={352}
                            strokeDashoffset={352 - (352 * progress) / 100}
                            transition={{ duration: 0.3 }}
                        />

                        <defs>
                            <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                                <stop offset="0%" stopColor="#00E5FF" />
                                <stop offset="100%" stopColor="#7C4DFF" />
                            </linearGradient>
                        </defs>
                    </svg>

                    <Box
                        sx={{
                            position: 'absolute',
                            inset: 0,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}
                    >
                        <Typography
                            sx={{
                                fontSize: 20,
                                fontWeight: 700,
                                color: '#FFFFFF',
                            }}
                        >
                            {progress}%
                        </Typography>
                    </Box>
                </Box>

                {/* Loading Text */}
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    style={{ zIndex: 10 }}
                >
                    <Typography
                        sx={{
                            marginTop: 4,
                            fontSize: 18,
                            letterSpacing: '0.08em',
                            color: '#9CA3AF',
                        }}
                    >
                        Preparing your business workspace...
                    </Typography>
                </motion.div>
            </Box>
        </motion.div>
    );
}


/* ================================
   HERO SECTION (MUI VERSION)
================================ */

function Hero() {
    const heroRef = useRef(null);
    const dashboardRef = useRef(null);

    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const glowX = useMotionValue(0);
    const glowY = useMotionValue(0);

    const rotateX = useTransform(mouseY, [-400, 400], [10, -10]);
    const rotateY = useTransform(mouseX, [-400, 400], [-10, 10]);

    const gradientShift = useTransform(mouseX, [-500, 500], ['0%', '100%']);

    const navigate = useNavigate();

    useEffect(() => {
        gsap.to(dashboardRef.current, {
            y: -22,
            duration: 3,
            ease: 'sine.inOut',
            repeat: -1,
            yoyo: true,
        });

        const move = (e) => {
            const cx = window.innerWidth / 2;
            const cy = window.innerHeight / 2;
            mouseX.set(e.clientX - cx);
            mouseY.set(e.clientY - cy);
            glowX.set(e.clientX);
            glowY.set(e.clientY);
        };

        window.addEventListener('mousemove', move);
        return () => window.removeEventListener('mousemove', move);
    }, [mouseX, mouseY, glowX, glowY]);

    return (
        <Box
            ref={heroRef}
            sx={{
                minHeight: '100vh',
                position: 'relative',
                overflow: 'hidden',
                background:
                    'radial-gradient(circle at top, #121826, #0B0F1A 60%)',
                display: 'flex',
                alignItems: 'center',
            }}
        >
            {/* ================= CURSOR ENERGY FIELD ================= */}
            <motion.div
                style={{
                    position: 'absolute',
                    left: glowX,
                    top: glowY,
                    width: 420,
                    height: 420,
                    transform: 'translate(-50%, -50%)',
                    borderRadius: '50%',
                    background:
                        'radial-gradient(circle, rgba(0,229,255,0.35), transparent 70%)',
                    filter: 'blur(80px)',
                    pointerEvents: 'none',
                    zIndex: 1,
                }}
            />

            {/* ================= NEURAL GRID ================= */}
            <Box
                sx={{
                    position: 'absolute',
                    inset: 0,
                    backgroundImage:
                        'linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)',
                    backgroundSize: '60px 60px',
                    opacity: 0.35,
                }}
            />

            {/* ================= FLOATING ORBS ================= */}
            {[...Array(6)].map((_, i) => (
                <motion.div
                    key={i}
                    animate={{
                        y: [0, -80, 0],
                        x: [0, i % 2 === 0 ? 60 : -60, 0],
                    }}
                    transition={{
                        duration: 12 + i * 2,
                        repeat: Infinity,
                        ease: 'easeInOut',
                    }}
                    style={{
                        position: 'absolute',
                        width: 300,
                        height: 300,
                        borderRadius: '50%',
                        background:
                            i % 2 === 0
                                ? 'rgba(0,229,255,0.15)'
                                : 'rgba(124,77,255,0.15)',
                        filter: 'blur(120px)',
                        top: `${20 + i * 10}%`,
                        left: `${10 + i * 12}%`,
                    }}
                />
            ))}

            {/* ================= CONTENT ================= */}
            <Box sx={{ width: '100%', px: { xs: 3, md: 12 }, zIndex: 2 }}>
                <Stack direction={{ xs: 'column', lg: 'row' }} spacing={10}>
                    {/* ---------- LEFT ---------- */}
                    <Box flex={1}>
                        <motion.div
                            initial={{ opacity: 0, y: 60 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 1 }}
                        >
                            <Typography
                                sx={{
                                    fontSize: { xs: 48, md: 78 },
                                    fontWeight: 900,
                                    lineHeight: 1.05,
                                }}
                            >
                                <motion.span
                                    style={{
                                        background:
                                            'linear-gradient(90deg,#00E5FF,#7C4DFF)',
                                        WebkitBackgroundClip: 'text',
                                        WebkitTextFillColor: 'transparent',
                                        backgroundPosition: gradientShift,
                                    }}
                                >
                                    Run Your Business
                                </motion.span>
                                <br />
                                <span style={{ color: '#fff' }}>Like a Modern Enterprise</span>
                            </Typography>

                            <Typography
                                sx={{
                                    mt: 4,
                                    fontSize: 22,
                                    color: '#B5BCCB',
                                    maxWidth: 540,
                                }}
                            >
                                A next-generation accounting platform combining automation,
                                analytics, GST compliance and real-time intelligence — built
                                for Indian businesses.
                            </Typography>

                            <Stack direction="row" spacing={3} mt={6}>
                                <MagneticCTA primary onClick={() => navigate("/auth?mode=signup")}>
                                    Create Free Account
                                </MagneticCTA>
                                <MagneticCTA onClick={() => navigate("/auth")}>Login</MagneticCTA>
                            </Stack>

                            {/* TRUST BADGE */}
                            <motion.div
                                animate={{ opacity: [0.6, 1, 0.6] }}
                                transition={{ duration: 3, repeat: Infinity }}
                                style={{
                                    marginTop: 32,
                                    display: 'inline-block',
                                    padding: '8px 16px',
                                    borderRadius: 30,
                                    background: 'rgba(255,255,255,0.06)',
                                    border: '1px solid rgba(255,255,255,0.15)',
                                }}
                            >
                                <Typography sx={{ fontSize: 14, color: '#9BE7FF' }}>
                                    Trusted by 50,000+ Indian Businesses 🇮🇳
                                </Typography>
                            </motion.div>
                        </motion.div>
                    </Box>

                    {/* ---------- RIGHT ---------- */}
                    <motion.div
                        ref={dashboardRef}
                        style={{
                            rotateX,
                            rotateY,
                            transformStyle: 'preserve-3d',
                        }}
                    >
                        <UltraDashboard />
                    </motion.div>
                </Stack>
            </Box>
        </Box>
    );
}

/* ======================================
   MAGNETIC CTA
====================================== */

function MagneticCTA({ children, primary, onClick }) {
    const ref = useRef(null);
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const move = (e) => {
        const r = ref.current.getBoundingClientRect();
        x.set((e.clientX - (r.left + r.width / 2)) * 0.35);
        y.set((e.clientY - (r.top + r.height / 2)) * 0.35);
    };

    return (
        <motion.div
            ref={ref}
            onMouseMove={move}
            onMouseLeave={() => {
                x.set(0);
                y.set(0);
            }}
            style={{ x, y }}
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.95 }}
        >
            <Button
                onClick={onClick}
                sx={{
                    px: 5,
                    py: 1.8,
                    borderRadius: 99,
                    fontSize: 18,
                    fontWeight: 800,
                    color: '#fff',
                    background: primary
                        ? 'linear-gradient(90deg,#00E5FF,#7C4DFF)'
                        : 'rgba(255,255,255,0.08)',
                    border: primary
                        ? 'none'
                        : '1px solid rgba(255,255,255,0.25)',
                    boxShadow: primary
                        ? '0 0 40px rgba(0,229,255,0.5)'
                        : 'none',
                }}
            >
                {children}
            </Button>
        </motion.div>
    );
}

/* ======================================
   ULTRA DASHBOARD
====================================== */

function UltraDashboard() {
    return (
        <Box
            sx={{
                width: 460,
                p: 3,
                borderRadius: 4,
                background: 'rgba(255,255,255,0.08)',
                backdropFilter: 'blur(30px)',
                border: '1px solid rgba(255,255,255,0.18)',
                boxShadow: '0 40px 100px rgba(0,0,0,0.5)',
            }}
        >
            <Stack direction="row" spacing={2} mb={3}>
                <Metric label="Receivable" value="₹12.5L" />
                <Metric label="Cash" value="₹8.2L" />
                <Metric label="Profit" value="₹4.3L" />
            </Stack>
            <WaveChart />
        </Box>
    );
}

function Metric({ label, value }) {
    return (
        <motion.div whileHover={{ y: -8 }}>
            <Box
                sx={{
                    p: 2,
                    borderRadius: 2,
                    background: 'rgba(255,255,255,0.1)',
                    textAlign: 'center',
                    minWidth: 120,
                }}
            >
                <Typography sx={{ fontSize: 12, color: '#9aa3b2' }}>
                    {label}
                </Typography>
                <Typography sx={{ fontSize: 20, fontWeight: 800, color: '#00E5FF' }}>
                    {value}
                </Typography>
            </Box>
        </motion.div>
    );
}

function WaveChart() {
    return (
        <svg viewBox="0 0 400 160" width="100%" height="180">
            <motion.path
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 2.5 }}
                d="M0 120 Q80 60 160 90 T320 40 T400 30"
                fill="none"
                stroke="#00E5FF"
                strokeWidth="3"
            />
        </svg>
    );
}

/* ================================
   GLOW BUTTON
================================ */

function GlowButton({ children, primary }) {
    return (
        <Button
            component={motion.button}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            sx={{
                px: 4,
                py: 1.5,
                borderRadius: 999,
                fontWeight: 700,
                fontSize: 16,
                textTransform: "none",
                color: primary ? "#000" : "#fff",
                background: primary
                    ? "linear-gradient(90deg, #00E5FF, #7C4DFF)"
                    : "rgba(255,255,255,0.08)",
                border: primary ? "none" : "1px solid rgba(255,255,255,0.2)",
                boxShadow: primary
                    ? "0 0 40px rgba(124,77,255,0.6)"
                    : "none",
            }}
        >
            {children}
        </Button>
    );
}

/* ================================
   DASHBOARD MOCK
================================ */

function DashboardMock() {
    return (
        <Box
            sx={{
                p: 4,
                borderRadius: 4,
                background: "rgba(255,255,255,0.05)",
                backdropFilter: "blur(20px)",
                border: "1px solid rgba(255,255,255,0.1)",
            }}
        >
            <Grid container spacing={2}>
                {[
                    ["Receivable", "₹12.5L"],
                    ["Cash", "₹8.2L"],
                    ["Profit", "₹4.3L"],
                ].map(([title, value]) => (
                    <Grid item xs={4} key={title}>
                        <Box
                            sx={{
                                p: 2,
                                borderRadius: 2,
                                background: "rgba(255,255,255,0.08)",
                                textAlign: "center",
                            }}
                        >
                            <Typography fontSize={12} color="#9ca3af">
                                {title}
                            </Typography>
                            <Typography
                                fontSize={20}
                                fontWeight={700}
                                sx={{
                                    background:
                                        "linear-gradient(90deg,#00E5FF,#7C4DFF)",
                                    WebkitBackgroundClip: "text",
                                    WebkitTextFillColor: "transparent",
                                }}
                            >
                                {value}
                            </Typography>
                        </Box>
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
}

/* ================================
   TRUST BAR – MUI VERSION
================================ */

function TrustBar() {
    const icons = [
        { label: "GST Ready", icon: "🇮🇳" },
        { label: "UPI Payments", icon: "💳" },
        { label: "Bank Sync", icon: "🏦" },
        { label: "Secure", icon: "🛡️" },
    ];

    const partners = [
        "HDFC Bank",
        "ICICI Bank",
        "Axis Bank",
        "SBI",
        "Paytm",
        "PhonePe",
        "Google Pay",
        "Razorpay",
    ];

    return (
        <Box
            component="section"
            sx={{
                py: 10,
                borderTop: "1px solid rgba(255,255,255,0.08)",
                borderBottom: "1px solid rgba(255,255,255,0.08)",
                background:
                    "linear-gradient(90deg,#0B0F1A,#121826,#0B0F1A)",
                overflow: "hidden",
            }}
        >
            <Box sx={{ maxWidth: 1200, mx: "auto", px: 3 }}>
                {/* TITLE */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                >
                    <Typography
                        variant="h4"
                        align="center"
                        sx={{
                            fontWeight: 800,
                            color: "#fff",
                            mb: 6,
                        }}
                    >
                        Trusted by{" "}
                        <Box
                            component="span"
                            sx={{
                                background:
                                    "linear-gradient(90deg,#00E5FF,#7C4DFF)",
                                WebkitBackgroundClip: "text",
                                WebkitTextFillColor: "transparent",
                            }}
                        >
                            50,000+
                        </Box>{" "}
                        Indian Businesses
                    </Typography>
                </motion.div>

                {/* ICON CARDS */}
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "center",
                        gap: 3,
                        flexWrap: "wrap",
                        mb: 6,
                    }}
                >
                    {icons.map((item, i) => (
                        <motion.div
                            key={i}
                            whileHover={{ scale: 1.1, rotate: 4 }}
                        >
                            <Box
                                sx={{
                                    px: 4,
                                    py: 3,
                                    minWidth: 140,
                                    textAlign: "center",
                                    borderRadius: 3,
                                    background: "rgba(255,255,255,0.05)",
                                    border: "1px solid rgba(255,255,255,0.1)",
                                    backdropFilter: "blur(12px)",
                                }}
                            >
                                <Typography fontSize={32}>{item.icon}</Typography>
                                <Typography
                                    fontSize={14}
                                    sx={{ color: "#9ca3af", mt: 1 }}
                                >
                                    {item.label}
                                </Typography>
                            </Box>
                        </motion.div>
                    ))}
                </Box>

                {/* PARTNER SLIDER */}
                <Box
                    sx={{
                        position: "relative",
                        overflow: "hidden",
                        whiteSpace: "nowrap",
                    }}
                >
                    <motion.div
                        animate={{ x: ["0%", "-50%"] }}
                        transition={{
                            duration: 30,
                            repeat: Infinity,
                            ease: "linear",
                        }}
                        style={{ display: "flex", gap: 24 }}
                    >
                        {[...partners, ...partners].map((name, i) => (
                            <Box
                                key={i}
                                sx={{
                                    px: 4,
                                    py: 2,
                                    borderRadius: 2,
                                    background: "rgba(255,255,255,0.05)",
                                    border: "1px solid rgba(255,255,255,0.1)",
                                    color: "#cbd5e1",
                                    fontWeight: 600,
                                    fontSize: 16,
                                    flexShrink: 0,
                                }}
                            >
                                {name}
                            </Box>
                        ))}
                    </motion.div>
                </Box>
            </Box>
        </Box>
    );
}

function FeatureSections() {
    const containerRef = useRef(null);

    useEffect(() => {
        const sections = containerRef.current.querySelectorAll(".feature-block");

        sections.forEach((section) => {
            gsap.fromTo(
                section,
                { opacity: 0, y: 80 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 1,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: section,
                        start: "top 80%",
                    },
                }
            );
        });
    }, []);

    const features = [
        {
            title: "Smart Ledger & Customers",
            desc:
                "Manage customers, invoices, credits, and transactions in one intelligent ledger designed for Indian businesses.",
            gradient: "linear-gradient(90deg,#00E5FF,#22d3ee)",
            icon: "📊",
        },
        {
            title: "Payments, Loans & Dues",
            desc:
                "Track UPI, cash, bank payments, loans, and send automated reminders for pending dues.",
            gradient: "linear-gradient(90deg,#7C4DFF,#a78bfa)",
            icon: "💰",
        },
        {
            title: "GST & Tax Compliance",
            desc:
                "Automated GST calculations, filing reminders, and complete compliance without complexity.",
            gradient: "linear-gradient(90deg,#00C853,#4ade80)",
            icon: "🧾",
        },
        {
            title: "Analytics & Insights",
            desc:
                "Real-time dashboards, profit tracking, and predictive insights to grow your business faster.",
            gradient: "linear-gradient(90deg,#FF6F00,#fb923c)",
            icon: "📈",
        },
    ];

    return (
        <Box
            ref={containerRef}
            component="section"
            sx={{
                py: 20,
                backgroundColor: "#0B0F1A",
            }}
        >
            <Box sx={{ maxWidth: 1200, mx: "auto", px: 3 }}>
                {features.map((f, i) => (
                    <Box
                        key={i}
                        className="feature-block"
                        sx={{
                            display: "grid",
                            gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
                            alignItems: "center",
                            gap: 10,
                            mb: 18,
                        }}
                    >
                        {/* TEXT */}
                        <Box sx={{ order: { xs: 1, md: i % 2 === 0 ? 1 : 2 } }}>
                            <Typography fontSize={48} mb={2}>
                                {f.icon}
                            </Typography>

                            <Typography
                                variant="h3"
                                sx={{
                                    fontWeight: 800,
                                    mb: 3,
                                    background: f.gradient,
                                    WebkitBackgroundClip: "text",
                                    WebkitTextFillColor: "transparent",
                                }}
                            >
                                {f.title}
                            </Typography>

                            <Typography
                                sx={{
                                    fontSize: 20,
                                    lineHeight: 1.7,
                                    color: "#cbd5e1",
                                    maxWidth: 520,
                                }}
                            >
                                {f.desc}
                            </Typography>

                            {/* BULLETS */}
                            <Box mt={4}>
                                {[1, 2, 3].map((b) => (
                                    <motion.div
                                        key={b}
                                        initial={{ opacity: 0, x: -20 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        transition={{ delay: b * 0.15 }}
                                        viewport={{ once: true }}
                                    >
                                        <Box
                                            sx={{
                                                display: "flex",
                                                alignItems: "center",
                                                gap: 2,
                                                mb: 1.5,
                                            }}
                                        >
                                            <Box
                                                sx={{
                                                    width: 8,
                                                    height: 8,
                                                    borderRadius: "50%",
                                                    background: f.gradient,
                                                }}
                                            />
                                            <Typography color="#9ca3af">
                                                Feature highlight {b}
                                            </Typography>
                                        </Box>
                                    </motion.div>
                                ))}
                            </Box>
                        </Box>

                        {/* VISUAL */}
                        <Box sx={{ order: { xs: 2, md: i % 2 === 0 ? 2 : 1 } }}>
                            <motion.div
                                whileHover={{ scale: 1.04, y: -6 }}
                                transition={{ type: "spring", stiffness: 120 }}
                            >
                                <Box
                                    sx={{
                                        p: 6,
                                        height: 320,
                                        borderRadius: 4,
                                        background: "rgba(255,255,255,0.06)",
                                        border: "1px solid rgba(255,255,255,0.1)",
                                        backdropFilter: "blur(14px)",
                                        position: "relative",
                                        overflow: "hidden",
                                    }}
                                >
                                    {/* GLOW */}
                                    <Box
                                        sx={{
                                            position: "absolute",
                                            inset: 0,
                                            background: f.gradient,
                                            opacity: 0.12,
                                            filter: "blur(80px)",
                                        }}
                                    />

                                    {/* MOCK UI */}
                                    <Box
                                        sx={{
                                            position: "relative",
                                            zIndex: 1,
                                            height: "100%",
                                            borderRadius: 3,
                                            background: "rgba(0,0,0,0.4)",
                                            border: "1px solid rgba(255,255,255,0.08)",
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "center",
                                            color: "#e5e7eb",
                                            fontSize: 18,
                                            fontWeight: 600,
                                        }}
                                    >
                                        Interactive Preview
                                    </Box>
                                </Box>
                            </motion.div>
                        </Box>
                    </Box>
                ))}
            </Box>
        </Box>
    );
}

function WhyPlatform() {
    const cards = [
        {
            icon: "🇮🇳",
            title: "Built for Indian GST",
            desc: "Designed specifically for Indian businesses with GST, UPI, and compliance-first architecture.",
        },
        {
            icon: "🔒",
            title: "Bank-Grade Security",
            desc: "256-bit encryption, role-based access, and audit-ready data protection.",
        },
        {
            icon: "⚡",
            title: "Real-Time Performance",
            desc: "Live dashboards with instant updates across all transactions.",
        },
        {
            icon: "🚀",
            title: "Scales With You",
            desc: "From a single shop to multi-branch enterprises — no rewrites needed.",
        },
        {
            icon: "📱",
            title: "Works Everywhere",
            desc: "Desktop, tablet, or mobile — your data is always available.",
        },
        {
            icon: "🤖",
            title: "Smart Automation",
            desc: "Automatic reminders, reports, and insights that save hours daily.",
        },
    ];

    return (
        <Box
            component="section"
            sx={{
                py: 20,
                background:
                    "linear-gradient(180deg,#0B0F1A 0%,#121826 100%)",
                position: "relative",
                overflow: "hidden",
            }}
        >
            {/* BACKGROUND GLOWS */}
            <Box
                sx={{
                    position: "absolute",
                    top: "20%",
                    left: "10%",
                    width: 400,
                    height: 400,
                    background: "#00E5FF",
                    opacity: 0.08,
                    filter: "blur(120px)",
                    borderRadius: "50%",
                }}
            />
            <Box
                sx={{
                    position: "absolute",
                    bottom: "10%",
                    right: "10%",
                    width: 400,
                    height: 400,
                    background: "#7C4DFF",
                    opacity: 0.08,
                    filter: "blur(120px)",
                    borderRadius: "50%",
                }}
            />

            <Box sx={{ maxWidth: 1200, mx: "auto", px: 3, position: "relative" }}>
                {/* HEADER */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                >
                    <Typography
                        variant="h2"
                        sx={{
                            textAlign: "center",
                            fontWeight: 900,
                            mb: 3,
                            background:
                                "linear-gradient(90deg,#00E5FF,#7C4DFF)",
                            WebkitBackgroundClip: "text",
                            WebkitTextFillColor: "transparent",
                        }}
                    >
                        Why Choose This Platform?
                    </Typography>

                    <Typography
                        sx={{
                            textAlign: "center",
                            maxWidth: 720,
                            mx: "auto",
                            fontSize: 20,
                            color: "#cbd5e1",
                            mb: 12,
                        }}
                    >
                        Enterprise-grade features, thoughtfully designed for Indian
                        businesses that want speed, clarity, and control.
                    </Typography>
                </motion.div>

                {/* GRID */}
                <Box
                    sx={{
                        display: "grid",
                        gridTemplateColumns: {
                            xs: "1fr",
                            sm: "1fr 1fr",
                            lg: "1fr 1fr 1fr",
                        },
                        gap: 4,
                    }}
                >
                    {cards.map((card, i) => (
                        <GlowCard key={i} card={card} index={i} />
                    ))}
                </Box>
            </Box>
        </Box>
    );
}

/* ===================================
   GLOW CARD COMPONENT
=================================== */

function GlowCard({ card, index }) {
    const ref = useRef(null);
    const [pos, setPos] = useState({ x: 0, y: 0 });

    const handleMove = (e) => {
        const r = ref.current.getBoundingClientRect();
        setPos({ x: e.clientX - r.left, y: e.clientY - r.top });
    };

    return (
        <motion.div
            ref={ref}
            onMouseMove={handleMove}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            viewport={{ once: true }}
            whileHover={{ y: -12 }}
            style={{ position: "relative" }}
        >
            {/* NEON GLOW */}
            <Box
                sx={{
                    position: "absolute",
                    inset: 0,
                    background:
                        "linear-gradient(90deg,#00E5FF,#7C4DFF)",
                    opacity: 0,
                    filter: "blur(40px)",
                    borderRadius: 4,
                    transition: "0.3s",
                    ".MuiBox-root:hover &": { opacity: 0.25 },
                }}
            />

            {/* CARD */}
            <Box
                sx={{
                    position: "relative",
                    p: 4,
                    height: "100%",
                    borderRadius: 4,
                    background: "rgba(255,255,255,0.06)",
                    border: "1px solid rgba(255,255,255,0.12)",
                    backdropFilter: "blur(16px)",
                    overflow: "hidden",
                }}
            >
                {/* CURSOR LIGHT */}
                <Box
                    sx={{
                        position: "absolute",
                        width: 200,
                        height: 200,
                        left: pos.x - 100,
                        top: pos.y - 100,
                        background:
                            "radial-gradient(circle,#00E5FF55,transparent 70%)",
                        opacity: 0.6,
                        pointerEvents: "none",
                    }}
                />

                <Box sx={{ position: "relative", zIndex: 1 }}>
                    <Typography fontSize={40} mb={2}>
                        {card.icon}
                    </Typography>

                    <Typography
                        variant="h5"
                        sx={{ fontWeight: 800, color: "#fff", mb: 1.5 }}
                    >
                        {card.title}
                    </Typography>

                    <Typography sx={{ color: "#9ca3af", lineHeight: 1.7 }}>
                        {card.desc}
                    </Typography>
                </Box>
            </Box>
        </motion.div>
    );
}
/* ===================================
   LIVE METRICS – TRUST & SCALE
=================================== */

function LiveMetrics() {
    const metrics = [
        {
            value: 12000,
            prefix: "₹",
            suffix: " Cr+",
            label: "Transactions Tracked",
        },
        {
            value: 50000,
            suffix: "+",
            label: "Active Businesses",
        },
        {
            value: 99.99,
            suffix: "%",
            label: "Uptime Reliability",
        },
        {
            value: 24,
            suffix: "/7",
            label: "Real-Time Access",
        },
    ];

    return (
        <Box
            component="section"
            sx={{
                py: 20,
                background: "#121826",
                position: "relative",
                overflow: "hidden",
            }}
        >
            {/* BACKGROUND GRID */}
            <Box
                sx={{
                    position: "absolute",
                    inset: 0,
                    opacity: 0.06,
                    backgroundImage:
                        "radial-gradient(circle at 1px 1px, #00E5FF 1px, transparent 0)",
                    backgroundSize: "40px 40px",
                }}
            />

            <Box
                sx={{
                    maxWidth: 1200,
                    mx: "auto",
                    px: 3,
                    position: "relative",
                }}
            >
                {/* HEADER */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                >
                    <Typography
                        variant="h2"
                        sx={{
                            textAlign: "center",
                            fontWeight: 900,
                            mb: 3,
                            color: "#fff",
                        }}
                    >
                        Trusted at{" "}
                        <Box
                            component="span"
                            sx={{
                                background:
                                    "linear-gradient(90deg,#00E5FF,#7C4DFF)",
                                WebkitBackgroundClip: "text",
                                WebkitTextFillColor: "transparent",
                            }}
                        >
                            Massive Scale
                        </Box>
                    </Typography>

                    <Typography
                        sx={{
                            textAlign: "center",
                            maxWidth: 700,
                            mx: "auto",
                            fontSize: 20,
                            color: "#cbd5e1",
                            mb: 12,
                        }}
                    >
                        Thousands of Indian businesses rely on this platform daily to manage
                        money, customers, and compliance.
                    </Typography>
                </motion.div>

                {/* GRID */}
                <Box
                    sx={{
                        display: "grid",
                        gridTemplateColumns: {
                            xs: "1fr",
                            sm: "1fr 1fr",
                            lg: "repeat(4, 1fr)",
                        },
                        gap: 4,
                    }}
                >
                    {metrics.map((metric, i) => (
                        <MetricCard key={i} metric={metric} index={i} />
                    ))}
                </Box>
            </Box>
        </Box>
    );
}

/* ===================================
   METRIC CARD
=================================== */

function MetricCard({ metric, index }) {
    const ref = useRef(null);
    const inView = useInView(ref, { once: true });
    const [count, setCount] = useState(0);
    const [hovered, setHovered] = useState(false);
    const [cursor, setCursor] = useState({ x: 0, y: 0 });
    const [ripple, setRipple] = useState(false);

    useEffect(() => {
        if (!inView) return;

        const duration = 2000;
        const steps = 60;
        const increment = metric.value / steps;
        let current = 0;

        const timer = setInterval(() => {
            current += increment;
            if (current >= metric.value) {
                setCount(metric.value);
                clearInterval(timer);
            } else {
                setCount(current);
            }
        }, duration / steps);

        return () => clearInterval(timer);
    }, [inView, metric.value]);

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, scale: 0.85 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1, duration: 0.6 }}
            viewport={{ once: true }}
            whileHover={{ y: -14 }}
            onMouseEnter={() => {
                setHovered(true);
                setRipple(true);
                setTimeout(() => setRipple(false), 600);
            }}
            onMouseLeave={() => setHovered(false)}
            onMouseMove={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                setCursor({
                    x: e.clientX - rect.left,
                    y: e.clientY - rect.top,
                });
            }}
            style={{
                position: "relative",
                isolation: "isolate",
            }}
        >
            {/* ================= CURSOR GLOW (FIXED) ================= */}
            <Box
                sx={{
                    position: "absolute",
                    inset: -60,
                    pointerEvents: "none",
                    opacity: hovered ? 1 : 0,
                    transition: "opacity 0.25s ease",
                    background: `radial-gradient(
            300px at ${cursor.x}px ${cursor.y}px,
            rgba(0,229,255,0.45),
            transparent 65%
          )`,
                    filter: "blur(40px)",
                    zIndex: 0,
                }}
            />

            {/* ================= CARD ================= */}
            <Box
                sx={{
                    position: "relative",
                    height: 220,
                    p: 4,
                    textAlign: "center",
                    borderRadius: 4,
                    background: "rgba(255,255,255,0.06)",
                    border: "1px solid rgba(255,255,255,0.14)",
                    backdropFilter: "blur(18px)",
                    overflow: "visible",
                    zIndex: 1,
                }}
            >
                {/* ================= PULSE (FIXED & POLISHED) ================= */}
                {/* <motion.div
                    animate={{ scale: [1, 1.05, 1] }}
                    transition={{
                        duration: 2.6,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                    style={{
                        position: "absolute",
                        inset: -6,
                        borderRadius: 20, 
                        background:
                            "linear-gradient(90deg, rgba(0,229,255,0.35), rgba(124,77,255,0.35))",
                        filter: "blur(22px)",
                        zIndex: -1,
                        pointerEvents: "none",
                    }}
                /> */}


                {/* ================= STEP 1 – RIPPLE ================= */}
                {/* {ripple && (
                    <motion.div
                        initial={{ scale: 0, opacity: 0.6 }}
                        animate={{ scale: 3, opacity: 0 }}
                        transition={{ duration: 0.6, ease: "easeOut" }}
                        style={{
                            position: "absolute",
                            left: cursor.x,
                            top: cursor.y,
                            width: 20,
                            height: 20,
                            borderRadius: "50%",
                            background:
                                "radial-gradient(circle, rgba(255,255,255,0.5), transparent 70%)",
                            transform: "translate(-50%, -50%)",
                            pointerEvents: "none",
                        }}
                    />
                )} */}

                {/* ================= CONTENT ================= */}
                <Box sx={{ position: "relative", zIndex: 2 }}>
                    <Typography
                        sx={{
                            fontSize: 48,
                            fontWeight: 900,
                            mb: 1,
                            background: "linear-gradient(90deg,#00E5FF,#7C4DFF)",
                            WebkitBackgroundClip: "text",
                            WebkitTextFillColor: "transparent",
                        }}
                    >
                        {metric.prefix}
                        {metric.value < 100 ? count.toFixed(2) : Math.floor(count)}
                        {metric.suffix}
                    </Typography>

                    <Typography sx={{ color: "#9ca3af", fontSize: 16 }}>
                        {metric.label}
                    </Typography>
                </Box>
            </Box>
        </motion.div>
    );
}


/* ===================================
   TESTIMONIALS + FINAL CTA
=================================== */

function Testimonials() {
    const [currentIndex, setCurrentIndex] = useState(0);

    const testimonials = [
        {
            name: 'Rajesh Kumar',
            business: 'Electronics Retailer, Mumbai',
            rating: 5,
            text:
                'This platform transformed how we manage our business. GST filing is now effortless, and we save hours every week.',
            avatar: '👨‍💼',
        },
        {
            name: 'Priya Sharma',
            business: 'Textile Manufacturer, Surat',
            rating: 5,
            text:
                'Finally an accounting system built for Indian businesses. The real-time analytics help us take faster decisions.',
            avatar: '👩‍💼',
        },
        {
            name: 'Amit Patel',
            business: 'Restaurant Chain Owner, Delhi',
            rating: 5,
            text:
                'Managing multiple outlets is now easy. Payments, loans, GST – everything in one dashboard.',
            avatar: '👨‍🍳',
        },
    ];

    const next = () =>
        setCurrentIndex((prev) => (prev + 1) % testimonials.length);

    const prev = () =>
        setCurrentIndex(
            (prev) => (prev - 1 + testimonials.length) % testimonials.length
        );

    return (
        <Box
            component="section"
            sx={{
                position: 'relative',
                py: { xs: 14, md: 20 },
                background:
                    'linear-gradient(180deg, #121826 0%, #0B0F1A 100%)',
            }}
        >
            <Container
                maxWidth={false}
                sx={{
                    maxWidth: 1200,
                    position: 'relative',
                }}
            >
                {/* ================= HEADER ================= */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                >
                    <Typography
                        sx={{
                            fontSize: { xs: 38, md: 60 },
                            fontWeight: 900,
                            textAlign: 'center',
                            mb: 3,
                        }}
                    >
                        <Box component="span" sx={{ color: '#fff' }}>
                            What Our
                        </Box>{' '}
                        <Box
                            component="span"
                            sx={{
                                background:
                                    'linear-gradient(90deg,#00E5FF,#7C4DFF)',
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent',
                            }}
                        >
                            Clients Say
                        </Box>
                    </Typography>

                    <Typography
                        sx={{
                            textAlign: 'center',
                            fontSize: 20,
                            color: '#B5BCCB',
                            maxWidth: 720,
                            mx: 'auto',
                            mb: 10,
                        }}
                    >
                        Trusted by businesses across India who rely on our platform daily
                    </Typography>
                </motion.div>

                {/* ================= SLIDER ================= */}
                <Box sx={{ position: 'relative', maxWidth: 900, mx: 'auto' }}>
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={currentIndex}
                            initial={{ opacity: 0, x: 120 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -120 }}
                            transition={{ duration: 0.6 }}
                        >
                            <TestimonialCard
                                testimonial={testimonials[currentIndex]}
                            />
                        </motion.div>
                    </AnimatePresence>

                    {/* ================= NAVIGATION ================= */}
                    <IconButton
                        onClick={prev}
                        sx={{
                            position: 'absolute',
                            top: '50%',
                            left: { xs: -12, md: -64 },
                            transform: 'translateY(-50%)',
                            bgcolor: 'rgba(255,255,255,0.08)',
                            border: '1px solid rgba(255,255,255,0.2)',
                            backdropFilter: 'blur(10px)',
                            '&:hover': {
                                bgcolor: 'rgba(255,255,255,0.2)',
                            },
                        }}
                    >
                        <ChevronLeftIcon sx={{ color: '#fff', fontSize: 32 }} />
                    </IconButton>

                    <IconButton
                        onClick={next}
                        sx={{
                            position: 'absolute',
                            top: '50%',
                            right: { xs: -12, md: -64 },
                            transform: 'translateY(-50%)',
                            bgcolor: 'rgba(255,255,255,0.08)',
                            border: '1px solid rgba(255,255,255,0.2)',
                            backdropFilter: 'blur(10px)',
                            '&:hover': {
                                bgcolor: 'rgba(255,255,255,0.2)',
                            },
                        }}
                    >
                        <ChevronRightIcon sx={{ color: '#fff', fontSize: 32 }} />
                    </IconButton>

                    {/* ================= DOTS ================= */}
                    <Stack
                        direction="row"
                        spacing={1.5}
                        justifyContent="center"
                        mt={6}
                    >
                        {testimonials.map((_, index) => (
                            <Box
                                key={index}
                                onClick={() => setCurrentIndex(index)}
                                sx={{
                                    width: index === currentIndex ? 32 : 10,
                                    height: 10,
                                    borderRadius: 10,
                                    cursor: 'pointer',
                                    transition: 'all 0.3s',
                                    background:
                                        index === currentIndex
                                            ? 'linear-gradient(90deg,#00E5FF,#7C4DFF)'
                                            : 'rgba(255,255,255,0.3)',
                                }}
                            />
                        ))}
                    </Stack>
                </Box>
            </Container>
        </Box>
    );
}

/* ============================================
   TESTIMONIAL CARD
============================================ */

function TestimonialCard({ testimonial }) {
    return (
        <Box
            sx={{
                position: 'relative',
                p: { xs: 4, md: 7 },
                borderRadius: 4,
                background: 'rgba(255,255,255,0.06)',
                backdropFilter: 'blur(20px)',
                border: '1px solid rgba(255,255,255,0.12)',
                textAlign: 'center',
                overflow: 'hidden',
            }}
        >
            {/* Glow */}
            <Box
                sx={{
                    position: 'absolute',
                    inset: 0,
                    background:
                        'linear-gradient(90deg,#00E5FF,#7C4DFF)',
                    opacity: 0.15,
                    filter: 'blur(80px)',
                }}
            />

            <Box sx={{ position: 'relative', zIndex: 2 }}>
                {/* Stars */}
                <Stack
                    direction="row"
                    justifyContent="center"
                    spacing={1}
                    mb={4}
                >
                    {[...Array(testimonial.rating)].map((_, i) => (
                        <motion.span
                            key={i}
                            initial={{ opacity: 0, scale: 0 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: i * 0.1 }}
                            style={{ fontSize: 28 }}
                        >
                            ⭐
                        </motion.span>
                    ))}
                </Stack>

                {/* Quote */}
                <Typography
                    sx={{
                        fontSize: { xs: 20, md: 26 },
                        color: '#E5E7EB',
                        lineHeight: 1.6,
                        mb: 6,
                    }}
                >
                    “{testimonial.text}”
                </Typography>

                {/* Author */}
                <Stack
                    direction="row"
                    spacing={3}
                    alignItems="center"
                    justifyContent="center"
                >
                    <Typography sx={{ fontSize: 46 }}>
                        {testimonial.avatar}
                    </Typography>
                    <Box textAlign="left">
                        <Typography
                            sx={{ fontWeight: 800, color: '#fff', fontSize: 18 }}
                        >
                            {testimonial.name}
                        </Typography>
                        <Typography sx={{ color: '#9CA3AF', fontSize: 14 }}>
                            {testimonial.business}
                        </Typography>
                    </Box>
                </Stack>
            </Box>
        </Box>
    );
}


/* ============================================
   FINAL CTA 
============================================ */

function FinalCTA() {
    const ctaRef = useRef(null);
    const navigate = useNavigate();

    return (
        <Box
            component="section"
            sx={{
                position: 'relative',
                py: { xs: 16, md: 22 },
                overflow: 'hidden',
                background:
                    'linear-gradient(180deg, #121826 0%, #0B0F1A 100%)',
            }}
        >
            {/* ================= ANIMATED GRADIENT BACKGROUND ================= */}
            <motion.div
                animate={{
                    backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                }}
                transition={{ duration: 12, repeat: Infinity, ease: 'linear' }}
                style={{
                    position: 'absolute',
                    inset: 0,
                    background:
                        'linear-gradient(90deg, #0B0F1A, #121826, #0B0F1A)',
                    backgroundSize: '200% 100%',
                    zIndex: 0,
                }}
            />

            {/* ================= PARTICLE BURST ================= */}
            {[...Array(20)].map((_, i) => (
                <motion.div
                    key={i}
                    animate={{
                        scale: [0, 1, 0],
                        opacity: [0, 1, 0],
                    }}
                    transition={{
                        duration: 3,
                        repeat: Infinity,
                        delay: Math.random() * 3,
                    }}
                    style={{
                        position: 'absolute',
                        width: 6,
                        height: 6,
                        borderRadius: '50%',
                        background:
                            'linear-gradient(90deg,#00E5FF,#7C4DFF)',
                        left: `${Math.random() * 100}%`,
                        top: `${Math.random() * 100}%`,
                        zIndex: 1,
                    }}
                />
            ))}

            {/* ================= CONTENT ================= */}
            <Container
                maxWidth={false}
                sx={{
                    position: 'relative',
                    zIndex: 2,
                    maxWidth: 1200,
                    textAlign: 'center',
                }}
            >
                <motion.div
                    ref={ctaRef}
                    initial={{ opacity: 0, y: 60 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.9 }}
                    viewport={{ once: true }}
                >
                    {/* ================= HEADLINE ================= */}
                    <Typography
                        sx={{
                            fontSize: { xs: 42, md: 72 },
                            fontWeight: 900,
                            lineHeight: 1.05,
                            mb: 4,
                        }}
                    >
                        <Box component="span" sx={{ color: '#fff' }}>
                            Run Your Business
                        </Box>
                        <br />
                        <Box
                            component="span"
                            sx={{
                                background:
                                    'linear-gradient(90deg,#00E5FF,#7C4DFF)',
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent',
                            }}
                        >
                            Like a Modern Enterprise
                        </Box>
                    </Typography>

                    {/* ================= SUBTEXT ================= */}
                    <Typography
                        sx={{
                            fontSize: { xs: 18, md: 22 },
                            color: '#B5BCCB',
                            maxWidth: 860,
                            mx: 'auto',
                            mb: 8,
                        }}
                    >
                        Join thousands of Indian businesses transforming their accounting,
                        GST, analytics and operations with a modern, intelligent platform.
                    </Typography>

                    {/* ================= CTA BUTTONS ================= */}
                    <Stack
                        direction={{ xs: 'column', sm: 'row' }}
                        spacing={4}
                        justifyContent="center"
                        alignItems="center"
                        mb={8}
                    >
                        <GlowButton2 onClick={() => navigate("/auth?mode=signup")}>Create Free Account</GlowButton2>
                        <GlowButton2 onClick={() => navigate("/auth")}>Login to Dashboard</GlowButton2>
                    </Stack>

                    {/* ================= TRUST INDICATORS ================= */}
                    <Stack
                        direction={{ xs: 'column', sm: 'row' }}
                        spacing={4}
                        justifyContent="center"
                        alignItems="center"
                    >
                        <TrustItem text="No credit card required" />
                        <TrustItem text="Free 14-day trial" />
                        <TrustItem text="Cancel anytime" />
                    </Stack>
                </motion.div>
            </Container>

            {/* ================= WAVE DIVIDER ================= */}
            <Box
                sx={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    height: 140,
                    overflow: 'hidden',
                }}
            >
                <svg viewBox="0 0 1200 120" preserveAspectRatio="none">
                    <motion.path
                        animate={{
                            d: [
                                'M0,50 Q300,100 600,50 T1200,50 L1200,120 L0,120 Z',
                                'M0,70 Q300,20 600,70 T1200,70 L1200,120 L0,120 Z',
                                'M0,50 Q300,100 600,50 T1200,50 L1200,120 L0,120 Z',
                            ],
                        }}
                        transition={{
                            duration: 8,
                            repeat: Infinity,
                            ease: 'easeInOut',
                        }}
                        fill="url(#ctaWave)"
                        opacity="0.25"
                    />
                    <defs>
                        <linearGradient id="ctaWave" x1="0" y1="0" x2="1" y2="0">
                            <stop offset="0%" stopColor="#00E5FF" />
                            <stop offset="50%" stopColor="#7C4DFF" />
                            <stop offset="100%" stopColor="#00E5FF" />
                        </linearGradient>
                    </defs>
                </svg>
            </Box>
        </Box>
    );
}

/* ============================================
   SUB COMPONENTS
============================================ */

function GlowButton2({ children, primary, onClick }) {
    return (
        <motion.div whileHover={{ scale: 1.08 }} whileTap={{ scale: 0.95 }}>
            <Button
                onClick={onClick}
                sx={{
                    px: 6,
                    py: 2,
                    borderRadius: 99,
                    fontSize: 18,
                    fontWeight: 800,
                    color: '#fff',
                    background: primary
                        ? 'linear-gradient(90deg,#00E5FF,#7C4DFF)'
                        : 'rgba(255,255,255,0.08)',
                    border: primary
                        ? 'none'
                        : '1px solid rgba(255,255,255,0.25)',
                    boxShadow: primary
                        ? '0 0 50px rgba(0,229,255,0.5)'
                        : 'none',
                    textTransform: 'none',
                }}
            >
                {children}
            </Button>
        </motion.div>
    );
}

function TrustItem({ text }) {
    return (
        <Stack direction="row" spacing={1.5} alignItems="center">
            <Typography sx={{ color: '#00C853', fontSize: 22 }}>
                ✓
            </Typography>
            <Typography sx={{ color: '#B5BCCB', fontSize: 16 }}>
                {text}
            </Typography>
        </Stack>
    );
}


function Footer() {
    const links = {
        product: ["Features", "Pricing", "Integrations", "API"],
        company: ["About", "Careers", "Blog", "Press"],
        resources: ["Documentation", "Help Center", "Community", "Status"],
        legal: ["Privacy", "Terms", "Security", "Compliance"],
    };

    return (
        <Box
            component="footer"
            sx={{
                background: "linear-gradient(to bottom, #0B0F1A, #000)",
                borderTop: "1px solid rgba(255,255,255,0.1)",
                color: "#fff",
            }}
        >
            <Box maxWidth="lg" mx="auto" px={3} py={8}>
                {/* Top Section */}
                <Grid container spacing={10} mb={6}>
                    {/* Logo */}
                    <Grid item xs={12} md={3}>
                        <Box mb={2}>
                            <Box
                                sx={{
                                    width: 48,
                                    height: 48,
                                    borderRadius: 2,
                                    background:
                                        "linear-gradient(135deg, #00E5FF, #7C4DFF)",
                                    p: "2px",
                                }}
                            >
                                <Box
                                    sx={{
                                        width: "100%",
                                        height: "100%",
                                        borderRadius: 1.5,
                                        bgcolor: "#0B0F1A",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                    }}
                                >
                                    <Box
                                        component="svg"
                                        width={24}
                                        height={24}
                                        fill="#00E5FF"
                                        viewBox="0 0 24 24"
                                    >
                                        <path d="M12 2L2 7v10c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-10-5zm0 18c-3.31-.81-6-4.22-6-8V8.3l6-3.12 6 3.12V12c0 3.78-2.69 7.19-6 8z" />
                                    </Box>
                                </Box>
                            </Box>
                        </Box>

                        <Typography variant="body2" color="grey.400">
                            Modern accounting platform built for Indian businesses
                        </Typography>
                    </Grid>

                    {/* Link Columns */}
                    <FooterColumn title="Product" items={links.product} />
                    <FooterColumn title="Company" items={links.company} />
                    <FooterColumn title="Resources" items={links.resources} />
                    <FooterColumn title="Legal" items={links.legal} />
                </Grid>

                {/* Bottom Bar */}
                <Box
                    pt={4}
                    borderTop="1px solid rgba(255,255,255,0.1)"
                    display="flex"
                    flexDirection={{ xs: "column", md: "row" }}
                    justifyContent="space-between"
                    alignItems="center"
                    gap={2}
                >
                    <Typography variant="body2" color="grey.400">
                        Made for Indian Businesses 🇮🇳
                    </Typography>

                    <Stack direction="row" spacing={2}>
                        <SocialLink icon="twitter" />
                        <SocialLink icon="linkedin" />
                        <SocialLink icon="instagram" />
                        <SocialLink icon="youtube" />
                    </Stack>
                </Box>

                <Typography
                    variant="caption"
                    color="grey.500"
                    display="block"
                    textAlign="center"
                    mt={4}
                >
                    © 2026 All rights reserved.
                </Typography>
            </Box>
        </Box>
    );
}

function FooterColumn({ title, items }) {
    return (
        <Grid item xs={6} md={2}>
            <Typography fontWeight={600} mb={2}>
                {title}
            </Typography>
            <Stack spacing={1.5}>
                {items.map((link) => (
                    <Link
                        key={link}
                        href="#"
                        underline="none"
                        sx={{
                            color: "grey.400",
                            fontSize: 14,
                            "&:hover": { color: "#00E5FF" },
                        }}
                    >
                        {link}
                    </Link>
                ))}
            </Stack>
        </Grid>
    );
}

function SocialLink({ icon }) {
    return (
        <Box
            component={motion.a}
            whileHover={{ scale: 1.1, y: -3 }}
            transition={{ type: "spring", stiffness: 300 }}
            href="#"
            sx={{
                width: 40,
                height: 40,
                borderRadius: "50%",
                border: "1px solid rgba(255,255,255,0.1)",
                bgcolor: "rgba(255,255,255,0.05)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "grey.400",
                textDecoration: "none",
                "&:hover": {
                    background:
                        "linear-gradient(90deg, #00E5FF, #7C4DFF)",
                    color: "#fff",
                },
            }}
        >
            {icon === "twitter" && "𝕏"}
            {icon === "linkedin" && "in"}
            {icon === "instagram" && "📷"}
            {icon === "youtube" && "▶"}
        </Box>
    );
}

export default function LandingPage() {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        document.documentElement.style.scrollBehavior = "smooth";
    }, []);

    return (
        <>
            {loading && <PreLoader onComplete={() => setLoading(false)} />}

            {!loading && (
                <div className="relative min-h-screen bg-[#0B0F1A] text-white overflow-x-hidden">
                    <Hero />
                    <TrustBar />
                    <FeatureSections />
                    <WhyPlatform />
                    <LiveMetrics />
                    {/* <TestimonialsAndCTA /> */}
                    <Testimonials />
                    <FinalCTA />
                    <Footer />
                </div>
            )}
        </>
    );
}