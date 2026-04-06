import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface User {
  id: string;
  phone: string;
  role: string;
  full_name?: string;
}

interface AuthState {
  user: User | null;
  session: any;
  loading: boolean;
  setUser: (u: User | null) => void;
  setSession: (s: any) => void;
  setLoading: (l: boolean) => void;
  fetchProfile: () => Promise<void>;
  signOut: () => Promise<void>;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      session: null,
      loading: true,
      setUser: (user) => set({ user }),
      setSession: (session) => set({ session }),
      setLoading: (loading) => set({ loading }),
      fetchProfile: async () => {
        const current = get().user;
        if (current) { set({ loading: false }); return; }
        set({ loading: false });
      },
      signOut: async () => {
        set({ user: null, session: null });
      },
    }),
    { name: 'medwise-dashboard-auth', partialize: (s) => ({ user: s.user }) }
  )
);