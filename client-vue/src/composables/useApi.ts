import { api } from "@/utils";
import type {
  SignUp,
  SignupResponseError,
  SignupResponseSuccess,
  SignIn,
  SigninResponseError,
  SigninResponseSuccess,
  MeResponseSuccess,
  MeResponseError,
  RefreshTokenResponseSuccess,
  RefreshTokenResponseError,
  ConfirmEmailResponseSuccess,
  ConfirmEmailResponseError,
  LogoutResponseSuccess,
  LogoutResponseError,
} from "@/types";
import { EndPointsApi } from "@/enums";
import type { AxiosError } from "axios";
import { useTokenStore } from "@/stores";

export function useApi() {
  const tokens = useTokenStore();

  async function useSignUp(data: SignUp) {
    try {
      const response = await api.post<SignupResponseSuccess>(
        EndPointsApi.SignUp,
        data
      );
      return response.data;
    } catch (err) {
      const error = err as AxiosError<SignupResponseError>;
      throw error.response?.data;
    }
  }

  async function useSignIn(data: SignIn) {
    try {
      const response = await api.post<SigninResponseSuccess>(
        EndPointsApi.SignIn,
        data
      );
      return response.data;
    } catch (err) {
      const error = err as AxiosError<SigninResponseError>;
      throw error.response?.data;
    }
  }

  async function useMe() {
    try {
      const response = await api.get<MeResponseSuccess>(EndPointsApi.Me, {
        headers: {
          Authorization: `Bearer ${tokens.accessToken}`,
        },
      });
      return response.data;
    } catch (err) {
      const error = err as AxiosError<MeResponseError>;
      throw error.response?.data;
    }
  }

  async function useRefreshToken() {
    try {
      const response = await api.post<RefreshTokenResponseSuccess>(
        EndPointsApi.RefreshToken,
        {},
        {
          headers: {
            Authorization: `Bearer ${tokens.refreshToken}`,
          },
        }
      );
      return response.data;
    } catch (err) {
      const error = err as AxiosError<RefreshTokenResponseError>;
      throw error.response?.data;
    }
  }
  async function useConfirmEmail(token: string) {
    try {
      const response = await api.post<ConfirmEmailResponseSuccess>(
        EndPointsApi.ConfirmEmail,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (err) {
      const error = err as AxiosError<ConfirmEmailResponseError>;
      throw error.response?.data;
    }
  }

  async function useLogout() {
    try {
      const response = await api.post<LogoutResponseSuccess>(
        EndPointsApi.Logout,
        {},
        {
          headers: {
            Authorization: `Bearer ${tokens.accessToken}`,
          },
        }
      );
      return response.data;
    } catch (err) {
      const error = err as AxiosError<LogoutResponseError>;
      throw error.response?.data;
    }
  }

  return {
    useSignUp,
    useSignIn,
    useMe,
    useRefreshToken,
    useConfirmEmail,
    useLogout,
  };
}
