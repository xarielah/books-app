import { utilService } from "../../../services/util.service.js";

const { useState, useEffect, useCallback } = React;

const filterTypes = Object.freeze({
    TITLE: 'title',
    AUTHORS: 'authors',
    IS_ON_SALE: 'sale',
})

export function BookFilter({ onFilterUpdate }) {
    const [filterType, setFilterType] = useState(filterTypes.TITLE);
    const [filterValue, setFilterValue] = useState('');
    const setFilterDebounce = useCallback(utilService.debounce(onFilterUpdate), [])

    useEffect(() => {
        setFilterDebounce({ [filterType]: filterValue })
    }, [filterValue, filterType])

    function onFilterTypeChange({ target: { value } }) {
        setFilterType(value)
    }

    function onFilterValueChange({ target: { value } }) {
        setFilterValue(value)
    }

    return (
        <section className="book-filter">
            <input value={filterValue} className="input" type="text" placeholder={`Search by ${filterType}...`} onChange={onFilterValueChange} />
            <select value={filterType} className="input" onChange={onFilterTypeChange}>
                {Object.values(filterTypes).map(type => <option key={type} value={type}>{type}</option>)}
            </select>
        </section>
    )
}