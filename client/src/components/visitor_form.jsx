import React from "react";

export default class visitorForm extends React.Component {
    state = {
        name: "",
        phone: "",
        email: "",
        host_name: "",
        host_id: "",
        add_visited: "",
        hosts : []
    };


    componentDidMount(){
        
    }


    render() {
        return (
            <form>
            <div>
                <label htmlFor="name">Name : </label>
                <input id="name" name="name" type="text" />
            </div>

            <div>
                <label htmlFor="email">Email : </label>
                <input id="email" name="email" type="email" />
            </div>

            <div>
                <label htmlFor="name">Name</label>
                <input id="name" name="name" type="text" />
            </div>

            <div>
                <label htmlFor="host_name">Host Name</label>
                <select>
                <option>User1</option>
                <option>User2</option>
                <option>User3</option>
                <option>User4</option>
                </select>
            </div>

            <div>
                <input type="submit" />
            </div>
            </form>
        );
    }
}