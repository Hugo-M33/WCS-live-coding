const Skill = ({ name, level, noLevel }) => {
  return (
    <li>
      {name}
      {!noLevel && <span className="votes">{level}</span>}
    </li>
  );
};

export default Skill;
