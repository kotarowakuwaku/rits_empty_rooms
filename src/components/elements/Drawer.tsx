import MenuIcon from "@mui/icons-material/Menu";
import {
  Box,
  SwipeableDrawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  IconButton,
} from "@mui/material";
import Link from "next/link";
import * as React from "react";
import "normalize.css";

type Anchor = "right";

export default function Drawer() {
  const [state, setState] = React.useState({ right: false });

  const toggleDrawer =
    (anchor: Anchor, open: boolean) =>
    (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event &&
        event.type === "keydown" &&
        ["Tab", "Shift"].includes((event as React.KeyboardEvent).key)
      )
        return;
      setState({ ...state, [anchor]: open });
    };

  const listItems = [
    { text: "リアルタイムの空き教室", href: "/" },
    { text: "キャンパス設定画面", href: "/making" },
    { text: "時間割登録画面", href: "/making" },
    { text: "空き教室一覧", href: "/making" },
    { text: "検索", href: "/making" },
    { text: "管理者画面", href: "/emptyRoomsEdit" },
  ];

  return (
    <>
      {(["right"] as const).map((anchor) => (
        <React.Fragment key={anchor}>
          <IconButton
            onClick={toggleDrawer(anchor, true)}
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
          >
            <MenuIcon sx={{ fontSize: "36px" }} />
          </IconButton>
          <SwipeableDrawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
            onOpen={toggleDrawer(anchor, true)}
            sx={{ zIndex: "8" }}
          >
            <DrawerList items={listItems} />
          </SwipeableDrawer>
        </React.Fragment>
      ))}
    </>
  );
}

interface DrawerListProps {
  items: { text: string; href: string }[];
}

const DrawerList: React.FC<DrawerListProps> = ({ items }) => (
  <Box role="presentation" sx={{ overflow: "hidden" }}>
    <List
      sx={{
        backgroundColor: "#EDEAE8",
        height: "100vh",
        opacity: "0.8",
        zIndex: "700",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        marginTop: "78px",
      }}
    >
      {items.map(({ text, href }, index) => (
        <ListItem
          key={index}
          disablePadding
          sx={{
            borderBottom: "1px solid #D9D9D9",
            height: "60px",
            width: "300px",
          }}
        >
          <ListItemButton sx={{ display: "inline-block" }}>
            <Link href={href} passHref style={{ textDecoration: "none" }}>
              <ListItemText
                primaryTypographyProps={{
                  fontFamily: "Inter, sans-serif",
                  fontWeight: "medium",
                }}
                primary={text}
                sx={{
                  color: "#2A2B27",
                  width: "100%",
                  textAlign: "center",
                }}
              />
            </Link>
          </ListItemButton>
        </ListItem>
      ))}
    </List>
  </Box>
);
