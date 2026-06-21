export default async function customFetch(url, method = "GET", body = null) {
  const token = localStorage.getItem("token")
  
  const option = {
    method,
    headers: {}
  }
 
  if (token) option.headers["Authorization"] = `Bearer ${token}`
  
  if (body) {
    if (body instanceof FormData) {
      option.body = body
    } else {
      option.headers["Content-Type"] = "application/json"
      option.body = JSON.stringify(body)
    }
  }
  
  const res = await fetch(url, option)
  const data = await res.json()
  
  if (!res.ok || data.status !== "ok") throw new Error(data.message || "Terjadi kesalahan pada server")
  
  return data
}