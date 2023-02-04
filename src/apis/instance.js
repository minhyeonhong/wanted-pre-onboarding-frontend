import axios from "axios";

export const instance = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    headers: {
        "Access_Token": localStorage.getItem("token") === undefined ? "" : localStorage.getItem("token"),
    },

    withCredentials: true,
});