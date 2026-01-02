import { create } from 'zustand';

// --- Types ---
interface User {
    id: string;
    name: string;
    email: string;
    role: 'client' | 'freelancer';
    avatar?: string;
    companyName?: string;
    firstName?: string;
    lastName?: string;
}

interface Job {
    id: string;
    title: string;
    // ... add more as needed
}

// --- Auth Store ---
interface AuthState {
    user: User | null;
    token: string | null;
    isAuthenticated: boolean;
    login: (user: User, token: string) => void;
    logout: () => void;
    setRole: (role: 'client' | 'freelancer') => void;
    updateUser: (userData: Partial<User>) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
    user: null,
    token: null,
    isAuthenticated: false,
    login: (user, token) => set({ user, token, isAuthenticated: true }),
    logout: () => set({ user: null, token: null, isAuthenticated: false }),
    setRole: (role) => set((state) => ({ user: state.user ? { ...state.user, role } : null })),
    updateUser: (userData) => set((state) => ({
        user: state.user ? { ...state.user, ...userData } : null
    })),
}));

// --- Jobs Store ---
interface JobsState {
    jobs: Job[];
    currentJob: Job | null;
    setJobs: (jobs: Job[]) => void;
    setCurrentJob: (job: Job) => void;
    addJob: (job: Job) => void;
}

export const useJobsStore = create<JobsState>((set) => ({
    jobs: [],
    currentJob: null,
    setJobs: (jobs) => set({ jobs }),
    setCurrentJob: (job) => set({ currentJob: job }),
    addJob: (job) => set((state) => ({ jobs: [...state.jobs, job] })),
}));

// --- UI Store ---
interface UIState {
    isLoading: boolean;
    modalOpen: string | null; // ID of the open modal
    setLoading: (loading: boolean) => void;
    openModal: (modalId: string) => void;
    closeModal: () => void;
}

export const useUIStore = create<UIState>((set) => ({
    isLoading: false,
    modalOpen: null,
    setLoading: (loading) => set({ isLoading: loading }),
    openModal: (modalId) => set({ modalOpen: modalId }),
    closeModal: () => set({ modalOpen: null }),
}));
