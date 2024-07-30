import axios from "axios";

export const axiosClient = axios.create({
    baseURL: "https://bankapi4.bsite.net/api/v1/Loan",
});