import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";

export default function Header() {
  return (
    <Box sx={{ flexGrow: 1, zIndex: "800" }}>
      <AppBar sx={{ backgroundColor: "#990000" }}>
        <Toolbar variant="dense">
          <Typography variant="h6" color="inherit" component="div">
            RitsEmptyRooms
          </Typography>
          <Box sx={{ flexGrow: 1 }} />
          <IconButton edge="start" color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
