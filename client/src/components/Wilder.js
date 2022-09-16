import Skill from "./Skill"
import SkillPicker from "./SkillPicker"
import CrossButton from "./CrossButton";
import useWilder from "../hooks/useWilder";
import blank_picture from "../assets/black_picture.png"
import {useEffect, useState} from "react";
import axios from "axios";


const Wilder = ({wilder}) => {
    const {id, name, skills, description} = wilder;
    const [picture, setPicture] = useState(blank_picture);
    useEffect(() => {
        const getPic = async () => {
            const p = await axios.get(`https://api.multiavatar.com/${name}.png/?apikey=zASjtU4lQcnwNu`, {
                responseType: 'blob'
            })
                .then(response => URL.createObjectURL(response.data))
            console.log(p)
            setPicture(p)
        }
        getPic()
    }, [])
    const {deleteWilder} = useWilder()
    return (
        <article className="card">
            <CrossButton className={"delete-wilder-btn"} onClick={() => deleteWilder(id)}>X</CrossButton>
            <img src={picture} alt="Jane Doe Profile"/>
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