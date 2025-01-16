import { useNavigate, Outlet } from "react-router-dom";
import { connect } from "react-redux";
import { useEffect, useState } from "react";
import { attemptSessionRestore } from "../actions/login";

const RequireAuth = (props) => {

    const {user, dispatch} = props;
    let navigate = useNavigate();
    const [tryValidate, setTryValidate] = useState(false)

    useEffect(() => {
        async function tryValidatingSession(){
            if (!user || user == null){
                await dispatch(attemptSessionRestore());
            }
            
            setTryValidate(true);
        }

        tryValidatingSession();
        
    }, []);

    useEffect(() => {
        if (tryValidate){
            if (!user || user === null){
                navigate('/login');
            }
        }
        if (user && user !== null){
            document.querySelector('body').style.justifyContent = 'flex-start';
        }
    }, [tryValidate])

    if (user) {
        return <Outlet />
    }
    else return <></>
    
}

const mapStateToProps = (state) => ({
    user: state.user
})

export default connect(mapStateToProps)(RequireAuth);