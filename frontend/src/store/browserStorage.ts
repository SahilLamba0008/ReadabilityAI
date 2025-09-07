import { WebStorage } from "redux-persist";

const sessionWebStorage: WebStorage = {
	getItem: (key) => Promise.resolve(sessionStorage.getItem(key)),
	setItem: (key, value) => {
		sessionStorage.setItem(key, value);
		return Promise.resolve();
	},
	removeItem: (key) => {
		sessionStorage.removeItem(key);
		return Promise.resolve();
	},
};

export default sessionWebStorage;
