export interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  is_active: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface AuthState {
  user: User | null;
  accessToken: string | null;
  isHydrated: boolean;
  isAuthLoading: boolean;
  setHydrated: () => void;
  setAuth: (accessToken: string | null, user: User | null) => void;
  logoutLocal: () => void;
  login: (credentials: Record<string, any>) => Promise<{ success: boolean; user?: User; error?: string }>;
  register: (credentials: Record<string, any>) => Promise<{ success: boolean; error?: string }>;
  logout: () => Promise<void>;
  refresh: () => Promise<{ accessToken: string; user: User; message?: string }>;
  isLoggedIn: () => boolean;
}

export interface MetaData {
  totalItems: number;
  itemCount: number;
  itemsPerPage: number;
  totalPages: number;
  currentPage: number;
}

export interface UserListResponse {
  items: User[];
  meta: MetaData;
}
