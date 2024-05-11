import { http } from '../utils'

// export function adminLogin(data) {
//   return http.patch('/api/admin/login', data)
// }
export function productdata() {
  return http.get('/api/home')
}
export function getcategoriesdata() {
  return http.get('/api/getcategories')
}
export function getProductById(id) {
  return http.get(`/api/getproduct/${id}`)
}
export function handleSendotp(data) {
  return http.post(`/api/sendotp`,data)
}

export function handlePostVerifyOTP(data) {
  return http.post(`/api/verifyotp`,data)
}