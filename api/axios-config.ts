import { ERRORS } from '@/utils/errors/pure'
import axios, { AxiosError, AxiosResponse, type AxiosRequestConfig } from 'axios'

const baseURL = import.meta.env.VITE_HOST
if (!baseURL) {
  throw new Error(ERRORS.NO_HOST)
}

const axiosConfig: AxiosRequestConfig = {}
const _axios = axios.create({ baseURL })

_axios.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject((error as AxiosError).response?.data),
)

const axiosInstance = {
  async get<GetRequest = unknown>(url: string) {
    return (await _axios.get<GetRequest>(url, axiosConfig)).data
  },

  async post<PostRequest = unknown, PostResponse = unknown>(url: string, data?: PostRequest): Promise<PostResponse> {
    return (await _axios.post<PostResponse, AxiosResponse<PostResponse>>(url, data, axiosConfig)).data
  },

  async delete<DeleteResponse = unknown>(url: string) {
    return (await _axios.delete<DeleteResponse>(url, axiosConfig)).data
  },

  async patch<PatchRequest = unknown, PatchResponse = unknown>(url: string, data?: PatchRequest) {
    return (await _axios.patch<PatchResponse>(url, data, axiosConfig)).data
  },

  setAuthToken(token: string) {
    axiosConfig.headers = axiosConfig.headers || {}
    axiosConfig.headers.Authorization = `Bearer ${token}`
  },

  removeAuthToken() {
    axiosConfig.headers = axiosConfig.headers || {}
    axiosConfig.headers.Authorization = ''
  },
}

export { axiosInstance }
