import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Link from "next/link";

export default function Header() {
  return (
    <Box sx={{ flexGrow: 1, zIndex: "800" }}>
      <AppBar sx={{ backgroundColor: "#990000" }}>
        <Toolbar variant="dense">
          <Link href="/" style={{ color: "inherit" }}>
            <Typography
              variant="h6"
              color="inherit"
              component="div"
              style={{ display: "inline-block" }}
            >
              RitsEmptyRooms
            </Typography>
          </Link>
          <Box sx={{ flexGrow: 1 }} />
          <Link href="/emptyRoomsEdit" style={{ color: "inherit" }}>
            <IconButton edge="start" color="inherit" aria-label="menu">
              <MenuIcon />
            </IconButton>
          </Link>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
