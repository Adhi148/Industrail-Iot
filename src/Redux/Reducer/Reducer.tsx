// import { User } from "../../types/thingsboardTypes";

interface Userstate {
    // user: User | null;
    accesstoken: string | null;
}
const initial_state: any = {
    // user: null ,
    accesstoken: null,
}

const userReducer = (state = initial_state, action: any): Userstate => {
    switch (action.type) {
        // case "SET_USER" :
        //     return {
        //         ...state,
        //         user: action.payload
        //     };

        case "SET_DEVICE_COUNT" :
            return {
                ...state,
                deviceCount : action.payload
            }

        case "SET_ACCESSTOKEN":
            return {
                ...state,
                accesstoken : action.payload
            }
        default :
            return state;
    }
}

export default userReducer;