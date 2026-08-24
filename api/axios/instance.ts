import { _axios } from './config'
import { type AxiosResponse } from 'axios'

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
