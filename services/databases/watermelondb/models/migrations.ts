import { createTable, schemaMigrations } from '@nozbe/watermelondb/Schema/migrations'

export default schemaMigrations({
    migrations: [
        {
            toVersion: 2,
            steps: [
                createTable({
                    name: 'clips',
                    columns: [
                        { name: 'clip_id', type: 'string', isIndexed: true },
                        { name: 'recorded_at', type: 'number' },
                        { name: 'recording_status', type: 'string' },
                        { name: 'remote_sync_status', type: 'string' },
                    ]
                })
            ]
        }
    ],
})