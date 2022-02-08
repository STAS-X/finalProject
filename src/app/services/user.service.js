import httpService from "./http.service";

const userEndpoint = "user/";

const userService = {
    get: async () => {
        const { data } = await httpService.get(userEndpoint);
        return data;
    },
    create: async (payLoad) => {
        const { data } = await httpService.put(userEndpoint + payLoad._id, payLoad);
        return data;
    }
};
export default userService;
