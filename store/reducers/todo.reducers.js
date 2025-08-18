export const SET_TODOS = 'SET_TODOS'
export const REMOVE_TODO = 'REMOVE_TODO'
export const ADD_TODO = 'ADD_TODO'
export const UPDATE_TODO = 'UPDATE_TODO'
export const SET_TODOS_STATS = 'SET_TODOS_STATS'

const initialState = {
    todos: [],
}

export function todoReducer(state = initialState, cmd = {}) {
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

        case SET_TODOS_STATS:
            return { ...state, totalTodos: cmd.stats.totalTodos, completedTodos: cmd.stats.completedTodos }

        default:
            return state
    }
}