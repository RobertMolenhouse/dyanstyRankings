"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const ktcService_1 = require("../services/ktcService");
const sleeperService_1 = require("../services/sleeperService");
const playerService = new ktcService_1.ktcService();
const sleeper = new sleeperService_1.sleeperService();
const getPlayers = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const allSleepers = yield sleeper.getAllPlayers();
    const teams = yield sleeper.getAllTeams();
    const owners = yield sleeper.getAllOwners();
    const ktcPlayers = yield playerService.getKTCPlayerRankings();
    let rosters = [];
    teams.forEach((team) => {
        //let squad: Roster;
        const owner = owners.find(user => {
            return user.user_id === team.owner_id;
        });
        const ownerName = (typeof owner !== 'undefined') ? owner.display_name : 'unknown';
        let rankedPlayers = [];
        team['players'].forEach(player => {
            const sleeperPlayer = allSleepers[player];
            const ktcPlayer = ktcPlayers.find(p => {
                return p.name === sleeperPlayer.full_name && p.age == sleeperPlayer.age;
            });
            const toAdd = {
                name: sleeperPlayer.full_name,
                age: sleeperPlayer.age,
                position: sleeperPlayer.position,
                rating: (ktcPlayer === null || ktcPlayer === void 0 ? void 0 : ktcPlayer.rating) || 0
            };
            rankedPlayers.push(toAdd);
        });
        rosters.push({
            owner: ownerName,
            players: rankedPlayers
        });
    });
    return res.status(200).json({
        message: rosters,
    });
});
exports.default = {
    getPlayers
};
//# sourceMappingURL=posts.js.map