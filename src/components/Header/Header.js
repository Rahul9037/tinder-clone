import React from "react";
import PersonIcon from "@material-ui/icons/Person";
import TinderLogo from "../../icons/tinder.png";
import ForumIcon from "@material-ui/icons/Forum";
import IconButton from "@material-ui/core/IconButton";
import "./Header.css";
import { useStateValue } from "../../StateProvider/StateProvider";
import { Link } from "react-router-dom";

function Header() {
  const [{ user }, dispatch] = useStateValue();
  return (
    <div>
      {!user ? (
        <div className="header">
          <IconButton></IconButton>
          <img className="header__logo" src={TinderLogo} />
          <IconButton></IconButton>
        </div>
      ) : (
        <div className="header">
          <IconButton>
            <Link to="/profile">
              <PersonIcon color="action" fontSize="large" />
            </Link>
          </IconButton>
          <IconButton>
            <Link to="/home">
              <img className="header__logo" src={TinderLogo} />
            </Link>
          </IconButton>
          <IconButton>
            <ForumIcon color="action" fontSize="large" />
          </IconButton>
        </div>
      )}
    </div>
  );
}

export default Header;
