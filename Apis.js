import { getData, setData, removeData } from "./localStorage.js";
import { loader } from "./Helper.js";
export const api = {
  get: (name, body, headers, loading = true) =>
    new Promise((resolve, reject) => {
      loading && loader("usersTable", true);
      setTimeout(() => {
        const data = getData(name);
        if (data) {
          resolve(data);
        } else {
          reject(`${name} not found!`);
        }
        loading && loader("usersTable", false);
      }, 1000);
    }),
};
