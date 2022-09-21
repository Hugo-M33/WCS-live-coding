import {dataSource} from "../db/index.js";
import Skill from "../entity/Skill.js"
import {Controller} from "../types/types";
import {badRequest} from "../middlewares/index.js";
import {
    createSkill,
    deleteAllSkills,
    deleteSkillById,
    getAllSkills,
    getSkillById,
    reloadSkill
} from "../services/skills.js";
import {constants as SCODE} from "http2";

const skillController: Controller = {
    getSkill: async (req, res) => {
        const id = Number(req.params.id);
        const skill = await getSkillById(id)
        if (!skill) return res.status(404).send("Skill not found");
        return res.json(skill);
    },
    getSkills: async (req, res) => {
        const skills = await getAllSkills()
        return res.json(skills);
    },
    createSkill: async (req, res) => {
        try {
            const {name} = req.body;
            const skill = createSkill(name);
            return res.status(SCODE.HTTP_STATUS_CREATED).json(skill)
        } catch (e) {
            return res.status(SCODE.HTTP_STATUS_OK).send("Skill already exists")
        }
    },
    deleteSkill: async (req, res) => {
        const id = parseInt(req.params.id);
        await deleteSkillById(id)
        return res.send(`skill ${id} deleted`);
    },
    updateSkill: async (req, res) => {
        const skillId = parseInt(req.params.id)
        if (!skillId) return badRequest(req, res, () => res.end())
        let skill = await getSkillById(skillId)
        if (!skill) return res.status(404).send(`Skill #${skillId} not found`);
        const {affected} = await dataSource
            .getRepository(Skill)
            .update({id: skillId}, {...req.body});
        if (affected === 0) {
            return res.status(SCODE.HTTP_STATUS_OK).send(`Skill unmodified`);
        }
        skill = await reloadSkill(skill)
        return res.json({message: `Skill ${skill?.id} updated`, skill});
    },
    deleteSkills: async (req, res) => {
        deleteAllSkills()
        return res.send("All skills deleted");
    },
};

export default skillController;
