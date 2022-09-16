import Submit from "./Submit";
import useWilder from "../hooks/useWilder";
import {useState} from "react";
import AsyncSelect from "react-select/async";

const NewWilderForm = () => {
    const {skills, createWilder} = useWilder()
    const [selectedSkills, setSelectedSkills] = useState([])
    const handleSubmit = (e) => {
        e.preventDefault()
        let data = Object.fromEntries(new FormData(e.target))
        const skills_format = selectedSkills.map(sk => {
            const formatted = {id: sk.value, level: parseInt(data[`skills[${sk.value}][level]`])}
            delete data[`skills[${sk.value}][level]`]
            return formatted
        })
        data = {...data, skills: skills_format}
        createWilder(data)
    }
    return (
        <section>
            <h2>New Wilder</h2>
            <form onSubmit={handleSubmit} autocomplete="off">
                <input className={"input "} required name={"name"} type="text" placeholder="Jane Doe"/>
                <input className={"input large"} name={"description"} type="textarea"
                       placeholder="Description..."/>
                <AsyncSelect placeholder={"Skills"}
                             isMulti cacheOptions
                             defaultOptions={skills.map(s => ({value: s.id, label: s.name}))}
                             onChange={setSelectedSkills}/>
                {selectedSkills.length ? <fieldset>
                    <legend>Skills</legend>
                    {selectedSkills.map(ss => (
                        <div>
                            <label>{ss.label}</label>
                            <input required name={`skills[${ss.value}][level]`} type="number" min="1" max="5"
                                   placeholder={"Level"}/>
                        </div>
                    ))}
                </fieldset> : null}
                <Submit>Créer</Submit>
            </form>
        </section>
    )
}

const Option = ({value, children}) => {
    const [selected, setSelected] = useState(false)
    return (
        <option value={value} selected={selected}>{children}</option>
    )
}

export default NewWilderForm