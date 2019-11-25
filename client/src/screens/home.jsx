import React from "react";
import {Link} from "react-router-dom";

class Home extends React.Component{
    render(){
        return (
          <div className="ui container" style={{ color:"white"}}>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center"
              }}
            >
              <h1 style={{fontSize : "5rem"}}>innovacer</h1>
              <h2
                style={{
                  fontSize: "4rem",
                  marginTop: "5vh",
                  textAlign: "center"
                }}
              >
                Welcomes you,
              </h2>
              <img
                src="https://i.pinimg.com/originals/85/7f/d7/857fd79dfd7bd025e4cbb2169cd46e03.png"
                alt="waving_hand"
                style={{ height: "25vh" }}
              />

              <br />

              <Link
                to="/visitor"
                style={{ textDecoration: "none", color: "white" }}
              >
                <button
                  className="ui inverted red basic button big"
                  style={{ marginTop: "10vh" }}
                >
                  New Visitor
                </button>
              </Link>

              <br />

              <Link to="/checkout" style={{ textDecoration: "none" }}>
                <button className="ui inverted basic blue button">Checkout</button>
              </Link>
            </div>
          </div>
        );
    }
}

export default Home;