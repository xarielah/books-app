import { filterTypes } from "../../../services/book-utils.service.js";
import { capitalize, utilService } from "../../../services/util.service.js";

const { useState, useEffect, useCallback } = React;



export function BookFilter({ onFilterUpdate, initialType = filterTypes.TITLE, initialValue = "" }) {
    const [filterType, setFilterType] = useState(initialType);
    const [filterValue, setFilterValue] = useState(initialValue);
    const setFilterDebounce = useCallback(utilService.debounce(onFilterUpdate), [])


    useEffect(() => {
        const filter = filterValue.length ? { type: filterType, value: filterValue.trim() } : {}
        setFilterDebounce(filter);
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
                {Object.values(filterTypes).map(type => <option key={type} value={type}>{capitalize(type)}</option>)}
            </select>
        </section>
    )
}