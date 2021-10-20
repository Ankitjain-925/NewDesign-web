import {
    GET_INVOICES_REQUEST,
    GET_INVOICES_SUCCESS,
    GET_INVOICES_FAIL,
} from "actiontypes";

export const Invoices = (type, getting, house_id, user_token, items, callBack = () => { },) => {
    console.log("type",type)
    return (dispatch) => {
        if (getting && house_id) {
            dispatch({ type: GET_INVOICES_REQUEST });
            if (items && 1) {
                console.log("finalupdateTrack", items)
                dispatch({ type: GET_INVOICES_SUCCESS, payload: items });
                callBack();
            }
            else if (type === "logout") {
                dispatch({ invoices: [] });
            }
            else {
                dispatch({ type: GET_INVOICES_FAIL });
                Invoices();
            }
        }
        //   else {
        //     dispatch({ type: GET_INVOICES_FAIL });
        //     callBack();
        //   }
    };
};