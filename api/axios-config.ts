import { ERRORS } from '@/errors/pure'
import axios, { type AxiosError, type AxiosResponse } from 'axios'

const baseURL = import.meta.env.VITE_HOST
if (!baseURL) {
  throw new Error(ERRORS.NO_HOST)
}

const _axios = axios.create({ baseURL })

_axios.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject((error as AxiosError).response?.data),
)

const axiosInstance = {
  async get<GetRequest = unknown>(url: string) {
    return (await _axios.get<GetRequest>(url)).data
  },

  async post<PostRequest = unknown, PostResponse = unknown>(url: string, data?: PostRequest): Promise<PostResponse> {
    return (await _axios.post<PostResponse, AxiosResponse<PostResponse>>(url, data)).data
  },

  async delete<DeleteResponse = unknown>(url: string) {
    return (await _axios.delete<DeleteResponse>(url)).data
  },

  async patch<PatchRequest = unknown, PatchResponse = unknown>(url: string, data?: PatchRequest) {
    return (await _axios.patch<PatchResponse>(url, data)).data
  },

  setAuthToken(token: string) {
    _axios.defaults.headers.common.Authorization = `Bearer ${token}`
  },

  removeAuthToken() {
    delete _axios.defaults.headers.common.Authorization
  },
}

export { axiosInstance }
