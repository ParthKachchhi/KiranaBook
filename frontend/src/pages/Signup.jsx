import React, { useState } from "react";
import {
  Box,
  Paper,
  TextField,
  Button,
  Typography,
  IconButton,
  InputAdornment
} from "@mui/material";
import {
  Visibility,
  VisibilityOff,
  Person,
  Phone,
  Store,
  Lock
} from "@mui/icons-material";
import { motion, AnimatePresence } from "framer-motion";

/* ---------------- ANIMATION VARIANTS ---------------- */

const pageFade = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 }
};

const formSlide = {
  hidden: { opacity: 0, x: 40 },
  visible: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -40 }
};

const floatAnim = {
  animate: {
    y: [0, -10, 0],
    transition: { duration: 4, repeat: Infinity, ease: "easeInOut" }
  }
};

/* ---------------- COMPONENT ---------------- */

export default function AuthPage() {
  const [mode, setMode] = useState("login");
  const [showPassword, setShowPassword] = useState(false);

  const [loginData, setLoginData] = useState({
    mobileNumber: "",
    password: ""
  });

  const [signupData, setSignupData] = useState({
    fullName: "",
    mobileNumber: "",
    shopName: "",
    password: ""
  });

  return (
    <motion.div variants={pageFade} initial="hidden" animate="visible">
      <Box
        sx={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          p: 2,
          background:
            "linear-gradient(135deg, #fff1f2 0%, #eef2ff 100%)"
        }}
      >
        <Paper
          elevation={16}
          sx={{
            width: "100%",
            maxWidth: 1150,
            borderRadius: 5,
            overflow: "hidden",
            display: "flex",
            flexDirection: { xs: "column", md: "row" }
          }}
        >
          {/* LEFT – FORM */}
          <Box
            sx={{
              flex: 1,
              p: { xs: 4, md: 7 },
              display: "flex",
              flexDirection: "column",
              justifyContent: "center"
            }}
          >
            <Typography variant="h4" fontWeight={700} mb={1}>
              {mode === "login" ? "Welcome Back 👋" : "Create Account"}
            </Typography>

            <Typography color="text.secondary" mb={4}>
              {mode === "login"
                ? "Login to manage your Khatabook"
                : "Digitize your kirana store today"}
            </Typography>

            <AnimatePresence mode="wait">
              {/* LOGIN */}
              {mode === "login" && (
                <motion.div
                  key="login"
                  variants={formSlide}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                >
                  <TextField
                    fullWidth
                    label="Mobile Number"
                    placeholder="+91 XXXXX XXXXX"
                    value={loginData.mobileNumber}
                    onChange={(e) =>
                      setLoginData({
                        ...loginData,
                        mobileNumber: e.target.value
                      })
                    }
                    sx={{ mb: 3 }}
                  />

                  <TextField
                    fullWidth
                    label="Password"
                    type={showPassword ? "text" : "password"}
                    value={loginData.password}
                    onChange={(e) =>
                      setLoginData({
                        ...loginData,
                        password: e.target.value
                      })
                    }
                    InputProps={{
                      endAdornment: (
                        <IconButton
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? (
                            <VisibilityOff />
                          ) : (
                            <Visibility />
                          )}
                        </IconButton>
                      )
                    }}
                    sx={{ mb: 4 }}
                  />

                  <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                    <Button
                      fullWidth
                      size="large"
                      variant="contained"
                      sx={{
                        py: 1.6,
                        borderRadius: 3,
                        fontWeight: 700,
                        background:
                          "linear-gradient(135deg, #6366f1, #4338ca)"
                      }}
                    >
                      LOGIN
                    </Button>
                  </motion.div>
                </motion.div>
              )}

              {/* SIGNUP */}
              {mode === "signup" && (
                <motion.div
                  key="signup"
                  variants={formSlide}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                >
                  <TextField
                    fullWidth
                    placeholder="Full Name"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Person />
                        </InputAdornment>
                      )
                    }}
                    sx={{ mb: 2.5 }}
                  />

                  <TextField
                    fullWidth
                    placeholder="Mobile Number (+91)"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Phone />
                        </InputAdornment>
                      )
                    }}
                    sx={{ mb: 2.5 }}
                  />

                  <TextField
                    fullWidth
                    placeholder="Shop Name (Optional)"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Store />
                        </InputAdornment>
                      )
                    }}
                    sx={{ mb: 2.5 }}
                  />

                  <TextField
                    fullWidth
                    type={showPassword ? "text" : "password"}
                    placeholder="Create Password"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Lock />
                        </InputAdornment>
                      ),
                      endAdornment: (
                        <IconButton
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? (
                            <VisibilityOff />
                          ) : (
                            <Visibility />
                          )}
                        </IconButton>
                      )
                    }}
                    sx={{ mb: 4 }}
                  />

                  <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                    <Button
                      fullWidth
                      size="large"
                      variant="contained"
                      sx={{
                        py: 1.6,
                        borderRadius: 3,
                        fontWeight: 700,
                        background:
                          "linear-gradient(135deg, #6366f1, #4338ca)"
                      }}
                    >
                      CREATE ACCOUNT
                    </Button>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>

            <Typography align="center" mt={4}>
              {mode === "login" ? (
                <>
                  Don’t have an account?{" "}
                  <span
                    style={{ color: "#4338ca", cursor: "pointer", fontWeight: 600 }}
                    onClick={() => setMode("signup")}
                  >
                    Sign up
                  </span>
                </>
              ) : (
                <>
                  Already have an account?{" "}
                  <span
                    style={{ color: "#4338ca", cursor: "pointer", fontWeight: 600 }}
                    onClick={() => setMode("login")}
                  >
                    Login
                  </span>
                </>
              )}
            </Typography>
          </Box>

          {/* RIGHT – ILLUSTRATION */}
          <Box
            component={motion.div}
            variants={floatAnim}
            animate="animate"
            sx={{
              flex: 1,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background:
                "linear-gradient(135deg, #eef2ff 0%, #fdf2f8 100%)",
              p: 6
            }}
          >
            <Box textAlign="center">
              <Typography fontSize={120}>🏪</Typography>
              <Typography fontSize={56}>📱 🧾</Typography>
              <Typography mt={2} color="text.secondary">
                Smart accounting for Indian shops
              </Typography>
            </Box>
          </Box>
        </Paper>
      </Box>
    </motion.div>
  );
}
