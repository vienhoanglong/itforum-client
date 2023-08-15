import jwtDecode from "jwt-decode";
export default function decodeToken(token: string): any {
  const decodedToken: any = jwtDecode(token);
  return decodedToken;
}
