import { AuthValues, QueryEndpoint, SignInData, UserValues } from "@repo/types";
import { authApi } from "../lib/axiosapi";
import axios from "axios";

type CurrentUser = { userId: string; email: string };

export async function CreateUser(data: UserValues): Promise<SignInData> {
  const res = await authApi.post(QueryEndpoint.user, data);
  return res.data;
}
export async function LogInUser(data: AuthValues): Promise<SignInData> {
  const res = await authApi.post(QueryEndpoint.login, data);
  return res.data;
}
export async function LogOutUser(): Promise<void> {
  await authApi.post(QueryEndpoint.logout);
}

export async function GetMe(): Promise<CurrentUser | null> {
  try {
    const res = await authApi.get(QueryEndpoint.authMe);
    return res.data;
  } catch (err) {
    if (axios.isAxiosError(err) && err.response?.status === 401) {
      return null;
    }
    throw new Error("Не вдалося зафетчити себе(мене?)");
  }
}
