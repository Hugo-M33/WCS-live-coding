import Skill from "./Skill";
import {createSkill, deleteSkill as deleteSkillFromServer} from "../services/skills";
import useWilder, {ActionType} from "../hooks/useWilder";
import Submit from "./Submit";
import {FormEventHandler} from "react";

const SkillList = () => {
    const {skills, dispatch} = useWilder()

    const newSkill: FormEventHandler<HTMLFormElement> = async (event) => {
        event.preventDefault();
        const data = Object.fromEntries(new FormData(event.target as HTMLFormElement));
        await createSkill(data.name as string)
        dispatch({type: ActionType.UPDATE_SKILLS, payload: {}})
    }

    const deleteSkill = async (id: number | string) => {
        await deleteSkillFromServer(id)
        dispatch({type: ActionType.UPDATE_SKILLS, payload: {}})
        dispatch({type: ActionType.UPDATE_WILDERS, payload: {}})
    }


    return (
        <aside className="skill-picker card">
            <form onSubmit={newSkill} autoComplete="off">
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