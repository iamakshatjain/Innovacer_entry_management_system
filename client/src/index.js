import React from "react";
import ReactDOM from "react-dom";
import {Router, Route} from "react-router-dom";

import history from "./history";
import Home from "./screens/home";
import VisitorRegistration from "./screens/visitor";
import HostRegistration from "./screens/host";
import CheckoutVisitor from "./screens/checkout";

class App extends React.Component{
    render(){
        return (
          <div>
            <Router history={history}>
              <Route path="/" exact component={Home} />
              <Route path="/visitor" exact component={VisitorRegistration} />
              <Route path="/host" exact component={HostRegistration} />
              <Route path="/checkout" exact component={CheckoutVisitor} />
              
              {/* <Redirect to="/" from="*" /> */}
            </Router>
          </div>
        );
    }
}

ReactDOM.render(<App/>,document.querySelector("#root"));