import type { UserFromJwt } from "@/types";
import jwtDecode from "jwt-decode";

export function useJwtDecode() {
  function decodeToken(token: string) {
    try {
      return jwtDecode<UserFromJwt>(token);
    } catch {
      return null;
    }
  }

  function tokenIsValid(token: string): boolean {
    const decoded = decodeToken(token);
    return decoded !== null && decoded.exp > Date.now() / 1000;
  }

  return {
    decodeToken,
    tokenIsValid,
  };
}
