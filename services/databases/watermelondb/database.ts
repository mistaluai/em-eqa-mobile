import { Database } from '@nozbe/watermelondb'
import SQLiteAdapter from '@nozbe/watermelondb/adapters/sqlite'
import Chat from './models/Chat'
import Clips from './models/Clips'
import Message from './models/Message'
import migrations from './models/migrations'
import { localDBSchema } from './schema'


const adapter = new SQLiteAdapter({
    schema: localDBSchema,
    dbName: 'chatsDB',
    migrations,
    jsi: true,
    onSetUpError: error => {
        console.error('Failed to set up database', error);
    },

})

export const localDatabase = new Database({
    adapter,
    modelClasses: [
        Chat,
        Message,
        Clips
    ],
});