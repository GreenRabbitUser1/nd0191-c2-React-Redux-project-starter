import React from "react";
import { render, cleanup } from "@testing-library/react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import store from "../store";
import { _getQuestions, _getUsers } from "../../_DATA";
import { getUsers, saveUser } from "../actions/users";
import { getPolls } from "../actions/polls";
import Dashboard from "../components/Dashboard";

describe("Dashboard", () => {
    beforeAll(() => {
        Object.defineProperty(window, "matchMedia", {
            writable: true,
            value: jest
                .fn()
                .mockImplementation((query) => ({
                    matches: false,
                    media: query,
                    onchange: null,
                    addEventListener: jest.fn(),
                    removeEventListener: jest.fn(),
                    dispatchEvent: jest.fn(),
                    addListener: jest.fn(),
                    removeListener: jest.fn(),
                }))
        });
        delete window.matchMedia;
        window.matchMedia = (query) => ({
            matches: false,
            media: query,
            onchange: null,
            addListener: jest.fn(),
            removeListener: jest.fn(),
            dispatchEvent: jest.fn(),
            addEventListener: jest.fn(),
            removeEventListener: jest.fn(),
        });
    });
    afterEach(cleanup);

    it("should return a snapshot", async() => {
        const [users, questions] = await Promise.all([_getUsers(), _getQuestions()]);
        store.dispatch(getUsers(users));
        store.dispatch(getPolls(questions));
        store.dispatch(saveUser(store.getState().users["tylermcginnis"]));

        const component = render(
            <Provider store={store}>
                <BrowserRouter>
                    <Dashboard/>
                </BrowserRouter>
            </Provider>
        );

        expect(component).toBeDefined();
        expect(component).toMatchSnapshot();
    });
});