import { CircularProgress } from "@material-ui/core";
import React from "react";
import { connect } from "react-redux"; //to connect with redux state
import { getMessage } from "../../redux";
const MessageScreen = ({ message, getMessage }) => {
  //Utility array to get months from index
  const months = [
    "Jan",
    "Feb",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const renderPost = (post, index) => {
    return (
      <div>
        {/* here the logic is for showing the header for date, same date's message will together
        Also maintaining Today or not*/}
        {!index ||
        new Date(post.receivedMessageTimeStamp).toDateString() !==
          new Date(
            message.data[index - 1].receivedMessageTimeStamp
          ).toDateString() ? (
          <div
            style={{
              ...styles.date,
              ...{ paddingTop: index === 0 ? "20px" : "10px" },
            }}
          >
            <p style={styles.dateText}>
              {new Date(post.receivedMessageTimeStamp).toDateString() ===
              new Date().toDateString()
                ? "Today"
                : months[
                    parseInt(new Date(post.receivedMessageTimeStamp).getMonth())
                  ] +
                  " " +
                  new Date(post.receivedMessageTimeStamp).getDate() +
                  ", " +
                  new Date(post.receivedMessageTimeStamp).getFullYear()}
            </p>
          </div>
        ) : null}
        <div style={styles.chat}>
          <p style={{ ...styles.mes, ...{ fontFamily: "Poppins-Medium" } }}>
            {post.firstName + " " + post.lastName}
          </p>
          <p style={{ ...styles.mes, ...{ fontSize: 12 } }}>
            ({post.phoneNumber})
          </p>
          <p style={styles.mes}>{post.message}</p>
          <p style={styles.time}>
            {/*method to show hour minutes and second */}
            {new Date(post.receivedMessageTimeStamp).toLocaleTimeString(
              "en-US",
              { hour: "numeric", hour12: true, minute: "numeric" }
            )}
          </p>
        </div>
      </div>
    );
  };
  return (
    <div style={styles.header}>
      {message.loading && (
        <div
          style={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <CircularProgress />
        </div>
      )}
      {message.data.map((item, index) => renderPost(item, index))}
    </div>
  );
};
const styles = {
  header: {
    backgroundColor: "#ffffff",
    minHeight: "100%",
    display: "flex",
    flexDirection: "column",
  },
  date: {
    fontSize: "20px",
    display: "flex",
    flexDirection: "column",
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: "12px",
  },
  dateText: {
    display: "flex",
    flexDirection: "column",
    textAlign: "center",
    fontSize: "18px",
    color: "#FFFFFF",
    fontFamily: "Poppins-Regular",
    backgroundColor: "#aaaaaa",
    borderRadius: "10px",
    padding: "10px 10px 10px 10px",
  },
  chat: {
    display: "flex",
    flexDirection: "column",
    backgroundColor: "#E4E4E7",
    marginLeft: "16px",
    marginBottom: "12px",
    borderTopLeftRadius: "15px",
    borderBottomRightRadius: "5px",
    borderTopRightRadius: "15px",
    borderBottomLeftRadius: "15px",
    alignSelf: "flex-start",
    paddingLeft: "10px",
    paddingRight: "10px",
    paddingTop: "9px",
    paddingBottom: "4px",
    maxWidth: "500px",
    minWidth: "250px",
  },
  mes: {
    display: "flex",
    flexDirection: "column",
    color: "#4F4F4F",
    fontSize: "12px",
    fontFamily: "Poppins-Regular",
    marginLeft: "24px",
  },
  time: {
    fontSize: "10px",
    color: "#4F4F4F",
    fontFamily: "Poppins-Regular",
    textAlign: "right",
    marginRight: "10px",
  },
};
const mapStateToProps = (state) => ({
  message: state.message,
});
export default connect(mapStateToProps, { getMessage })(MessageScreen);
