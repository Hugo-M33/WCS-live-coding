import {Column, Entity, OneToMany, PrimaryGeneratedColumn, Relation} from "typeorm"
import SkillToWilder from "./SkillToWilder.js"

@Entity()
export default class Skill {
    @PrimaryGeneratedColumn()
    public id!: number

    @Column()
    public name!: string

    @OneToMany(() => SkillToWilder, (sTw: SkillToWilder) => sTw.skill)
    public grades!: Relation<SkillToWilder>[]
}