import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { getUserInfo } from '../store/actions'

function Dashboard({ user, getUserInfo }) {
    const fetchData = () => {
        if (!!user) {
            getUserInfo(user.id)
        }
    }
    useEffect(() => {

        fetchData()
    }, [])

    return (
        <div>
            User Dashboard
            {/* {props.user.username} */}
        </div>
    );
}

const mapStateToProps = state => {
    console.log(state)
    return {
        user: state.user
    }
}

export default connect(mapStateToProps, { getUserInfo })(Dashboard);
