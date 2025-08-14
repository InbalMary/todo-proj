const { useState, useEffect } = React
const { useParams, useNavigate, Link } = ReactRouterDOM
const { useSelector, useDispatch } = ReactRedux

import { userService } from "../services/user.service.js"
import { TodoList } from '../cmps/TodoList.jsx'
import { todoService } from '../services/todo.service.js'
import { loadUser } from '../store/actions/user.actions.js'

export function UserDetails() {
    const user = useSelector(state => state.loggedinUser)

    const params = useParams()
    const navigate = useNavigate()
    const dispatch = useDispatch()

    useEffect(() => {
        loadUser(params.userId)
    }, [params.userId])


    if (!user) return <div>Loading...</div>

    const userTodos = user.activities || []

    return <section className="user-details">
        <h1>User: {user.fullname}</h1>
        {/* <pre>
            {JSON.stringify(user, null, 2)}
        </pre> */}
        <section>
            {!userTodos || (!userTodos.length && <h2>No todos to show</h2>)}
            {userTodos && userTodos.length > 0 && <h3>Manage your todos</h3>}
            <TodoList todos={userTodos} />
        </section>
        <Link to="/">Back Home</Link>
    </section>
}