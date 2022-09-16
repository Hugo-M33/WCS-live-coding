import Skill from "./Skill"
import SkillPicker from "./SkillPicker"
import CrossButton from "./CrossButton";
import useWilder from "../hooks/useWilder";
import blank_picture from "../assets/black_picture.png"


const Wilder = ({wilder}) => {
    const {id, name, skills, description} = wilder;
    console.log(wilder)
    const {deleteWilder} = useWilder()
    return (
        <article className="card">
            <CrossButton className={"delete-wilder-btn"} onClick={() => deleteWilder(id)}>X</CrossButton>
            <img src={blank_picture} alt="Jane Doe Profile"/>
            <h3>{name}</h3>
            <p>
                {description || <i>No description...</i>}
            </p>
            <h4>Wild Skills</h4>
            <ul className="skills">
                {skills?.map((skill) => (
                    <Skill key={`#skill${skill.id}`} name={skill.name} level={skill.level}/>
                ))}
            </ul>
            <SkillPicker wilderId={id}/>
        </article>
    )
}
export default Wilder