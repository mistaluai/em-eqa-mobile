import React from 'react';
import { StyleSheet, View } from 'react-native';
import Markdown from 'react-native-markdown-display';

export const StreamMessage = ({ content }: { content: string }) => (
    <View style={styles.bubble}>
        <Markdown style={markdownStyles}>
            {content}
        </Markdown>
    </View>
);

const styles = StyleSheet.create({
    bubble: {
        padding: 12,
        backgroundColor: '#333',
        borderRadius: 16,
        margin: 8,
        alignSelf: 'flex-start',
        // Important: Markdown needs a defined width to wrap text correctly
        maxWidth: '90%',
    },
});

// Configure markdown styling to match your dark theme
const markdownStyles = StyleSheet.create({
    text: {
        color: '#fff',
        fontSize: 16,
    },
    code_inline: {
        backgroundColor: '#444',
        borderRadius: 4,
        padding: 2,
    },
    code_block: {
        backgroundColor: '#111',
        borderRadius: 8,
        padding: 10,
    },
    heading1: { color: '#fff', fontSize: 24, fontWeight: 'bold' },
    heading2: { color: '#fff', fontSize: 20, fontWeight: 'bold' },
    link: { color: '#66b3ff' },
});