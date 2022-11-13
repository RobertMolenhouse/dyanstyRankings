import Puppeteer from "puppeteer";

interface Player {
    name: string,
    position: string,
    rating: number,
    age: number
}

class ktcService {

    constructor() { }

    getKTCPlayerRankings = async () => {
        const browser = await Puppeteer.launch();
        const page = await browser.newPage();
        page.waitForSelector('script');
        await page.goto('https://keeptradecut.com', { timeout: 0 });

        const playersArray: any = await page.evaluate("playersArray");
        const smallArray: [Player] = playersArray.map((player: any): Player => {
            return {
                name: player.playerName.replaceAll('.', ''),
                position: player.position,
                rating: player.superflexValues.value,
                age: player.age
            };
        });

        return smallArray;
    }
}

export {
    ktcService,
    Player
}