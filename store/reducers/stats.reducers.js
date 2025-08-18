import { todoService } from "../../services/todo.service.js"

export const TOGGLE_LOADING = 'TOGGLE_TOGGLE_LOADING'
export const SET_LOADING = 'SET_LOADING'

export const SET_FILTER = 'SET_FILTER'
export const CLEAR_FILTER = 'CLEAR_FILTER'

export const SET_MAX_PAGE = 'SET_MAX_PAGE'

const initialState = {
    isLoading: false,
    filterBy: todoService.getDefaultFilter(),
    maxPage: 0
}

export function statReducer(state = initialState, cmd = {}) {
    switch (cmd.type) {
        case TOGGLE_LOADING:
            return { ...state, isLoading: !state.isLoading }

        case SET_LOADING:
            return { ...state, isLoading: cmd.isLoading }

        case SET_FILTER:
            return { ...state, filterBy: { ...state.filterBy, ...cmd.filterBy } }

        case CLEAR_FILTER:
            return { ...state, filterBy: {} }

        case SET_MAX_PAGE:
            return { ...state, maxPage: cmd.maxPage }

        default:
            return state
    }
}