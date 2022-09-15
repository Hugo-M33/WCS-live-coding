import {useState, useEffect, useContext} from 'react'
import { SkillsContext } from '../pages/Home';
import {addSkillToWilder, removeSkillFromWilder} from "../services/wilders";

const SkillPicker = ({wilderId}) => {
    const [open, setOpen] = useState(false)
    const {skills, updateSkills, updateWilders} = useContext(SkillsContext)


    const addSkill = async (e) => {
        e.preventDefault();
        const {id} = (Object.fromEntries(new FormData(e.target)))
        console.log(id)
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
    },[open, updateSkills])

  return (
    <>
      {!open && <button className="button" onClick={() => setOpen(!open)}>Add Skill</button>}
      {open && 
      <form onSubmit={addSkill}>
        <select name="id">
            {skills.map(sk => <option value={sk.id}>{sk.name}</option>)}
        </select>
        <input type="number" name="level" placeholder="Level" min="1" max="2"/>
        <button className="button" type="submit" onClose={removeSkill}>Add</button>
      </form>}
    </>
  );
};

export default SkillPicker