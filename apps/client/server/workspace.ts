import {
  FormValues,
  QueryEndpoint,
  Role,
  Workspace,
  WorkspaceMember,
} from "@repo/types";
import { workspaceApi } from "../lib/axiosapi";

export async function GetAll(): Promise<Workspace[]> {
  const res = await workspaceApi.get(QueryEndpoint.workspace);
  return res.data;
}
export async function DeleteWorkspace(id: string): Promise<void> {
  const res = await workspaceApi.delete(`${QueryEndpoint.workspace}/${id}`);
  return res.data;
}
export async function UpdateWSName(
  id: string,
  name: string,
): Promise<Workspace> {
  const res = await workspaceApi.patch(`${QueryEndpoint.workspace}/${id}`, {
    id,
    name,
  });
  return res.data;
}

export async function AddWorkspace(data: FormValues): Promise<Workspace> {
  const res = await workspaceApi.post(QueryEndpoint.workspace, data);
  return res.data;
}

export async function ShareWorkspace(
  workspaceId: string,
  payload: { email: string; role?: Role },
): Promise<WorkspaceMember> {
  const res = await workspaceApi.post(
    `/workspace/${workspaceId}/share`,
    payload,
  );
  return res.data;
}

export async function WorkspaceMembers(
  workspaceId: string,
): Promise<WorkspaceMember[]> {
  const res = await workspaceApi.get(`/workspace/${workspaceId}/members`);
  return res.data;
}
