import { Model, Query, Q } from "@nozbe/watermelondb";
import { children, date, readonly, text, writer } from "@nozbe/watermelondb/decorators";
import Message from "./Message";
import { EvidenceType } from "@/shared/types/evidence";

export default class Chat extends Model {
    static table = 'chats';
    static associations = {
        messages: { type: 'has_many', foreignKey: 'chat_id' },
    } as const;

    @text('title') title!: string;
    @readonly @date('updated_at') updatedAt!: Date;
    @children('messages') messages!: Query<Message>;

    @writer async addMessage(isUser: boolean, content: string, evidence?: EvidenceType) {
        const status = 'pending';
        await this.collections.get<Message>('messages').create((message: Message) => {
            message.chat.set(this);
            message.role = isUser ? 'user' : 'model';
            message.content = content;
            message.status = status;
            message.evidence = evidence ?? null;
        });
    }

    @writer async markAsDeleted(): Promise<void> {
        await this.messages.destroyAllPermanently();
        await super.markAsDeleted();
    }

    static buildSearchQuery(searchQuery: string) {
        if (!searchQuery) {
            return [Q.sortBy('updated_at', Q.desc)];
        }
        return [
            Q.experimentalJoinTables(['messages']),
            Q.or(
                Q.where('title', Q.like(`%${Q.sanitizeLikeString(searchQuery)}%`)),
                Q.on('messages', 'content', Q.like(`%${Q.sanitizeLikeString(searchQuery)}%`))
            )
        ];
    }
}