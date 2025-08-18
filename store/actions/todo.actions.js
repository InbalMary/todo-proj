import { todoService } from '../../services/todo.service.js'
import { SET_FILTER, SET_LOADING, SET_MAX_PAGE } from '../reducers/stats.reducers.js'
import { ADD_TODO, REMOVE_TODO, SET_TODOS, SET_TODOS_STATS, UPDATE_TODO } from '../reducers/todo.reducers.js'
import { store } from '../store.js'
// import { store, ADD_TODO, REMOVE_TODO, SET_TODOS, UPDATE_TODO, SET_FILTER, TOGGLE_LOADING, SET_LOADING, SET_MAX_PAGE, SET_TODOS_STATS, } from '../store.js'

export function loadTodos(filterBy = {}) {
    store.dispatch({ type: SET_LOADING, isLoading: true })
    return todoService.query(filterBy)
        .then(todos => store.dispatch({ type: SET_TODOS, todos }))
        .finally(() => store.dispatch({ type: SET_LOADING, isLoading: false }))
}

export function removeTodo(todoId) {
    return todoService.remove(todoId)
        .then(() => store.dispatch({ type: REMOVE_TODO, todoId }))
}

export function saveTodo(todoToSave) {
    const type = todoToSave._id ? UPDATE_TODO : ADD_TODO

    return todoService.save(todoToSave)
        .then(savedTodo => store.dispatch({ type, todo: savedTodo }))
}

export function setFilter(filterBy) {
    store.dispatch({ type: SET_FILTER, filterBy })
    // return _loadTodosWithLoading(filterBy)
}

export function clearFilter() {
    store.dispatch({ type: SET_FILTER, filterBy: {} })
    // return _loadTodosWithLoading()
}

export function setMaxPage() {
    todoService.getTotalTodos()
        .then(maxPage => store.dispatch({ type: SET_MAX_PAGE, maxPage }))
}

export function loadTodosStats() {
    return todoService.getStats()
        .then(stats => store.dispatch({ type: SET_TODOS_STATS, stats }))
}

// function _loadTodosWithLoading(filterBy = {}) {
//     store.dispatch({ type: 'SET_LOADING', isLoading: true })
//     return todoService.query(filterBy)
//         .then(todos => store.dispatch({ type: SET_TODOS, todos }))
//         .finally(() => store.dispatch({ type: 'SET_LOADING', isLoading: false }))
// }