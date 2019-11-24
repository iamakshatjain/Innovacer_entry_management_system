import React from "react";
import {Link} from "react-router-dom";

class Home extends React.Component{
    render(){
        return (
          <div className="ui container">
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                alignItems: "center"
              }}
            >
              {/* <h1 style={{fontSize : "5rem"}}>Innovacer</h1> */}
              <img
                src="https://innovaccer.com/static/image/site-logo/innovaccer-logo-black.svg"
                style={{ width: "25vw ", minWidth:"250px", marginTop : "10vh" }}
              />
              <h2 style={{ fontSize: "4rem", marginTop:"5vh", textAlign:"center" }}>Welcomes you,</h2>
              <img
                src="https://i.pinimg.com/originals/85/7f/d7/857fd79dfd7bd025e4cbb2169cd46e03.png"
                style={{ height: "25vh" }}
              />

              <br />
              <button className="ui primary button" style={{marginTop:"10vh"}}>
                <Link
                  to="/visitor"
                  style={{ textDecoration: "none", color: "white" }}
                >
                  New Visitor
                </Link>
              </button>
              <br />
              <hr />
              <button className="ui red basic button">
                <Link to="/checkout" style={{ textDecoration: "none" }}>
                  Checkout
                </Link>
              </button>
            </div>
          </div>
        );
    }
}

export default Home;