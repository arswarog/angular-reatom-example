import { Observable } from 'rxjs';
import { ReatomService } from './reatom.service';
import { declareAction, } from '@reatom/core';
export function useAtom(atom, ...fields) {
    return new Observable(observer => {
        if (fields.length === 0) {
            const subscription = ReatomService.store.subscribe(atom, observer.next.bind(observer));
            observer.next(ReatomService.store.getState(atom));
            return subscription;
        }
        else {
            const subscription = ReatomService.store.subscribe(atom, data => {
                observer.next(data[fields[0]]);
            });
            observer.next(ReatomService.store.getState(atom)[fields[0]]);
            return subscription;
        }
    });
}
export function useAction(actionCreator) {
    return ((...props) => ReatomService.store.dispatch(actionCreator(...props)));
}
export function DeclareAction(actionCreator) {
    return (target, name) => {
        const descriptor = Object.getOwnPropertyDescriptor(target, name);
        const original = descriptor.value;
        const actionName = (target.constructor.name || 'UnnamedService') + '/' + name;
        let declaredAction = declareAction(actionName);
        descriptor.value = function () {
            const action = declaredAction(arguments);
            ReatomService.store.dispatch(action);
            if (actionCreator)
                ReatomService.store.dispatch(actionCreator(arguments));
            original.apply(this, arguments);
        };
        Object.defineProperty(target, name, descriptor);
        return descriptor;
    };
}
//# sourceMappingURL=helper.js.map