export interface ISkill {
    id: number | string;
    name: string;
}

export interface IGrade extends ISkill {
    level: number | string
}

export interface IWilder {
    id: number | string
    name: string
    description: string
    skills: IGrade[]
}

export interface INewWilderData extends Pick<IWilder, "name"> {
    id?: number | string
    description?: string
    skills?: ISkill[]
}

export interface ComponentWithChildren {
    children: React.ReactNode
}