import { Button, makeStyles } from "@material-ui/core";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import React, { SyntheticEvent } from "react";
import useAuth from "../../hooks/useAuth";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles({
  root: {
    flexGrow: 1
  },
  title: {
    flexGrow: 1
  }
});
const Navbar = () => {
  const classes = useStyles();
  const history = useHistory();
  const [isAuth, handleLogout] = useAuth();

  const handleRedirect = (event: SyntheticEvent, tag: string) => {
    event.preventDefault();
    return history.push(tag);
  };

  return (
    <div className={classes.root}>
      <AppBar position="static" color="primary">
        <Toolbar>
          <Typography variant="h6" className={classes.title} color="inherit">
            Curate Editor 💖
          </Typography>
          {!isAuth && (
            <Button
              color="inherit"
              name="signin"
              onClick={(e) => handleRedirect(e, "/")}
            >
              Signin
            </Button>
          )}
          {!isAuth && (
            <Button
              color="inherit"
              name="signup"
              onClick={(e) => handleRedirect(e, "/signup")}
            >
              Signup
            </Button>
          )}
          {isAuth && (
            <Button onClick={() => handleLogout()} color="inherit">
              Logout
            </Button>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Navbar;
