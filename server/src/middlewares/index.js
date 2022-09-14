module.exports = {
    assertName: (req, res, next) => {
        const {name} = req.body
        console.log(req.body)
        if (name === undefined) {
            return res.status(400).send('Name is required')
        }
        if (name.length < 1 || name.length > 100) {
            return res.status(400).send('Name must be between 1 and 100 characters long.')
        }

        //req.body.name = req.body.name.capitalize()
        next()
    },
    parseId: (req, res, next) => {
        const {id} = req.body
        if (typeof id === 'string') {
            req.body.id = parseInt(id)
        }
        next()
    }
}