import {createContext, ReactNode, useContext, useMemo, useReducer, useState} from 'react'
import {getSkills} from "../services/skills";
import {getWilders, newWilder, removeWilder,} from "../services/wilders";
import {ISkill, IWilder} from "../types/interfaces";

export enum ActionType {
    UPDATE_WILDERS = 'UPDATE_WILDERS',
    UPDATE_SKILLS = 'UPDATE_SKILLS',
    CREATE_WILDER = 'CREATE_WILDER',
    DELETE_WILDER = 'DELETE_WILDER',
}

type ReducerAction = {
    type: ActionType,
    payload: any
}

const dispatch = (dispatchFn: React.Dispatch<ReducerAction>) => {
    return async (action: ReducerAction) => {
        switch (action.type) {
            case ActionType.UPDATE_WILDERS:
                action.payload.wilders = await getWilders()
                return dispatchFn(action)
            case ActionType.UPDATE_SKILLS:
                action.payload.skills = await getSkills()
                return dispatchFn(action)
            case ActionType.CREATE_WILDER:
                await newWilder(action.payload.wilder)
                action.payload.wilders = await getWilders()
                action.type = ActionType.UPDATE_WILDERS
                return dispatchFn(action)
            case ActionType.DELETE_WILDER:
                await removeWilder(action.payload.id)
                action.payload.wilders = await getWilders()
                return dispatchFn(action)
            default:
                return dispatchFn(action)
        }
    }
}

function reducer(state: any, action: ReducerAction) {
    const copy = {...state}

    switch (action.type) {
        case ActionType.UPDATE_WILDERS:
            copy.wilders = action.payload.wilders
            return copy
        case ActionType.UPDATE_SKILLS:
            copy.skills = action.payload.skills
            return copy
        case ActionType.CREATE_WILDER:
            copy.wilders = action.payload.wilders
            return copy
        case ActionType.DELETE_WILDER:
            copy.wilders = action.payload.wilders
            return copy
        default:
            return copy
    }
}

interface IWilderContext {
    wilders: IWilder[]
    skills: ISkill[]
    pending: boolean
    dispatch: React.Dispatch<ReducerAction>
}


const wilderContext = createContext<IWilderContext>({
    wilders: [],
    skills: [],
    pending: false,
    dispatch: (a) => {
    }
})

interface IWilderProviderProps {
    children: ReactNode
}

export const WilderProvider = ({children}: IWilderProviderProps) => {
    const [state, dispatchState] = useReducer(reducer, {wilders: [], skills: [], pending: false})
    const [pending, setPending] = useState(false)

    const value = useMemo(() => ({
        pending,
        ...state
    }), [state, pending])

    return (
        <wilderContext.Provider value={{...value, dispatch: dispatch(dispatchState)}}>
            {children}
        </wilderContext.Provider>)
}

export default function useWilder(): IWilderContext {
    return useContext(wilderContext)
}
