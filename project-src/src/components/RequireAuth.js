import { useNavigate, Outlet, Navigate, useLocation } from "react-router-dom";
import { connect } from "react-redux";
import { useEffect, useState } from "react";
import { attemptSessionRestore } from "../actions/login";

const RequireAuth = (props) => {

    const {user, dispatch} = props;
    const [noAuth, setNoAuth] = useState(true);
    const [tryValidate, setTryValidate] = useState(false);
    let navigate = useNavigate();
    let location = useLocation();

    useEffect(() => {
        async function tryValidatingSession(){
            console.log('Trying to validate session');
            if (!user || user === null){
                let isValidSession = await dispatch(attemptSessionRestore());
                setNoAuth(isValidSession);
            }
            
            setTryValidate(true);
        }

        tryValidatingSession();
        
    }, []);

    useEffect(() => {
        if (user && user !== null){
            document.querySelector('body').style.justifyContent = 'flex-start';
        }
        
    }, [tryValidate])

    if (user) {
        return <Outlet />
    }
    // else {
    else if (!noAuth){
        return <Navigate to="/login" state={{ from: location }} replace />;
    }
    // else return <Outlet />
    
}

const mapStateToProps = (state) => ({
    user: state.user
})

export default connect(mapStateToProps)(RequireAuth);