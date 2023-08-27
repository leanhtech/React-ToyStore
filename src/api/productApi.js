import axiosClient from "./axiosClient";

const productApi = {
    getAll: () => {
        const url = 'alltoy';
        return axiosClient.get(url);
    },

    getPromotion: () => {
        const url = 'promotiontoys';
        return axiosClient.get(url)
    }
}

export default productApi;