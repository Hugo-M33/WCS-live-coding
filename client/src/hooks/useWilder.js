import {createContext, useCallback, useContext, useMemo, useState} from 'react'
import {getSkills} from "../services/skills";
import {getWilders, newWilder, removeWilder,} from "../services/wilders";


const wilderContext = createContext({})

export const WilderProvider = ({children}) => {
    const [wilders, setWilders] = useState([])
    const [skills, setSkills] = useState([])
    const [pending, setPending] = useState(false)

    const updateSkills = useCallback(async () => {
        setPending(true)
        const skillsList = await getSkills()
        await setSkills(skillsList);
        setPending(false)
    }, []);

    const createWilder = useCallback(async (wilder) => {
        setPending(true)
        await newWilder(wilder)
        await updateWilders()
        setPending(false)
    }, [])


    const updateWilders = useCallback(async () => {
        setPending(true)
        const wildersList = await getWilders()
        await setWilders(wildersList);
        setPending(false)
    }, []);

    const deleteWilder = useCallback(async (id) => {
        await setPending(true)
        await removeWilder(id)
        await updateWilders()
        await setPending(false)
    }, [])

    const value = useMemo(() => ({
        wilders,
        skills,
        updateWilders,
        updateSkills,
        pending,
        deleteWilder,
        createWilder
    }), [wilders, skills, updateWilders, updateSkills, pending, deleteWilder, createWilder])

    return (
        <wilderContext.Provider value={value}>
            {children}
        </wilderContext.Provider>)
}

export default function useWilder() {
    return useContext(wilderContext)
}
