import {FormEventHandler, useEffect, useState} from 'react'
import {addSkillToWilder} from "../services/wilders";
import useWilder, {ActionType} from "../hooks/useWilder";
import Submit from "./Submit";

interface ISkillPickerProps {
    wilderId: number | string
}

const SkillPicker = ({wilderId}: ISkillPickerProps) => {
    const [open, setOpen] = useState(false)
    const {skills, dispatch} = useWilder()

    const addSkill: FormEventHandler<HTMLFormElement> = async (e) => {
        e.preventDefault();
        const {id} = Object.fromEntries(new FormData(e.target as HTMLFormElement))
        await addSkillToWilder(wilderId, id as number | string)
        dispatch({type: ActionType.UPDATE_WILDERS, payload: {}})
        setOpen(false)
    }

    useEffect(() => {
        open && dispatch({type: ActionType.UPDATE_SKILLS, payload: {}})
    }, [open, dispatch])

    return (
        <>
            {!open && <Submit className="button" onClick={() => setOpen(!open)} type="button">Add Skill</Submit>}
            {open &&
                <form onSubmit={addSkill} className="add-skill-form" autoComplete="off">
                    <select name="id">
                        {skills.map(sk => <option value={sk.id}>{sk.name}</option>)}
                    </select>
                    <input type="number" name="level" placeholder="Level" min="1" max="2"/>
                    <Submit>Add</Submit>
                </form>}
        </>
    );
};

export default SkillPicker