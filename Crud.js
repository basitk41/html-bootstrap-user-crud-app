import { getData, setData, removeData } from "./localStorage.js";
import { api } from "./Apis.js";
import { pagination } from "./UI.js";
import { paginate, globalLoader } from "./Helper.js";
let ID,
  PAGE = 1,
  SIZE = 5,
  SORT = "id",
  ORDER = "asc";

// searching for users
window.search = (flag) => {
  const search = document.getElementById("search").value;
  const users = getData("users");
  const filteredUsers = users
    .filter(
      (user) =>
        user.name.toLowerCase().includes(search.toLowerCase()) ||
        user.id.toString().includes(search)
    )
    .sort((a, b) => {
      if (SORT === "id") {
        return ORDER === "asc" ? a[SORT] - b[SORT] : b[SORT] - a[SORT];
      } else {
        return ORDER === "asc"
          ? a[SORT].localeCompare(b[SORT])
          : b[SORT].localeCompare(a[SORT]);
      }
    });
  if (!flag) PAGE = 1;
  setUsers(filteredUsers);
};

// sorting users
window.sort = (sort) => {
  globalLoader(true);
  setTimeout(() => {
    globalLoader(false);
  }, 1000);
  SORT = sort;
  ORDER = ORDER === "asc" ? "desc" : "asc";
  window.search(true);
};

// deleting user
window.deleteUser = async (id) => {
  globalLoader(true);
  setTimeout(() => {
    globalLoader(false);
  }, 1000);
  let users = [];
  try {
    users = await api.get("users", {}, {}, false);
  } catch (err) {
    console.log(err);
    console.log("Error fetching users");
  }
  users = users.filter((user) => user.id !== id);
  const totalPages = Math.ceil(users.length / SIZE);
  if (PAGE > totalPages) PAGE = totalPages;
  setData("users", users);
  setUsers(users);
};

// adding or updating user
window.addUser = async () => {
  globalLoader(true);
  setTimeout(() => {
    globalLoader(false);
  }, 1000);
  let users = [];
  try {
    users = await api.get("users", {}, {}, false);
  } catch (err) {
    console.log(err);
    console.log("Error fetching users");
  }
  let name = document.getElementById("name");
  if (ID) {
    let user = users.find((user) => user.id === ID);
    user.name = name.value;
    document.getElementById("submit").innerHTML = "Add";
    name.value = "";
    ID = null;
  } else {
    users.push({ id: Date.now(), name: name.value });
    name.value = "";
    const totalPages = Math.ceil(users.length / SIZE);
    PAGE = totalPages;
    SORT = "id",
  ORDER = "asc";
  }
  setData("users", users);
  window.search(true)
};

// editing user
window.editUser = async (id) => {
  globalLoader(true);
  setTimeout(() => {
    globalLoader(false);
  }, 1000);
  let users = [];
  try {
    users = await api.get("users", {}, {}, false);
  } catch (err) {
    console.log(err);
    console.log("Error fetching users");
  }
  ID = id;
  let name = document.getElementById("name");
  document.getElementById("submit").innerHTML = "Update";
  let user = users.find((user) => user.id === id);
  name.value = user.name;
};

// user login
window.login = () => {
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;
  if (username === "admin" && password === "admin") {
    setData("token", "hdsgfiywgfjbejhsb");
    main();
  } else {
    alert("Invalid username or password");
  }
};

// user logout
window.logout = () => {
  removeData("token");
  main();
};

// switching between pages
window.setPage = (page) => {
  PAGE = page;
  window.search(true);
};

// setting users in DOM
const setUsers = (users) => {
  const paginattedUsers = paginate(users, PAGE, SIZE);
  const mappedUsers = paginattedUsers.map(
    (user) => `<tr>
    <td>${user.id}</td>
    <td>${user.name}</td>
    <td>
    <button class="btn btn-info" onclick='editUser(${user.id})'>Edit</button> 
    <button class="btn btn-danger" onclick='deleteUser(${user.id})'>Delete</button>
    </td>
    </tr>`
  );
  document.getElementById("usersTableRows").innerHTML = mappedUsers.join("");
  if (users.length > 5) {
    const totalPages = Math.ceil(users.length / SIZE);
    document.getElementById("pagination").innerHTML = pagination(
      PAGE,
      totalPages
    );
  } else document.getElementById("pagination").innerHTML = "";
};

// main function
const main = async () => {
  globalLoader(true);
  setTimeout(() => {
    globalLoader(false);
  }, 1000);
  const token = getData("token") || "";
  if (token) {
    document.getElementById("login").style.display = "none";
    document.getElementById("main-content").style.display = "block";
  } else {
    document.getElementById("login").style.display = "block";
    document.getElementById("main-content").style.display = "none";
  }
  let users = [];
  try {
    users = await api.get("users");
  } catch (err) {
    console.log(err);
    console.log("Error fetching users");
  }
  setUsers(users);
};

main();
