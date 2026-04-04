export interface AuthState {
    userid: string;
    email: string;
    full_name: string;
    avatar_path: string | null;
    username: string;
    dob: Date;
    loading: boolean;
    initialized: boolean;

    // Profile Setters (for updating profile globally)
    setEmail: (email: string) => void;
    setFullname: (full_name: string) => void;
    setUsername: (username: string) => void;
    setDOB: (dob: Date) => void;
    setAvatarPath: (path: string) => void;

    // Actions
    signInWithEmail: (email: string, pass: string) => Promise<void>;
    signUp: (email: string, pass: string, fullName: string, username: string, dob: Date) => Promise<void>;
    signOut: () => Promise<void>;
    loadUserProfile: (uid: string) => Promise<void>;
    initialize: () => Promise<void>;
}
