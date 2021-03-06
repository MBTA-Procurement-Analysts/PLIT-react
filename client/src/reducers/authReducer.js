import {SIGN_OUT, SIGN_IN} from "../actions/types";

const INITIAL_STATE = {
    isSignedIn: null,
    user: null
};

//signing in/out changes state of authentication in redux store
export default(state = INITIAL_STATE, action) => {
    switch(action.type) {
        case SIGN_IN:
            //call upon the auth change action creator to change signed in to false.
            if (action.payload !== 0) {
                return {...state, isSignedIn: true, user: action.payload};
            } else {
                return {...state, isSignedIn: false};
            }
        case SIGN_OUT:
            return{...state, isSignedIn: false, user: null};
        default:
            return state;
    }
};