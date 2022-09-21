import Wilder from "../entity/Wilder.js";
import {Controller} from "../types/types";
import {dataSource} from "../db/index.js";
import SkillToWilder from "../entity/SkillToWilder.js";
import {badRequest} from "../middlewares/index.js";
import {
    clearWilders,
    createWilder,
    deleteWilderById,
    getAllWilders,
    getWilderById,
    reformatWilders,
    reloadWilder
} from "../services/wilders.js";
import {getSkillById} from "../services/skills.js";

const wilderController: Controller = {
    getWilder: async (req, res) => {
        const id = Number(req.params.id)
        const wilder = await getWilderById(id)
        if (!wilder) return res.status(404).send("Wilder not found");
        return res.json(reformatWilders(wilder));
    },
    getWilders: async (req, res) => {
        const wilders = await getAllWilders()
        return res.json(reformatWilders(...wilders));
    },
    createWilder: async (req, res) => {
        const newWilder = createWilder(req.body)
        return res.json(newWilder);

    },
    deleteWilder: async (req, res) => {
        const id = Number(req.params.id)
        await deleteWilderById(id)
        return res.send(`Wilder ${id} deleted`);
    },
    updateWilder: async (req, res) => {
        const id = Number(req.params.id)
        if (!id) return badRequest(req, res, () => res.end())
        let wilder = await getWilderById(id)
        if (!wilder) return res.status(404).send(`Wilder #${id} not found`);
        const {affected} = await dataSource
            .getRepository(Wilder)
            .update({id}, req.body);
        if (affected === 0) {
            return res.status(200).send(`Wilder unmodified`);
        }
        wilder = await reloadWilder(wilder) as Wilder
        return res.json({message: `Wilder ${id} updated`, wilder});
    },
    deleteWilders: async (req, res) => {
        clearWilders()
        return res.send("All wilders deleted");
    },
    addSkill: async (req, res) => {
        const wilderId = Number(req.params.wilderId);
        const skillId = req.body.skillId;
        const wilder = await getWilderById(wilderId)
        if (!wilder) return res.status(404).send("Wilder not found");
        const skill = await getSkillById(skillId)
        if (!skill) return res.status(404).send("Skill not found");
        const exists = wilder.grades.find((grade) => grade.skill.id === skill.id)
        if (!exists) {
            await dataSource.getRepository(SkillToWilder).create({wilderId, skillId, level: 1});
            return res.send(`Skill ${skill.name} added to wilder ${wilder.name}`);
        }
        return res.send(`Wilder ${wilder.name} already has ${skill.name} skill`);
    },
    removeSkill: async (req, res) => {
        const skillId = parseInt(req.body.skillId)
        const wilderId = parseInt(req.body.wilderId)

        if (!wilderId || !skillId) return badRequest(req, res, () => res.end())
        const wilder = await getWilderById(wilderId)
        if (!wilder) return res.status(404).send("Wilder not found");
        const skill = await getSkillById(skillId)
        if (!skill) return res.status(404).send("Skill not found");
        wilder.grades = wilder.grades.filter((grade) => grade.skill.id !== skill.id)
        await dataSource.getRepository(Wilder).save(wilder);
        return res.send(`Skill ID#${skillId} removed from wilder ${wilderId}`);
    }
}

export default wilderController;
