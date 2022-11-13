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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sleeperService = void 0;
const fs = require('fs');
const axios_1 = __importDefault(require("axios"));
class sleeperService {
    constructor() { }
    getAllPlayers() {
        return __awaiter(this, void 0, void 0, function* () {
            let rawdata = fs.readFileSync('players.json');
            let players = JSON.parse(rawdata);
            return players;
        });
    }
    getAllTeams() {
        return __awaiter(this, void 0, void 0, function* () {
            let result = yield axios_1.default.get(`https://api.sleeper.app/v1/league/793155425347432448/rosters`);
            let teams = result.data;
            return teams;
        });
    }
    getAllOwners() {
        return __awaiter(this, void 0, void 0, function* () {
            let result = yield axios_1.default.get(`https://api.sleeper.app/v1/league/793155425347432448/users`);
            let users = result.data;
            return users;
        });
    }
}
exports.sleeperService = sleeperService;
//# sourceMappingURL=sleeperService.js.map