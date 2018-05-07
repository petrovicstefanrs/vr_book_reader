// Node Modules

import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import lodash from "lodash";
import FontAwesome from "react-fontawesome";

import Divider from "material-ui/Divider";
import Typography from "material-ui/Typography";
import { withStyles } from "material-ui/styles";
import Card, { CardActions, CardContent } from "material-ui/Card";
import Button from "material-ui/Button";
import Paper from "material-ui/Paper";

// Enviroment Settings

import FA from "../../lib/font_awesome";
import * as routes from "../../lib/routes";
import { setMenuActive } from "../../redux/actions/menu";

// Components

import AsPageContent from "../../hoc/AsPageContent";

// Component Code

import styles from "../../styles/Library";
const CLASS = "top-Library";
class Library extends Component {
  static propTypes = {
    classes: PropTypes.object.isRequired
  };

  static defaultProps = {};

  constructor(props) {
    super(props);

    this.state = {};

    this.renderEmptyLibrary = this.renderEmptyLibrary.bind(this);
  }

  renderEmptyLibrary() {
    const classes = this.props.classes;
    return (
      <div className={classes.emptyPage}>
        <Typography className={classes.headline} type="headline">
          <FontAwesome icon={FA.book} name={FA.book} />
        </Typography>
        <Typography type="title">
          It looks like your library is empty.
        </Typography>
        <Typography type="subheading">
          Click the button in bottom right corner to add your eBooks!
        </Typography>
      </div>
    );
  }

  render() {
    const classes = this.props.classes;
    return (
      <AsPageContent>
        <div className={CLASS}>
          <Button
            variant="fab"
            color="secondary"
            aria-label="add_books"
            className={classes.floatButton}
          >
            <FontAwesome icon={FA.plus} name={FA.plus} />
          </Button>
          <div>
            <Typography type="display2">Library</Typography>
            <Divider />
          </div>
          {this.renderEmptyLibrary()}
          <div className={classes.container} />
        </div>
      </AsPageContent>
    );
  }
}

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({});

export default withStyles(styles)(
  connect(mapStateToProps, mapDispatchToProps)(Library)
);
