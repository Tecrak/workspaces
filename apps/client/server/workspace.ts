import { FormValues, Role, Workspace, WorkspaceMember } from "@repo/types";
import { api } from "../lib/axiosapi";

export async function GetAll(): Promise<Workspace[]> {
  const res = await api.get("/workspace");
  return res.data;
}
export async function DeleteWorkspace(id: string): Promise<Workspace> {
  const res = await api.delete(`/workspace/${id}`);
  return res.data;
}
export async function UpdateWSName(
  id: string,
  name: string,
): Promise<Workspace> {
  const res = await api.patch(`/workspace/${id}`, { id, name });
  return res.data;
}

export async function AddWorkspace(data: FormValues): Promise<Workspace> {
  const res = await api.post("/workspace", data);
  return res.data;
}

export async function ShareWorkspace(
  workspaceId: string,
  payload: { email: string; role?: Role },
): Promise<WorkspaceMember> {
  const res = await api.post(`/workspace/${workspaceId}/share`, payload);
  return res.data;
}
