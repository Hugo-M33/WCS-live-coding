const {EntitySchema} = require('typeorm');

module.exports = new EntitySchema({
    name: 'Wilder',
    columns: {
        id: {
            primary: true,
            generated: true,
            type: 'int',
        },
        name: {
            type: 'text',
        },
        description: {
            type: 'text',
            nullable: true
        }
    },
    relations: {
        skills: {
            target: 'Skill',
            type: 'many-to-many',
            joinTable: true,
            eager: true,
        },
    }
});
