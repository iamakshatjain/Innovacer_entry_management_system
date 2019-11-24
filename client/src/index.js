import React from "react";
import ReactDOM from "react-dom";
import {Router, Route, Redirect} from "react-router-dom";

import history from "./history";
import Home from "./screens/home";
import VisitorRegistration from "./screens/visitor";
import CheckoutVisitor from "./screens/checkout";

class App extends React.Component{
    render(){
        return (
          <div>
            <Router history={history}>
              <Route path="/" exact component={Home} />
              <Route path="/visitor" exact component={VisitorRegistration} />
              <Route path="/checkout" exact component={CheckoutVisitor} />
              {/* <Redirect to="/" from="*" /> */}
              {/* for handling random route */}
            </Router>
          </div>
        );
    }
}

ReactDOM.render(<App/>,document.querySelector("#root"));