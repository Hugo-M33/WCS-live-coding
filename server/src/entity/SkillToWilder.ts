import {Column, Entity, ManyToOne, PrimaryGeneratedColumn, Relation} from "typeorm"
import Wilder from "./Wilder.js"
import Skill from "./Skill.js"


@Entity()
export default class SkillToWilder {
    @PrimaryGeneratedColumn()
    public skillToWilderId!: number

    @Column()
    public wilderId!: number

    @Column()
    public skillId!: number

    @Column()
    public level!: number

    @ManyToOne(() => Wilder, (w: Wilder) => w.grades)
    public wilder!: Relation<Wilder>

    @ManyToOne(() => Skill, (s: Skill) => s.grades)
    public skill!: Relation<Skill>
}