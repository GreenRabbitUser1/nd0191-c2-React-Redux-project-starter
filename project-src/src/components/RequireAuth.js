import { useNavigate, Outlet } from "react-router-dom";
import { connect } from "react-redux";
import { useEffect } from "react";

const RequireAuth = (props) => {

    const {user} = props;
    let navigate = useNavigate();

    useEffect(() => {
        if (!user){
            navigate('/login');
        }
    }, []);

    
    if (user) {
        return <Outlet />
    }
    else return <></>
    
}

const mapStateToProps = (state) => ({
    user: state.user
})

export default connect(mapStateToProps)(RequireAuth);