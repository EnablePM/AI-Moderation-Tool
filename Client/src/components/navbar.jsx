import React from "react";
import { AppBar, Toolbar, Typography, Button, Box, IconButton } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useUser } from "@stackframe/react";
import { stackClientApp } from "../stack/client";
import MenuIcon from "@mui/icons-material/Menu";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import logo from "../../public/CocaCola_Original_Logo.png"

export default function Navbar() {
  const navigate = useNavigate();
  const user = useUser();

  const handleSignOut = async () => {
    await stackClientApp.signOut();
    navigate("/");
  };

  return (
    <AppBar 
      position="static" 
      elevation={2} 
      sx={{ 
        px: 2,
        borderRadius: '0px',
        backgroundColor: (theme) => theme.palette.navbar.backgroundColor,
        color: (theme) => theme.palette.navbar.color,
      }}
    > 
      <Toolbar>
        <Box 
        component="img"
        sx={{
          height: 29,
          mr: 3,
        }}
        src={logo}
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
                {user.primaryEmail || "User"}
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
