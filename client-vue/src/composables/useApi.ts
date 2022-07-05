import { api } from "@/utils";
import type {
  Signup,
  SignupResponseError,
  SignupResponseSuccess,
  Signin,
  SigninResponseError,
  SigninResponseSuccess,
  MeResponseSuccess,
  MeResponseError,
  RefreshTokenResponseSuccess,
  RefreshTokenResponseError,
  ConfirmEmailResponseSuccess,
  ConfirmEmailResponseError,
} from "@/types";
import { EndPointsApi } from "@/enums";
import type { AxiosError } from "axios";
import { useTokenStore } from "@/stores";

export function useApi() {
  const tokens = useTokenStore();

  async function signup(data: Signup) {
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

  async function sigin(data: Signin) {
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

  async function me() {
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

  async function postRefreshToken() {
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
  async function confirmEmail(token: string) {
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

  return {
    signup,
    sigin,
    me,
    postRefreshToken,
    confirmEmail,
  };
}
