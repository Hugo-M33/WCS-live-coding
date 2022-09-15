const Skill = ({ name, level, noLevel, onClose, id }) => {
  return (
    <li>
      {name}
      {!noLevel && <span className="votes">{level}</span>}
      {onClose && <button onClick={() => onClose(id)}className="button">X</button>}
    </li>
  );
};

export default Skill;
