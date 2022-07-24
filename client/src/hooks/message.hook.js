import {useCallback} from 'react'
import Materialize from "materialize-css";

export const useErrorMessage = () => {
    return useCallback(
        errorList => {
            if (Materialize && errorList) {
                for (let error in errorList) {
                    Materialize.toast({html: errorList[error], classes: 'rounded'}, 1000);
                }
            }
        }, []
    );
};

export const useMessage = () => {
    return useCallback(
        message => {
            if (Materialize && message) {
                Materialize.toast({html: message, classes: 'rounded'}, 1000);
            }
        }, []
    );
};
