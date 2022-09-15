import {useState, createContext, useContext, useMemo, useCallback} from 'react'
import {getSkills} from "../services/skills";
import {getWilders} from "../services/wilders";

const wilderContext = createContext({})

export const WilderProvider = ({ children }) => {
    const [wilders, setWilders] = useState([])
    const [skills, setSkills] = useState([])

    const updateSkills = useCallback(async () => {
        const skillsList = await getSkills()
        setSkills(skillsList);
    },[]);



    const updateWilders = useCallback(async () => {
        const wildersList = await getWilders()
        setWilders(wildersList);
    }, []);

    const value = useMemo(() => ({
        wilders,
        skills,
        updateWilders,
        updateSkills
    }), [wilders, skills, updateWilders, updateSkills])

    return(
    <wilderContext.Provider value={value}>
        {children}
    </wilderContext.Provider>)
}

export default function useWilder() {
    return useContext(wilderContext)
}
