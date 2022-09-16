import {useEffect} from "react";
import SkillList from "../components/SkillList";
import Wilder from "../components/Wilder";
import useWilder from "../hooks/useWilder";
import NewWilderForm from "../components/NewWilderForm";

const Homepage = () => {
    const {wilders, updateWilders, updateSkills} = useWilder()
    useEffect(() => {
        if (typeof updateWilders !== 'function') return
        updateWilders();
        updateSkills();
    }, [updateSkills, updateWilders]);

    return (
        <main className="container">
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
