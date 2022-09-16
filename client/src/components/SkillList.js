import Skill from "./Skill";
import {createSkill, deleteSkill as deleteSkillFromServer} from "../services/skills";
import useWilder from "../hooks/useWilder";
import Submit from "./Submit";

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
            <form onSubmit={newSkill} autocomplete="off">
                <input type="text" placeholder="React" name="name"/>
                <Submit>OK</Submit>
            </form>
            <ul className="skills">
                {skills?.map(sk => (
                    <Skill draggableType={'LIST_SKILL'} key={`#skill${sk.id}`} name={sk.name} id={sk.id} noLevel
                           onClose={deleteSkill}/>
                ))}
            </ul>
        </aside>
    )
}

export default SkillList;