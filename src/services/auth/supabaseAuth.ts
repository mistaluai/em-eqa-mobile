import { create } from 'zustand'
import { Alert } from 'react-native'
import { supabase } from '../databases/supabase/supabase_client'

interface AuthState {
    email: string
    password: string
    full_name: string
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
}

export const useAuthStore = create<AuthState>((set, get) => ({
    email: '',
    password: '',
    loading: false,
    full_name: '',
    username: '',
    dob: new Date(),
    // Simple actions to update state
    setEmail: (email) => set({ email }),
    setPassword: (password) => set({ password }),
    setFullname: (full_name) => set({ full_name }),
    setUsername: (username) => set({ username }),
    setDOB: (dob) => set({ dob }),

    // The Logic: Sign In
    signInWithEmail: async () => {
        set({ loading: true })
        const { email, password } = get() // Read current state

        const { error } = await supabase.auth.signInWithPassword({
            email: email,
            password: password,
        })

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
            loading: false
        })
    }
}))