import { loadTodosStats } from "../store/actions/todo.actions.js"

const { useSelector } = ReactRedux
const { useEffect } = React

export function AppFooter() {
    const { totalTodos = 0, completedTodos = 0 } = useSelector(state => ({
        totalTodos: state.totalTodos || 0,
        completedTodos: state.completedTodos || 0
    }))
    
    useEffect(() => {
        loadTodosStats()
    }, [])
    
    const progressPercent = totalTodos ? Math.round((completedTodos / totalTodos) * 100) : 0

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