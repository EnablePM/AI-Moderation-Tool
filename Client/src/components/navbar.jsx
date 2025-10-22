import React from "react";
import { AppBar, Toolbar, Typography, Button, Box, IconButton } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import MenuIcon from "@mui/icons-material/Menu";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

export default function Navbar() {
  // Dope navbar. Need to handle breakpoints and mobile responsiveness as signin button kinda gammy 
  const navigate = useNavigate();
  const { user, signOut } = useAuth();

  const handleSignOut = async () => {
    await signOut();
    navigate("/");
  };

  return (
    <AppBar 
      position="static" 
      elevation={2} 
      sx={{ 
        px: { xs: 2, sm: 3, md: 6, lg: 12, xl: 20 },
        borderRadius: '0px',
        backgroundColor: (theme) => theme.palette.navbar.backgroundColor,
        color: (theme) => theme.palette.navbar.color,
      }}
    > 
      <Toolbar sx={{ px: 0 }}>
        <Box 
        component="img"
        sx={{
          height: 29,
          mr: 3,
        }}
        src="/CocaCola_Original_Logo.png"
        alt="Logo"
        />
        <Typography variant="h6" component="div" sx={{ flexGrow: 1,  }}>
          AI Moderation Tool
        </Typography>

        {user ? (
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <AccountCircleIcon />
              <Typography variant="body2">
                {user?.email || "User"}
              </Typography>
            </Box>
            <Button variant="contained" color="Navbar" onClick={handleSignOut}>
              Sign Out
            </Button>
          </Box>
        ) : (
          <Button color="inherit" onClick={() => navigate("/")}>
            Sign In
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
}
