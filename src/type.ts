// @ts-ignore
interface GameCfg {
    isAutoBattle: boolean,
    isStopped: boolean,
    keepingAP: number,
    mapId: string,
    battleMaps: string[],
    recruitIgnoreRobot: boolean,
    recruitReserve: number,
    enableBuildingArrange: boolean
}
interface GameInfo {
    config: {
        account: string
        platform: number
        isPause: boolean
    },
    status: {
        code: number
        text: string
    },
    captcha_info: {
        captcha_type: string,
        challenge: string,
        created: number,
        gt: string
    },
    game_config: GameCfg
}
interface Details {
    consumable: object,
    inventory: object,
    status: {
        androidDiamond: number,
        ap: number,
        avatar: {
            type: string,
            id: string
        },
        diamondShard: number,
        gachaTicket: number,
        gold: number,
        lastApAddTime: number,
        lastOnlineTs: number,
        level: number,
        maxAp: number,
        nickName: string,
        recruitLicense: number,
        secretary: string,
        secretarySkinId: string,
        socialPoint: number,
        tenGachaTicket: number,
    },
    troop: {
        chars: {
            [key: string]: {
                charId: string,
                currentEquip: null,
                currentTmpl: string,
                defaultSkillIndex: number,
                equip: {}
                evolvePhase: number,
                exp: number,
                favorPoint: number,
                gainTime: number,
                instId: number,
                level: number,
                mainSkillLvl: number,
                potentialRank: number,
                skills: []
                skin: string
            }
        },
        squads: object,
    }
    lastFreshTs: number
}
interface Log{
    info: string
    ts: number
}
interface Stage {
    id: string
    name: string
    code: string
    ap: number
    items: number[]
}
interface Items {
    name: string
    icon: string
}
interface Node {
    name: string
    number: number,
    cpu: number
    cpuAvg: number
    update_UTCTime: number
    boot_UTCTime: number
}