import {dataSource} from "../db/index.js";
import Wilder from "../entity/Wilder.js";
import {DeleteResult} from "typeorm";

export function createWilder(partialEntity: { name: string, description?: string }): Wilder {
    return dataSource.getRepository(Wilder).create(partialEntity)
}

export async function getWilderById(id: number): Promise<Wilder | null> {
    return await dataSource.getRepository(Wilder).findOne({where: {id}, relations: {grades: {skill: true}}})
}

export async function getAllWilders(): Promise<Wilder[]> {
    return await dataSource.getRepository(Wilder).find({relations: {grades: {skill: true}}})
}

export async function reloadWilder(wilder: Wilder): Promise<Wilder | null> {
    return await getWilderById(wilder.id);
}

export async function deleteWilderById(id: number): Promise<DeleteResult> {
    return await dataSource.getRepository(Wilder).delete({id});
}

export function reformatWilders(...wilders: Wilder[]) {
    return wilders.map((wilder) => {
        return {
            id: wilder.id,
            name: wilder.name,
            description: wilder.description,
            skills: wilder.grades.map((grade) => {
                return {
                    id: grade.skill.id,
                    name: grade.skill.name,
                }
            })
        }
    })
}

export function clearWilders() {
    return dataSource.getRepository(Wilder).clear();
}