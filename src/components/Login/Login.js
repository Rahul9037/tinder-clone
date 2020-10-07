import { Button, TextField } from "@material-ui/core";
import SendIcon from "@material-ui/icons/Send";
import React, { useState } from "react";
import MuiPhoneNumber from "material-ui-phone-number";
import "./Login.css";
import axios from "../../Axios/axios";
import { useStateValue } from "../../StateProvider/StateProvider";
import { Link, useHistory } from "react-router-dom";

function Login() {
  const [{}, dispatch] = useStateValue();
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [OTP, setOTP] = useState("");
  const [codeRecieved, setCodeRecieved] = useState(false);

  const handleNumber = (value) => {
    setPhone(value);
  };

  const handleOTP = (e) => {
    e.preventDefault();
    setOTP(e.target.value);
  }

  const handleLogin = (e) => {
    e.preventDefault();
    const formData = {
      email: email,
      password: password,
    };
    axios
      .post("/login", formData)
      .then((response) => {
        dispatch({
          type: "SET_USER",
          user: response.data,
        });
        history.replace("/home");
      })
      .catch((error) => {
        console.log("error", error);
      });
    setEmail("");
    setPassword("");
  };

  const handlePhoneLogin = (e) => {
    e.preventDefault();
    const formData = {
      phonenumber: phone,
      channel: "sms",
    };
    axios
      .post("/login/phone", formData)
      .then((response) => {
        if (response) {
          setCodeRecieved(true);
        }
      })
      .catch((error) => {
        console.log("error", error);
      });
  };

  const handleVerifyPhoneLogin = (e) => {
    e.preventDefault();
    const formData = {
      phonenumber: phone,
      code: OTP,
    };
    axios
      .post("/login/phone-verify", formData)
      .then((response) => {
        dispatch({
          type: "SET_USER",
          user: response.data,
        });
        history.replace("/home");
      })
      .catch((error) => {
        console.log("error", error);
      });
  };

  return (
    <div className="login">
      <h2 className="login__header">Login</h2>
      <form className="login__signIn">
        <TextField
          id="outlined-full-width1"
          label="Email"
          style={{ margin: 8 }}
          placeholder="Enter your email"
          fullWidth
          margin="normal"
          InputLabelProps={{
            shrink: true,
          }}
          required
          type="email"
          variant="outlined"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
        <TextField
          id="outlined-full-width2"
          label="Password"
          style={{ margin: 8 }}
          placeholder="Enter your password"
          fullWidth
          margin="normal"
          InputLabelProps={{
            shrink: true,
          }}
          required
          type="password"
          variant="outlined"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          onClick={handleLogin}
        >
          Login
        </Button>
      </form>
      <div className="login__break">
        <hr />
        <p>&nbsp;OR&nbsp;</p>
        <hr />
      </div>
      <div className="login__signInPhone">
        <MuiPhoneNumber
          defaultCountry={"in"}
          onChange={handleNumber}
          autoFormat={false}
          countryCodeEditable={false}
          style={!codeRecieved ? null : { width : "100%" }}
        />
        <Button
          variant="contained"
          color="primary"
          endIcon={<SendIcon />}
          type="submit"
          onClick={handlePhoneLogin}
          disabled={phone.length > 13 || phone.length <= 12}
          style={!codeRecieved ? null : { display: "none" }}
        >
          GET OTP
        </Button>
      </div>
      {!codeRecieved ? null : (
        <div className="login__signInPhone">
          <TextField id="outlined-basic" label="OTP" variant="outlined" value={OTP} size="small" onChange={handleOTP}/>
          <Button
            variant="contained"
            color="primary"
            endIcon={<SendIcon />}
            type="submit"
            onClick={handleVerifyPhoneLogin}
            disabled={phone.length > 13 || phone.length <= 12}
          >
            Verify
          </Button>
        </div>
      )}
      <div className="login__signupOption">
        Not Having Account ? <Link to="/signup">SignUp</Link>
      </div>
    </div>
  );
}

export default Login;
