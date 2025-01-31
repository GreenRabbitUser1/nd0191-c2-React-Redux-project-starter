import React from "react";
import {render, screen, fireEvent, act } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import App from "../App.js";
import { Provider } from "react-redux";
import store from "../store.js";
import Header from "../components/Header.js";

describe("App", () => {
    it("should render App", async () => {
        // Render the component

        const component = await act(async () => {
            render(
                <Provider store={store}>
                    <Router>
                        <App />
                    </Router>
                </Provider>
        )});

        expect(screen.getByText('Workplace Polls App')).toBeInTheDocument();

    });
});

describe("Login", () => {
    it("should find login fields and add values to them", async () => {
        // Render the component
        
        const component = await act(async () => {
            render(
                <Provider store={store}>
                    <Router>
                        <App />
                    </Router>
                </Provider>
        )});

        // Get the input fields
        const usernameInput = screen.getByLabelText(/username/i);
        const passwordInput = screen.getByLabelText(/password/i);

        // Simulate user typing into the fields
        fireEvent.change(usernameInput, {
            target: {
                value: "sarahedo"
            }
        });
        fireEvent.change(passwordInput, {
            target: {
                value: "password123"
            }
        });

        // Assert the input values
        expect(usernameInput.value).toBe("sarahedo");
        expect(passwordInput.value).toBe("password123");
    });
});

describe("Header", () => {
    it("should render the Header", async () => {
        // Render the component

        const component = render(
            <Provider store={store}>
                <Router>
                    <Header />
                </Router>
            </Provider>
        );

        // Assert the input values
        expect(component).toBeDefined();
        expect(component).toMatchSnapshot();
    });
});