import { useContext } from "react";
import { SkillsContext } from "../pages/Home";
import Skill from "./Skill";

const SkillList = () => {
    const createSkill = async (event) => {
        event.preventDefault();
        const data = Object.fromEntries(new FormData(event.target));
        await fetch("http://localhost:3000/api/skills", {
            method: "POST",
            body: JSON.stringify(data),
            headers: { 'Content-Type': 'application/json' }
        });
        updateSkills();
    }

    const {skills, updateSkills} = useContext(SkillsContext)

    return (
        <aside className="skill-picker card">
            <form onSubmit={createSkill}>
                <input type="text" placeholder="React" name="name"/>
                <button className="button" type="submit">OK</button>
            </form>
            <ul className="skills">
                {skills.map(sk => (
                    <Skill key={`#skill${sk.id}`} name={sk.name} noLevel/>
                ))}
            </ul>
        </aside>
    )
}

export default SkillList;