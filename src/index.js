exports.reduxDevToolsMiddleware = function (store) {
    return function (next) {
        return function (action) {
            var eventName = 'reduxDevTools';

            if (typeof window !== 'undefined') {
                var date = new Date();
                var reduxStore = store.getState();
                var item = {
                    action,
                    store: 'asImmutable' in store.getState() ? reduxStore.toJS() : reduxStore,
                    createdAt: `${date.toLocaleString().split(',')[1]}.${date.getMilliseconds()}`,
                };
                var event = new CustomEvent(eventName, { detail: item });
                window.dispatchEvent(event);
            }
            next(action);
        }
    };
}