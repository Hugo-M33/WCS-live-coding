import CrossButton from "./CrossButton";
import {useDrag} from "react-dnd";

const Skill = ({name, level, noLevel, onClose, id, draggableType, draggableProps}) => {
    const [{isDragging}, drag, dragPreview] = useDrag(() => ({
        // "type" is required. It is used by the "accept" specification of drop targets.
        type: draggableType || 'NULL',
        item: {skill: {name, id}, ...draggableProps},
        // The collect function utilizes a "monitor" instance (see the Overview for what this is)
        // to pull important pieces of state from the DnD system.
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        })
    }))
    return (
        <li ref={drag} style={{opacity: isDragging ? 0.5 : 1}}>
            {name}
            {!noLevel && <span className="votes">{level}</span>}
            {onClose && <CrossButton onClick={() => onClose(id)}>X</CrossButton>}
        </li>
    );
};

export default Skill;
