import CrossButton from "./CrossButton";
import {useDrag} from "react-dnd";
import {IGrade, ISkill, IWilder} from "../types/interfaces";

interface ISkillProps extends Omit<IGrade, "level"> {
    level?: number | string
    noLevel?: boolean
    onClose?: (id: number | string) => void
    draggableType?: string
    draggableProps?: {
        wilder: IWilder,
        [key: string]: any
    }
}

export interface DragSkillItem extends Pick<ISkillProps, "draggableProps"> {
    skill: ISkill
    wilder: IWilder
}

const Skill = ({name, level, noLevel, onClose, id, draggableType, draggableProps}: ISkillProps) => {
    const [{isDragging}, drag] = useDrag(() => ({
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

// @ts-ignore
export default Skill