import { Database } from '@nozbe/watermelondb'
import SQLiteAdapter from '@nozbe/watermelondb/adapters/sqlite'
import Chat from './models/Chat'
import Message from './models/Message'
import { localChatsSchema } from './schema'


const adapter = new SQLiteAdapter({
    schema: localChatsSchema,
    dbName: 'chatsDB',
    //   migrations,
    jsi: true,
    onSetUpError: error => {
        console.error('Failed to set up database', error);
    },

})

export const database = new Database({
    adapter,
    modelClasses: [
        Chat,
        Message
    ],
});