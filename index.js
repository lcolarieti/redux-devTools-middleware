const devToolsMiddleware = store => next => (action) => {
    const eventName = 'reduxDevTools';

    if (typeof window !== 'undefined') {
        const date = new Date();
        const reduxStore = store.getState();
        const item = {
            action,
            store: 'asImmutable' in store.getState() ? reduxStore.toJS() : reduxStore,
            createdAt: `${date.toLocaleString().split(',')[1]}.${date.getMilliseconds()}`,
        };
        const event = new CustomEvent(eventName, { detail: item });
        window.dispatchEvent(event);
    }
    next(action);
};

export default devToolsMiddleware;