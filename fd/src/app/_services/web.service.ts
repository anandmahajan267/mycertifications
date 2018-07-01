
import { Injectable } from '@angular/core';
import { Logout } from './logout'
import { Http, Response, Headers, URLSearchParams, RequestOptions } from '@angular/http'
import { Observable } from 'rxjs/Observable'
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/catch'
import 'rxjs/add/observable/throw';

import { globalData } from './../app-constant';
import { Router } from '@angular/router'

declare var $: any;


@Injectable()
export class WebService {

    private _url: string = globalData.base_url;
    private _token: string = "U3AhaE54QGFwcDokRCRUckBkIW5n";
    token: string;

    constructor(private _http: Http, private logout: Logout, private router: Router) {
    }

    getAPI(_action: string, _body?: any, buttonId?: string) {
        let params = new URLSearchParams();
        for (let key in _body) {
            params.set(key, _body[key])
        }

        this.addLoader(buttonId);
        return this._http.get(this._url + _action, { search: params, headers: this.getHeader() }).map((response: Response) => {
            this.removeLoader(buttonId); return response.json()
        }).catch((e) => {
            this.removeLoader(buttonId);
            return this._errorHandler(e);
        });
    }


    postAPI(_action: string, _body: any, buttonId?: string) {

        this.addLoader(buttonId);
        return this._http.post(this._url + _action, JSON.stringify(_body), this.addHeader()).map((response: Response) => {
            this.removeLoader(buttonId);
            return response.json()
        }
        ).catch((e) => {
            this.removeLoader(buttonId);
            return this._errorHandler(e);
        });
    }

    putAPI(_action: string, _body: any, buttonId?: string) {
        this.addLoader(buttonId);
        return this._http.put(this._url + _action, JSON.stringify(_body), this.addHeader()).map((response: Response) => {
            this.removeLoader(buttonId);
            return response.json()
        }).catch((e) => {
            this.removeLoader(buttonId);
            return this._errorHandler(e);
        });
    }

    deleteAPI(_action: string, _id?: string, buttonId?: string) {
        this.addLoader(buttonId);
        return this._http.delete(this._url + _action, this.addHeader()).map((response: Response) => {
            this.removeLoader(buttonId);
            return response.json()
        }).catch((e) => {
            this.removeLoader(buttonId);
            return this._errorHandler(e);
        });
    }

    uploadImageAPI(_action: string, _file: File, _id: number, buttonId?: string) {
        this.addLoader(buttonId);
        let formData = new FormData();
        formData.append("image", _file);
        formData.append("id", _id.toString());
        return this._http.post(this._url + _action, formData, this.addHeaderForMultipart()).map((response: Response) => {
            this.removeLoader(buttonId);
            return response.json()
        }).catch((e) => {
            this.removeLoader(buttonId);
            return this._errorHandler(e);
        });
    }

    uploadDocumentAPI(_action: string, _file: File, _type: string, buttonId?: string) {
        this.addLoader(buttonId);
        let formData = new FormData();
        formData.append("document", _file);
        formData.append("type", _type);

        return this._http.post(this._url + _action, formData, this.addHeaderForMultipart()).map((response: Response) => {
            this.removeLoader(buttonId);
            return response.json()
        }).catch((e) => {
            this.removeLoader(buttonId);
            return this._errorHandler(e);
        });
    }


    getAccesstoken(_action: string, _body: Object, buttonId?: string) {
        this.addLoader(buttonId);
        var headers = new Headers();
        //headers.append('access_token', 'Basic ' + this._token);
        headers.append('Content-Type', 'application/json');

        let params = new URLSearchParams();
        for (let key in _body) {
            params.set(key, _body[key])
        }

        // params.set("grant_type", "password");
        // params.set("scope", "read write");
        return this._http.post(this._url + _action, _body, { headers: headers })
            .map((response: Response) => {
                this.removeLoader(buttonId);
                let access_token = response.json();
                if (access_token && access_token.token) {
                    localStorage.setItem('access_token', access_token.token);
                    localStorage.setItem('refresh_token', access_token.token);
                }
            }).catch((e) => {
                this.removeLoader(buttonId);
                return this._loginErrorHandler(e);
            });
    }

    _loginErrorHandler(error: Response) {
        var errorMessage;
        if (!error || !error.status) {
            errorMessage = "Server Not Responding";
        } else if (error.status == 400) {
            errorMessage = error.json() && error.json().message || "Invalid Username or Password";
        }
        else if (error.status == 500) {
            errorMessage = "Server Error";
        } else {
            errorMessage = error.json() && error.json().message || "Bad Response";
        }

        $.notify({
            title: '<strong>Error</strong>',
            message: errorMessage
        }, {
                type: 'danger'
            });

        return Observable.throw(errorMessage);
    }


    _errorHandler(error: Response) {
        var errorMessage;
        if (!error || !error.status) {
            errorMessage = "Server Not Responding";
        } else if (error.status == 401) {
            errorMessage = error.json() && error.json().message || "Bad Response";
            this.logout.logout();
        } else if (error.status == 403) {
            errorMessage = error.json() && error.json().message || "Access Denied";
            this.router.navigate(["login"])
        }
        else if (error.status == 500) {
            errorMessage = "Server Error";
        } else {
            errorMessage = error.json() && error.json().message || "Bad Response";
        }

        $.notify({
            title: '<strong>Error</strong>',
            message: errorMessage
        }, {
                type: 'danger'
            });

        return Observable.throw(errorMessage);
    }

    private addHeader() {
        return new RequestOptions({ headers: this.getHeader() });

    }

    private getHeader() {
        var headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('app_version', '1.0');
        headers.append('Authorization', 'Bearer' + localStorage.getItem('access_token'));
        return headers;
    }


    private addHeaderForMultipart() {
        if (localStorage.getItem('access_token')) {
            var headers = new Headers();
            headers.append('Authorization', 'Bearer' + localStorage.getItem('access_token'));
            return new RequestOptions({ headers: headers });
        } else {
            // logout app
        }
    }

    private addLoader(id) {
        if (id) {
            var btn = $('#' + id);
            btn.addClass('disabled')
            btn.prepend("<i class='fa fa-spinner fa-spin'></i> ");
        }
    }

    private removeLoader(id) {
        if (id) {
            var btn = $('#' + id);
            btn.removeClass('disabled')
            btn.children("i:first").remove();
        }
    }
}