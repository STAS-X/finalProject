import axios from "axios";
import { toast } from "react-toastify";
import config from "../config.json";

axios.defaults.baseURL = config.apiEndPoint;

axios.interceptors.response.use(
    (res) => res,
    function (err) {
        console.log("Interceptor catcher");
        const expErrors =
            err.response && err.reponce.status >= 400 && err.reponce.status < 500;
        if (!expErrors) {
            console.log(err);
            toast.error("Unexpected errors");
        }
        return Promise.reject(err);
    }
);

const httpService = {
    get: axios.get,
    post: axios.post,
    put: axios.put,
    delete: axios.delete
};
export default httpService;
