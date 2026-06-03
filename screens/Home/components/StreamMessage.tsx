import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export const StreamMessage = ({ content }: { content: string }) => (
    <View style={styles.bubble}>
        <Text style={styles.text}>{content}</Text>
    </View>
);

const styles = StyleSheet.create({
    bubble: {
        padding: 12,
        backgroundColor: '#333',
        borderRadius: 16,
        margin: 8,
        alignSelf: 'flex-start',
    },
    text: { color: '#fff' }
});