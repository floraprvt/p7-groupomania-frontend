import React, { Component } from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import AppIcon from "../images/icon-transparent.png";

// Material UI
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";

// Redux
import { connect } from "react-redux";
import { signupUser } from "../redux/network/userNetwork";

const styles = (theme) => ({
  ...theme.styling,
});

class signup extends Component {
  constructor() {
    super();
    this.state = {
      firstName: "",
      lastName: "",
      officePosition: "",
      email: "",
      password: "",
      errors: {},
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.UI.errors) {
      this.setState({ errors: nextProps.UI.errors });
    }
  }

  handleSubmit = (event) => {
    event.preventDefault();

    const newUserData = {
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      officePosition: this.state.officePosition,
      email: this.state.email,
      password: this.state.password,
    };

    this.props.signupUser(newUserData, this.props.history);
  };

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  render() {
    const {
      classes,
      UI: { loading },
    } = this.props;
    const { errors } = this.state;

    return (
      <Grid container spacing={10} className={classes.form}>
        <Grid item className={classes.flex}>
          <img
            src={AppIcon}
            alt="logo d'une planète"
            className={classes.media}
          />
          <Typography variant="h4">Sign up</Typography>
        </Grid>
        <Grid item>
          <form
            onSubmit={this.handleSubmit}
            noValidate
            className={classes.root}
          >
            <TextField
              className={classes.field}
              id="firstName"
              name="firstName"
              type="text"
              label="Prénom*"
              variant="outlined"
              helperText={errors.firstName}
              error={errors.firstName ? true : false}
              value={this.state.firstName}
              onChange={this.handleChange}
            />
            <TextField
              className={classes.field}
              id="lastName"
              name="lastName"
              type="text"
              label="Nom*"
              variant="outlined"
              helperText={errors.lastName}
              error={errors.lastName ? true : false}
              value={this.state.lastName}
              onChange={this.handleChange}
            />
            <TextField
              className={classes.field}
              id="officePosition"
              name="officePosition"
              type="text"
              label="Rôle*"
              variant="outlined"
              helperText={errors.officePosition}
              error={errors.officePosition ? true : false}
              value={this.state.officePosition}
              onChange={this.handleChange}
            />
            <TextField
              className={classes.field}
              id="email"
              name="email"
              type="email"
              label="Adresse mail*"
              variant="outlined"
              helperText={errors.email}
              error={errors.email ? true : false}
              value={this.state.email}
              onChange={this.handleChange}
            />
            <TextField
              className={classes.field}
              id="password"
              name="password"
              type="password"
              label="Mot de passe*"
              variant="outlined"
              helperText={errors.password}
              error={errors.password ? true : false}
              value={this.state.password}
              onChange={this.handleChange}
            />
            {errors.general && (
              <Typography variant="body2" className={classes.customErrors}>
                {errors.general}
              </Typography>
            )}
            <Button
              type="submit"
              variant="contained"
              color="primary"
              disabled={loading}
              className={classes.button}
            >
              Signup
              {loading && (
                <CircularProgress size={30} className={classes.progress} />
              )}
            </Button>
            <p>
              You have an account ? sign up{" "}
              <Link to="/signup" className={classes.link}>
                here
              </Link>
            </p>
          </form>
        </Grid>
      </Grid>
    );
  }
}

signup.propTypes = {
  classes: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  UI: PropTypes.object.isRequired,
  signupUser: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  user: state.user,
  UI: state.UI,
});

const mapActionsToProps = {
  signupUser,
};

export default connect(
  mapStateToProps,
  mapActionsToProps
)(withStyles(styles)(signup));
