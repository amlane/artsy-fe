import React from "react";
import Axios from "axios";

class UserDashboard extends React.Component {
    state = {
        user: null
    }

    componentDidMount = () => {
        const id = localStorage.getItem("userid")
        Axios.get(`https://artsy-be.herokuapp.com/api/users/${id}`)
            .then(res => {
                console.log("res", res.data)
                this.setState({
                    user: res.data.user
                })
            })
            .catch(err => {
                console.log({ err })
            })
    }

    render() {
        if (!this.state.user) return <p>loading user...</p>;
        return (
            <div>
                <p>{this.state.user.email}</p>
            </div>
        )
    }
}

export default UserDashboard;