import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import React from "react";

const Navbar = () => (
  <div>
    <AppBar position="static" color="primary">
      <Toolbar>
        <Typography variant="h6" color="inherit">
          Curate Editor 💖
        </Typography>
      </Toolbar>
    </AppBar>
  </div>
);

export default Navbar;
