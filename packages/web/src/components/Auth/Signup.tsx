import {
  Avatar,
  Backdrop,
  Button,
  CircularProgress,
  Container,
  TextField,
  Typography
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { LockOutlined } from "@material-ui/icons";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { ApplicationState } from "../../store";
import { startSignup } from "../../store/user";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.primary.main
  },
  form: {
    width: "100%",
    marginTop: theme.spacing(1)
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    "&:hover": {
      backgroundColor: "#082767"
    }
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#000"
  }
}));

const Signup = () => {
  const classes = useStyles();

  const dispatch = useDispatch();
  const history = useHistory();
  const isLoading = useSelector(
    (state: ApplicationState) => state.user.isLoading
  );

  const isAuthenticated = useSelector(
    (state: ApplicationState) => state.user.isAuthenticated
  );

  const errors = useSelector((state: ApplicationState) => state.user.errors);

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [formErrors, setFormErrors] = useState({
    fullName: "",
    password: "",
    email: ""
  });

  const resetForm = () => {
    setFormErrors({
      fullName: "",
      password: "",
      email: ""
    });
  };

  const resetFormData = () => {
    setEmail("");
    setPassword("");
    setFullName("");
  };

  useEffect(() => {
    if (!errors?.length) return resetForm();
    errors?.forEach((error) => {
      setFormErrors((currentErrors) => ({
        ...currentErrors,
        [error.field]: error.message
      }));
    });

    console.log(formErrors);
  }, [errors]);

  useEffect(() => {
    if (isAuthenticated) {
      resetFormData();
      history.push("/dash");
    }
  }, [isAuthenticated]);

  const handleChange = (event: React.SyntheticEvent) => {
    const target = event.target as HTMLInputElement;

    const { name, value } = target;

    if (name === "fullName") {
      setFullName(value);
    } else if (name === "email") {
      setEmail(value);
    } else if (name === "password") {
      setPassword(value);
    }
  };

  const handleSubmit = async (event: React.SyntheticEvent) => {
    event.preventDefault();
    const payload = {
      fullName,
      email,
      password
    };

    dispatch(startSignup(payload));
  };

  return (
    <Container component="main" maxWidth="xs">
      <div className={classes.paper}>
        <Backdrop className={classes.backdrop} open={isLoading}>
          <CircularProgress color="inherit" />
        </Backdrop>
        <Avatar className={classes.avatar}>
          <LockOutlined color="secondary" />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <form className={classes.form} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="name"
            label="Full Name"
            name="fullName"
            value={fullName}
            onChange={handleChange}
            autoComplete="name"
            autoFocus
            error={!!formErrors.fullName}
            helperText={formErrors.fullName}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            value={email}
            onChange={handleChange}
            autoComplete="email"
            autoFocus
            error={!!formErrors.email}
            helperText={formErrors.email}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            value={password}
            onChange={handleChange}
            id="password"
            autoComplete="current-password"
            error={!!formErrors.password}
            helperText={formErrors.password}
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={handleSubmit}
          >
            Sign Up
          </Button>
        </form>
      </div>
    </Container>
  );
};
export default Signup;
