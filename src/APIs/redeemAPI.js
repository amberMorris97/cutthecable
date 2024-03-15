import axios from "axios";

const axiosAPI = axios.create({
    //baseURL: "https://nocableneeded-auth.onrender.com/",
    // baseURL: "1738api.cutthecable.org",
    baseURL: "https://1738api.cutthecable.org",
});

export const createCode = async (email, code, validity, itemID) => {
    try {
        return await axiosAPI.post("/redeem/addredeemcode", {
            email: email,
            validity: validity,
            item_id: itemID,
            code: code,
        });
    } catch (err) {
        console.log("Error Adding Code", err);
    }
};

export const getCodesUser = async (email, code) => {
    try {
        return await axiosAPI.post("/redeem/availredeemcode", {
            email: email,
            code: code,
        });
    } catch (err) {
        console.log("Error signing up", err);
    }
};


export const adminPostedCodes = async (email) => {
    try {
        return await axiosAPI.post("/redeem/getredeemcodes", {
            email: email
        });
    } catch (err) {
        console.log("Error signing up", err);
    }
};

export const userSubscriptionCodes = async (email) => {
    try {
        return await axiosAPI.post("/redeem/getusersubscription", {
            email: email
        });
    } catch (err) {
        console.log("Error signing up", err);
    }
};

export const redeemValidityProductCount = async (item_id, validity) => {
    try {
        return await axiosAPI.post("/redeem/ValidityProductCount", {
            "item_id":item_id,
            "validity":validity
        });
    } catch (err) {
        console.log("Error signing up", err);
    }
};



export const redeemFreeTrial = async (email, code) => {
    try {
        return await axiosAPI.post("/redeem/availtrialcode", {
            email: email,
            code: code,
        });
    } catch (err) {
        console.log(err.response.data.message);
    }
};

export const deleteRedeemCode = async (email, code) => {
    try {
        return await axiosAPI.post("/redeem/deleteredeemcode", {
            email: email,
            code: code,
        });
    } catch (err) {
        console.log("Error signing up", err);
    }
};