import { Request, Response, NextFunction } from "express";
import axios, { AxiosResponse } from "axios";
import { ktcService, Player } from "../services/ktcService";
import { sleeperService, Team, User } from "../services/sleeperService";

const playerService = new ktcService();
const sleeper = new sleeperService();

interface Roster {
    owner: string,
    teamName: string,
    players: Player[]
}

const getPlayers = async (req: Request, res: Response, next: NextFunction) => {
    const allSleepers = await sleeper.getAllPlayers();
    const teams = await sleeper.getAllTeams();
    const owners = await sleeper.getAllOwners();
    const ktcPlayers: Player[] = await playerService.getKTCPlayerRankings();

    let rosters: Roster[] = [];

    teams.forEach((team) => {

        const owner = owners.find(user => {
            return user.user_id === team.owner_id;
        });

        const ownerName = (typeof owner !== 'undefined') ? owner.display_name : 'unknown';
        const teamName = (typeof owner !== 'undefined') ? owner.metadata.team_name : 'unknown';
        let rankedPlayers: Player[] = [];
        team['players'].forEach(player => {
            const sleeperPlayer = allSleepers[player];
            const ktcPlayer = ktcPlayers.find(p => {
                return p.name.includes(sleeperPlayer.last_name) 
                    && p.age === sleeperPlayer.age 
                    && p.position === sleeperPlayer.position
                    && p.name.substring(0,1) == sleeperPlayer.first_name.substring(0,1);
            });
            const toAdd: Player = {
                name: sleeperPlayer.full_name,
                age: sleeperPlayer.age,
                position: sleeperPlayer.position,
                rating: ktcPlayer?.rating || 0
            }

            rankedPlayers.push(toAdd);
        });

        rosters.push({
            owner: ownerName,
            teamName: teamName,
            players: rankedPlayers
        });
    });

    return res.status(200).json({
        message: rosters,
    });
};



export default {
    getPlayers
};
