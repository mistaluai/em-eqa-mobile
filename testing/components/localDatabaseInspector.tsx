import { localDatabase } from '@/services/databases/watermelondb/database';
import React, { useEffect, useState } from 'react';
import {
    Alert,
    Modal,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';

const TABLES = ['chats', 'messages', 'clips'] as const;
type TableName = typeof TABLES[number];

type ModalMode = 'edit' | null;

export default function DatabaseInspector() {
    const [activeTable, setActiveTable] = useState<TableName>('chats');
    const [records, setRecords] = useState<any[]>([]);
    const [isRefreshing, setIsRefreshing] = useState(false);
    const [selectedRecord, setSelectedRecord] = useState<any | null>(null);
    const [modalMode, setModalMode] = useState<ModalMode>(null);
    const [editJson, setEditJson] = useState('');
    const [editError, setEditError] = useState('');
    const [expandedRecords, setExpandedRecords] = useState<Set<string>>(new Set());

    const fetchRecords = async (tableName: TableName) => {
        setIsRefreshing(true);
        try {
            const collection = localDatabase.get(tableName);
            const fetchedRecords = await collection.query().fetch();
            setRecords(fetchedRecords.map(record => record._raw));
        } catch (error) {
            console.error(`Error fetching from ${tableName}:`, error);
            setRecords([{ error: String(error) }]);
        } finally {
            setIsRefreshing(false);
        }
    };

    useEffect(() => {
        fetchRecords(activeTable);
        setExpandedRecords(new Set());
    }, [activeTable]);

    // ── Delete a single record ──────────────────────────────────────────────
    const handleDelete = (record: any) => {
        Alert.alert(
            'Delete Record',
            `Delete record "${record.id}"?`,
            [
                { text: 'Cancel', style: 'cancel' },
                {
                    text: 'Delete',
                    style: 'destructive',
                    onPress: async () => {
                        try {
                            await localDatabase.write(async () => {
                                const collection = localDatabase.get(activeTable);
                                const model = await collection.find(record.id);
                                await model.destroyPermanently();
                            });
                            await fetchRecords(activeTable);
                        } catch (error) {
                            Alert.alert('Error', `Failed to delete record: ${String(error)}`);
                        }
                    },
                },
            ]
        );
    };

    // ── Clear all records in the active table ───────────────────────────────
    const handleClearTable = () => {
        Alert.alert(
            'Clear Table',
            `Delete ALL ${records.length} records from "${activeTable}"? This cannot be undone.`,
            [
                { text: 'Cancel', style: 'cancel' },
                {
                    text: 'Clear All',
                    style: 'destructive',
                    onPress: async () => {
                        try {
                            await localDatabase.write(async () => {
                                const collection = localDatabase.get(activeTable);
                                const allRecords = await collection.query().fetch();
                                await Promise.all(allRecords.map(r => r.destroyPermanently()));
                            });
                            await fetchRecords(activeTable);
                        } catch (error) {
                            Alert.alert('Error', `Failed to clear table: ${String(error)}`);
                        }
                    },
                },
            ]
        );
    };

    // ── Open edit modal ─────────────────────────────────────────────────────
    const handleEdit = (record: any) => {
        setSelectedRecord(record);
        setEditJson(JSON.stringify(record, null, 2));
        setEditError('');
        setModalMode('edit');
    };

    // ── Save edited record ──────────────────────────────────────────────────
    const handleSaveEdit = async () => {
        let parsed: any;
        try {
            parsed = JSON.parse(editJson);
        } catch {
            setEditError('Invalid JSON — please fix before saving.');
            return;
        }

        // Protect immutable WatermelonDB internals
        const PROTECTED = ['id', '_status', '_changed'];
        const fieldsToUpdate = Object.keys(parsed).filter(k => !PROTECTED.includes(k));

        try {
            await localDatabase.write(async () => {
                const collection = localDatabase.get(activeTable);
                const model = await collection.find(selectedRecord.id);
                await model.update((m: any) => {
                    fieldsToUpdate.forEach(field => {
                        if (field in m) {
                            m[field] = parsed[field];
                        }
                    });
                });
            });
            setModalMode(null);
            setSelectedRecord(null);
            await fetchRecords(activeTable);
        } catch (error) {
            setEditError(`Save failed: ${String(error)}`);
        }
    };

    const toggleExpand = (id: string) => {
        setExpandedRecords(prev => {
            const next = new Set(prev);
            next.has(id) ? next.delete(id) : next.add(id);
            return next;
        });
    };

    // ── Render a single record row ──────────────────────────────────────────
    const renderRecord = (record: any, index: number) => {
        const id = record.id ?? `row-${index}`;
        const isExpanded = expandedRecords.has(id);

        // Build a short preview from the most human-readable fields
        const previewFields = ['title', 'name', 'content', 'text', 'body'];
        const previewValue = previewFields
            .map(f => record[f])
            .find(v => v != null && String(v).trim() !== '');
        const preview = previewValue
            ? String(previewValue).slice(0, 60) + (String(previewValue).length > 60 ? '…' : '')
            : null;

        return (
            <View key={id} style={styles.recordCard}>
                {/* Header row */}
                <TouchableOpacity style={styles.recordHeader} onPress={() => toggleExpand(id)}>
                    <View style={styles.recordHeaderLeft}>
                        <Text style={styles.recordId} numberOfLines={1}>
                            {id}
                        </Text>
                        {preview && !isExpanded && (
                            <Text style={styles.recordPreview} numberOfLines={1}>
                                {preview}
                            </Text>
                        )}
                    </View>
                    <Text style={styles.expandArrow}>{isExpanded ? '▲' : '▼'}</Text>
                </TouchableOpacity>

                {/* Expanded JSON */}
                {isExpanded && (
                    <View style={styles.recordBody}>
                        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                            <Text style={styles.dataText}>{JSON.stringify(record, null, 2)}</Text>
                        </ScrollView>

                        {/* Action buttons */}
                        <View style={styles.recordActions}>
                            <TouchableOpacity
                                style={[styles.actionBtn, styles.editBtn]}
                                onPress={() => handleEdit(record)}
                            >
                                <Text style={styles.actionBtnText}>✏️  Edit</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={[styles.actionBtn, styles.deleteBtn]}
                                onPress={() => handleDelete(record)}
                            >
                                <Text style={styles.actionBtnText}>🗑  Delete</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                )}
            </View>
        );
    };

    return (
        <View style={styles.container}>
            {/* ── Header ── */}
            <View style={styles.header}>
                <Text style={styles.title}>DB Inspector</Text>
                <View style={styles.headerActions}>
                    <TouchableOpacity
                        onPress={handleClearTable}
                        style={[styles.headerBtn, styles.clearBtn]}
                        disabled={records.length === 0}
                    >
                        <Text style={styles.btnText}>Clear</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => fetchRecords(activeTable)}
                        style={styles.headerBtn}
                    >
                        <Text style={styles.btnText}>{isRefreshing ? '…' : 'Refresh'}</Text>
                    </TouchableOpacity>
                </View>
            </View>

            {/* ── Table tabs ── */}
            <View style={styles.tabs}>
                {TABLES.map(table => (
                    <TouchableOpacity
                        key={table}
                        style={[styles.tab, activeTable === table && styles.activeTab]}
                        onPress={() => setActiveTable(table)}
                    >
                        <Text style={[styles.tabText, activeTable === table && styles.activeTabText]}>
                            {table}
                        </Text>
                    </TouchableOpacity>
                ))}
            </View>

            {/* ── Record count ── */}
            <Text style={styles.countLabel}>
                {isRefreshing ? 'Loading…' : `${records.length} record${records.length !== 1 ? 's' : ''}`}
            </Text>

            {/* ── Records list ── */}
            <ScrollView style={styles.dataContainer} keyboardShouldPersistTaps="handled">
                {records.length === 0 && !isRefreshing ? (
                    <Text style={styles.emptyText}>No records in {activeTable}</Text>
                ) : (
                    records.map((record, i) => renderRecord(record, i))
                )}
            </ScrollView>

            {/* ── Edit Modal ── */}
            <Modal
                visible={modalMode === 'edit'}
                animationType="slide"
                transparent
                onRequestClose={() => setModalMode(null)}
            >
                <View style={styles.modalOverlay}>
                    <View style={styles.modalCard}>
                        <Text style={styles.modalTitle}>Edit Record</Text>
                        <Text style={styles.modalSubtitle}>{selectedRecord?.id}</Text>
                        {editError !== '' && <Text style={styles.errorText}>{editError}</Text>}
                        <Text style={styles.modalHint}>
                            Note: <Text style={styles.bold}>id</Text>,{' '}
                            <Text style={styles.bold}>_status</Text>, and{' '}
                            <Text style={styles.bold}>_changed</Text> are read-only and will not be updated.
                        </Text>
                        <ScrollView style={styles.editScrollArea} keyboardShouldPersistTaps="handled">
                            <TextInput
                                style={styles.jsonInput}
                                multiline
                                value={editJson}
                                onChangeText={text => {
                                    setEditJson(text);
                                    setEditError('');
                                }}
                                autoCapitalize="none"
                                autoCorrect={false}
                                spellCheck={false}
                            />
                        </ScrollView>
                        <View style={styles.modalActions}>
                            <TouchableOpacity
                                style={[styles.modalBtn, styles.cancelModalBtn]}
                                onPress={() => setModalMode(null)}
                            >
                                <Text style={styles.modalBtnText}>Cancel</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={[styles.modalBtn, styles.saveModalBtn]}
                                onPress={handleSaveEdit}
                            >
                                <Text style={styles.modalBtnText}>Save</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#121212',
        paddingTop: 50,
        paddingHorizontal: 16,
        paddingBottom: 20,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 16,
    },
    title: {
        color: '#ffffff',
        fontSize: 20,
        fontWeight: 'bold',
    },
    headerActions: {
        flexDirection: 'row',
        gap: 8,
    },
    headerBtn: {
        backgroundColor: '#333333',
        paddingHorizontal: 14,
        paddingVertical: 8,
        borderRadius: 6,
    },
    clearBtn: {
        backgroundColor: '#4a1a1a',
    },
    btnText: {
        color: '#ffffff',
        fontSize: 14,
    },
    tabs: {
        flexDirection: 'row',
        marginBottom: 10,
        gap: 8,
    },
    tab: {
        flex: 1,
        paddingVertical: 10,
        backgroundColor: '#2a2a2a',
        borderRadius: 6,
        alignItems: 'center',
    },
    activeTab: {
        backgroundColor: '#555555',
    },
    tabText: {
        color: '#999999',
        fontSize: 14,
        fontWeight: '600',
    },
    activeTabText: {
        color: '#ffffff',
    },
    countLabel: {
        color: '#666666',
        fontSize: 12,
        marginBottom: 8,
    },
    dataContainer: {
        flex: 1,
    },
    emptyText: {
        color: '#555555',
        fontStyle: 'italic',
        textAlign: 'center',
        marginTop: 40,
        fontSize: 14,
    },
    // Record card
    recordCard: {
        backgroundColor: '#1e1e1e',
        borderRadius: 8,
        marginBottom: 8,
        overflow: 'hidden',
        borderWidth: 1,
        borderColor: '#2a2a2a',
    },
    recordHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 12,
        paddingVertical: 10,
    },
    recordHeaderLeft: {
        flex: 1,
        marginRight: 8,
    },
    recordId: {
        color: '#7eb8f7',
        fontFamily: 'monospace',
        fontSize: 12,
        fontWeight: '600',
    },
    recordPreview: {
        color: '#777777',
        fontSize: 11,
        marginTop: 2,
    },
    expandArrow: {
        color: '#666666',
        fontSize: 10,
    },
    recordBody: {
        borderTopWidth: 1,
        borderTopColor: '#2a2a2a',
        padding: 12,
    },
    dataText: {
        color: '#e0e0e0',
        fontFamily: 'monospace',
        fontSize: 12,
    },
    recordActions: {
        flexDirection: 'row',
        gap: 8,
        marginTop: 12,
    },
    actionBtn: {
        flex: 1,
        paddingVertical: 8,
        borderRadius: 6,
        alignItems: 'center',
    },
    editBtn: {
        backgroundColor: '#2a3a4a',
    },
    deleteBtn: {
        backgroundColor: '#3a1a1a',
    },
    actionBtnText: {
        color: '#ffffff',
        fontSize: 13,
        fontWeight: '600',
    },
    // Modal
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.75)',
        justifyContent: 'flex-end',
    },
    modalCard: {
        backgroundColor: '#1a1a1a',
        borderTopLeftRadius: 16,
        borderTopRightRadius: 16,
        padding: 20,
        maxHeight: '85%',
    },
    modalTitle: {
        color: '#ffffff',
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 4,
    },
    modalSubtitle: {
        color: '#7eb8f7',
        fontFamily: 'monospace',
        fontSize: 12,
        marginBottom: 10,
    },
    modalHint: {
        color: '#888888',
        fontSize: 12,
        marginBottom: 10,
        lineHeight: 18,
    },
    bold: {
        fontWeight: 'bold',
        color: '#aaaaaa',
    },
    errorText: {
        color: '#ff6b6b',
        fontSize: 13,
        marginBottom: 8,
        backgroundColor: '#2a1010',
        padding: 8,
        borderRadius: 6,
    },
    editScrollArea: {
        maxHeight: 320,
        backgroundColor: '#111111',
        borderRadius: 8,
        padding: 8,
        marginBottom: 16,
    },
    jsonInput: {
        color: '#e0e0e0',
        fontFamily: 'monospace',
        fontSize: 12,
        lineHeight: 18,
        textAlignVertical: 'top',
        minHeight: 200,
    },
    modalActions: {
        flexDirection: 'row',
        gap: 10,
    },
    modalBtn: {
        flex: 1,
        paddingVertical: 12,
        borderRadius: 8,
        alignItems: 'center',
    },
    cancelModalBtn: {
        backgroundColor: '#333333',
    },
    saveModalBtn: {
        backgroundColor: '#1a5a2a',
    },
    modalBtnText: {
        color: '#ffffff',
        fontSize: 15,
        fontWeight: '600',
    },
});