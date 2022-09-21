import {Column, Entity, OneToMany, PrimaryGeneratedColumn, Relation} from "typeorm"
import SkillToWilder from "./SkillToWilder.js"

@Entity()
export default class Wilder {
    @PrimaryGeneratedColumn()
    public id!: number

    @Column()
    public name!: string

    @Column()
    public description!: string

    @OneToMany(() => SkillToWilder, (sTw: SkillToWilder) => sTw.wilder)
    public grades!: Relation<SkillToWilder>[]
}