var ReatomService_1;
import * as tslib_1 from "tslib";
import { createStore, } from '@reatom/core';
import { Injectable } from '@angular/core';
let ReatomService = ReatomService_1 = class ReatomService {
    constructor() {
        this.store = createStore();
        console.log('!!! Init store');
        ReatomService_1.store = this.store;
    }
    dispatch(action) {
        this.store.dispatch(action);
    }
};
ReatomService = ReatomService_1 = tslib_1.__decorate([
    Injectable({
        providedIn: 'root',
    })
], ReatomService);
export { ReatomService };
//# sourceMappingURL=reatom.service.js.map