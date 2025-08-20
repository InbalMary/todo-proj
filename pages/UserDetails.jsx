const { useState, useEffect } = React
const { useParams, useNavigate, Link } = ReactRouterDOM
const { useSelector, useDispatch } = ReactRedux

import { utilService } from '../services/util.service.js'
import { loadUser, updateUser } from '../store/actions/user.actions.js'
import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service.js'

export function UserDetails() {
    const loggedinUser = useSelector(state => state.userModule.loggedinUser)
    const watchedUser = useSelector(state => state.userModule.watchedUser)
    const [userDetails, setUserDetails] = useState(null)

    const params = useParams()

    useEffect(() => {
        loadUser(params.userId)
    }, [params.userId])

    useEffect(() => {
        if (watchedUser && loggedinUser) loadUserData()
    }, [watchedUser, loggedinUser])

    function loadUserData() {
        setUserDetails({
            fullname: watchedUser.fullname || '',
            color: (watchedUser.pref && watchedUser.pref.color) || '#eeeeee',
            bgColor: (watchedUser.pref && watchedUser.pref.bgColor) || '#191919',
            activities: watchedUser.activities || []
        })
    }

    function onEditUser(ev) {
        ev.preventDefault()
        const userToUpdate = {
            ...watchedUser,
            fullname: userDetails.fullname,
            pref: { color: userDetails.color, bgColor: userDetails.bgColor }
        }
        updateUser(userToUpdate)
            .then(() => {
                showSuccessMsg('User updated successfully!')
                // setCssVarVal('--clr1', userDetails.bgColor)
            })
            .catch(err => {
                console.error('Cannot update user:', err)
                showErrorMsg('Cannot update user')
            })
    }

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
        }
        setUserDetails((prevUser) => ({ ...prevUser, [field]: value }))
    }

    if (!watchedUser || !userDetails) return <div>No user...</div>

    const { activities, fullname, color, bgColor } = userDetails
    const isOwnProfile = loggedinUser && watchedUser && loggedinUser._id === watchedUser._id

    return (
        <section
            className="user-details"
            style={{
                color: color,
                backgroundColor: bgColor
            }}
        >
            <h1>User Profile: {fullname}</h1>

            {isOwnProfile && (
                <form className='activities-form' onSubmit={onEditUser}>
                    <label htmlFor="fullname">Name:</label>
                    <input type="text" id="fullname" name="fullname" value={fullname} onChange={handleChange} />
                    <label htmlFor="name">Color:</label>
                    <input type="color" name="color" value={color} onChange={handleChange} />
                    <label htmlFor="name">BG Color:</label>
                    <input type="color" name="bgColor" value={bgColor} onChange={handleChange} />
                    <button type="submit">save</button>
                </form>
            )}

            <section>
                {!activities.length && <h2>No activities to show</h2>}
                {activities.length > 0 && <h3>{isOwnProfile ? 'Manage your todos' : 'User activities'}</h3>}
                <ul>
                    {activities.map((activity, idx) => (
                        <li key={idx}>
                            <p>
                                {utilService.formatTimeAgo(activity.updatedAt)}:
                                <strong> {activity.actionType} a Todo - '{activity.txt}'</strong>
                            </p>
                        </li>
                    ))}
                </ul>

            </section>

            <Link to="/">Back Home</Link>
        </section>
    )
}