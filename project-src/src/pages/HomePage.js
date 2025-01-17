import Dashboard from "../components/Dashboard"
import { connect } from "react-redux";

const HomePage = (props) => {

    const {user} = props;

    return (
        <div className="home-wrap">
            {
                user && 
                <h3 className="welcome-message">
                    {
                        `Welcome back, ${user.name}!`
                    }
                </h3>
            }
            <Dashboard />
        </div>
    )
};

const mapStateToProps = (state) => ({
    user: state.user
})

export default connect(mapStateToProps)(HomePage);