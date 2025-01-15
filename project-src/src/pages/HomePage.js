import Dashboard from "../components/Dashboard"
import { connect } from "react-redux";

const HomePage = (props) => {

    const {user} = props;

    return (
        <div>
            <h2>Home Page</h2>
            {
                user && 
                <h3>
                    {
                        `Welcome, ${user.name}!`
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