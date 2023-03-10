import React, { useState } from "react";
import classes from "../App.module.css";
import { NavLink, useNavigate } from "react-router-dom";
import IconButton from "@mui/material/IconButton";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormHelperText from "@mui/material/FormHelperText";
import FormControl from "@mui/material/FormControl";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { auth } from "../Auth/firebaseConfig";
import Link from "@mui/material/Link";
import { useSignInWithEmailAndPassword } from "react-firebase-hooks/auth";
import CircularProgress from "@mui/material/CircularProgress";
import { useLoginStatus } from "../Auth/AuthContext";

const SignUp = () => {
  const { isLoggedIn } = useLoginStatus();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [signInWithEmailAndPassword, user, loading, error] =
    useSignInWithEmailAndPassword(auth);
  const navigate = useNavigate();

  const onLogin = async () => {
    try {
      await signInWithEmailAndPassword(email, password);
    } catch (error: any) {
      console.log(error.code, error.message);
    }
  };

  if (isLoggedIn) {
    navigate("/");
  }
  return (
    <Box
      sx={{
        backgroundColor: "#2196f3",
        background: "linear-gradient(160deg, #2196f3 0%, #1769aa 100%)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
      }}
    >
      <Paper
        sx={{
          elevation: 3,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          padding: 3,
        }}
      >
        <Typography variant="h4">Log in</Typography>
        <Typography variant="subtitle1" sx={{ marginBottom: 2 }}>
          Don't have an account?{" "}
          <Link component={NavLink} to="/signup" underline="hover">
            Sign in
          </Link>
        </Typography>
        <FormControl sx={{ m: 1, width: "25ch" }} variant="outlined">
          <InputLabel htmlFor="login">Email</InputLabel>
          <OutlinedInput
            autoComplete="off"
            id="login"
            type={"email"}
            label="Email"
            value={email}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                onLogin();
              }
            }}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
        </FormControl>

        <FormControl sx={{ m: 1, width: "25ch" }} variant="outlined">
          <InputLabel htmlFor="outlined-adornment-password">
            Password
          </InputLabel>
          <OutlinedInput
            id="outlined-adornment-password"
            type={showPassword ? "text" : "password"}
            value={password}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                onLogin();
              }
            }}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={() => setShowPassword((show) => !show)}
                  onMouseDown={(event: React.MouseEvent<HTMLButtonElement>) => {
                    event.preventDefault();
                  }}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            label="Password"
          />
        </FormControl>
        {error && (
          <FormHelperText error>
            {error.code === "auth/invalid-email"
              ? "Invalid email or password"
              : error.message}
          </FormHelperText>
        )}
        {loading ? (
          <CircularProgress />
        ) : (
          <Button
            sx={{ marginTop: 1 }}
            variant="contained"
            onClick={() => {
              onLogin();
            }}
          >
            Log in
          </Button>
        )}
      </Paper>
      <div className={classes.blob}></div>
    </Box>
  );
};

export default SignUp;
