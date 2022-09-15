import APIClient from "./APIClient";

export const getSkills = async () => {
    return await APIClient.get('/skills').then(v => v.data)
}

export const createSkill = async (name) => {
    return await APIClient.post('/skills').then(v => v.data)
}

export const deleteSkill = async (id) => {
    return await APIClient.delete(`/skills/${id}`)
}