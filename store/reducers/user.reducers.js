import { userService } from '../../services/user.service.js'
export const SET_USER = 'SET_USER'
export const SET_USER_BALANCE = 'SET_USER_BALANCE'
export const SET_WATCHED_USER = 'SET_WATCHED_USER'

const initialState = {
    loggedinUser: userService.getLoggedinUser(),
    watchedUser: null
}

export function userReducer(state = initialState, cmd = {}) {
    switch (cmd.type) {

        case SET_USER:
            return { ...state, loggedinUser: cmd.loggedinUser }

        case SET_USER_BALANCE:
            return { ...state, loggedinUser: { ...state.loggedinUser, balance: cmd.balance } }

        case SET_WATCHED_USER:
            return { ...state, watchedUser: cmd.user }
        default:
            return state
    }
}