import { AVPlaybackStatus, ResizeMode, Video } from 'expo-av';
import { Directory, File, Paths } from 'expo-file-system';
import React, { useEffect, useRef, useState } from 'react';
import { Alert, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

type MediaType = 'text' | 'image' | 'video' | 'binary';

interface SelectedFile {
    name: string;
    uri: string;
    mediaType: MediaType;
    textContent?: string;
}

const IMAGE_EXTENSIONS = new Set(['jpg', 'jpeg', 'png', 'gif', 'webp', 'svg', 'bmp', 'heic', 'heif']);
const VIDEO_EXTENSIONS = new Set(['mp4', 'mov', 'avi', 'mkv', 'webm', 'm4v', '3gp']);

function getMediaType(filename: string): MediaType {
    const ext = filename.split('.').pop()?.toLowerCase() ?? '';
    if (IMAGE_EXTENSIONS.has(ext)) return 'image';
    if (VIDEO_EXTENSIONS.has(ext)) return 'video';
    return 'text';
}

function getExtension(filename: string): string {
    return filename.split('.').pop()?.toUpperCase() ?? 'FILE';
}

export default function CacheInspector() {
    const [currentDir, setCurrentDir] = useState<Directory | null>(null);
    const [items, setItems] = useState<(File | Directory)[]>([]);
    const [selectedFile, setSelectedFile] = useState<SelectedFile | null>(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const videoRef = useRef<Video>(null);

    useEffect(() => {
        try {
            const cacheDir = new Directory(Paths.cache);
            if (!cacheDir.exists) cacheDir.create();
            setCurrentDir(cacheDir);
            loadDirectory(cacheDir);
        } catch (error) {
            console.error('Failed to initialize cache directory:', error);
        }
    }, []);

    const loadDirectory = (dir: Directory) => {
        setSelectedFile(null);
        setIsPlaying(false);
        try {
            if (dir.exists) {
                setItems(dir.list());
            } else {
                setItems([]);
            }
            setCurrentDir(dir);
        } catch (error) {
            console.error('Error reading directory:', error);
        }
    };

    const handleItemPress = (item: File | Directory) => {
        if (item instanceof Directory) {
            loadDirectory(item);
            return;
        }

        const mediaType = getMediaType(item.name);

        if (mediaType === 'image' || mediaType === 'video') {
            setSelectedFile({ name: item.name, uri: item.uri, mediaType });
            return;
        }

        // Try to read as text
        try {
            const content = item.textSync();
            setSelectedFile({ name: item.name, uri: item.uri, mediaType: 'text', textContent: content });
        } catch {
            setSelectedFile({ name: item.name, uri: item.uri, mediaType: 'binary', textContent: '[Binary or unreadable file content]' });
        }
    };

    const navigateUp = () => {
        if (!currentDir) return;
        const cacheRoot = new Directory(Paths.cache);
        if (currentDir.uri === cacheRoot.uri) return;
        try {
            const parent = currentDir.parentDirectory;
            if (parent) loadDirectory(parent);
        } catch (err) {
            console.error('Error navigating up:', err);
        }
    };

    const clearCache = () => {
        Alert.alert(
            'Clear Cache',
            'Are you sure you want to delete everything inside the cache directory?',
            [
                { text: 'Cancel', style: 'cancel' },
                {
                    text: 'Clear All',
                    style: 'destructive',
                    onPress: () => {
                        try {
                            const cacheDir = new Directory(Paths.cache);
                            if (cacheDir.exists) {
                                for (const item of cacheDir.list()) item.delete();
                                loadDirectory(cacheDir);
                            }
                        } catch (error) {
                            console.error('Failed to clear cache directory:', error);
                        }
                    },
                },
            ]
        );
    };

    const togglePlayback = async () => {
        if (!videoRef.current) return;
        if (isPlaying) {
            await videoRef.current.pauseAsync();
        } else {
            await videoRef.current.playAsync();
        }
        setIsPlaying(!isPlaying);
    };

    const handlePlaybackStatusUpdate = (status: AVPlaybackStatus) => {
        if (status.isLoaded) {
            setIsPlaying(status.isPlaying);
            // Reset when video ends
            if (status.didJustFinish) setIsPlaying(false);
        }
    };

    const formatSize = (bytes: number | null) => {
        if (bytes === null || bytes === undefined) return '';
        if (bytes < 1024) return `${bytes} B`;
        if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
        return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
    };

    const getItemIcon = (item: File | Directory) => {
        if (item instanceof Directory) return '📁';
        const mt = getMediaType(item.name);
        if (mt === 'image') return '🖼️';
        if (mt === 'video') return '🎬';
        return '📄';
    };

    const renderViewer = () => {
        if (!selectedFile) return null;

        return (
            <View style={styles.viewerContainer}>
                <View style={styles.viewerHeader}>
                    <View style={styles.viewerTitleRow}>
                        <View style={styles.badge}>
                            <Text style={styles.badgeText}>{getExtension(selectedFile.name)}</Text>
                        </View>
                        <Text style={styles.viewerTitle} numberOfLines={1}>{selectedFile.name}</Text>
                    </View>
                    <TouchableOpacity onPress={() => { setSelectedFile(null); setIsPlaying(false); }}>
                        <Text style={styles.closeText}>✕</Text>
                    </TouchableOpacity>
                </View>

                {selectedFile.mediaType === 'image' && (
                    <ScrollView
                        style={styles.imageScrollContainer}
                        contentContainerStyle={styles.imageScrollContent}
                        maximumZoomScale={4}
                        minimumZoomScale={1}
                        bouncesZoom
                    >
                        <Image
                            source={{ uri: selectedFile.uri }}
                            style={styles.previewImage}
                            resizeMode="contain"
                        />
                    </ScrollView>
                )}

                {selectedFile.mediaType === 'video' && (
                    <View style={styles.videoContainer}>
                        <Video
                            ref={videoRef}
                            source={{ uri: selectedFile.uri }}
                            style={styles.videoPlayer}
                            resizeMode={ResizeMode.CONTAIN}
                            isLooping={false}
                            onPlaybackStatusUpdate={handlePlaybackStatusUpdate}
                            useNativeControls
                        />
                        <TouchableOpacity style={styles.playPauseBtn} onPress={togglePlayback}>
                            <Text style={styles.playPauseBtnText}>{isPlaying ? '⏸ Pause' : '▶ Play'}</Text>
                        </TouchableOpacity>
                    </View>
                )}

                {(selectedFile.mediaType === 'text' || selectedFile.mediaType === 'binary') && (
                    <ScrollView style={styles.viewerScroll}>
                        <Text style={styles.viewerText}>{selectedFile.textContent}</Text>
                    </ScrollView>
                )}
            </View>
        );
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <View>
                    <Text style={styles.title}>Cache Inspector</Text>
                    <Text style={styles.subtitle} numberOfLines={1} ellipsizeMode="head">
                        {currentDir ? currentDir.name : 'Loading...'}
                    </Text>
                </View>
                <View style={styles.headerButtons}>
                    <TouchableOpacity
                        onPress={() => currentDir && loadDirectory(currentDir)}
                        style={styles.btn}
                    >
                        <Text style={styles.btnText}>Refresh</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={clearCache} style={[styles.btn, styles.dangerBtn]}>
                        <Text style={styles.btnText}>Clear</Text>
                    </TouchableOpacity>
                </View>
            </View>

            {currentDir && currentDir.uri !== new Directory(Paths.cache).uri && (
                <TouchableOpacity onPress={navigateUp} style={styles.backRow}>
                    <Text style={styles.backText}>⬅ .. (Go up a directory)</Text>
                </TouchableOpacity>
            )}

            <ScrollView style={styles.listContainer}>
                {items.length === 0 && (
                    <Text style={styles.emptyText}>No files found in this directory</Text>
                )}
                {items.map((item) => (
                    <TouchableOpacity
                        key={item.uri}
                        style={styles.itemRow}
                        onPress={() => handleItemPress(item)}
                    >
                        <View style={styles.itemMeta}>
                            <Text
                                style={item instanceof Directory ? styles.dirText : styles.fileText}
                                numberOfLines={1}
                            >
                                {getItemIcon(item)} {item.name}
                            </Text>
                            {item.size !== null && (
                                <Text style={styles.sizeText}>{formatSize(item.size)}</Text>
                            )}
                        </View>
                    </TouchableOpacity>
                ))}
            </ScrollView>

            {renderViewer()}
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
        marginBottom: 12,
    },
    title: {
        color: '#ffffff',
        fontSize: 20,
        fontWeight: 'bold',
    },
    subtitle: {
        color: '#777777',
        fontSize: 11,
        maxWidth: 180,
    },
    headerButtons: {
        flexDirection: 'row',
        gap: 8,
    },
    btn: {
        backgroundColor: '#333333',
        paddingHorizontal: 12,
        paddingVertical: 8,
        borderRadius: 6,
    },
    dangerBtn: {
        backgroundColor: '#5a1818',
    },
    btnText: {
        color: '#ffffff',
        fontSize: 13,
    },
    backRow: {
        backgroundColor: '#222222',
        padding: 10,
        borderRadius: 6,
        marginBottom: 8,
    },
    backText: {
        color: '#aaaaaa',
        fontSize: 13,
    },
    listContainer: {
        flex: 1,
        backgroundColor: '#1a1a1a',
        borderRadius: 8,
        paddingHorizontal: 8,
    },
    itemRow: {
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#2a2a2a',
        paddingHorizontal: 4,
    },
    itemMeta: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: 8,
    },
    dirText: {
        color: '#f1c40f',
        fontSize: 14,
        fontWeight: '600',
        flexShrink: 1,
    },
    fileText: {
        color: '#e0e0e0',
        fontSize: 14,
        flexShrink: 1,
    },
    sizeText: {
        color: '#666666',
        fontSize: 12,
        flexShrink: 0,
    },
    emptyText: {
        color: '#555555',
        textAlign: 'center',
        marginTop: 40,
        fontSize: 14,
    },

    // ── Viewer shell ──────────────────────────────────────────────────────────
    viewerContainer: {
        height: '45%',
        backgroundColor: '#1e1e1e',
        borderTopWidth: 2,
        borderTopColor: '#333333',
        marginTop: 12,
        borderRadius: 8,
        padding: 12,
    },
    viewerHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#2a2a2a',
        paddingBottom: 8,
        marginBottom: 8,
    },
    viewerTitleRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
        flex: 1,
        marginRight: 8,
    },
    badge: {
        backgroundColor: '#2e2e2e',
        borderRadius: 4,
        paddingHorizontal: 6,
        paddingVertical: 2,
        borderWidth: 1,
        borderColor: '#444444',
    },
    badgeText: {
        color: '#aaaaaa',
        fontSize: 10,
        fontWeight: '700',
        letterSpacing: 0.5,
    },
    viewerTitle: {
        color: '#ffffff',
        fontSize: 13,
        fontWeight: 'bold',
        flex: 1,
    },
    closeText: {
        color: '#ff4a4a',
        fontSize: 16,
        paddingHorizontal: 4,
    },

    // ── Text viewer ──────────────────────────────────────────────────────────
    viewerScroll: {
        flex: 1,
    },
    viewerText: {
        color: '#cccccc',
        fontFamily: 'monospace',
        fontSize: 12,
    },

    // ── Image viewer ─────────────────────────────────────────────────────────
    imageScrollContainer: {
        flex: 1,
    },
    imageScrollContent: {
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    previewImage: {
        width: '100%',
        height: 220,
    },

    // ── Video viewer ─────────────────────────────────────────────────────────
    videoContainer: {
        flex: 1,
        alignItems: 'center',
        gap: 10,
    },
    videoPlayer: {
        width: '100%',
        height: 180,
        backgroundColor: '#000000',
        borderRadius: 6,
    },
    playPauseBtn: {
        backgroundColor: '#2e2e2e',
        paddingHorizontal: 20,
        paddingVertical: 8,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: '#444444',
    },
    playPauseBtnText: {
        color: '#ffffff',
        fontSize: 13,
        fontWeight: '600',
    },
});