import { spinner, globalSpinner, Tables } from "./UI.js";
export const loader = (name, enable) => {
  const div = document.getElementById(name);
  if (enable) div.innerHTML = spinner;
  else div.innerHTML = Tables[name];
};
export const globalLoader = (enable) => {
  const loaderDiv = document.getElementById("global-loader");
  const mainDiv = document.getElementById("main-container");
  if (enable) {
    loaderDiv.innerHTML = globalSpinner;
    loaderDiv.style.zIndex = "100";
    mainDiv.style.opacity = "0.3";
  } else {
    loaderDiv.innerHTML = "";
    loaderDiv.style.zIndex = "0";
    mainDiv.style.opacity = "1";
  }
};

export const paginate = (data, page, size) => {
  const start = (page - 1) * size;
  const end = page * size;
  return data.slice(start, end);
};
