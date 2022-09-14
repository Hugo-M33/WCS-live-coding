const {EntitySchema} = require('typeorm');

module.exports = new EntitySchema({
  name: 'Skill',
  columns: {
    id: {
      primary: true,
      generated: true,
      type: 'int',
    },
    name: {
      type: 'text',
      unique: true,
    },
  },
});
