import axios from "axios";
import { BASE_URL, API_URL } from "./apiConfig";

export async function getPrime(params) {
    const headers = {
        "Content-Type": params.contentType
            ? params.contentType
            : "application/json",
    };
    const data = params;
    let _params = {
        method: "post",
        url: `${BASE_URL}/${API_URL}`,
        headers,
        withCredentials: false,
        data,
    };

    try {
        const resp = await axios(_params);
        if (resp.status === 200 || resp.status === 201) {
            if (resp.data.status === false) throw resp.data.mess;
            return resp.data;
        }
        throw new Error(`${resp.statusText}`);
    } catch (error) {
        throw error;
    }
}
