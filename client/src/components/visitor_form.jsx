import React from "react";

import history from "../history";
import axios from "axios";

import {Link} from "react-router-dom";


export default class visitorForm extends React.Component {
    state = {
        name: "",
        phone: "",
        email: "",
        host_name: "",
        host_email: "",
        host_phone: "", 
        add_visited: "Innovacer Offices, Gautam Buddha Nagar, India"
    };

    handleSubmit = async(e) => {
        e.preventDefault();
        const data = this.state;
        if(data.name==="" || data.host_name===""){
          alert("No empty request allowed.\nPlease try again.");
          return;
        }

        if (data.phone === data.host_phone) {
          alert("Visitor and host must not have same mobile numbers");
          return;
        }

        if (data.email === data.host_email) {
          alert("Visitor and host must not have same email");
          return;
        }
        
        //calling the api to create a visitor
        const resp = await axios({
          url: "https://innov-api.herokuapp.com/api/visitor/add",
          method: "post",
          data: data,
          headers: {
            "Content-Type": "application/x-www-form-urlencoded"
          }
        });


        if (resp.data.error !== undefined) {
          console.log(resp.data.error);
          if (resp.data.error === "VISITORFOUND") {
            alert("A guest already checked in with these details");
          } else if (resp.data.error === "NOHOSTFOUND") {
            alert("No host with these details exists");
          } else if (resp.data.error === "NETWORKISSUE") {
            alert("There seems to be an issue with the network. Please contact from the front desk.");
          } else {
            alert(
              "There was some error. Please try again. If the error continues, please email at developer.akshatjain@gmail.com"
            );
          }
          return;
        }

        this.setState({
            name: "",
            phone: "",
            email: "",
            host_name: "",
            host_email: "",
            host_phone: "",
            add_visited: "Innovacer Offices, Gautam Buddha Nagar, India"
          });

        alert("Welcome to Innovacer.\nYour host is being notified. Please wait ...");
        history.push("/");
        return;
    }

    renderHostNames = () => {
      const hosts = this.state.hosts;
      return hosts.map((host, index) => <option key={index} value={host}>{host.name}</option>);
      // console.log(host_data);
      // return host_data;
    }

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
              VISITOR REGISTRATION
            </h1>
            <div className="container">
              <br />
              <form className="ui form" onSubmit={this.handleSubmit}>
                <div
                  className="ui cards"
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    width: "100%",
                    padding: "1rem"
                  }}
                >
                  <div className="card" style={{ width: "80%" }}>
                    <div className="content">
                      <h2 className="ui dividing header">Visitor Details</h2>
                      <div className="field">
                        <label htmlFor="name">Name</label>
                        <div className="ui left icon input">
                          <input
                            required
                            placeholder="Visitor Name"
                            title="Enter visitor's name"
                            id="name"
                            name="name"
                            type="text"
                            value={this.state.name}
                            onChange={e =>
                              this.setState({ name: e.target.value })
                            }
                          />
                          <i className="user icon"></i>
                        </div>
                      </div>
                      <div className="two fields">
                        <div className="field">
                          <label htmlFor="email">Email</label>
                          <div className="ui left icon input">
                            <input
                              required
                              placeholder="Visitor Email"
                              title="Enter visitor's email"
                              id="email"
                              name="email"
                              type="email"
                              value={this.state.email}
                              onChange={e =>
                                this.setState({ email: e.target.value })
                              }
                            />
                            <i className="envelope icon"></i>
                          </div>
                        </div>

                        <div className="field">
                          <label htmlFor="phone">Phone</label>
                          <div className="ui left icon input">
                            <input
                              required
                              title="Enter visitor's phone number"
                              placeholder="Visitor Phone (10 digit - Indian)"
                              id="phone"
                              name="phone"
                              type="tel"
                              pattern="[5-9]{1}[0-9]{9}"
                              value={this.state.phone}
                              onChange={e =>
                                this.setState({ phone: e.target.value })
                              }
                            />
                            <i className="phone icon"></i>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="card" style={{ width: "80%" }}>
                    <div className="content">
                      <h2 className="ui dividing header">Host Details</h2>
                      <div className="field">
                        <label htmlFor="host_name">Name</label>
                        <div className="ui left icon input">
                          <input
                            required
                            title="Enter host's name"
                            placeholder="Host Name"
                            id="host_name"
                            name="host_name"
                            type="text"
                            value={this.state.host_name}
                            onChange={e =>
                              this.setState({ host_name: e.target.value })
                            }
                          />
                          <i className="user icon"></i>
                        </div>
                      </div>
                      <div className="two fields">
                        <div className="field">
                          <label htmlFor="host_email">Email</label>
                          <div className="ui left icon input">
                            <input
                              required
                              title="Enter host's email"
                              placeholder="Host Email"
                              id="host_email"
                              name="host_email"
                              type="email"
                              value={this.state.host_email}
                              onChange={e =>
                                this.setState({ host_email: e.target.value })
                              }
                            />
                            <i className="envelope icon"></i>
                          </div>
                        </div>

                        <div className="field">
                          <label htmlFor="host_phone">Phone</label>
                          <div className="ui left icon input">
                            <input
                              required
                              title="Enter host's phone"
                              placeholder="Host Phone (10 digit - Indian)"
                              id="host_phone"
                              name="host_phone"
                              type="tel"
                              value={this.state.host_phone}
                              pattern="[5-9]{1}[0-9]{9}"
                              onChange={e =>
                                this.setState({ host_phone: e.target.value })
                              }
                            />
                            <i className="phone icon"></i>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div
                    // style={{
                    //   width: "80%",
                    //   display: "flex",
                    //   flexDirection: "row"
                    // }}
                    className="ui three column grid"
                  >
                    <Link
                      to="/"
                      style={{
                        textDecoration: "none",
                        color: "white",
                        textAlign: "center",
                        // marginRight: "1rem"
                      }}
                      className="column"
                    >
                      <button
                        type="button"
                        className="ui inverted basic blue button"
                      >
                        Home
                      </button>
                    </Link>
                    <div className=" column ">
                      <button
                        type="submit"
                        className="ui inverted basic red button"
                        style={{  width:"100%", textAlign: "center" }}
                      >
                        Checkin
                      </button>
                    </div>
                    <Link
                      to="/checkout"
                      style={{
                        textAlign: "center",
                        // marginLeft: "1rem",
                        textDecoration: "none",
                        color: "white"
                      }}
                      className="column"
                    >
                      <button
                        type="button"
                        className="ui inverted basic blue button"
                      >
                        Checkout
                      </button>
                    </Link>
                  </div>
                </div>
              </form>
            </div>
          </div>
        );
    }
}