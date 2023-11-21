import axios from "axios";

const axiosAPI = axios.create({
    //baseURL: "https://nocableneeded-auth.onrender.com/",
    baseURL: "https://1738api.nocableneeded.net/",
});

export const createCheckout = async (email, id, name, price, company, description, category, validity,type) => {
    try {
        return await axiosAPI.post("/checkout/process", {
            "email": email,
            "type": type,
            "cartItems": [
                {
                    "id": id,
                    "name": name,
                    "price": price,
                    "company": company,
                    "description": description,
                    "category": category,
                    "validity": validity,
                    "cartQuantity": "1"
                }
            ]
        });
    } catch (err) {
        console.log("Error Adding Code", err);
    }
};