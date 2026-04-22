import { localDatabase } from '../database';
import Clip from '../models/Clips';

// ─────────────────────────────────────────────────────────────────────────────
// Helpers
// ─────────────────────────────────────────────────────────────────────────────

/** Wipe the entire clips table so every test starts from a clean slate. */
const purgeAllClips = async () => {
    await localDatabase.write(async () => {
        const all = await localDatabase.get<Clip>('clips').query().fetch();
        await Promise.all(all.map((c) => c.destroyPermanently()));
    });
};

/** Tiny assertion helper – throws if the condition is falsy. */
const assert = (condition: boolean, message: string) => {
    if (!condition) throw new Error(`❌ ASSERTION FAILED: ${message}`);
};

// ─────────────────────────────────────────────────────────────────────────────
// Individual Test Cases
// ─────────────────────────────────────────────────────────────────────────────

/**
 * TEST 1 – Create a clip with default values and verify every field is
 *           persisted correctly.
 */
const testCreateClip = async () => {
    console.log('  [TEST 1] Create a clip with default values');

    const clipId = 'clip-create-001';
    const before = new Date();
    const clip = await Clip.createNewClip(localDatabase, clipId);
    const after = new Date();

    assert(clip !== null, 'Clip should not be null');
    assert(clip.clipId === clipId, `clipId should be "${clipId}", got "${clip.clipId}"`);
    assert(
        clip.recordingStatus === 'unprocessed',
        `Default recordingStatus should be "unprocessed", got "${clip.recordingStatus}"`
    );
    assert(
        clip.remoteSyncStatus === 'unsynced',
        `Default remoteSyncStatus should be "unsynced", got "${clip.remoteSyncStatus}"`
    );
    assert(
        clip.recordedAt >= before && clip.recordedAt <= after,
        'recordedAt should be within the test window'
    );
    assert(typeof clip.id === 'string' && clip.id.length > 0, 'WatermelonDB id should be a non-empty string');

    console.log(`    ✅ Created clip – WDB id: ${clip.id}, clipId: ${clip.clipId}`);
};

/**
 * TEST 2 – Create a clip with an explicit timestamp and verify it is stored.
 */
const testCreateClipWithExplicitTimestamp = async () => {
    console.log('  [TEST 2] Create a clip with an explicit timestamp');

    const clipId = 'clip-timestamp-002';
    const fixedDate = new Date('2024-06-15T10:30:00.000Z');
    const clip = await Clip.createNewClip(localDatabase, clipId, fixedDate);

    assert(clip.recordedAt.getTime() === fixedDate.getTime(),
        `recordedAt should match fixedDate. Expected ${fixedDate.getTime()}, got ${clip.recordedAt.getTime()}`
    );

    console.log(`    ✅ Timestamp persisted correctly: ${clip.recordedAt.toISOString()}`);
};

/**
 * TEST 3 – Read a clip back by its WatermelonDB id.
 */
const testReadClipById = async () => {
    console.log('  [TEST 3] Read a clip back by its WatermelonDB id');

    const clip = await Clip.createNewClip(localDatabase, 'clip-read-003');
    const fetched = await localDatabase.get<Clip>('clips').find(clip.id);

    assert(fetched !== null, 'Fetched clip should not be null');
    assert(fetched.id === clip.id, 'Fetched id should match the original');
    assert(fetched.clipId === 'clip-read-003', 'Fetched clipId should match');

    console.log(`    ✅ Clip retrieved by id: ${fetched.id}`);
};

/**
 * TEST 4 – Fetch all clips from the table.
 */
const testFetchAllClips = async () => {
    console.log('  [TEST 4] Fetch all clips from the table');

    await Clip.createNewClip(localDatabase, 'clip-all-a');
    await Clip.createNewClip(localDatabase, 'clip-all-b');
    await Clip.createNewClip(localDatabase, 'clip-all-c');

    const all = await localDatabase.get<Clip>('clips').query().fetch();
    // At least the 3 we just created are present (prior test clips may also exist)
    assert(all.length >= 3, `Expected at least 3 clips, got ${all.length}`);

    console.log(`    ✅ Fetched ${all.length} total clip(s) from the table`);
};

/**
 * TEST 5 – updateRecordingStatus: unprocessed → recorded.
 */
const testUpdateRecordingStatusToRecorded = async () => {
    console.log('  [TEST 5] updateRecordingStatus → "recorded"');

    const clip = await Clip.createNewClip(localDatabase, 'clip-status-rec-005');
    assert(clip.recordingStatus === 'unprocessed', 'Initial status should be unprocessed');

    await clip.updateRecordingStatus('recorded');
    assert(clip.recordingStatus === 'recorded', `Status should now be "recorded", got "${clip.recordingStatus}"`);

    // Verify persistence by re-fetching
    const refetched = await localDatabase.get<Clip>('clips').find(clip.id);
    assert(refetched.recordingStatus === 'recorded', 'Persisted status should be "recorded"');

    console.log(`    ✅ recordingStatus updated to "recorded" and persisted`);
};

