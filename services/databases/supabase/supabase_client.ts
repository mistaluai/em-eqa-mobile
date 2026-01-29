import AsyncStorage from '@react-native-async-storage/async-storage'
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://cngbqbgivklpaijkbexa.supabase.co'
const supabasePublishableKey = 'sb_publishable_Ux4SIa2yUQKBWHQ6yjG3EQ_LJc17jZE'

export const supabase = createClient(supabaseUrl, supabasePublishableKey, {
    auth: {
        storage: AsyncStorage,
        autoRefreshToken: true,
        persistSession: true,
        detectSessionInUrl: false,
    },
})