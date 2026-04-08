import { Model, Relation } from "@nozbe/watermelondb";
import { date, immutableRelation, json, readonly, text } from "@nozbe/watermelondb/decorators";
import Chat from "./Chat";
import { EvidenceType } from "@/shared/types/evidence";

const sanitizeEvidence = (rawEvidence: any): EvidenceType | null => {
    // 1. Typescript interfaces don't exist at runtime, so we can't use `typeof === EvidenceType`.
    // 2. We must manually verify that at least some core keys exist on the parsed object!
    if (typeof rawEvidence !== 'object' || rawEvidence === null || Array.isArray(rawEvidence)) {
        return null;
    }

    if ('title' in rawEvidence && 'summary' in rawEvidence) {
        return rawEvidence as EvidenceType;
    }

    return null;
};

export default class Message extends Model {
    static table = 'messages';
    static associations = {
        chats: { type: 'belongs_to', key: 'chat_id' },
    } as const;
    @immutableRelation('chats', 'chat_id') chat!: Relation<Chat>;
    @text('role') role!: string;
    @text('content') content!: string;
    @text('status') status!: string;
    
    // The property type is no longer a string, it's EvidenceType!
    @json('evidence', sanitizeEvidence) evidence?: EvidenceType | null; 
    
    @readonly @date('created_at') createdAt!: Date;
}