/// <reference types="vite/types/importMeta.d.ts" />
import axios from 'axios'

const baseURL = import.meta.env.VITE_API_ENDPOINT

const axiosInstance = axios.create({
  baseURL,
})

axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')

  // Don't set Authorization header for login or register
  const noAuthRoutes = ['/login/', '/register/']

  const isAuthRoute = !noAuthRoutes.some((path) =>
    config.url?.includes(path)
  )

  if (token && isAuthRoute) {
    config.headers.Authorization = `Token ${token}`
  }

  // Content-Type handling
  if (config.data instanceof FormData) {
    config.headers['Content-Type'] = 'multipart/form-data'
  } else {
    config.headers['Content-Type'] = 'application/json'
  }

  return config
})

export default axiosInstance
