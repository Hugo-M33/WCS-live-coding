const { dataSource } = require("../db");
const Skill = require("../entity/Skill");

module.exports = {
  getSkill: async (req, res) => {
    console.log(req.params);
    const { id } = req.params;
    const skill = await dataSource
      .getRepository(Skill)
      .find({ where: { id } });
    if (skill.length !== 1) return res.status(404).send("Skill not found");
    return res.json(skill);
  },
  getSkills: async (req, res) => {
    const skills = await dataSource.getRepository(Skill).find({});
    return res.json(skills);
  },
  createSkill: async (req, res) => {
    const { name } = req.body;
    const id = await dataSource
      .getRepository(Skill)
      .save({ name })
      .then((e) => e.id)
      .catch(e => {
        console.log(e)
        res.status(200).send("Skill already exists")
      });
    return res.redirect(`/api/skills/${id}`);
  },
  deleteSkill: async (req, res) => {
    const { id } = req.params;
    await dataSource.getRepository(Skill).delete({ id });
    return res.send(`skill ${id} deleted`);
  },
  updateSkill: async (req, res) => {
    const { id } = req.params;
    const { name } = req.body;
    const { affected } = await dataSource
      .getRepository(Skill)
      .update({ id }, { name });
    if (affected === 0) {
      return res.status(404).send(`Skill ${id} not found`);
    }
    const skill = await dataSource
      .getRepository(Skill)
      .find({ where: { id } });
    return res.json({ message: `Skill ${id} updated`, skill });
  },
  deleteSkills: async (req, res) => {
    dataSource.getRepository(Skill).clear();
    return res.send("All skills deleted");
  },
};
