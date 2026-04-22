import type { Database } from '@nozbe/watermelondb'
import { Model, Q } from '@nozbe/watermelondb'
import { date, field, writer } from '@nozbe/watermelondb/decorators'

export default class Clip extends Model {
    static table = 'clips'

    @field('clip_id') clipId!: string
    @date('recorded_at') recordedAt!: Date
    @field('recording_status') recordingStatus!: string
    @field('remote_sync_status') remoteSyncStatus!: string

    // Marks the clip as dismissed or recorded in the recording_status column
    @writer async updateRecordingStatus(status: 'dismissed' | 'recorded') {
        await this.update((clip: Clip) => {
            clip.recordingStatus = status
        })
    }

    // Marks the clip as synced
    @writer async markAsSynced() {
        await this.update((clip: Clip) => {
            clip.remoteSyncStatus = 'synced'
        })
    }

    // Adds a new clip with default statuses
    static async createNewClip(database: Database, clipId: string, timestamp: Date = new Date()) {
        return await database.write(async () => {
            return await database.get<Clip>('clips').create((clip: Clip) => {
                clip.clipId = clipId
                clip.recordedAt = timestamp
                clip.recordingStatus = 'unprocessed'
                clip.remoteSyncStatus = 'unsynced'
            })
        })
    }

    // Reads the clip_id of all synced or dismissed clips and returns them as an array of strings
    static async getSyncedOrDismissedClipIds(database: Database): Promise<string[]> {
        const clips = await database.get<Clip>('clips').query(
            Q.or(
                Q.where('remote_sync_status', 'synced'),
                Q.where('recording_status', 'dismissed')
            )
        ).fetch()

        return clips.map(clip => clip.clipId)
    }

    // Queries and returns the next unprocessed clip, processing the oldest one first
    static async getNextUnprocessedClip(database: Database): Promise<Clip | null> {
        const clips = await database.get<Clip>('clips').query(
            Q.where('recording_status', 'unprocessed'),
            Q.sortBy('recorded_at', Q.asc),
            Q.take(1)
        ).fetch()

        return clips.length > 0 ? clips[0] : null
    }

    // Queries and returns one unsynced clip
    static async getOneUnsyncedClip(database: Database): Promise<Clip | null> {
        const clips = await database.get<Clip>('clips').query(
            Q.where('remote_sync_status', 'unsynced'),
            Q.where('recording_status', 'recorded'),
            Q.take(1) // Performance optimization: only fetch one record
        ).fetch()

        return clips.length > 0 ? clips[0] : null
    }
}