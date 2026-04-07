import { appSchema, tableSchema } from '@nozbe/watermelondb'

export const localDBSchema = appSchema({
    version: 1,
    tables: [
        tableSchema(
            {
                name: 'chats',
                columns: [
                    { name: 'title', type: 'string' },
                    { name: 'updated_at', type: 'number' }
                ],
            }),
        tableSchema({
            name: 'messages',
            columns: [
                { name: 'chat_id', type: 'string', isIndexed: true },
                { name: 'role', type: 'string' },
                { name: 'content', type: 'string' },
                { name: 'status', type: 'string' },
                { name: 'evidence', type: 'string', isOptional: true },
                { name: 'created_at', type: 'number' },
            ]
        }),
    ],
})