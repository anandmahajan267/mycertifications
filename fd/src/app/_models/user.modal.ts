import { UserRole } from './../enumeration';
export class User {
    public id: number;
    public first_name: string;
    public middle_name: string;
    public last_name: string;
    public avatar: string;
    public email: string;
    public dob: string;
    public role:UserRole;
    public password: string;
    public status: string;
    public is_set_password: boolean;
    public original_avatar_image: string;
    public created_date: string;
    public modified_date: string;
    public is_notification: boolean;
    public is_post_notification: boolean;
    public is_tribute_notification: boolean;

    public contact_person:string;
    public phone_number:string;
    public abn:string;
    public address:string;

}