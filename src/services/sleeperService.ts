const fs = require('fs');
import axios, { AxiosResponse } from "axios";

interface User{
    user_id: string,
    settings: any,
    metadata: any,
    league_id: string,
    is_owner: boolean,
    is_bot: boolean,
    display_name: string,
    avatar: string
}

interface Team{
    taxi: string[],
    starters: string[],
    settings: TeamSettings,
    roster_id: number,
    reserve: string[],
    players: string[],
    player_map: any,
    owner_id: string,
    metadata: TeamMetadata,
    league_id: string,
    keepers: any,
    co_owners: any
}

interface TeamMetadata{
    streak: string,
    restrict_pn_scoring_starters_only: string,
    record: string,
    allow_pn_scoring: string,
    allow_pn_player_injury_status: string,
    allow_pn_inactive_starters: string
}

interface TeamSettings{
    wins: number,
    waiver_position: number,
    waiver_budget_used: number,
    total_moves: number,
    ties: number,
    ppts_decimal: number,
    ppts: number,
    losses: number,
    fpts_decimal: number,
    fpts_against_decimal: number,
    fpts_against: number,
    fpts: number,
    division: number
}

class sleeperService{
    constructor(){}

    async getAllPlayers(){
        let rawdata = fs.readFileSync('players.json');
        let players = JSON.parse(rawdata);

        return players;
    }

    async getAllTeams(){
        let result: AxiosResponse = await axios.get(
            `https://api.sleeper.app/v1/league/793155425347432448/rosters`
          );
        let teams: [Team] = result.data;

        return teams;
    }

    async getAllOwners(){
        let result: AxiosResponse = await axios.get(
            `https://api.sleeper.app/v1/league/793155425347432448/users`
          );
        let users: [User] = result.data;

        return users;
    }
}

export {
    sleeperService,
    Team,
    User
}