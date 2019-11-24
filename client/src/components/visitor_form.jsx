import React from "react";

import history from "../history";
import axios from "axios";

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
        if(data.name=="" || data.host_name==""){
          alert("No empty request allowed.\nPlease try again.");
          return;
        }

        if (data.phone == data.host_phone) {
          alert("Visitor and host must not have same mobile numbers");
          return;
        }

        if (data.email == data.host_email) {
          alert("Visitor and host must not have same email");
          return;
        }
        
        //calling the api to create a visitor
        const resp = await axios({
          url: "http://localhost:5000/api/visitor/add",
          method: "post",
          data: data,
          headers: {
            "Content-Type": "application/x-www-form-urlencoded"
          }
        });

        console.log(resp);

        if (resp.data.error !== undefined) {
          console.log(resp.data.error);
          if (resp.data.error === "VISITORFOUND") {
            alert("A guest already registered with this name");
          } else if (resp.data.error === "NOHOSTFOUND") {
            alert("No host with these details exists");
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
          <div
            className="ui container"
          >
            <br />
            <form className="ui form" onSubmit={this.handleSubmit}>
              <div
                className="ui cards"
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  width: "100%"
                }}
              >
                <div className="card" style={{ width: "60%" }}>
                  <div className="content">
                    <h2 className="ui dividing header">Visitor Details</h2>
                    <div className="field">
                      <label htmlFor="name">Name</label>
                      <input
                        id="name"
                        name="name"
                        type="text"
                        value={this.state.name}
                        onChange={e => this.setState({ name: e.target.value })}
                      />
                    </div>

                    <div className="field">
                      <label htmlFor="email">Email</label>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        value={this.state.email}
                        onChange={e => this.setState({ email: e.target.value })}
                      />
                    </div>

                    <div className="field">
                      <label htmlFor="phone">Phone</label>
                      <input
                        id="phone"
                        name="phone"
                        type="text"
                        value={this.state.phone}
                        onChange={e => this.setState({ phone: e.target.value })}
                      />
                    </div>
                  </div>
                </div>
                <div className="card" style={{ width: "60%" }}>
                  <div className="content">
                    <h2 class="ui dividing header">Host Details</h2>
                    <div className="field">
                      <label htmlFor="host_name">Name</label>
                      <input
                        id="host_name"
                        name="host_name"
                        type="text"
                        value={this.state.host_name}
                        onChange={e =>
                          this.setState({ host_name: e.target.value })
                        }
                      />
                    </div>

                    <div className="field">
                      <label htmlFor="host_email">Email</label>
                      <input
                        id="host_email"
                        name="host_email"
                        type="email"
                        value={this.state.host_email}
                        onChange={e =>
                          this.setState({ host_email: e.target.value })
                        }
                      />
                    </div>

                    <div className="field">
                      <label htmlFor="host_phone">Phone</label>
                      <input
                        id="host_phone"
                        name="host_phone"
                        type="text"
                        value={this.state.host_phone}
                        onChange={e =>
                          this.setState({ host_phone: e.target.value })
                        }
                      />
                    </div>
                  </div>
                </div>
                <div>
                  <button type="submit" className="ui primary button">
                    Check-In
                  </button>
                </div>
              </div>
            </form>
          </div>
        );
    }
}