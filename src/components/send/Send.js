import { random } from "lodash";
import React, { useState } from "react";
import axios from "../../utils/axios"; //for server side api call
import { getMessage } from "../../redux";
import store from "../../redux/store"; //to dispatch a redux action directly
import { CircularProgress, makeStyles, TextField } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  Input: {
    maxWidth: "330px",
    width: "94%",
    // height: "56px",
    fontFamily: "'Roboto', sans-serif",
    fontSize: "16px",
    fontWeight: "normal",
    fontStretch: "normal",
    fontStyle: "normal",
    lineHeight: 1.19,
    letterSpacing: "normal",
    backgroundColor: "#ffffff",
    borderRadius: "4px",
    margin: "1% 0 1% 15px",
    // border: "solid 1px rgba(0, 0, 0, 0.12)",
  },
}));
const SendMessage = ({ history }) => {
  const classes = useStyles();
  const [data, setData] = useState(history.location.state); //user data passed from previous screen
  const [message, setMessage] = useState(""); //state to manage addition text if user want to send along with
  const [loading, setLoading] = useState(false);

  //Generates a random number between 100000 to 999999 both including
  const RandomOtp = () => {
    return random(100000, 999999);
  };
  const [otp, setOtp] = useState(RandomOtp()); //state for managing otp value

  //Function for http request to server for sending message to perticular number
  const Send = () => {
    setLoading(true);
    axios({
      url: "/message",
      method: "POST",
      data: { id: data._id, otp, message },
    })
      .then((res) => res.data)
      .then((data) => {
        setLoading(false);
        store.dispatch(getMessage());
        history.push("message");
      })
      .catch((e) => {
        setLoading(false);
        alert("some error occoured");
      });
  };
  return (
    <div style={styles.container}>
      {loading && (
        <div
          style={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <CircularProgress />
        </div>
      )}
      <div
        style={{
          width: "120px",
          height: "40px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          cursor: "pointer",
        }}
        onClick={() => {
          history.goBack();
        }}
      >
        <p style={styles.text}>Back</p>
      </div>
      <div style={{ marginLeft: "20px" }}>
        <div style={{ display: "flex", marginTop: "20px" }}>
          <p style={{ ...styles.headerText, ...{ minWidth: "150px" } }}>
            To :{" "}
          </p>
          <p
            style={{
              ...styles.headerText,
              ...{
                color: "#ff9200",
                fontFamily: "Poppins-Regular",
                width: "150px",
              },
            }}
          >
            {data.firstName + " " + data.lastName}
          </p>
        </div>
        <div style={{ display: "flex" }}>
          <p style={{ ...styles.headerText, ...{ minWidth: "150px" } }}>{""}</p>
          <p
            style={{
              ...styles.headerText,
              ...{
                color: "#ff9200",
                fontFamily: "Poppins-Regular",
                width: "150px",
              },
            }}
          >
            ({data.phoneNumber})
          </p>
        </div>
        <div style={{ display: "flex", marginTop: 40 }}>
          <p style={{ ...styles.headerText, ...{ minWidth: "150px" } }}>
            Hi. Your OTP is:{" "}
          </p>
          <p
            style={{
              ...styles.headerText,
              ...{
                color: "#ff9200",
                fontFamily: "Poppins-Medium",
                width: "150px",
              },
            }}
          >
            {otp}
          </p>
        </div>
        <div style={{ width: "100%", marginTop: "20px" }}>
          <TextField
            type="text"
            value={message}
            variant="outlined"
            placeholder={`Please add additional message`}
            onChange={(e) => {
              e.preventDefault();
              setMessage(message.length < 100 ? e.target.value : message);
            }}
            className={classes.Input}
            multiline
            rows={3}
            inputProps={{
              maxLength: 100,
            }}
          />
        </div>
        <p style={{ ...styles.max, ...{ width: "94%", maxWidth: "330px" } }}>
          max 100 characters
        </p>
      </div>
      <div
        style={{
          ...styles.bottom,
          ...{ width: "300px", marginBottom: "20px" },
        }}
      >
        <div
          style={{
            ...styles.button,
            ...{ width: "150px", marginTop: "20px", cursor: "pointer" },
          }}
          onClick={() => Send()}
        >
          <p style={{ ...styles.text, ...{ color: "#ffffff" } }}>
            Send Message{" "}
          </p>
        </div>
      </div>
    </div>
  );
};
const styles = {
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
    paddingTop: "14px",
  },
  bottom: {
    display: "flex",
    justifyContent: "center",
  },
  search: {
    zIndex: -1,
    fontSize: "14px",
    fontFamily: "Poppins-Regular",
    color: "#2a2e43",
    justifyContent: "center",
    borderRadius: "5px",
    borderColor: "#cccccc",
    borderWidth: "1px",
    marginTop: "12px",
  },
  max: {
    color: "#3acce1",
    textAlign: "right",
    fontSize: "12px",
    fontFamily: "Poppins-Medium",
    marginTop: "2px",
  },
  button: {
    backgroundColor: "#ff9200",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: "60px",
    borderRadius: "10px",
  },
  headerText: {
    marginTop: "2px",
    fontSize: "18px",
    color: "#444444",
    fontFamily: "Poppins-Regular",
  },
  text: {
    fontSize: "16px",
    color: "#ff9200",
    textAlign: "center",
    fontFamily: "Poppins-Medium",
  },
};
export default SendMessage;
