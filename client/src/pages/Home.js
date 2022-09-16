import {useEffect} from "react";
import SkillList from "../components/SkillList";
import Wilder from "../components/Wilder";
import useWilder from "../hooks/useWilder";
import NewWilderForm from "../components/NewWilderForm";
import {useDrop} from "react-dnd";
import {removeSkillFromWilder} from "../services/wilders";

const Homepage = () => {
    const {wilders, updateWilders, updateSkills} = useWilder()
    useEffect(() => {
        if (typeof updateWilders !== 'function') return
        updateWilders();
        updateSkills();
    }, [updateSkills, updateWilders]);

    const [{canDrop, isOver}, drop] = useDrop(() => ({
        // The type (or types) to accept - strings or symbols
        accept: 'WILDER_SKILLS',
        drop: async (item) => {
            console.log(item)
            await removeSkillFromWilder(item.wilder.id, item.skill.id)
            updateWilders()
        },
        // Props to collect
        collect: (monitor) => ({
            isOver: monitor.isOver(),
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
