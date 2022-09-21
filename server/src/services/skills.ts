import Skill from "../entity/Skill.js";
import {dataSource} from "../db/index.js";
import {DeleteResult} from "typeorm";

export function createSkill(name: string): Skill {
    return dataSource.getRepository(Skill).create({name})
}

export async function getAllSkills(): Promise<Skill[]> {
    return await dataSource.getRepository(Skill).find()
}

export async function getSkillById(id: number): Promise<Skill | null> {
    return await dataSource.getRepository(Skill).findOne({where: {id}})
}

export async function reloadSkill(skill: Skill): Promise<Skill | null> {
    return await getSkillById(skill.id);
}

export async function deleteSkillById(id: number): Promise<DeleteResult> {
    return await dataSource.getRepository(Skill).delete({id});
}

export async function deleteAllSkills(): Promise<void> {
    return await dataSource.getRepository(Skill).clear()
}