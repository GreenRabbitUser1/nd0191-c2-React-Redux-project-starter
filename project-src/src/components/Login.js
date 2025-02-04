import { useState, useEffect } from 'react';
import { attemptLogin } from '../actions/login';
import { attemptLogout } from '../actions/logout';
import { useNavigate, useLocation } from 'react-router-dom';
import { connect, useSelector } from 'react-redux';

const Login = (props) => {

    const {dispatch, authError} = props;

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const user = useSelector((state) => state.user);
    let navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || '/';
    
    const handleUsernameChange = (e) => {
        setUsername(e.target.value);
    }

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    }

    const handleLogin = async (e) => {
        e.preventDefault();
        console.group('LOGIN ATTEMPT');
        console.log('Username:', username);
        console.log('Password:', password);

        const result = await dispatch(attemptLogin({
            username, 
            password
        }));

        console.groupEnd();

    }

    useEffect(() => {
        if (user && user !== null){
            console.log('user:', user);
            navigate(from);
        }
    }, [user])

    useEffect(() => {
        console.log('From:', from);
        dispatch(attemptLogout());
        setTimeout(() => {
            document.getElementById('login-username').focus();
        }, 1000);
        
    }, []);

    return (
        <div className="login-form-wrap">
            <form className="login-form" onSubmit={handleLogin}>
                <h2>Workplace Polls App</h2>
                {
                    authError &&
                    <h3 className="authError">
                        {authError}
                    </h3>
                }
                <div>
                    <label htmlFor="login-username">Username</label>
                    <input type="text" data-testid="login-username" id="login-username" value={username} onChange={handleUsernameChange} />
                </div>
                <div>
                    <label htmlFor="login-password">Password</label>
                    <input type="password" data-testid="login-password" id="login-password" value={password} onChange={handlePasswordChange} />
                </div>
                <div>
                    <button data-testid="login-submit">
                        Login
                    </button>
                </div>
            </form>
        </div>
    )
};

const mapStateToProps = (state) => ({
    user: state.user,
    authError: state.authError
});

export default connect(mapStateToProps)(Login);