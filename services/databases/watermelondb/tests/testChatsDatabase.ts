import { EvidenceType } from '@/shared/types/evidence';
import { localDatabase } from '../database';
import Chat from '../models/Chat';

export const runChatsDatabaseTests = async () => {
    try {
        console.log('Starting WatermelonDB Tests');

        console.log('Creating a new Chat');
        const newChat = await localDatabase.write(async () => {
            return await localDatabase.get<Chat>('chats').create((chat) => {
                chat.title = 'Test Chat Conversation';
            });
        });
        console.log(`Chat Created - ID: ${newChat.id}, Title: ${newChat.title}`);

        console.log('Adding Messages to the Chat');
        // createLocalMessage is a @writer, it handles its own database.write block
        await newChat.createLocalMessage(true, 'Test message 1');

        const testEvidence: EvidenceType = {
            vide_url: 'http://example.com/video.mp4',
            title: 'Evidence 1',
            summary: 'Testing evidence summary',
            timestamp: new Date(),
            location: 'Test Location'
        };

        await newChat.createLocalMessage(false, 'Test message 2', testEvidence);
        console.log('Messages added successfully');

        console.log('Fetching Data Back');
        const fetchedMessages = await newChat.messages.fetch();
        console.log(`Fetched ${fetchedMessages.length} messages for Chat ${newChat.id}`);
        fetchedMessages.forEach((msg, index) => {
            console.log(`   Message ${index + 1}: ${msg.role} | "${msg.content}" | (Created: ${msg.createdAt})`);
        });

        console.log('Testing Deletion');
        // markAsDeletedLocally is a @writer that also deletes child messages
        await newChat.markAsDeletedLocally();
        console.log(`Chat marked as deleted and child messages permanently destroyed`);

        console.log('All Database Tests Passed');
    } catch (error) {
        console.error('Database Test Failed:', error);
    }
};
