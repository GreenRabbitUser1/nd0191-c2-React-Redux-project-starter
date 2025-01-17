import { connect } from "react-redux";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { attemptLogout } from "../actions/logout";
import { useEffect, useState } from "react";
import { FaChevronDown } from "react-icons/fa";
import { getUsers } from "../actions/users";

const Header = (props) => {

    const {dispatch, user, users} = props;

    let navigate = useNavigate();
    const location = useLocation();

    const [profileListOpen, setProfileListOpen] = useState(false);

    useEffect(() => {
        console.log('users changed!', users);
    }, [users])

    useEffect(() => {
        //  When the header loads, fetch the users and set the state
        //  Do this in <Header> because various pages+components may need users and header will render-
        //  -on every route that requires auth
        async function fetchUsers(){
            if (!users || users === null){
                await dispatch(getUsers())
            }
        }
        fetchUsers();
    }, [])

    const logout = async() => {
        await dispatch(attemptLogout());
        navigate('/login');
    }

    const toggleProfileDropdown = () => {
        console.log('Toggling Profile Dropdown from ' + profileListOpen + ' to ' + !profileListOpen);
        setProfileListOpen(!profileListOpen);
    };

    useEffect(() => {
        //  When location changes, check if any Header links match the location  If so,
        //  add the class active_page to the Link element
        console.log('Location changed!', location);
        async function fetchUsers(){
            if (!users || users === null){
                await dispatch(getUsers())
            }
        }
        fetchUsers();
    }, [location]);

    return (
        <div className="header">
            <ul className="header-list-left">
                <li>
                    <Link
                        to="/"
                        className={location.pathname === '/'
                        ? 'active_page'
                        : ''}>
                        Home
                    </Link>
                </li>
                <li>
                    <Link
                        to="/add"
                        className={location.pathname === '/add'
                        ? 'active_page'
                        : ''}>
                        Add Poll
                    </Link>
                </li>
                <li>
                    <Link
                        to="/leaderboard"
                        className={location.pathname === '/leaderboard'
                        ? 'active_page'
                        : ''}>
                        Leaderboard
                    </Link>
                </li>
            </ul>
            <ul className="header-list-right">
                <li className="profile-list-wrap">
                    <ul className="profile-list">
                        <li>
                            <Link to="/profile">
                                {user.name}
                            </Link>
                        </li>
                        <li className="profile-dropdown-wrap">
                            <FaChevronDown
                                onClick={toggleProfileDropdown}
                                className={`
                                    profile-dropdown
                                    ${(profileListOpen
                                        ? ' profile-dropdown-open'
                                        : ''
                                    )}
                                `}
                            />
                        </li>
                    </ul>
                    {
                        profileListOpen &&
                        <div className="logout" onClick={logout}>
                            Logout
                        </div>
                    }
                </li>
            </ul>
        </div>
    )
};

const mapStateToProps = (state) => ({user: state.user})

export default connect(mapStateToProps)(Header);