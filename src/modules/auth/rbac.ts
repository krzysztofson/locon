import { User } from "./types";

export type Role = "admin" | "user" | "viewer";

export const roleCapabilities = {
  admin: {
    zones: { create: true, read: true, update: true, delete: true },
  },
  user: {
    zones: { create: true, read: true, update: true, delete: true }, // delete limited by ownership logic elsewhere
  },
  viewer: {
    zones: { create: false, read: true, update: false, delete: false },
  },
} as const;

export const can = (
  user: User | null | undefined,
  action: "create" | "read" | "update" | "delete",
  resource: "zones"
) => {
  if (!user) return false;
  const caps = (roleCapabilities as any)[user.role];
  return !!caps?.[resource]?.[action];
};

export const isViewer = (user?: User | null) => user?.role === "viewer";
export const isAdmin = (user?: User | null) => user?.role === "admin";
export const isUser = (user?: User | null) => user?.role === "user";
