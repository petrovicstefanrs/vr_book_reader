// Node Modules

import React, {Component} from 'react';
import Paper from 'material-ui/Paper';
import { withStyles } from 'material-ui/styles';

// Enviroment Settings

// Component Code

const styles = theme => ({
	content: {
		position: 'absolute',
		top: 0,
		left: 0,
		padding: 24,
		paddingLeft: 80,
		paddingTop: 80,
		boxSizing: 'border-box',
		minHeight: '100%',
		maxHeight: '100%',
		minWidth: '100%',
		maxWidth: '100%',
		overflowY: 'auto',
	    flexGrow: 1,
	    backgroundColor: theme.palette.background.default,
	}
});

class AsPageContent extends Component {
  render() {
  	const classes = this.props.classes;
    return(
      <Paper className={classes.content} elevation={3}>
        {this.props.children}
      </Paper>
    );
  }
}

export default withStyles(styles)(AsPageContent);
