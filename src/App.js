import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import store from "./redux/store";
import {getMessage} from './redux'


import Menu from "./components/menu/Menu";
import Contact from "./components/contact/Contact"
import Message from "./components/message/Message"
import User from "./components/send/User"
import Send from "./components/send/Send"

function App() {
  const classes = useStyles();
  store.dispatch(getMessage())
  return (
    <Provider store={store}>
      <Router>
        <div>
          <Menu />
          <main className={classes.container}>
            <Switch>
              <Route exact path="/contact" component={Contact} />
              <Route exact path="/" component={Contact} />
              <Route exact path="/message" component={Message} />
              <Route exact path="/user" component={User} />
              <Route exact path="/send" component={Send} />
            </Switch>
          </main>
        </div>
      </Router>
    </Provider>
  );
}
const useStyles = makeStyles((theme) => ({
  container: {
    paddingTop: "56px",
    paddingBottom: "56px",
  },
}));

export default App;
