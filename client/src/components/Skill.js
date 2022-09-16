import CrossButton from "./CrossButton";

const Skill = ({ name, level, noLevel, onClose, id }) => {
  return (
    <li>
      {name}
      {!noLevel && <span className="votes">{level}</span>}
      {onClose && <CrossButton onClick={() => onClose(id)}>X</CrossButton>}
    </li>
  );
};

export default Skill;
