import { useState, useEffect } from 'react'
import './App.css'
import { Route, Routes, useNavigate } from 'react-router-dom';
import MainLayout from './components/MainLayout';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import LeaderboardPage from './pages/LeaderboardPage';
import AddPollPage from './pages/AddPollPage';
import ProfilePage from './pages/ProfilePage';

import { connect } from 'react-redux';
import RequireAuth from './components/RequireAuth';

function App(props) {

    const {user} = props;
    let navigate = useNavigate();

    useEffect(() => {
        //  Check if the user has a logged in cookie
        if (!user || user === null){
            navigate('/login');
        }
    }, []);

    return (
            <Routes>
                {/* Require users to authenticate */}
                <Route path="/login" element={<LoginPage />} /> 

                <Route element={<RequireAuth/>}>
                    {/* Users can answer polls on the Dashboard of the HomePage  */}
                    <Route path="/" element={<MainLayout page={<HomePage />}></MainLayout>} />

                    {/* Users can view the Leaderboard with the number of answered polls and created polls by user */}
                    <Route exact path="/leaderboard" element={<MainLayout page={<LeaderboardPage />}></MainLayout>} />

                    {/* Users can create new polls for other users to answer */}
                    <Route exact path="/add" element={<MainLayout page={<AddPollPage />}></MainLayout>} />

                    {/* Users can view their profile settings and perform some updates such as password reset */}
                    <Route path="/profile" element={<MainLayout page={<ProfilePage />}></MainLayout>} />
                </Route>

                {/* Catch-all route for 404 - currently navigates back to login screen - fix to only navigate if user is not authenticated */}
                <Route path="*" element={useNavigate('/login')} />

            </Routes>
    )

    
}

const mapStateToProps = (state) => ({
    user: state.user
});

export default connect(mapStateToProps)(App);
