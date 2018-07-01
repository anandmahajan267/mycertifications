import { Media } from './media.modal';
import { User } from './user.modal';
import { Country } from './country.modal';
import { State } from './state.modal';
import { Suburb } from './suburb.modal';

export class Tribute {
    id: number;
    created_date: Date;
    modified_date: Date;
    user: User;
    dob: string;
    pod: string;
    biography: string;
    country: Country;
    state: State;
    suburb: Suburb;
    status: string;
    is_author: boolean;
    base_cover_photo: string;
    original_cover_image: string;
    first_name: string;
    middle_name: string;
    last_name: string;
    theme_id: number;
    cover_photo: string;
    media: Media|any;
}