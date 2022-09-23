import Submit from "./Submit";
import useWilder, {ActionType} from "../hooks/useWilder";
import {FormEventHandler, useState} from "react";
import AsyncSelect from "react-select/async";
import {MultiValue} from "react-select";

interface ISelectOption {
    value: string | number
    label: string
}

const NewWilderForm = () => {
    const {skills, dispatch} = useWilder()
    const [selectedSkills, setSelectedSkills] = useState<MultiValue<ISelectOption>>([])
    const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
        e.preventDefault()
        let data = Object.fromEntries(new FormData(e.target as HTMLFormElement))
        const skills_format = selectedSkills.map(sk => {
            const formatted = {id: sk.value, level: parseInt(data[`skills[${sk.value}][level]`] as string)}
            delete data[`skills[${sk.value}][level]`]
            return formatted
        })
        // @ts-ignore
        data = {...data, skills: skills_format}
        // @ts-ignore
        dispatch({type: ActionType.CREATE_WILDER, payload: {wilder: data}})
    }
    return (
        <section>
            <h2>New Wilder</h2>
            <form onSubmit={handleSubmit} autoComplete="off">
                <input className={"input "} required name={"name"} type="text" placeholder="Jane Doe"/>
                <input className={"input large"} name={"description"} type="textarea"
                       placeholder="Description..."/>
                <AsyncSelect placeholder={"Skills"}
                             isMulti cacheOptions
                             defaultOptions={skills.map(s => ({value: s.id, label: s.name}))}
                             onChange={(newValue) => setSelectedSkills(newValue)}/>
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
export default NewWilderForm