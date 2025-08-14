import { TodoFilter } from "../cmps/TodoFilter.jsx"
import { TodoList } from "../cmps/TodoList.jsx"
import { DataTable } from "../cmps/data-table/DataTable.jsx"
import { todoService } from "../services/todo.service.js"
import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service.js"
import { clearFilter, loadTodos, removeTodo, saveTodo, setFilter, } from '../store/actions/todo.actions.js'

const { useState, useEffect } = React
const { Link, useSearchParams } = ReactRouterDOM
const { useSelector, useDispatch } = ReactRedux

export function TodoIndex() {
    // const [todos, setTodos] = useState(null)
    const todos = useSelector(state => state.todos)
    const isLoading = useSelector(state => state.isLoading)
    // console.log('isLoading', isLoading)
    const [todoToDelete, setTodoToDelete] = useState(null)
    // Special hook for accessing search-params:
    const [searchParams, setSearchParams] = useSearchParams()
    // const defaultFilter = todoService.getFilterFromSearchParams(searchParams)
    // const [filterBy, setFilterBy] = useState(defaultFilter)
    const filterBy = useSelector(state => state.filterBy)

    useEffect(() => {
        setSearchParams(filterBy)
        loadTodos(filterBy)
            .catch(err => {
                console.eror('err:', err)
                showErrorMsg('Cannot load todos')
            })
    }, [filterBy])

    function onRemoveTodo(todoId) {
        removeTodo(todoId)
            .then(() => {
                showSuccessMsg(`Todo removed`)
                setTodoToDelete(null)
            })
            .catch(err => {
                console.log('err:', err)
                showErrorMsg('Cannot remove todo ' + todoId)
                setTodoToDelete(null)
            })
    }

    function onToggleTodo(todo) {
        const todoToSave = { ...todo, isDone: !todo.isDone }
        todoService.save(todoToSave)
            .then((savedTodo) => {
                showSuccessMsg(`Todo is ${(savedTodo.isDone) ? 'done' : 'back on your list'}`)
            })
            .catch(err => {
                console.log('err:', err)
                showErrorMsg('Cannot toggle todo ' + todoId)
            })
    }


    return (
        <section className="todo-index">
            <TodoFilter filterBy={filterBy} setFilter={setFilter} clearFilter={clearFilter} />
            <div>
                <Link to="/todo/edit" className="btn" >Add Todo</Link>
            </div>
            <h2>Todos List</h2>
            {!isLoading ? (
                <div>
                    <TodoList todos={todos} onRemoveTodo={id => setTodoToDelete(id)} onToggleTodo={onToggleTodo} />
                    <hr />
                    <h2>Todos Table</h2>
                    <div style={{ width: '60%', margin: 'auto' }}>
                        <DataTable todos={todos} onRemoveTodo={onRemoveTodo} />
                    </div>
                </div>) : <div>Loading...</div>}

            {todoToDelete && (
                <div className="modal-backdrop">
                    <div className="modal">
                        <p>Are you sure you want to delete this todo?</p>
                        <button className="btn" onClick={() => onRemoveTodo(todoToDelete)}>Confirm</button>
                        <button className="btn" onClick={() => setTodoToDelete(null)}>Cancel</button>
                    </div>
                </div>
            )}
        </section>
    )
}