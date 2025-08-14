const { useSelector, useDispatch } = ReactRedux
const { Link, NavLink } = ReactRouterDOM
const { useNavigate } = ReactRouter

import { logout } from '../store/actions/user.actions.js'
import { UserMsg } from "./UserMsg.jsx"
import { LoginSignup } from './LoginSignup.jsx'
import { showErrorMsg } from '../services/event-bus.service.js'


export function AppHeader() {
    const navigate = useNavigate()
    // const [user, setUser] = useState(userService.getLoggedinUser())
    const loggedinUser = useSelector(state => state.loggedinUser)
    const todos = useSelector(state => state.todos)

    const totalTodos = todos.length
    const todosDoneCount = todos.filter(todo => todo.isDone).length
    const progressPercent = totalTodos ? Math.round((todosDoneCount / totalTodos) * 100) : 0

    function onLogout() {
        logout()
            .catch((err) => {
                showErrorMsg('OOPs try again')
            })
    }

    return (
        <header className="app-header full main-layout">
            <section className="header-container">
                <h1>React Todo App</h1>
                {loggedinUser ? (
                    < section >
                        <Link to={`/user/${loggedinUser._id}`}>Hello {loggedinUser.fullname}</Link>
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
