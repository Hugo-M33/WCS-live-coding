import APIClient from "./APIClient";
import {INewWilderData} from "../types/interfaces";

export const getWilders = async () => {
    return await APIClient.get('/wilders').then(v => v.data)
}

export const addSkillToWilder = async (wilderId: number | string, skillId: number | string) => {
    return await APIClient.post(`/wilders/${wilderId}/skills`, {id: skillId})
}

export const removeSkillFromWilder = async (wilderId: number | string, skillId: number | string) => {
    return await APIClient.delete(`/wilders/${wilderId}/skills/${skillId}`)
}

export const removeWilder = async (wilderId: number | string) => {
    return await APIClient.delete(`/wilders/${wilderId}`)
}

export const newWilder = async (wilder: INewWilderData) => {
    return await APIClient.post('/wilders', wilder)
}