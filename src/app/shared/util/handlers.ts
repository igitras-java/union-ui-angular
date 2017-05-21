import { Observable } from 'rxjs/Rx';
/**
 * Created by mason on 03/11/2016.
 */
export default class Handlers {

    static handleError(error: any) {
        console.log(error.status);
        console.log(error);
        let errorMsg = error.message || `Yikes! There was was a problem with our hyperdrive device and we couldn't retrieve your data!`
        console.error(errorMsg);
        return Observable.throw(errorMsg);
    }
}
