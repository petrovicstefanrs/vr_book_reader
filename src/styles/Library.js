const styles = theme => ({
  headline: {
    fontSize: "10em",
    fontWeight: 700,
    lineHeight: "1em"
  },
  emptyPage: {
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    margin: 0,
    padding: 24,
    paddingTop: 111,
    paddingLeft: 80,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    flexDirection: "column"
  },
  floatButton: {
    position: "absolute",
    bottom: 24,
    right: 24,
    zIndex: 999,
    fontSize: "1em"
  },
  container: {
    width: "100%",
    display: "flex",
    justifyContent: "space-between",
    flexWrap: "wrap",
    paddingTop: 24
  }
});

export default styles;
