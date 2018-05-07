const drawerWidth = 256;

const styles = theme => ({
  drawerInner: {
    width: drawerWidth
  },
  drawerHeader: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: "0 8px",
    height: 56
  },
  headerButton: {
    fontSize: "1em"
  },
  hide: {
    display: "none"
  },
  appBar: {
    height: 56,
    position: "absolute",
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    })
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  menuButton: {
    marginLeft: 4,
    marginBottom: 4,
    marginRight: 32,
    color: theme.palette.primary.contrastText,
    fontSize: "1em"
  },
  menuIcon: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginLeft: theme.spacing.unit * 2
  },
  drawerPaper: {
    position: "relative",
    overflowX: "hidden",
    minHeight: "100%",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  drawerPaperClose: {
    width: theme.spacing.unit * 7,
    overflowX: "hidden",
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    })
  },
  menuFooter: {
    bottom: 0,
    position: "absolute",
    width: drawerWidth
  },
  activeItem: {
    backgroundColor: theme.palette.grey[300]
  }
});

export default styles;
