import Skill, {DragSkillItem} from "./Skill"
import SkillPicker from "./SkillPicker"
import CrossButton from "./CrossButton";
import useWilder, {ActionType} from "../hooks/useWilder";
import {useEffect, useState} from "react";
import axios from "axios";
import {useDrop} from "react-dnd";
import APIClient from "../services/APIClient";
import {IWilder} from "../types/interfaces";

interface IWilderProps {
    wilder: IWilder
}

const Wilder = ({wilder}: IWilderProps) => {
    const {id, name, skills, description} = wilder;
    const [picture, setPicture] = useState("../assets/black_picture.png");

    const [{canDrop}, drop] = useDrop(() => ({
        // The type (or types) to accept - strings or symbols
        accept: 'LIST_SKILL',
        drop: (item: DragSkillItem) => {
            APIClient.post(`/wilders/${id}/skills`, {...item.skill})
                .then(() => dispatch({type: ActionType.UPDATE_SKILLS, payload: {}}))
        },
        // Props to collect
        collect: (monitor) => ({
            canDrop: monitor.canDrop(),
        })
    }))

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
    }, [name])
    const {dispatch} = useWilder()
    return (
        <article ref={drop} className="card">
            {canDrop && <div className="drop-zone">Add Skill</div>}
            <CrossButton className={"delete-wilder-btn"}
                         onClick={() => dispatch({type: ActionType.DELETE_WILDER, payload: {id}})}>X</CrossButton>
            <img src={picture} alt="Jane Doe Profile"/>
            <h3>{name}</h3>
            <p>
                {description || <i>No description...</i>}
            </p>
            <h4>Wild Skills</h4>
            <ul className="skills">
                {skills?.map((skill) => (
                    <Skill draggableType={"WILDER_SKILLS"} draggableProps={{wilder}} key={`#skill${skill.id}`}
                           name={skill.name}
                           level={skill.level}
                           id={skill.id}/>
                ))}
            </ul>
            <SkillPicker wilderId={id}/>
        </article>
    )
}
export default Wilder