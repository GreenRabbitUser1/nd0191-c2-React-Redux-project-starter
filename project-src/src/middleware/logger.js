const logger = (store) => (next) => (action) => {
    console.group('REDUX ACTION TRIGGERED');
    console.log("Action: ", action);
    const result = next(action);
    console.log("New state: ", store.getState());
    console.groupEnd();
    next(action);
    return result;
};

export default logger;