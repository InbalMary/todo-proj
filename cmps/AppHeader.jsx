const { useSelector, useDispatch } = ReactRedux
const { Link, NavLink } = ReactRouterDOM
const { useNavigate } = ReactRouter
const { useEffect } = React

import { logout } from '../store/actions/user.actions.js'
import { UserMsg } from "./UserMsg.jsx"
import { LoginSignup } from './LoginSignup.jsx'
import { showErrorMsg } from '../services/event-bus.service.js'
import { userService } from "../services/user.service.js"
import { loadTodosStats } from '../store/actions/todo.actions.js'

export function AppHeader() {
    const navigate = useNavigate()
    // const [user, setUser] = useState(userService.getLoggedinUser())
    const user = useSelector(state => state.loggedinUser)
    const todos = useSelector(state => state.todos)
    const loggedinUser = userService.getLoggedinUser()

    const { totalTodos = 0, completedTodos = 0 } = useSelector(state => ({
        totalTodos: state.totalTodos || 0,
        completedTodos: state.completedTodos || 0
    }))

    useEffect(() => {
        loadTodosStats()
    }, [])

    const progressPercent = totalTodos ? Math.round((completedTodos / totalTodos) * 100) : 0

    function onLogout() {
        logout()
            .catch((err) => {
                showErrorMsg('OOPs try again')
            })
    }
    // console.log('user', user)
    return (
        <header className="app-header full main-layout">
            <section className="header-container">
                <h1>React Todo App</h1>
                {user ? (
                    < section >
                        {loggedinUser && (
                            <Link to={`/user/${loggedinUser._id}`}>
                                Hello {loggedinUser.fullname}
                            </Link>
                        )}
                        <p>Balance: {user.balance}$</p>
                        <button onClick={onLogout}>Logout</button>
                    </ section >
                ) : (
                    <section>
                        <LoginSignup />
                    </section>
                )}
                <nav className="app-nav">
                    <NavLink to="/" >Home</NavLink>
                    <NavLink to="/about" >About</NavLink>
                    <NavLink to="/todo" >Todos</NavLink>
                    <NavLink to="/dashboard" >Dashboard</NavLink>
                </nav>
            </section>
            <section className="todos-progress">
                <h3>Progress: {progressPercent}%</h3>
                <div className="progress-bar">
                    <div
                        className="progress-fill"
                        style={{ width: progressPercent + '%' }}
                    ></div>
                </div>
            </section>
            <UserMsg />
        </header>
    )
}