/**
 * TEST 6 – updateRecordingStatus: unprocessed → dismissed.
 */
const testUpdateRecordingStatusToDismissed = async () => {
    console.log('  [TEST 6] updateRecordingStatus → "dismissed"');

    const clip = await Clip.createNewClip(localDatabase, 'clip-status-dis-006');
    await clip.updateRecordingStatus('dismissed');

    assert(clip.recordingStatus === 'dismissed', `Status should be "dismissed", got "${clip.recordingStatus}"`);

    const refetched = await localDatabase.get<Clip>('clips').find(clip.id);
    assert(refetched.recordingStatus === 'dismissed', 'Persisted status should be "dismissed"');

    console.log(`    ✅ recordingStatus updated to "dismissed" and persisted`);
};

/**
 * TEST 7 – markAsSynced: transitions remoteSyncStatus from unsynced → synced.
 */
const testMarkAsSynced = async () => {
    console.log('  [TEST 7] markAsSynced → "synced"');

    const clip = await Clip.createNewClip(localDatabase, 'clip-sync-007');
    assert(clip.remoteSyncStatus === 'unsynced', 'Initial remoteSyncStatus should be "unsynced"');

    await clip.markAsSynced();
    assert(clip.remoteSyncStatus === 'synced', `remoteSyncStatus should be "synced", got "${clip.remoteSyncStatus}"`);

    const refetched = await localDatabase.get<Clip>('clips').find(clip.id);
    assert(refetched.remoteSyncStatus === 'synced', 'Persisted remoteSyncStatus should be "synced"');

    console.log(`    ✅ remoteSyncStatus updated to "synced" and persisted`);
};

/**
 * TEST 8 – getSyncedOrDismissedClipIds returns only synced/dismissed clip ids
 *           and excludes unprocessed/recorded ones.
 */
const testGetSyncedOrDismissedClipIds = async () => {
    console.log('  [TEST 8] getSyncedOrDismissedClipIds');

    const unprocessed = await Clip.createNewClip(localDatabase, 'clip-query-unprocessed');
    const recorded = await Clip.createNewClip(localDatabase, 'clip-query-recorded');
    const dismissed = await Clip.createNewClip(localDatabase, 'clip-query-dismissed');
    const synced = await Clip.createNewClip(localDatabase, 'clip-query-synced');

    await recorded.updateRecordingStatus('recorded');
    await dismissed.updateRecordingStatus('dismissed');
    await synced.markAsSynced();

    const ids = await Clip.getSyncedOrDismissedClipIds(localDatabase);

    assert(ids.includes('clip-query-dismissed'), 'Dismissed clip should be in results');
    assert(ids.includes('clip-query-synced'), 'Synced clip should be in results');
    assert(!ids.includes('clip-query-unprocessed'), 'Unprocessed clip should NOT be in results');
    assert(!ids.includes('clip-query-recorded'), 'Recorded (but unsynced) clip should NOT be in results');

    console.log(`    ✅ getSyncedOrDismissedClipIds returned ${ids.length} id(s): [${ids.join(', ')}]`);
};

/**
 * TEST 9 – getNextUnprocessedClip returns the oldest unprocessed clip (FIFO order).
 */
const testGetNextUnprocessedClip = async () => {
    console.log('  [TEST 9] getNextUnprocessedClip – oldest-first ordering');

    const oldDate = new Date('2023-01-01T00:00:00.000Z');
    const newDate = new Date('2023-06-01T00:00:00.000Z');

    await Clip.createNewClip(localDatabase, 'clip-newer-unprocessed', newDate);
    await Clip.createNewClip(localDatabase, 'clip-older-unprocessed', oldDate);

    const next = await Clip.getNextUnprocessedClip(localDatabase);
    assert(next !== null, 'Should return an unprocessed clip');
    assert(
        next!.clipId === 'clip-older-unprocessed',
        `Expected oldest clip ("clip-older-unprocessed"), got "${next!.clipId}"`
    );

    console.log(`    ✅ Oldest unprocessed clip returned: ${next!.clipId}`);
};

/**
 * TEST 10 – getNextUnprocessedClip returns null when no unprocessed clips exist.
 */
