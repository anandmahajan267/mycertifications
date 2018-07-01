import { Injectable } from '@angular/core';
@Injectable()
export class ShareService {
    private value: any;
    private map = new Map()

    setValue(value: any) {
        this.value = value;
    }

    getValue() {
        let value = this.value;
        this.value = null;
        return value;
    }

    setMapValue(key, value) {
        this.map.set(key, value)
    }

    getMapValue(key) {
        if (this.map.has(key)) {
            return this.map.get(key);
        } else {
            return null
        }
    }

    clearMap() {
        this.map.clear()
    }

    deleteMapValue(key) {
        if (this.map.has(key)) {
            this.map.delete(key);
        }
    }
}