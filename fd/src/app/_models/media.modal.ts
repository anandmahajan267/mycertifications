import { MediaType } from './../enumeration';

export class Media {
    id: number;
    created_date: Date;
    type: MediaType;
    media: string;
    entity_type: string;
    tribute_id: number;
    base_media: string;
    original_media: string;
    thumbnail: string;
}