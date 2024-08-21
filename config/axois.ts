import axios, { AxiosError, type AxiosRequestConfig } from "axios";

export const SRC_BASE_URL = "https://vidstream.to";
export const SRC_HOME_URL = `${SRC_BASE_URL}/home`;
export const SRC_AJAX_URL = `${SRC_BASE_URL}/ajax`;

export const ACCEPT_HEADER = "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9";
export const USER_AGENT_HEADER = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.4692.71 Safari/537.36";
export const ACCEPT_ENCODING_HEADER = "gzip, deflate, br";

const clientConfig: AxiosRequestConfig = {
  timeout: 10000,
  baseURL: SRC_BASE_URL,
  headers: {
    Accept: ACCEPT_HEADER,
    "User-Agent": USER_AGENT_HEADER,
    "Accept-Encoding": ACCEPT_ENCODING_HEADER,
  },
};

const client = axios.create(clientConfig);

export { client, AxiosError };