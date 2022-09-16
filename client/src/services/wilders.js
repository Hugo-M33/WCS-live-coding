import APIClient from "./APIClient";

export const getWilders = async () => {
    return await APIClient.get('/wilders').then(v => v.data)
}

export const addSkillToWilder = async (wilderId, skillId) => {
    return await APIClient.post(`/wilders/${wilderId}/skills`, {id: skillId})
}

export const removeSkillFromWilder = async (wilderId, skillId) => {
    return await APIClient.delete(`/wilders/${wilderId}/skills/${skillId}`)
}

export const removeWilder = async (wilderId) => {
    return await APIClient.delete(`/wilders/${wilderId}`)
}

export const newWilder = async (wilder) => {
    return await APIClient.post('/wilders', wilder)
}