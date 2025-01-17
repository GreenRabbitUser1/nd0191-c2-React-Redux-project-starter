import { useState, useEffect } from 'react'
import './App.css'
import { Route, Routes, useNavigate } from 'react-router-dom';
import MainLayout from './components/MainLayout';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import LeaderboardPage from './pages/LeaderboardPage';
import AddPollPage from './pages/AddPollPage';
import ProfilePage from './pages/ProfilePage';
import PollPage from './pages/PollPage';
import { connect } from 'react-redux';
import RequireAuth from './components/RequireAuth';
import { Navigate } from 'react-router-dom';

function App(props) {

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

                    {/* Users can create new polls for other users to answer */}
                    <Route path="/question/:id" element={<MainLayout page={<PollPage />}></MainLayout>} />

                    {/* Users can view their profile settings and perform some updates such as password reset */}
                    <Route path="/profile" element={<MainLayout page={<ProfilePage />}></MainLayout>} />
                </Route>

                {/* Catch-all route for 404 - currently navigates back to login screen - fix to only navigate if user is not authenticated */}
                <Route path="*" element={<Navigate to='/login' />} />

            </Routes>
    )

    
}

const mapStateToProps = (state) => ({
    user: state.user
});

export default connect(mapStateToProps)(App);
