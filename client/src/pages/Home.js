import { createContext, useEffect, useState } from "react";
import SkillList from "../components/SkillList";
import Wilder from "../components/Wilder";
import {getWilders} from "../services/wilders";
import {getSkills} from "../services/skills";

export const SkillsContext = createContext({});

const Homepage = () => {
  const [skills, setSkills] = useState([]);
  const [wilders, setWilders] = useState([]);
  const updateSkills = async () => {
    const skillsList = await getSkills()
    setSkills(skillsList);
  };
  const updateWilders = async () => {
    const wildersList = await getWilders()
    setWilders(wildersList);
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
