import { connect } from "react-redux";
import { Link } from "react-router-dom";

const Header = (props) => {

    const { user } = props;

    return (
        <div className="header">
            <ul className="header-list-left">
                <li>
                    <Link to="/">
                        Home
                    </Link>
                </li>
                <li>
                    <Link to="/add">
                        Add Poll
                    </Link>
                </li>
                <li>
                    <Link to="/leaderboard">
                        Leaderboard
                    </Link>
                </li>
            </ul>
            <ul className="header-list-right">
                <li>
                    <Link to="/profile">
                        {user.name}
                    </Link>
                </li>
            </ul>
        </div>
    )
};

const mapStateToProps = (state) => ({
    user: state.user
})

export default connect(mapStateToProps)(Header);