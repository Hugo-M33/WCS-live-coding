import express from 'express'
import wilderController from './controllers/wilder.js'
import skillController from './controllers/skill.js'
import {dataSource} from './db/index.js'
import {assertName, parseId} from './middlewares/index.js'
import cors from 'cors'

const app = express();
app.use(cors())
app.use(express.json(), parseId)
const wildersRouter = express.Router()
const skillsRouter = express.Router()

skillsRouter.route('/')
    .get(skillController.getSkills)
    .post(assertName, skillController.createSkill)
    .delete(skillController.deleteSkills)

skillsRouter.route('/id')
    .get(skillController.getSkill)
    .delete(skillController.deleteSkill)
    .put(assertName, skillController.updateSkill)


wildersRouter.route('/')
    .get(wilderController.getWilders)
    .post(assertName, wilderController.createWilder)
    .delete(wilderController.deleteWilders)

wildersRouter.route('/:id')
    .get(wilderController.getWilder)
    .delete(wilderController.deleteWilder)
    .put(assertName, wilderController.updateWilder)

wildersRouter.post('/:wilderId/skills', wilderController.addSkill)

wildersRouter.delete('/:wilderId/skills/:skillId', wilderController.removeSkill)

app.use('/api/wilders', wildersRouter)
app.use('/api/skills', skillsRouter)

const start = async () => {
    await dataSource.initialize();

    app.listen(3000, () => {
        console.log('listening on port 3000');
    });
};

start();
