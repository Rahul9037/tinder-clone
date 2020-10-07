import React, { useEffect, useState } from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import TinderLogo from "../../icons/tinder.png";
import axios from "../../Axios/axios";
import "./Profile.css";
import { Button, IconButton } from "@material-ui/core";
import SaveIcon from "@material-ui/icons/Save";
import PhotoCamera from "@material-ui/icons/PhotoCamera";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import { useStateValue } from "../../StateProvider/StateProvider";

function Profile() {
  const [{ user }, dispatch] = useStateValue();
  const [userProfile, setUserProfile] = useState(user);
  const [file, setFile] = useState(null);

  const onSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("myfile", file);
    formData.append("email", user.email);
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };
    axios
      .post("/upload", formData, config)
      .then((response) => {
        dispatch({
          type: "SET_USER",
          user: response.data,
        });
        setUserProfile(response.data);
      })
      .catch((error) => {
        console.log("error", error);
      });
  };

  const onChange = (e) => {
    e.preventDefault();
    setFile(e.target.files[0]);
  };

  const onLogout = (e) => {
    e.preventDefault();
    axios.get("/logout")
    .then((response) => {
      dispatch({
        type: "SET_USER",
        user : response.data
      })
    })
    .catch((error) => {
      console.log("error", error);
    });
  }

  return (
    <div className="profile">
      <div className="profile__edit">
        <div
          className="profile__picture"
          // src={
          //   !userProfile?.profile
          //     ? "http://localhost:8001/noprofilepictureicon.png"
          //     : `http://localhost:8001/${userProfile?.profile.filename}`
          // }
          // style={{
          //   backgroundImage: `url(${
          //     !userProfile?.profile
          //     ? "http://localhost:8001/noprofilepictureicon.png"
          //     : `http://localhost:8001/${userProfile?.profile.filename}`
          //   })`,
          // }}
          style={{
            backgroundImage: `url(${
              !userProfile?.profile
              ? "https://backend-tinder-react.herokuapp.com/noprofilepictureicon.png"
              : `https://backend-tinder-react.herokuapp.com/${userProfile?.profile.filename}`
            })`,
          }}
        ></div>
        <div className="profile__upload">
          <input
            accept="image/*"
            id="icon-button-file"
            type="file"
            style={{ display: "none" }}
            onChange={onChange}
          />
          <label htmlFor="icon-button-file">
            <IconButton
              color="primary"
              aria-label="upload picture"
              component="span"
            >
              <PhotoCamera />
            </IconButton>
          </label>
          <p>{file?.name}</p>
        </div>
        <Button
          variant="contained"
          color="primary"
          size="small"
          startIcon={<SaveIcon />}
          onClick={onSubmit}
          disabled={!file}
        >
          Save
        </Button>
      </div>
      <div className="profile__right">
        <div className="profile__details">
          <h2>{userProfile?.name}</h2>
          <h3>{userProfile?.email}</h3>
          <h3>{userProfile?.age}</h3>
        </div>
        <div className="profile__logout">
            <Button
              variant="contained"
              color="secondary"
              endIcon={<ExitToAppIcon/>}
              onClick={onLogout}
            >
              Logout
            </Button>
        </div>
      </div>
    </div>
  );
}

export default Profile;
