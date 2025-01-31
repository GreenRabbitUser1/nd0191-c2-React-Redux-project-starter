import React from "react";
import {render, screen, act } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import store from "../store.js";
import AddPollPage from "../pages/AddPollPage.js";

describe("AddPoll", () => {
    it("should render AddPollPage", async () => {
        // Render the component

        const component = await act(async () => {
            render(
                <Provider store={store}>
                    <Router>
                        <AddPollPage />
                    </Router>
                </Provider>
        )});

        expect(screen.getByTestId('add-poll-form-wrap')).toBeInTheDocument();

    });
});