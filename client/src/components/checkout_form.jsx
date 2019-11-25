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
    if (data.e == ""){
      alert("No empty request allowed.\nPlease try again.");
      return;
    }

    //calling the api to create a visitor
    const resp = await axios({
      url: "http://localhost:5000/api/visitor/checkout",
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
      <div className="ui container" >
        <form onSubmit={this.handleSubmit} className="ui form" style={{paddingTop : "20vh"}}>
          <div
            className="ui cards"
          >
            <div className="card" style = {{
                  width : "70%",
                  margin: "auto"
            }}>
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
                <br/>
                <Link to="/">Home</Link>
                <br/>
                <Link to="/visitor">New Visitor</Link>
              </div>
            </div>
          </div>
          
        </form>
      </div>
    );
  }
}
