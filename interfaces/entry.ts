export interface Entrie {
    id: number,
    title: string,
    cover_url: string,
    rating: number,
    synopsis: string,
    review: string,
    deleted: boolean,
    created_at: Date,
    author: string,
}

export interface EntryOptionalsFields {
    title?: string,
    cover_url?: string,
    rating?: number,
    synopsis?: string,
    review?: string,
}

export interface InsertEntrie extends Omit<Entrie, "id" | "created_at" | "deleted">{}

export type CreateEntryValidations = 
    "ENTRY_TITLE_ALREADY_EXIST" |
    "ENTRY_INVALID_AUTHOR_ID" |
    "ENTRY_CREATED";

export type EntryNotFound = 
    "ENTRY_NOT_FOUND";