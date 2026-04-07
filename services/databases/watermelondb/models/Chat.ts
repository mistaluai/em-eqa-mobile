import { Model, Query } from "@nozbe/watermelondb";
import { children, date, readonly, text, writer } from "@nozbe/watermelondb/decorators";
import Message from "./Message";

export default class Chat extends Model {
    static table = 'chats';
    static associations = {
        messages: { type: 'has_many', foreignKey: 'chat_id' },
    } as const;

    @text('title') title!: string;
    @readonly @date('updated_at') updatedAt!: Date;
    @children('messages') messages!: Query<Message>;

    @writer async addMessage(isUser: boolean, content: string, evidence?: string) {
        const status = 'pending';
        await this.collections.get<Message>('messages').create((message: Message) => {
            message.chat.set(this);
            message.role = isUser ? 'user' : 'model';
            message.content = content;
            message.status = status;
            message.evidence = evidence;
        });
    }

    @writer async markAsDeleted(): Promise<void> {
        await this.messages.destroyAllPermanently();
        await super.markAsDeleted();
    }
}