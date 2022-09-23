import {useEffect} from "react";
import SkillList from "../components/SkillList";
import Wilder from "../components/Wilder";
import useWilder, {ActionType} from "../hooks/useWilder";
import NewWilderForm from "../components/NewWilderForm";
import {useDrop} from "react-dnd";
import {removeSkillFromWilder} from "../services/wilders";
import {DragSkillItem} from "../components/Skill";

const Homepage = () => {
    const {wilders, dispatch} = useWilder()
    useEffect(() => {
        dispatch({type: ActionType.UPDATE_SKILLS, payload: {}})
        dispatch({type: ActionType.UPDATE_WILDERS, payload: {}})
        console.log("hey")
    }, []);

    const [{canDrop}, drop] = useDrop(() => ({
        // The type (or types) to accept - strings or symbols
        accept: 'WILDER_SKILLS',
        drop: async (item: DragSkillItem) => {
            console.log(item)
            await removeSkillFromWilder(item.wilder.id, item.skill.id)
            dispatch({type: ActionType.UPDATE_WILDERS, payload: {}})
        },
        // Props to collect
        collect: (monitor) => ({
            canDrop: monitor.canDrop(),
        })
    }))

    return (
        <main className="container">
            {canDrop && <div ref={drop} className="drop-zone-trash">Remove</div>}
            <NewWilderForm/>
            <h2>Wilders</h2>
            <section className="card-row">
                {wilders?.map((w) => (
                    <Wilder key={`#Wilder${w.id}`} wilder={w}/>
                ))}
            </section>
            <SkillList/>
        </main>
    );
};

export default Homepage;
