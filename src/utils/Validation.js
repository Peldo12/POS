export default function Validation(arg) {
  const errorStatus = {
    Username : "Username is required",
    Email : "Email is required",
    Password : "Password is required",
  }
  return errorStatus[arg]
}