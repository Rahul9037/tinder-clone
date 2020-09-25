import React from "react";
import PersonIcon from "@material-ui/icons/Person";
import TinderLogo from "../../icons/tinder.png";
import ForumIcon from "@material-ui/icons/Forum";
import IconButton from "@material-ui/core/IconButton";
import "./Header.css";

function Header() {
  return (
    <div className="header">
      <IconButton>
        <PersonIcon color="action" fontSize="large" />
      </IconButton>
      <img className="header__logo" src={TinderLogo} />
      <IconButton>
        <ForumIcon color="action" fontSize="large" />
      </IconButton>
    </div>
  );
}

export default Header;
