const { dataSource } = require("../db");
const Wilder = require("../entity/Wilder");
const Skill = require("../entity/Skill");

module.exports = {
  getWilder: async (req, res) => {
    console.log(req.params);
    const { id } = req.params;
    const wilder = await dataSource
      .getRepository(Wilder)
      .find({ where: { id } });
    if (wilder.length !== 1) return res.status(404).send("Wilder not found");
    return res.json(wilder);
  },
  getWilders: async (req, res) => {
    const wilders = await dataSource.getRepository(Wilder).find({});
    return res.json(wilders);
  },
  createWilder: async (req, res) => {
    const { name } = req.body;
    const id = await dataSource
      .getRepository(Wilder)
      .save({ name })
      .then((e) => e.id);
    return res.redirect(`/api/wilder/${id}`);
  },
  deleteWilder: async (req, res) => {
    const { id } = req.params;
    await dataSource.getRepository(Wilder).delete({ id });
    return res.send(`Wilder ${id} deleted`);
  },
  updateWilder: async (req, res) => {
    const { id } = req.params;
    const { name } = req.body;
    const { affected } = await dataSource
      .getRepository(Wilder)
      .update({ id }, { name });
    if (affected === 0) {
      return res.status(404).send(`Wilder ${id} not found`);
    }
    const wilder = await dataSource
      .getRepository(Wilder)
      .find({ where: { id } });
    return res.json({ message: `Wilder ${id} updated`, wilder });
  },
  deleteWilders: async (req, res) => {
    dataSource.getRepository(Wilder).clear();
    return res.send("All wilders deleted");
  },
  addSkill: async (req, res) => {
    const { id: wilderId } = req.params;
    const { id } = req.body;
    const wilder = await dataSource.getRepository(Wilder).findOne({where: { id: wilderId }});
    if (!wilder) return res.status(404).send("Wilder not found");
    const skill = await dataSource.getRepository(Skill).findOne({where: { id}});
    if (!skill) return res.status(404).send("Skill not found");
    wilder.skills.push(skill);
    await dataSource.getRepository(Wilder).save(wilder);
    return res.send(`Skill ${skill.name} added to wilder ${wilder.name}#${wilder.id}`);
  },
  removeSkill: async (req, res) => {
    const { wilderId,skillId } = req.params;
    const wilder = await dataSource.getRepository(Wilder).findOne({where: { id: wilderId }});
    if (!wilder) return res.status(404).send("Wilder not found");
    console.log(wilder.skills)
    console.log(skillId)
    wilder.skills = wilder.skills.filter(s => s.id !== parseInt(skillId,10));
    console.log(wilder.skills)
    await dataSource.getRepository(Wilder).save(wilder);
    return res.send(`Skill ID#${skillId} removed from wilder ${wilderId}`);
  }
};
