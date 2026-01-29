import { Alert } from 'react-native'
import { create } from 'zustand'
import { supabase } from '../databases/supabase/supabase_client'

interface AuthState {
    userid: string
    email: string
    password: string
    full_name: string
    avatar_path: string | null;
    username: string
    dob: Date
    loading: boolean
    setEmail: (email: string) => void
    setPassword: (password: string) => void
    setFullname: (full_name: string) => void
    setUsername: (username: string) => void
    setDOB: (dob: Date) => void
    signInWithEmail: () => Promise<void>
    signUp: () => Promise<void>
    signOut: () => Promise<void>
    setAvatarPath: (path: string) => void;
    loadUserProfile: (uid: string) => Promise<void>;
    initialized: boolean;
    initialize: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set, get) => ({
    userid: '',
    initialized: false,
    email: '',
    password: '',
    loading: false,
    full_name: '',
    username: '',
    avatar_path: null,
    dob: new Date(),
    // Simple actions to update state
    setEmail: (email) => set({ email }),
    setPassword: (password) => set({ password }),
    setFullname: (full_name) => set({ full_name }),
    setUsername: (username) => set({ username }),
    setDOB: (dob) => set({ dob }),
    setAvatarPath: (path) => set({ avatar_path: path }),

    loadUserProfile: async (uid: string) => {
        const { data, error } = await supabase
            .from('users')
            .select('avatar_url, full_name, username, date_of_birth, email')
            .eq('id', uid)
            .single();

        if (data) {
            set({
                avatar_path: data.avatar_url, // Store the path!
                full_name: data.full_name,
                username: data.username,
                email: data.email,
                dob: new Date(data.date_of_birth)
            });
        }
    },

    // The Logic: Sign In
    signInWithEmail: async () => {
        set({ loading: true })
        const { email, password } = get() // Read current state

        const { error } = await supabase.auth.signInWithPassword({
            email: email,
            password: password,
        })

        const { data: { user } } = await supabase.auth.getUser()
        if (user) {
            set({ userid: user.id })
            await get().loadUserProfile(user.id);
        }

        if (error) Alert.alert(error.message)
        set({ loading: false })

    },

    // The Logic: Sign Up
    signUp: async () => {
        set({ loading: true })
        const { email, password, full_name, username, dob } = get()

        const {
            data: { session },
            error,
        } = await supabase.auth.signUp({
            email: email,
            password: password,
            options: {
                data: {
                    full_name: full_name,
                    username: username,
                    date_of_birth: dob.toISOString().split('T')[0],
                    avatar_url: ''
                }
            }

        })

        const { data: { user } } = await supabase.auth.getUser()
        if (user) {
            set({ userid: user.id })
            await get().loadUserProfile(user.id);
        }

        if (error) Alert.alert(error.message)
        if (!session && !error) Alert.alert('Please check your inbox for email verification!')
        set({ loading: false })
    },
    signOut: async () => {
        set({ loading: true })
        const { error } = await supabase.auth.signOut()

        if (error) {
            Alert.alert(error.message)
        }

        set({
            email: '',
            password: '',
            full_name: '',
            username: '',
            userid: '',
            loading: false
        })
    },
    initialize: async () => {
        // Check local storage for an existing session
        const { data: { session } } = await supabase.auth.getSession();

        if (session && session.user) {
            console.log("Global Init: Session found for", session.user.id);
            set({ userid: session.user.id });

            // Optional: Load profile in background
            get().loadUserProfile(session.user.id);
        } else {
            console.log("Global Init: No session found.");
        }

        // Mark as finished so the app knows it can stop showing the splash screen
        set({ initialized: true });
    },
}))