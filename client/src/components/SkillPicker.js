import {useEffect, useState} from 'react'
import {addSkillToWilder, removeSkillFromWilder} from "../services/wilders";
import useWilder from "../hooks/useWilder";
import Submit from "./Submit";

const SkillPicker = ({wilderId}) => {
    const [open, setOpen] = useState(false)
    const {skills, updateSkills, updateWilders} = useWilder()

    const addSkill = async (e) => {
        e.preventDefault();
        const {id} = (Object.fromEntries(new FormData(e.target)))
        await addSkillToWilder(wilderId, id)
        await updateWilders();
        setOpen(false)
    }

    const removeSkill = async (skillId) => {
        await removeSkillFromWilder(wilderId, skillId)
        updateWilders()
    }

    useEffect(() => {
        open && updateSkills()
    }, [open, updateSkills])

    return (
        <>
            {!open && <Submit className="button" onClick={() => setOpen(!open)} type="button">Add Skill</Submit>}
            {open &&
                <form onSubmit={addSkill} className="add-skill-form" autocomplete="off">
                    <select name="id">
                        {skills.map(sk => <option value={sk.id}>{sk.name}</option>)}
                    </select>
                    <input type="number" name="level" placeholder="Level" min="1" max="2"/>
                    <Submit onClose={removeSkill}>Add</Submit>
                </form>}
        </>
    );
};

export default SkillPicker