const testGetNextUnprocessedClipWhenNone = async () => {
    console.log('  [TEST 10] getNextUnprocessedClip – returns null when empty');

    // Mark all current unprocessed as dismissed so none remain
    const all = await localDatabase.get<Clip>('clips').query().fetch();
    await Promise.all(
        all
            .filter((c) => c.recordingStatus === 'unprocessed')
            .map((c) => c.updateRecordingStatus('dismissed'))
    );

    const next = await Clip.getNextUnprocessedClip(localDatabase);
    assert(next === null, 'Should return null when there are no unprocessed clips');

    console.log(`    ✅ Correctly returned null`);
};

/**
 * TEST 11 – getOneUnsyncedClip returns any unsynced clip.
 */
const testGetOneUnsyncedClip = async () => {
    console.log('  [TEST 11] getOneUnsyncedClip – returns an unsynced clip');

    const clip = await Clip.createNewClip(localDatabase, 'clip-unsynced-011');
    const result = await Clip.getOneUnsyncedClip(localDatabase);

    assert(result !== null, 'Should return an unsynced clip');
    assert(result!.remoteSyncStatus === 'unsynced', 'Returned clip should be unsynced');

    console.log(`    ✅ Got unsynced clip: ${result!.clipId}`);
};

/**
 * TEST 12 – getOneUnsyncedClip returns null once all clips are synced.
 */
const testGetOneUnsyncedClipWhenNone = async () => {
    console.log('  [TEST 12] getOneUnsyncedClip – returns null when all synced');

    const all = await localDatabase.get<Clip>('clips').query().fetch();
    await Promise.all(
        all
            .filter((c) => c.remoteSyncStatus === 'unsynced')
            .map((c) => c.markAsSynced())
    );

    const result = await Clip.getOneUnsyncedClip(localDatabase);
    assert(result === null, 'Should return null when all clips are synced');

    console.log(`    ✅ Correctly returned null`);
};

/**
 * TEST 13 – getSyncedOrDismissedClipIds returns an empty array when no
 *           matching clips exist.
 */
const testGetSyncedOrDismissedClipIdsWhenEmpty = async () => {
    console.log('  [TEST 13] getSyncedOrDismissedClipIds – empty result');

    // All current clips are synced or dismissed from previous tests; purge and re-check
    await purgeAllClips();
    await Clip.createNewClip(localDatabase, 'clip-fresh-unprocessed');

    const ids = await Clip.getSyncedOrDismissedClipIds(localDatabase);
    assert(ids.length === 0, `Expected 0, got ${ids.length}`);

    console.log(`    ✅ Correctly returned empty array`);
};

/**
 * TEST 14 – Permanently delete a clip and confirm it no longer exists.
 */
const testPermanentlyDeleteClip = async () => {
    console.log('  [TEST 14] Permanently delete a clip');

    const clip = await Clip.createNewClip(localDatabase, 'clip-delete-014');
    const wdbId = clip.id;

    await localDatabase.write(async () => {
        await clip.destroyPermanently();
    });

    let thrown = false;
    try {
        await localDatabase.get<Clip>('clips').find(wdbId);
    } catch {
        thrown = true;
    }
    assert(thrown, 'Fetching a permanently deleted clip should throw');

    console.log(`    ✅ Clip permanently deleted – subsequent fetch threw as expected`);
};

/**
 * TEST 15 – Full lifecycle: create → mark as recorded → mark as synced →
 *           verify it appears in getSyncedOrDismissedClipIds → delete.
 */
const testFullClipLifecycle = async () => {
    console.log('  [TEST 15] Full clip lifecycle');

    const clip = await Clip.createNewClip(localDatabase, 'clip-lifecycle-015');

    // 1. Must be unprocessed and unsynced initially
    assert(clip.recordingStatus === 'unprocessed', 'Should start unprocessed');
    assert(clip.remoteSyncStatus === 'unsynced', 'Should start unsynced');

    // 2. Process the clip
    await clip.updateRecordingStatus('recorded');
    assert(clip.recordingStatus === 'recorded', 'Should be recorded after update');

    // 3. Sync the clip
    await clip.markAsSynced();
    assert(clip.remoteSyncStatus === 'synced', 'Should be synced after markAsSynced');

    // 4. Should now appear in the synced/dismissed query
    const ids = await Clip.getSyncedOrDismissedClipIds(localDatabase);
    assert(ids.includes('clip-lifecycle-015'), 'Synced clip should appear in getSyncedOrDismissedClipIds');

    // 5. Clean up
    await localDatabase.write(async () => {
        await clip.destroyPermanently();
    });

    console.log(`    ✅ Full lifecycle completed successfully`);
};

/**
 * TEST 16 – Create multiple clips, verify count, then bulk-delete them.
 */
