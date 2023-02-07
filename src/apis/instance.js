import axios from "axios";

const getAccessToken = () => {
    return localStorage.getItem("access_token") !== undefined
        && localStorage.getItem("access_token") !== null
        && localStorage.getItem("access_token") !== "null"
        && localStorage.getItem("access_token").trim() !== ""
        ? `Bearer ${localStorage.getItem("access_token")}` : "";
}

export const instance = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    headers: {
        "Authorization": getAccessToken(),
        "Content-Type": "application/json",
    },

    withCredentials: true,
});

instance.interceptors.response.use(function (response) {
    return response;
}, function (error) {
    console.log("error : ", error);
    switch (error.response.data.statusCode) {
        case 400:
            alert(error.response.data.message);
            break;
        case 401:
            alert(error.response.data.message);
            break;
        case 404:
            alert(error.response.data.message);
            break;
        default:
            break;
    }

    switch (error.response.status) {
        case 500:
            alert(error.response.statusText);
            break;
        default:
            break;
    }


    return Promise.reject(error);
});