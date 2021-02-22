import React, { useState } from "react";
const UserScreen = ({ history }) => {
  const [data, setData] = useState(history.location.state); //user info getting by prop from previous screen
  return (
    <div style={styles.container}>
      <div style={{ marginLeft: "20px", marginTop: "20px" }}>
        <div style={{ display: "flex" }}>
          <p style={{ ...styles.headerText, ...{ minWidth: "150px" } }}>
            First Name :{" "}
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
            {data.firstName}
          </p>
        </div>
        <div style={{ display: "flex" }}>
          <p style={{ ...styles.headerText, ...{ minWidth: "150px" } }}>
            Last Name :{" "}
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
            {data.lastName}
          </p>
        </div>
        <div style={{ display: "flex", marginBottom: "66px" }}>
          <p style={{ ...styles.headerText, ...{ minWidth: "150px" } }}>
            Phone Number :{" "}
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
            {data.phoneNumber}
          </p>
        </div>
      </div>
      <div style={styles.bottom}>
        <div
          style={{
            width: "150px",
            height: "60px",
            justifyContent: "center",
            cursor: "pointer",
          }}
          onClick={() => {
            history.goBack();
          }}
        >
          <p style={styles.text}>Back</p>
        </div>
        <div
          style={styles.button}
          onClick={() => {
            history.push("send", data);
          }}
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
    paddingVertical: "14px",
  },
  bottom: {
    display: "flex",
    marginTop: "40px",
    width: "300px",
  },
  button: {
    width: "150px",
    display: "flex",
    backgroundColor: "#acacac",
    alignItems: "center",
    justifyContent: "center",
    height: "60px",
    borderRadius: "10px",
    cursor: "pointer",
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
export default UserScreen;
