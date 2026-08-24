import axios from 'axios'
import { ERRORS } from '@/errors/pure'
import { normalizeAxiosError } from './normalize'

const baseURL = import.meta.env.VITE_HOST
if (!baseURL) {
  throw new Error(ERRORS.NO_HOST)
}

const _axios = axios.create({ baseURL })

_axios.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject(normalizeAxiosError(error)),
)

export { _axios }
