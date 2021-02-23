import React from "react";
import { makeStyles, createStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import AppMenuItem from "./AppMenuItem";
import PersonIcon from '@material-ui/icons/Person';
import MessageIcon from '@material-ui/icons/Message';

const appMenuItems = [
  {
    name: "Contact",
    link: "/contact",
    Icon:PersonIcon
  },
  {
    name: "Message",
    link: "/message",
    Icon:MessageIcon
  },
];

const AppMenu = ({ setOpen1 }) => {
  const classes = useStyles();
  return (
    <List className={classes.appMenu} disablePadding>
      {/* <AppMenuItem {...appMenuItems[0]} /> */}
      {appMenuItems.map((item, index) => (
        <AppMenuItem {...item} key={index} setOpen2={() => setOpen1()} />
      ))}
    </List>
  );
};

const drawerWidth = 240;

const useStyles = makeStyles((theme) =>
  createStyles({
    appMenu: {
      width: "100%",
    },
    navList: {
      width: drawerWidth,
    },
    menuItem: {
      width: drawerWidth,
    },
    menuItemIcon: {
      color: "#97c05c",
    },
  })
);
export default AppMenu;
