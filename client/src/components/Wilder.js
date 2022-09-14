import Skill from "./Skill"
import blank_picture from '../assets/black_picture.png'
import SkillPicker from "./SkillPicker"


const Wilder = ({id, name, skills}) => {
    return (
            <article className="card">
            <img src={blank_picture} alt="Jane Doe Profile" />
            <h3>{name}</h3>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat.
            </p>
            <h4>Wild Skills</h4>
            <ul className="skills">
            {skills.map((skill) => (
                <Skill key={`#skill${skill.id}`} name={skill.name} level={skill.level} />
            ))}
            </ul>
            <div style={{display: 'flex'}}>
              <SkillPicker wilderId={id}/>
            </div>
            </article>
    )
}
export default Wilder