const testBulkCreateAndBulkDelete = async () => {
    console.log('  [TEST 16] Bulk create and bulk delete');

    const ids = ['bulk-a', 'bulk-b', 'bulk-c', 'bulk-d', 'bulk-e'];
    await Promise.all(ids.map((id) => Clip.createNewClip(localDatabase, id)));

    const all = await localDatabase.get<Clip>('clips').query().fetch();
    const bulkClips = all.filter((c) => ids.includes(c.clipId));
    assert(bulkClips.length === ids.length, `Expected ${ids.length} bulk clips, found ${bulkClips.length}`);

    await localDatabase.write(async () => {
        await Promise.all(bulkClips.map((c) => c.destroyPermanently()));
    });

    const remaining = await localDatabase.get<Clip>('clips').query().fetch();
    const stillThere = remaining.filter((c) => ids.includes(c.clipId));
    assert(stillThere.length === 0, 'All bulk-deleted clips should be gone');

    console.log(`    ✅ Bulk created ${ids.length} clips and deleted them all`);
};

/**
 * TEST 17 – Status transition: dismissed → then markAsSynced (a dismissed clip
 *           can still be synced to the remote so the server knows it is dismissed).
 */
const testDismissedClipCanBeMarkedSynced = async () => {
    console.log('  [TEST 17] Dismissed clip can also be marked as synced');

    const clip = await Clip.createNewClip(localDatabase, 'clip-dismissed-then-synced-017');
    await clip.updateRecordingStatus('dismissed');
    await clip.markAsSynced();

    assert(clip.recordingStatus === 'dismissed', 'recording_status should remain "dismissed"');
    assert(clip.remoteSyncStatus === 'synced', 'remote_sync_status should now be "synced"');

    const ids = await Clip.getSyncedOrDismissedClipIds(localDatabase);
    assert(ids.includes('clip-dismissed-then-synced-017'), 'Clip should appear in synced/dismissed results');

    console.log(`    ✅ Dismissed clip marked as synced correctly`);
};

// ─────────────────────────────────────────────────────────────────────────────
// Test Runner
// ─────────────────────────────────────────────────────────────────────────────

export const runClipsDatabaseTests = async () => {
    console.log('═══════════════════════════════════════════════════════');
    console.log('  🎬  WatermelonDB – Clips Table Comprehensive Tests   ');
    console.log('═══════════════════════════════════════════════════════');

    let passed = 0;
    let failed = 0;

    const tests: Array<{ name: string; fn: () => Promise<void> }> = [
        { name: 'Create clip with default values',                  fn: testCreateClip },
        { name: 'Create clip with explicit timestamp',              fn: testCreateClipWithExplicitTimestamp },
        { name: 'Read clip back by WatermelonDB id',                fn: testReadClipById },
        { name: 'Fetch all clips',                                  fn: testFetchAllClips },
        { name: 'updateRecordingStatus → recorded',                 fn: testUpdateRecordingStatusToRecorded },
        { name: 'updateRecordingStatus → dismissed',                fn: testUpdateRecordingStatusToDismissed },
        { name: 'markAsSynced',                                     fn: testMarkAsSynced },
        { name: 'getSyncedOrDismissedClipIds – correct filtering',  fn: testGetSyncedOrDismissedClipIds },
        { name: 'getNextUnprocessedClip – oldest-first',            fn: testGetNextUnprocessedClip },
        { name: 'getNextUnprocessedClip – returns null when empty', fn: testGetNextUnprocessedClipWhenNone },
        { name: 'getOneUnsyncedClip – returns a clip',              fn: testGetOneUnsyncedClip },
        { name: 'getOneUnsyncedClip – returns null when all synced',fn: testGetOneUnsyncedClipWhenNone },
        { name: 'getSyncedOrDismissedClipIds – empty result',       fn: testGetSyncedOrDismissedClipIdsWhenEmpty },
        { name: 'Permanently delete a clip',                        fn: testPermanentlyDeleteClip },
        { name: 'Full clip lifecycle',                              fn: testFullClipLifecycle },
        { name: 'Bulk create and bulk delete',                      fn: testBulkCreateAndBulkDelete },
        { name: 'Dismissed clip can be marked synced',              fn: testDismissedClipCanBeMarkedSynced },
    ];

    // Each test runs with a clean slate to avoid cross-test state pollution
    for (const { name, fn } of tests) {
        try {
            await purgeAllClips();
            await fn();
            passed++;
        } catch (error) {
            failed++;
            console.error(`  ❌ FAILED: "${name}"`);
            console.error('    ', error);
        }
    }

    console.log('═══════════════════════════════════════════════════════');
    console.log(`  Results: ${passed} passed, ${failed} failed out of ${tests.length} tests`);
    if (failed === 0) {
        console.log('  🎉 All Clips database tests passed!');
    } else {
        console.log('  ⚠️  Some tests failed – see errors above.');
    }
    console.log('═══════════════════════════════════════════════════════');
};
