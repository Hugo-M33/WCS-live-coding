import { createContext, useEffect, useState } from "react";
import SkillList from "../components/SkillList";
import Wilder from "../components/Wilder";

export const SkillsContext = createContext({});

const Homepage = () => {
  const [skills, setSkills] = useState([]);
  const [wilders, setWilders] = useState([]);
  const updateSkills = async () => {
    const response = await fetch("http://localhost:3000/api/skills").then((s) =>
      s.json()
    );
    setSkills(response);
  };
  const updateWilders = async () => {
    const response = await fetch("http://localhost:3000/api/wilders").then(
      (s) => s.json()
    );
    setWilders(response);
  };
  useEffect(() => {
    updateWilders();
    updateSkills();
  }, []);
  return (
    <main className="container">
      <h2>Wilders</h2>
      <SkillsContext.Provider value={{ updateSkills, updateWilders, skills, wilders }}>
        <section className="card-row">
          {wilders.map((w) => (
            <Wilder key={`#Wilder${w.id}`} {...w} />
          ))}
        </section>
        <SkillList />
      </SkillsContext.Provider>
    </main>
  );
};

export default Homepage;
