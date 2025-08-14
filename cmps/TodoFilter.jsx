const { useState, useEffect, useRef } = React
const { useSelector } = ReactRedux
import { setFilter, clearFilter } from '../store/actions/todo.actions.js'
import { utilService } from '../services/util.service.js'

export function TodoFilter() {
    const filterBy = useSelector(state => state.filterBy)
    const [filterByToEdit, setFilterByToEdit] = useState({ ...filterBy })

    const setFilterDebounced = useRef(utilService.debounce(setFilter, 600)).current

    useEffect(() => {
        setFilterByToEdit({ ...filterBy })
    }, [filterBy])

    useEffect(() => {
        setFilterDebounced(filterByToEdit)
    }, [filterByToEdit])

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

        setFilterByToEdit(prevFilter => ({ ...prevFilter, [field]: value }))
    }

    // Optional support for LAZY Filtering with a button
    function onSubmitFilter(ev) {
        ev.preventDefault()
        setFilter(filterByToEdit)
    }

    const { txt = '', importance = '' } = filterByToEdit
    return (
        <section className="todo-filter">
            <h2>Filter Todos</h2>
            <form onSubmit={onSubmitFilter}>
                <input value={txt} onChange={handleChange}
                    type="search" placeholder="By Txt" id="txt" name="txt"
                />
                <label htmlFor="importance">Importance: </label>
                <input value={importance} onChange={handleChange}
                    type="number" placeholder="By Importance" id="importance" name="importance"
                />
                <button className='btn' type="button" onClick={() => {
                    clearFilter()
                    setFilterByToEdit({ txt: '', importance: '' })
                }}>Clear Filter</button>
                <button hidden>Set Filter</button>
            </form>
        </section>
    )
}