import { todoService } from '../../services/todo.service.js'
import { store, ADD_TODO, REMOVE_TODO, SET_TODOS, UPDATE_TODO, SET_FILTER, TOGGLE_LOADING, SET_LOADING, } from '../store.js'

export function loadTodos(filterBy = {}) {
    return todoService.query(filterBy)
        .then(todos => store.dispatch({ type: SET_TODOS, todos }))
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
    return loadTodos(filterBy)
}

export function clearFilter() {
    store.dispatch({ type: SET_FILTER, filterBy: {} })
    return loadTodos()
}