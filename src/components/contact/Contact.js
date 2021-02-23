import React, { useEffect, useState } from "react";
import axios from "../../utils/axios"; //used for http request to server
import _ from "lodash"; //provides utility functions like generate random number
import { CircularProgress, makeStyles, TextField } from "@material-ui/core";
const useStyles = makeStyles((theme) => ({
  Input: {
    maxWidth: "330px",
    width: "94%",
    fontSize: "16px",
    fontWeight: "normal",
    fontStretch: "normal",
    fontStyle: "normal",
    lineHeight: 1.19,
    letterSpacing: "normal",
    backgroundColor: "#ffffff",
    borderRadius: "4px",
    margin: "1% 0 1% 5%",
    border: "solid 1px rgba(0, 0, 0, 0.12)",
  },
}));
const ContactScreen = ({ history }) => {
  const classes = useStyles();
  const [contacts, setContacts] = useState([]); //contacts which are to be shown(filterd list)
  const [contactlist, setcontactlist] = useState([]); //all contacts(to do filtering)
  const [loading, setLoading] = useState(false); //manages loading state on api call
  const [search, setSearch] = useState(""); //search text

  //Utility function to convert a normal list to alphabatical ordered list
  const getData = (list) => {
    let contactsArr = [];
    let aCode = "A".charCodeAt(0);
    for (let i = 0; i < 26; i++) {
      let currChar = String.fromCharCode(aCode + i);
      let obj = {
        title: currChar,
      };

      let currContacts = list.filter((item) => {
        return item.firstName[0].toUpperCase() === currChar;
      });
      if (currContacts.length > 0) {
        currContacts.sort((a, b) => a.firstName.localeCompare(b.firstName));
        obj.data = currContacts;
        contactsArr.push(obj);
      }
    }
    return contactsArr;
  };
  useEffect(() => {
    setLoading(true);
    //Api call for getting all contacts from server
    axios({ url: "/user", method: "GET" })
      .then((res) => res.data)
      .then((data) => {
        setLoading(false);
        setcontactlist(data);
        setContacts(getData(data));
      })
      .catch((err) => {
        setLoading(false);
        alert("Contact fetch error, please check internet connection");
      });
  }, []);

  //Utility function for searced output
  const handleSearch = (text) => {
    const formattedQuery = text.toLowerCase();
    var temp = [];
    _.filter(contactlist, (item) => {
      var n = item.firstName.toLowerCase();
      var m = item.phoneNumber.toLowerCase();
      if (n.includes(formattedQuery) || m.includes(formattedQuery)) {
        temp.push(item);
      }
    });
    setContacts(getData(temp));
  };
  return (
    <div style={styles.container}>
      {loading && (
        <div
          style={styles.progress}
        >
          <CircularProgress />
        </div>
      )}
      <div style={{ width: "100%",display:'flex',justifyContent:'center' }}>
        <TextField
          type="text"
          value={search}
          variant="outlined"
          placeholder={`Search in ${contactlist.length} Contact(s)`}
          onChange={(e) => {
            e.preventDefault();
            setSearch(e.target.value);
            handleSearch(e.target.value);
          }}
          className={classes.Input}
        />
      </div>
      {contacts.map((itemdata, index) => {
        return (
          <div key={index}>
            <div style={styles.sectionHeader}>
              <p style={{ fontFamily: "Poppins-Medium", marginLeft: "20px" }}>
                {itemdata.title}
              </p>
            </div>
            {itemdata.data.map((item, i) => {
              return (
                <div
                  style={styles.row}
                  onClick={() => {
                    history.push("user", item);
                  }}
                  key={i}
                >
                  <p style={styles.name}>
                    {item.firstName + " " + item.lastName}
                  </p>
                  {search ? (
                    <p style={styles.name}>{item.phoneNumber}</p>
                  ) : null}
                </div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
};
const styles = {
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
    paddingVertical: 14,
  },
  progress:{
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  searchInput: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1.1,
    borderColor: "#cacaca",
    borderRadius: 20,
    height: 44,
    marginLeft: "20px",
    marginBottom: "20px",
    width: "80%",
  },
  search: {
    marginLeft: 6,
    zIndex: -1,
    fontSize: 14,
    fontFamily: "Poppins-Regular",
    color: "#2a2e43",
    justifyContent: "center",
    width: "70%",
  },
  headerText: {
    fontFamily: "Poppins-Medium",
    fontSize: 16,
    color: "#000000",
    textAlign: "center",
    marginBottom: 6,
  },
  row: {
    marginLeft: "20px",
    paddingVertical: 14,
    backgroundColor: "#ffffff",
    borderColor: "#eeeeee",
    borderWidth: 0.3,
    cursor: "pointer",
  },
  sectionHeader: {
    backgroundColor: "#efefef",
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  name: {
    fontFamily: "Poppins-Regular",
    fontSize: 14,
  },
};
export default ContactScreen;
