import React, { useState } from "react";
import clsx from "clsx";
import AppBar from "@material-ui/core/AppBar";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { useLocation } from "react-router-dom";
import AppMenu from "./AppMenu";
const Menu = (props) => {
  const [open, setOpen] = useState(false);
  const classes = useStyles();
  const map = {
    contact: "Contact",
    message: "Messages",
  };
  const data = useLocation().pathname.split("/");
  return (
    <>
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={() => setOpen(!open)}
            edge="start"
            className={clsx(classes.menuButton, open && classes.hide)}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap className={classes.headerText}>
            {map[data[1]]}
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        className={classes.drawer}
        anchor="left"
        open={open}
        classes={{
          paper: classes.drawerPaper,
        }}
        onClose={() => setOpen(false)}
      >
        <AppMenu
          setOpen1={() => {
            setOpen(!open);
          }}
        />
      </Drawer>
    </>
  );
};
const drawerWidth = "304px";
const useStyles = makeStyles((theme) => ({
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    marginBottom: "35px",
  },
  drawerPaper: {
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
    background: "#ffffff",
    color: "rgba(0, 0, 0, 0.6)",
    fontWeight: 500,
  },
  appBar: {
    backgroundColor: "#2a2e43",
    height: "56px",
    display: "flex",
    justifyContent: "center",
  },
  headerText: {
    fontWeight: 500,
    fontSize: "20px",
    marginLeft: "20px",
  },
}));

export default Menu;
