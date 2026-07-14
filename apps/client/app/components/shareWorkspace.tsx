"use client";
import { useState } from "react";
import styles from "./styles/formModal.module.css";
import { useShareWorkspace } from "../hooks/useShareWorkspace";
import { useWorkspaceMembers } from "../hooks/useWorkspaceMember";

export default function ShareWorkspace({
  workspaceId,
}: {
  workspaceId: string;
}) {
  const [email, setEmail] = useState("");
  const { data: members, isLoading } = useWorkspaceMembers(workspaceId);
  const { mutate: share, isPending, error } = useShareWorkspace(workspaceId);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    share({ email, role: "VIEWER" }, { onSuccess: () => setEmail("") });
  };

  return (
    <>
      <div className={styles.shareWorkspace}>
        <p>Share this workspace with</p>

        <form onSubmit={handleSubmit}>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="user@example.com"
            required
          />
          <button type="submit" disabled={isPending}>
            {isPending ? "Sharing..." : "Share"}
          </button>
        </form>
        {error && <span>{error.message}</span>}

        {isLoading ? (
          <p>Loading...</p>
        ) : (
          <ul>
            {members?.map((m) => (
              <li key={m.id}>
                {m.user.email} — {m.role}
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
}
