import { userService } from '../../services/user.service.js'
import { SET_USER, SET_USER_BALANCE } from '../reducers/user.reducers.js'
import { store } from '../store.js'
// import { SET_USER, store, SET_USER_BALANCE } from '../store.js'

export function login(user) {
	return userService.login(user)
        .then(loggedinUser => store.dispatch({ type: SET_USER, loggedinUser }))
}

export function signup(user) {
	return userService.signup(user)
        .then(loggedinUser => store.dispatch({ type: SET_USER, loggedinUser }))
}

export function logout() {
	return userService.logout()
        .then(() => store.dispatch({ type: SET_USER, loggedinUser: null }))
}

export function balance(amount) {
    return userService.updateBalance(+amount)
        .then(updatedBalance => {
            store.dispatch({ type: SET_USER_BALANCE, balance: updatedBalance })
        })
}

export function loadUser(userId) {
    return userService.getById(userId)
        .then(user => {
            store.dispatch({ type: SET_USER, loggedinUser: user })})
}

export function addActivity(activity) {
    return userService.addActivity(activity)
        .then(updatedUser => {
            store.dispatch({ type: SET_USER, loggedinUser: updatedUser })})
}

export function updateUser(user) {
    return userService.update(user)
        .then(user => {
            store.dispatch({ type: SET_USER, loggedinUser: user })})
}