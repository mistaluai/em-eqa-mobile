import { Model, Relation } from "@nozbe/watermelondb";
import { date, immutableRelation, readonly, text } from "@nozbe/watermelondb/decorators";
import Chat from "./Chat";

export default class Message extends Model {
    static table = 'messages';
    static associations = {
        chats: { type: 'belongs_to', key: 'chat_id' },
    } as const;
    @immutableRelation('chats', 'chat_id') chat!: Relation<Chat>;
    @text('role') role!: string;
    @text('content') content!: string;
    @text('status') status!: string;
    @text('evidence') evidence?: string;
    @readonly @date('created_at') createdAt!: Date;
}
