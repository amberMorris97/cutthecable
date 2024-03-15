import axios from "axios";

const axiosAPI = axios.create({
    //baseURL: "https://nocableneeded-auth.onrender.com/",
    // baseURL: "https://1738api.nocableneeded.net/",
    baseURL: "https://1738api.cutthecable.org",
});

export const getAllSubscriptions = async () => {
    try {
        return await axiosAPI.get("/products/");
    } catch (err) {
        console.log("Error Adding Code", err);
    }
};

export const getSubscriptionByID = async (id) => {
    try {
        return await axiosAPI.post("/products/get-product-id", {
            "id": id,
          });
    } catch (err) {
        console.log("Error Adding Code", err);
    }
};

export const getAllSubscriptionsUser = async () => {
    try {
        return await axiosAPI.post("/redeem/Productsummary");
    } catch (err) {
        console.log("Error Adding Code", err);
    }
};

export const updatePlans = async (id,price,validity,master_id) => {
    try {
        return await axiosAPI.post("/products/edit-product-data", {
            "id": id,
            "price":price,
            "validity": validity,
            "master_id": master_id,
          });
    } catch (err) {
        console.log("Error Adding Code", err);
    }
};
