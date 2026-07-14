import {
  AuthValues,
  SignInData,
  UserValues,
  WorkspaceMember,
} from "@repo/types";
import { api } from "../lib/axiosapi";
import axios from "axios";

type CurrentUser = { userId: string; email: string };

export async function CreateUser(data: UserValues): Promise<SignInData> {
  const res = await api.post("/user", data);
  return res.data;
}
export async function LogInUser(data: AuthValues): Promise<SignInData> {
  const res = await api.post("/auth/login", data);
  return res.data;
}
export async function LogOutUser(): Promise<void> {
  await api.post("/auth/logout");
}

export async function GetMe(): Promise<CurrentUser | null> {
  try {
    const res = await api.get("/auth/me");
    return res.data;
  } catch (err) {
    if (axios.isAxiosError(err) && err.response?.status === 401) {
      return null;
    }
    throw new Error("Не вдалося зафетчити себе(мене?)");
  }
}

export async function WorkspaceMembers(
  workspaceId: string,
): Promise<WorkspaceMember[]> {
  const res = await api.get(`/workspace/${workspaceId}/members`);
  return res.data;
}
