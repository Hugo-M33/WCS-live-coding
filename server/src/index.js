const express = require('express');
const wilderController = require('./controllers/wilder');
const skillController = require('./controllers/skill');
const { dataSource } = require('./db');
const {assertName, parseId} = require('./middlewares');
const cors = require('cors')

const app = express();
app.use(express.json(), parseId)
app.use(cors())

app.route('/api/wilders')
.get(wilderController.getWilders)
.post(assertName, wilderController.createWilder)
.delete(wilderController.deleteWilders)

app.route('/api/wilders/:id')
.get(wilderController.getWilder)
.delete(wilderController.deleteWilder)
.put(assertName, wilderController.updateWilder)

app.route('/api/skills')
.get(skillController.getSkills)
.post(assertName, skillController.createSkill)
.delete(skillController.deleteSkills)

app.route('/api/wilders/:id')
.get(skillController.getSkill)
.delete(skillController.deleteSkill)
.put(assertName, skillController.updateSkill)

app.post('/api/wilders/:id/skills', wilderController.addSkill)

app.delete('/api/wilders/:wilderId/skills/:skillId', wilderController.removeSkill)
const start = async () => {
  await dataSource.initialize();

  app.listen(3000, () => {
    console.log('listening on port 3000');
  });
};

start();
