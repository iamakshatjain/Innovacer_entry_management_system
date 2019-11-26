import React from "react";

import history from "../history";
import axios from "axios";

import {Link} from "react-router-dom";

export default class checkoutForm extends React.Component {
  state = {
    email: ""
  };

  handleSubmit = async e => {
    e.preventDefault();
    const data = {e : this.state.email};
    if (data.e === ""){
      alert("No empty request allowed.\nPlease try again.");
      return;
    }

    //calling the api to create a visitor
    const resp = await axios({
      url: "https://innov-api.herokuapp.com/api/visitor/checkout",
      method: "put",
      params: data
    });

    if (resp.data.error !== undefined) {
      console.log(resp.data.error);
      if (resp.data.error === "NOVISITORFOUND") {
        alert("No guest with this email checked in");
      } else {
        alert(
          "There was some error. Please try again. If the error continues, please email at developer.akshatjain@gmail.com"
        );
      }

      return;
    }

    this.setState({
        email: ""
    });

    alert("You are checked out.\nThanks for visiting us.")

    history.push("/")

    return;
  };


  render() {
    return (
      <div className="ui">
        <h1
          style={{
            textAlign: "center",
            paddingTop: "5vh",
            color: "white",
            fontSize: "3rem"
          }}
        >
          CHECKOUT
        </h1>
        <div className="container">
          <form
            onSubmit={this.handleSubmit}
            className="ui form"
            style={{ paddingTop: "20vh" }}
          >
            <div className="ui cards">
              <div
                className="card"
                style={{
                  width: "80%",
                  margin: "auto"
                }}
              >
                <div className="content">
                  <h2 className="ui dividing header">Checkout Details</h2>
                  <div className="field">
                    <label htmlFor="email">Email</label>
                    <div className="ui left icon input">
                      <input
                        required
                        placeholder="Visitor Email"
                        id="email"
                        name="email"
                        type="text"
                        value={this.state.email}
                        onChange={e => this.setState({ email: e.target.value })}
                      />
                      <i className="envelope icon"></i>
                    </div>
                  </div>
                </div>
              </div>
              <br />
              <div
                style={{
                  width: "80%",
                  display: "flex",
                  flexDirection: "row",
                  margin: "auto",
                  marginTop: "2vh"
                }}
              >
                <Link
                  to="/"
                  style={{
                    textDecoration: "none",
                    color: "white",
                    textAlign: "center",
                    marginRight: "1rem"
                  }}
                >
                  <button
                    type="button"
                    className="ui inverted basic blue button"
                  >
                    <i className="arrow left icon"></i>Home
                  </button>
                </Link>
                <button
                  type="submit"
                  className="ui inverted basic red button"
                  style={{ width: "300%", textAlign: "center" }}
                >
                  Checkout
                </button>

                <Link
                  to="/visitor"
                  style={{
                    textDecoration: "none",
                    color: "white",
                    marginLeft: "1rem",
                    textAlign: "center"
                  }}
                >
                  <button
                    type="button"
                    className="ui inverted basic blue button"
                  >
                    Visitor<i className="arrow right icon"></i>
                  </button>
                </Link>
              </div>
            </div>
          </form>
        </div>
      </div>
      // <div className="ui container">

      // </div>
    );
  }
}
