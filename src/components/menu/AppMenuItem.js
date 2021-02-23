import React from "react";
import PropTypes from "prop-types";
import { makeStyles, createStyles } from "@material-ui/core/styles";
// import { SvgIconProps } from '@material-ui/core/SvgIcon'

import List from "@material-ui/core/List";

import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";
import Collapse from "@material-ui/core/Collapse";

import IconExpandLess from "@material-ui/icons/ExpandLess";
import IconExpandMore from "@material-ui/icons/ExpandMore";

import AppMenuItemComponent from "./AppMenuItemComponent";

// React runtime PropTypes
export const AppMenuItemPropTypes = {
  name: PropTypes.string.isRequired,
  link: PropTypes.string,
  Icon: PropTypes.elementType,
  items: PropTypes.array,
};

const AppMenuItem = (props) => {
  const { name, link, Icon, items = [], setOpen2 } = props;
  const classes = useStyles();
  const isExpandable = items && items.length > 0;
  const [open, setOpen] = React.useState(false);

  function handleClick() {
    setOpen(!open);
  }

  const MenuItemRoot = (
    <AppMenuItemComponent
      className={classes.menuItem}
      link={link}
      onClick={handleClick}
      setOpen3={() => setOpen2()}
    >
      {/* Display an icon if any */}
      {!!Icon && (
        <ListItemIcon>
          <Icon
            className={classes.menuItemIcon}
            style={{ width: "24px", height: "24px" }}
            alt={name}
          />
        </ListItemIcon>
      )}
      <ListItemText
        primary={name}
        inset={!Icon}
        primaryTypographyProps={{ style: { fontWeight: 500, fontSize: 16,fontFamily:"Poppins-SemiBold" } }}
      />
      {/* Display the expand menu if the item has children */}
      {isExpandable && !open && <IconExpandMore />}
      {isExpandable && open && <IconExpandLess />}
    </AppMenuItemComponent>
  );

  const MenuItemChildren = isExpandable ? (
    <Collapse in={open} timeout="auto" unmountOnExit>
      <Divider />
      <List component="div" disablePadding>
        {items.map((item, index) => (
          <AppMenuItem {...item} key={index} />
        ))}
      </List>
    </Collapse>
  ) : null;

  return (
    <>
      {MenuItemRoot}
      {MenuItemChildren}
    </>
  );
};

const useStyles = makeStyles((theme) =>
  createStyles({
    menuItem: {
      "&.active": {
        background: "rgba(0, 0, 0, 0.08)",
        "& .MuiListItemIcon-root": {
          color: "#fff",
        },
        color: "#2a2e43",
      },
    },
    menuItemIcon: {
      color: "#2a2e43",
    },
  })
);

export default AppMenuItem;
