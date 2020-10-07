import { Button, TextField } from "@material-ui/core";
import SendIcon from "@material-ui/icons/Send";
import React, { useState } from "react";
import MuiPhoneNumber from "material-ui-phone-number";
import axios from "../../Axios/axios";
import { useStateValue } from "../../StateProvider/StateProvider";
import { useHistory } from "react-router-dom";
import "./SignUp.css";

function SignUp() {
  const [{}, dispatch] = useStateValue();
  const history = useHistory();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [age, setAge] = useState("");
  const [phone, setPhone] = useState("");
  const [OTP, setOTP] = useState("");
  const [codeRecieved, setCodeRecieved] = useState(false);
  const [verified,setverified] = useState(false);
  console.log("verified",verified);

  const handleNumber = (value) => {
    setPhone(value);
  };

  const handleOTP = (e) => {
    setOTP(e.target.value);
  }

  const handleSignUp = (e) => {
    e.preventDefault();
    console.log(name, "+", email, "+", password, "+", age, "+", phone);
    const formData = {
      name: name,
      email: email,
      password: password,
      age: age,
      phone: phone,
    };
    axios
      .post("/register", formData)
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
    setName("");
    setEmail("");
    setPassword("");
    setAge("");
    setPhone("");
  };

  const handlePhone = (e) => {
    e.preventDefault();
    const formData = {
      phonenumber: phone,
      channel: "sms",
    };
    axios
      .post("/register/phone" , formData)
      .then((response) => {
        setCodeRecieved(true);
      })
      .catch((error) => console.log(error.message));
  };

  const handleVerifyPhone = (e) => {
    e.preventDefault();
    const formData = {
      phonenumber : phone,
      code : OTP
    }
    axios
    .post('/register/verify' , formData)
    .then((response) => {

      if(response.data === "approved")
      {
        console.log("responcse",response);
        setverified(true);
      }
    })
    .catch((error) => console.log(error.message));
  }

  return (
    <div className="signup">
      <h2 className="signup__header">Sign Up</h2>
      <form className="signup__signUp">
        <TextField
          id="outlined-full-width"
          label="Name"
          style={{ margin: 8 }}
          placeholder="Enter your name"
          fullWidth
          margin="normal"
          InputLabelProps={{
            shrink: true,
          }}
          required
          type="text"
          variant="outlined"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
          }}
        />
        <TextField
          id="outlined-full-width"
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
          id="outlined-full-width"
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
        <TextField
          id="outlined-full-width"
          label="Age"
          style={{ margin: 8 }}
          placeholder="Enter your age"
          fullWidth
          margin="normal"
          InputLabelProps={{
            shrink: true,
          }}
          required
          type="number"
          variant="outlined"
          value={age}
          onChange={(e) => {
            setAge(e.target.value);
          }}
        />
        <div className="signup__phone">
          <MuiPhoneNumber
            defaultCountry={"in"}
            onChange={handleNumber}
            autoFormat={false}
            countryCodeEditable={false}
          />
          <Button
            variant="contained"
            color="primary"
            endIcon={<SendIcon />}
            type="submit"
            onClick={handlePhone}
            disabled={phone.length > 13 || phone.length <= 12}
          >
            Get OTP
          </Button>
        </div>
        {!codeRecieved ? null : (
          <div className="signup__phone">
            <TextField id="outlined-basic" label="OTP" variant="outlined" size="small" value={OTP} onChange={handleOTP} />
            <Button
              variant="contained"
              color="primary"
              endIcon={<SendIcon />}
              type="submit"
              onClick={handleVerifyPhone}
              disabled={phone.length > 13 || phone.length <= 12}
            >
              verify
            </Button>
          </div>
        )}
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          onClick={handleSignUp}
          disabled={!verified}
        >
          Register
        </Button>
      </form>
    </div>
  );
}

export default SignUp;
