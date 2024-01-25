/* eslint-disable @typescript-eslint/no-explicit-any */
import axios, { AxiosResponse, AxiosError } from "axios";


axios.defaults.baseURL = `http://${import.meta.env.VITE_BASE_URL}/`;
export const serverURL =  `http://${import.meta.env.VITE_SERVER_URL}/`;

type RequestOptions = {
    route: string;
    method?: string;
    body?: any;
    headers?: any;
};

export const request = async ({
    route,
    method = "GET",
    body,
    headers = { "Content-type": "application/json" },
}: RequestOptions): Promise<AxiosResponse | undefined> => {
    try {
        const response = await axios.request({
            url: route,
            method: method,
            data: body,
            headers: headers,
        });

        return response;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            const axiosError = error as AxiosError;
            if (axiosError.response) {
                // There is a response from the server
                    return axiosError.response;
            } else {
                // The error is not a server response error
                console.log("Error in API Request:", axiosError.message);
            }
        } else {
            // The error is not an Axios error
            console.log("Non-Axios Error in API Request:", error);
        }
    }
};
