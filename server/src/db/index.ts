import typeorm from "typeorm"
import Skill from "../entity/Skill.js";
import Wilder from "../entity/Wilder.js";
import SkillToWilder from "../entity/SkillToWilder.js";

export const dataSource = new typeorm.DataSource({
    type: 'sqlite',
    database: './wildersdb.sqlite',
    synchronize: true,
    entities: [Skill, Wilder, SkillToWilder],
})
