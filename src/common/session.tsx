const storeInSession = (key: string, value: string) => {
          return sessionStorage.setItem(key, value);
};

const lookInSession = (key: string) => {
          return sessionStorage.getItem(key);
};

const removeFromSession = (key: string) => {
          return sessionStorage.removeItem(key);
};

const logOut = () => {
          sessionStorage.clear();
};

export { logOut, lookInSession, removeFromSession, storeInSession };
