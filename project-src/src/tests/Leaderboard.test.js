import React from "react";
import {render, screen, act } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import store from "../store.js";
import LeaderboardPage from "../pages/LeaderboardPage.js";

describe("Leaderboard Load", () => {
    it("should render Leaderboard", async () => {
        // Render the component

        const component = await act(async () => {
            render(
                <Provider store={store}>
                    <Router>
                        <LeaderboardPage />
                    </Router>
                </Provider>
        )});

        expect(screen.getByTestId('leaderboard-table-wrap')).toBeInTheDocument();

    });
});