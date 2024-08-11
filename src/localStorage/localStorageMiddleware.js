const localStorageMiddleware = store => next => action => {
    const result = next(action);
    const state = store.getState();
    localStorage.setItem('postsState', JSON.stringify(state.posts));
    localStorage.setItem('dataProfileState', JSON.stringify(state.dataProfile));
    return result;
};

export default localStorageMiddleware;