import { TodoFilter } from "../cmps/TodoFilter.jsx"
import { TodoSort } from '../cmps/TodoSort.jsx'
import { TodoList } from "../cmps/TodoList.jsx"
import { DataTable } from "../cmps/data-table/DataTable.jsx"
import { todoService } from "../services/todo.service.js"
import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service.js"
import { clearFilter, loadTodos, loadTodosStats, removeTodo, saveTodo, setFilter, setMaxPage } from '../store/actions/todo.actions.js'
import { SET_FILTER } from "../store/store.js"

const { useState, useEffect } = React
const { Link, useSearchParams } = ReactRouterDOM
const { useSelector, useDispatch } = ReactRedux

export function TodoIndex() {
    const todos = useSelector(state => state.todos)
    const isLoading = useSelector(state => state.isLoading)
    const [todoToDelete, setTodoToDelete] = useState(null)
    const [searchParams, setSearchParams] = useSearchParams()
    const filterBy = useSelector(state => state.filterBy)
    const dispatch = useDispatch()
    const maxPage = useSelector(state => state.maxPage)

    useEffect(() => {
        setSearchParams(filterBy)
        setMaxPage()
        loadTodos(filterBy)
            .catch(err => {
                console.error('err:', err)
                showErrorMsg('Cannot load todos')
            })
    }, [filterBy])



    function onRemoveTodo(todoId) {
        removeTodo(todoId)
            .then(() => {
                showSuccessMsg(`Todo removed`)
                setTodoToDelete(null)
                loadTodosStats()
            })
            .catch(err => {
                console.log('err:', err)
                showErrorMsg('Cannot remove todo ' + todoId)
                setTodoToDelete(null)
            })
    }

    function onChangePage(idx) {
        const newFilterBy = { ...filterBy, pageIdx: idx }
        dispatch({ type: SET_FILTER, filterBy: newFilterBy })
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
            <TodoSort filterBy={filterBy} setFilter={setFilter} />
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

            {maxPage > 0 && <footer>
                <div>
                    {Array.from({ length: maxPage }, (_, idx) => (
                        <button onClick={() => onChangePage(idx)}
                            key={idx}
                            className={`page-btn ${filterBy.pageIdx === idx ? 'active' : ''}`}>
                            {idx + 1}
                        </button>
                    ))}
                </div>
            </footer>}
        </section>
    )
}