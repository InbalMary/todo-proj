
const { createStore } = Redux

export const SET_TODOS = 'SET_TODOS'
export const REMOVE_TODO = 'REMOVE_TODO'
export const ADD_TODO = 'ADD_TODO'
export const UPDATE_TODO = 'UPDATE_TODO'

export const SET_USER = 'SET_USER'
export const SET_USER_BALANCE = 'SET_USER_BALANCE'

export const TOGGLE_LOADING = 'TOGGLE_TOGGLE_LOADING'
export const SET_LOADING = 'SET_LOADING'

export const SET_FILTER = 'SET_FILTER'
export const CLEAR_FILTER = 'CLEAR_FILTER'

export const SET_MAX_PAGE = 'SET_MAX_PAGE'

const initialState = {
    todos: [],
    loggedinUser: null,
    isLoading: false,
    filterBy: {},
    maxPage: 0
}

export function appReducer(state = initialState, cmd = {}) {
    switch (cmd.type) {

        case SET_TODOS:
            return { ...state, todos: cmd.todos }

        case REMOVE_TODO:
            var todos = state.todos.filter(todo => todo._id !== cmd.todoId)
            return { ...state, todos }

        case ADD_TODO:
            return { ...state, todos: [...state.todos, cmd.todo] }

        case UPDATE_TODO:
            var todos = state.todos.map(todo => todo._id === cmd.todo._id ? cmd.todo : todo)
            return { ...state, todos }

        case SET_USER:
            return { ...state, loggedinUser: cmd.loggedinUser }

        case SET_USER_BALANCE:
            return { ...state, loggedinUser: { ...state.loggedinUser, balance: cmd.balance } }

        case TOGGLE_LOADING:
            return { ...state, isLoading: !state.isLoading }

        case SET_LOADING:
            return { ...state, isLoading: cmd.isLoading }

        case SET_FILTER:
            return { ...state, filterBy: cmd.filterBy }

        case CLEAR_FILTER:
            return { ...state, filterBy: {} }

        case SET_MAX_PAGE:
            return { ...state, maxPage: cmd.maxPage }

        default:
            return state
    }
}

export const store = createStore(appReducer)
window.gStore = store