export type Timestamp = string;

export type UuidV4 = string;

export type DocumentPublishedId = UuidV4;
export type DocumentDraftId = `draft.${UuidV4}`;
export type DocumentId = DocumentDraftId | DocumentPublishedId;

export const IsDocumentIdDraft = (id: string): id is DocumentDraftId => id.startsWith('drafts');
