const { Link } = ReactRouterDOM
const { useSelector } = ReactRedux

export function TodoPreview({ todo, onToggleTodo }) {
    const loggedinUser = useSelector(state => state.userModule.loggedinUser)
    const createdAt = new Date(todo.createdAt).toLocaleDateString('he')
    return (
        <article className="todo-preview">
            <h2 className={(todo.isDone) ? 'done' : ''} onClick={onToggleTodo}>
                Todo: {todo.txt}
            </h2>
            <h4>Todo Importance: {todo.importance}</h4>
            <h4>Created At: {createdAt}</h4>
            {todo.creator ?
                <p>Creator: <Link to={`/user/${todo.creator._id}`}><span>{todo.creator.fullname}</span></Link></p>
                : <span></span>}
            <img src={`https://media.istockphoto.com/id/1746104990/vector/3d-paper-clipboard-task-management-todo-check-list.jpg?s=612x612&w=0&k=20&c=o-7iI3IMEaBTS0oWZHG-YVgwcpEf8YlLdJB0qnJKMGU=`} alt="" />
        </article>
    )
}
