import localStorageService from "./localStorage.service";
import httpService from "./http.service";

const userEndpoint = "user/";

const userService = {
    get: async () => {
        const { data } = await httpService.get(userEndpoint);
        return data;
    },
    getById: async (userId) => {
        const { data } = await httpService.get(userEndpoint + userId);
        return data;
    },
    create: async (payLoad) => {
        const { data } = await httpService.put(
            userEndpoint + payLoad._id,
            payLoad
        );
        return data;
    },
    getCurrentUser: async () => {
        const { data } = await httpService.get(
            userEndpoint + localStorageService.getUserId()
        );
        return data;
    }
};
export default userService;
