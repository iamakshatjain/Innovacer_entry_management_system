import React from "react";
import {Link} from "react-router-dom";

class Home extends React.Component{
    render(){
        return (
          <div>
            I am a,
            <Link to="/visitor">Visitor</Link>
            <br />
            <Link to="/host">Host</Link>
            <hr />
            <Link to="/checkout">Check out</Link>
          </div>
        );
    }
}

export default Home;