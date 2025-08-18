const { useState, useEffect } = React
const { useParams, useNavigate, Link } = ReactRouterDOM
const { useSelector, useDispatch } = ReactRedux

import { utilService } from '../services/util.service.js'
import { userService } from "../services/user.service.js"
import { TodoList } from '../cmps/TodoList.jsx'
import { loadUser, updateUser } from '../store/actions/user.actions.js'

export function UserDetails() {
    const user = useSelector(state => state.userModule.loggedinUser)
    const loggedinUser = userService.getLoggedinUser()
    const [userDetails, setUserDetails] = useState(null)

    const params = useParams()
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const isLoggedinUser = loggedinUser && loggedinUser._id === params.userId

    useEffect(() => {
        loadUser(params.userId)
    }, [params.userId])

    useEffect(() => {
        if (user) {
            setUserDetails({
                ...user,
                prefs: user.prefs || { color: '#000000', bgColor: '#ffffff' }
            })
        }
    }, [user])

    function handleChange({ target }) {
        const field = target.name
        let value = target.value

        switch (target.type) {
            case 'number':
            case 'range':
                value = +value || ''
                break
            case 'checkbox':
                value = target.checked
                break
            default: break
        }

        if (field.startsWith('prefs.')) {
            const key = field.split('.')[1]
            setUserDetails(prev => ({
                ...prev,
                prefs: { ...prev.prefs, [key]: value }
            }))
        } else {
            setUserDetails(prev => ({ ...prev, [field]: value }))
        }
    }

    function onSave(ev) {
        ev.preventDefault()
        updateUser(userDetails)
    }

    if (!userDetails) return <div>Loading...</div>

    const userTodos = userDetails.activities || []
console.log('userTodos', userTodos)
    return (
        <section
            className="user-details"
            style={{
                color: userDetails.prefs.color,
                backgroundColor: userDetails.prefs.bgColor
            }}
        >
            <h1>User: {userDetails.fullname}</h1>

            <section>
                {!userTodos.length && <h2>No todos to show</h2>}
                {userTodos.length > 0 && <h3>Manage your todos</h3>}
                <ul>
                    {userTodos.map((activity, idx) => (
                        <li key={idx}>
                            <p>
                                {utilService.formatTimeAgo(activity.updatedAt)}: 
                                <strong> {activity.actionType} a Todo - '{activity.txt}'</strong>
                            </p>
                        </li>
                    ))}
                </ul>

            </section>

            {isLoggedinUser && (
                <form onSubmit={onSave} className="edit-prefs">
                    <label>
                        Fullname:
                        <input
                            type="text"
                            name="fullname"
                            value={userDetails.fullname || ''}
                            onChange={handleChange}
                        />
                    </label>
                    <label>
                        Text Color:
                        <input
                            type="color"
                            name="prefs.color"
                            value={userDetails.prefs.color || '#000000'}
                            onChange={handleChange}
                        />
                    </label>
                    <label>
                        Background Color:
                        <input
                            type="color"
                            name="prefs.bgColor"
                            value={userDetails.prefs.bgColor || '#ffffff'}
                            onChange={handleChange}
                        />
                    </label>
                    <button>Save</button>
                </form>
            )}

            <Link to="/">Back Home</Link>
        </section>
    )
}
