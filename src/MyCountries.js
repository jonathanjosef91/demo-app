function isDefault(defaultCountry, country){
    if (defaultCountry === country){
        return "selected"
    }
    return ""
}

export function MyCountries(props){
    return  (
        <div>
            {props.title}:<br />
            <select defaultValue={props.defaultCountry} onChange={(event) => props.onChange(event.target.value)}>
                <option>Israel</option>
                <option>USA</option>
                <option>UK</option>
            </select>
        </div>
    )
}