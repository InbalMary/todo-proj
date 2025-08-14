const { Link } = ReactRouterDOM
const { useSelector } = ReactRedux

export function TodoPreview({ todo, onToggleTodo }) {
    const loggedinUser = useSelector(state => state.loggedinUser)
    return (
        <article className="todo-preview">
            <h2 className={(todo.isDone) ? 'done' : ''} onClick={onToggleTodo}>
                Todo: {todo.txt}
            </h2>
            <h4>Todo Importance: {todo.importance}</h4>
            {todo.creator ?
                <p>Creator: <Link to={`/user/${todo.creator._id}`}><span>{todo.creator.fullname}</span></Link></p>
                : <span></span>}
            <img src={`../assets/img/${'todo'}.png`} alt="" />
        </article>
    )
}
