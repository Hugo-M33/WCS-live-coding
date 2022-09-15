import Skill from "./Skill";
import {createSkill, deleteSkill as deleteSkillFromServer} from "../services/skills";
import useWilder from "../hooks/useWilder";

const SkillList = () => {
    const {skills, updateSkills, updateWilders} = useWilder()

    const newSkill = async (event) => {
        event.preventDefault();
        const data = Object.fromEntries(new FormData(event.target));
        await createSkill(data.name)
        updateSkills();
    }

    const deleteSkill = async (id) => {
        await deleteSkillFromServer(id)
        updateSkills()
        updateWilders()
    }

    return (
        <aside className="skill-picker card">
            <form onSubmit={newSkill}>
                <input type="text" placeholder="React" name="name"/>
                <button className="button" type="submit">OK</button>
            </form>
            <ul className="skills">
                {skills?.map(sk => (
                    <Skill key={`#skill${sk.id}`} name={sk.name} id={sk.id} noLevel onClose={deleteSkill}/>
                ))}
            </ul>
        </aside>
    )
}

export default SkillList;