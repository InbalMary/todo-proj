const { createStore } = Redux

export const SET_TODOS = 'SET_TODOS'
export const REMOVE_TODO = 'REMOVE_TODO'
export const ADD_TODO = 'ADD_TODO'
export const UPDATE_TODO = 'UPDATE_TODO'

export const SET_USER = 'SET_USER'
export const SET_USER_SCORE = 'SET_USER_SCORE'

export const TOGGLE_LOADING = 'TOGGLE_TOGGLE_LOADING'

export const SET_FILTER = 'SET_FILTER'

const initialState = {
    todos: [],
    loggedinUser: null,
    showLoader: false,
    filterBy: {},
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

        case SET_USER_SCORE:
            return { ...state, loggedinUser: { ...state.loggedinUser, score: cmd.score } }

        case TOGGLE_LOADING:
            return { ...state, showLoader: !state.showLoader }

        case SET_FILTER:
            return { ...state, filterBy: cmd.filterBy }

        default:
            return state
    }
}

export const store = createStore(appReducer)
window.gStore = store