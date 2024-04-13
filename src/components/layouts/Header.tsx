import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Link from "next/link";
import Drawer from "../elements/Drawer";

export default function Header() {
  return (
    <Box sx={{ display: "flex",flexGrow: 1, zIndex: "800" }}>
      <AppBar position="fixed" sx={{ backgroundColor: "#990000", height:"78px",lineHeight:"78px" }}>
        <Toolbar variant="dense">
          <Link href="/" style={{ color: "inherit" }}>
            <Typography
              color="inherit"
              component="div"
              style={{ display: "inline-block",fontSize:"24px"}}
            >
              RitsEmptyRooms
            </Typography>
          </Link>
          <Box sx={{ flexGrow: 1 }} />
          <Box>
          <Drawer />
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
