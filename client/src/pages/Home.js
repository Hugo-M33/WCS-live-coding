import { useEffect } from "react";
import SkillList from "../components/SkillList";
import Wilder from "../components/Wilder";
import useWilder from "../hooks/useWilder";

const Homepage = () => {
  const {wilders, updateWilders, updateSkills} = useWilder()
  useEffect(() => {
      if (typeof updateWilders !== 'function') return
    updateWilders();
    updateSkills();
  }, [updateSkills, updateWilders]);

  return (
    <main className="container">
      <h2>Wilders</h2>
        <section className="card-row">
          {wilders?.map((w) => (
            <Wilder key={`#Wilder${w.id}`} {...w} />
          ))}
        </section>
        <SkillList />
    </main>
  );
};

export default Homepage;
