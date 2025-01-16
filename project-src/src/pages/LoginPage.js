import Login from "../components/Login";
import { useEffect, useState } from "react";

const LoginPage = () => {

    const [isReady, setIsReady] = useState(false);

    useEffect(() => {
        document.querySelector('body').style.justifyContent = 'center';
        setIsReady(true)
    }, [])

    return (
        isReady && <Login />
    )
};

export default LoginPage;