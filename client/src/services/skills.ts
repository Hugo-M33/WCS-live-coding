import APIClient from "./APIClient";

export const getSkills = async () => {
    return await APIClient.get('/skills').then(v => v.data)
}

export const createSkill = async (name: string) => {
    return await APIClient.post('/skills', {name}).then(v => v.data)
}

export const deleteSkill = async (id: number | string) => {
    return await APIClient.delete(`/skills/${id}`)
}