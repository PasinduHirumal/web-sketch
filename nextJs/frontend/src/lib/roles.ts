export const UserRole = {
  USER: "USER",
  ADMIN: "ADMIN",
  SUPER_ADMIN: "SUPER_ADMIN",
} as const;

export type UserRoleType = typeof UserRole[keyof typeof UserRole];

// all user
export const isAnyUser = (role?: string | null): boolean =>
  role === UserRole.USER ||
  role === UserRole.ADMIN ||
  role === UserRole.SUPER_ADMIN;

// admin users
export const isAnyAdmin = (role?: string | null): boolean =>
  role === UserRole.ADMIN ||
  role === UserRole.SUPER_ADMIN;

// single user
export const isSuperAdmin = (role?: string | null): boolean => role === UserRole.SUPER_ADMIN;
export const isAdmin = (role?: string | null): boolean => role === UserRole.ADMIN;
export const isUser = (role?: string | null): boolean => role === UserRole.USER;

// user sets
export const getHomePathByRole = (role?: string | null): string => {
  if (isSuperAdmin(role) || isAdmin(role)) return "/admin/dashboard";
  if (isUser(role)) return "/";
  return "/";
};
