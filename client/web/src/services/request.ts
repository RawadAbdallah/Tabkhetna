/* eslint-disable @typescript-eslint/no-explicit-any */
import axios, { AxiosResponse, AxiosError } from "axios";

axios.defaults.baseURL = "http://127.0.0.1:8000/api";

type RequestOptions = {
    route: string;
    method?: string;
    body?: any;
};

export const request = async ({
    route,
    method = "GET",
    body,
}: RequestOptions): Promise<AxiosResponse | undefined> => {
    try {
        const response = await axios.request({
            url: route,
            method: method,
            data: body,
            headers: {
                "Content-Type": "application/json",
            },
        });

        return response;
    } catch (error) {
        const axiosError = error as AxiosError;
        console.log("Error in API Request:", axiosError.message);
    }
};