import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import dayjs from "dayjs";

// Material UI
import withStyles from "@material-ui/core/styles/withStyles";
import Typography from "@material-ui/core/Typography";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Divider from "@material-ui/core/Divider";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";

const styles = (theme) => ({
  ...theme.styling,
  root: {
    width: "100%",
    maxWidth: "36ch",
    backgroundColor: theme.palette.background.paper,
  },
  inline: {
    display: "inline",
  },
});

export class Comment extends Component {
  render() {
    const { classes, comments } = this.props;
    return (
      <List className={classes.root}>
        {comments.map((comment) => {
          const {
            commentId,
            content,
            createdAt,
            avatar,
            firstName,
            lastName,
          } = comment;
          return (
            <Fragment key={commentId}>
              <ListItem alignItems="flex-start">
                <ListItemAvatar>
                  <Avatar alt="Avatar" src={avatar} />
                </ListItemAvatar>
                <ListItemText
                  secondary={
                    <React.Fragment>
                      <Typography
                        component="span"
                        variant="body2"
                        className={classes.inline}
                        color="textPrimary"
                      >
                        {firstName + " " + lastName + " - "}
                      </Typography>
                      {dayjs(createdAt).fromNow()}
                    </React.Fragment>
                  }
                  primary={content}
                />
              </ListItem>
              <Divider variant="inset" component="li" />
            </Fragment>
          );
        })}
      </List>
    );
  }
}

Comment.propTypes = {
  comments: PropTypes.array.isRequired,
};

export default withStyles(styles)(Comment);