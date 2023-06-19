import jwtDecode from "jwt-decode";

export default function parseToken(token: string) {
  const decoded = jwtDecode(token)
  console.log(decoded);
  return decoded;
}
