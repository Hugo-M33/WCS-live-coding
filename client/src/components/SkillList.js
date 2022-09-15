import { useContext } from "react";
import { SkillsContext } from "../pages/Home";
import Skill from "./Skill";
import {createSkill} from "../services/skills";

const SkillList = () => {
    const newSkill = async (event) => {
        event.preventDefault();
        const data = Object.fromEntries(new FormData(event.target));
        await createSkill(data.name)
        updateSkills();
    }
    const deleteSkill = async (id) => {
        await deleteSkill(id)
        updateSkills()
        updateWilders()
    }

    const {skills, updateSkills, updateWilders} = useContext(SkillsContext)

    return (
        <aside className="skill-picker card">
            <form onSubmit={newSkill}>
                <input type="text" placeholder="React" name="name"/>
                <button className="button" type="submit">OK</button>
            </form>
            <ul className="skills">
                {skills.map(sk => (
                    <Skill key={`#skill${sk.id}`} name={sk.name} id={sk.id} noLevel onClose={deleteSkill}/>
                ))}
            </ul>
        </aside>
    )
}

export default SkillList;