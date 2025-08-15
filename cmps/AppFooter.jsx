const { useSelector } = ReactRedux
export function AppFooter() {
    const todos = useSelector(state => state.todos)

    const totalTodos = todos.length
    const todosDoneCount = todos.filter(todo => todo.isDone).length
    const progressPercent = totalTodos ? Math.round((todosDoneCount / totalTodos) * 100) : 0

    return (
        <footer className="app-footer full main-layout">
            <section className="todos-progress">
                <h3>Progress: {progressPercent}%</h3>
                <div className="progress-bar">
                    <div
                        className="progress-fill"
                        style={{ width: progressPercent + '%' }}
                    ></div>
                </div>
            </section>
            
        </footer>
    )
}
