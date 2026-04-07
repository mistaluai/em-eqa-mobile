import { database } from '../database';
import Chat from '../models/Chat';

export const runChatsDatabaseTests = async () => {
    try {
        console.log('Starting WatermelonDB Tests');

        console.log('Creating a new Chat');
        const newChat = await database.write(async () => {
            return await database.get<Chat>('chats').create((chat) => {
                chat.title = 'Test Chat Conversation';
            });
        });
        console.log(`Chat Created - ID: ${newChat.id}, Title: ${newChat.title}`);

        console.log('Adding Messages to the Chat');
        await newChat.addMessage(true, 'Test message 1');
        await newChat.addMessage(false, 'Test message 2', '["evidence 1", "evidence 2"]');
        console.log('Messages added successfully');

        console.log('Fetching Data Back');
        const fetchedMessages = await newChat.messages.fetch();
        console.log(`Fetched ${fetchedMessages.length} messages for Chat ${newChat.id}`);
        fetchedMessages.forEach((msg, index) => {
            console.log(`   Message ${index + 1}: ${msg.role} | "${msg.content}" | (Created: ${msg.createdAt})`);
        });

        console.log('Testing Deletion');
        await newChat.markAsDeleted();
        console.log(`Chat marked as deleted and child messages permanently destroyed`);

        console.log('All Database Tests Passed');
    } catch (error) {
        console.error('Database Test Failed:', error);
    }
};
