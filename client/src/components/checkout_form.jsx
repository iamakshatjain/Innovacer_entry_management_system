import React from "react";

import history from "../history";
import axios from "axios";

export default class checkoutForm extends React.Component {
  state = {
    email: ""
  };

  handleSubmit = async e => {
    e.preventDefault();
    const data = {e : this.state.email};

    //calling the api to create a visitor
    const resp = await axios({
      url: "http://localhost:5000/api/visitor/checkout",
      method: "put",
      params: data
    });

    if (resp.error !== undefined) {
      console.log(resp.error);
      if (resp.error === "NO VISITOR FOUND") {
        alert("No guest with this username");
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

    history.push("/visitor")

    return;
  };


  render() {
    return (
      <div className="ui container">
        <form onSubmit={this.handleSubmit} className="ui form">
          <div
            className="ui cards"
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              verticalAlign:"middle",
              width: "100%"
            }}
          >
            <div className="card">
              <div className="content">
                <h2 className="ui dividing header">Checkout Details</h2>
                <div className="field">
                  <label htmlFor="email">Email</label>
                  <input
                    id="email"
                    name="email"
                    type="text"
                    value={this.state.email}
                    onChange={e => this.setState({ email: e.target.value })}
                  />
                </div>

                <br />
                <div>
                  <button type="submit" className="ui danger button">Check-Out</button>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    );
  }
}
