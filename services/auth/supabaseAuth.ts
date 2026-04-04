import { Alert } from 'react-native'
import { create } from 'zustand'
import { AuthState } from '../../shared/types'
import { supabase } from '../databases/supabase/supabase_client'

export const useAuthStore = create<AuthState>((set, get) => ({
    userid: '',
    initialized: false,
    email: '',
    full_name: '',
    username: '',
    avatar_path: null,
    dob: new Date(),
    loading: false,

    // Profile Setters (For updating authenticated profile)
    setEmail: (email) => set({ email }),
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
    signInWithEmail: async (email: string, pass: string) => {
        set({ loading: true })

        const { error } = await supabase.auth.signInWithPassword({
            email: email,
            password: pass,
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
    signUp: async (email: string, pass: string, fullName: string, username: string, dob: Date) => {
        set({ loading: true })

        const {
            data: { session },
            error,
        } = await supabase.auth.signUp({
            email: email,
            password: pass,
            options: {
                data: {
                    full_name: fullName,
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