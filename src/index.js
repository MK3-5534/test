const ClientHandler = require("./structures/Client");
const client = new ClientHandler();

client.connect()
const config = require('./config.js');



const DarkDashboard = require('dbd-dark-dashboard');
const DBD = require("discord-dashboard");
let langsSettings = {};

(async ()=>{
    let DBD = require('discord-dashboard');
    await DBD.useLicense(config.dbd_license);
    DBD.Dashboard = DBD.UpdatedClass();

    const Dashboard = new DBD.Dashboard({
        port: 80,
        client: {
            id: config.discord.client_id,
            secret: config.discord.client_secret
        },
        redirectUri: config.redirect_uri,
        domain: 'https://teams.mk3-5534.repl.co',
        bot: client,
        theme: DarkDashboard(DBD.default_configs.dbdDarkDashboard),
        settings: [
            {
                categoryId: 'setup',
                categoryName: "Setup",
                categoryDescription: "Setup your bot with default settings!",
                categoryOptionsList: [
                    {
                        optionId: 'lang',
                        optionName: "Language",
                        optionDescription: "Change bot's language easily",
                        optionType: DBD.formTypes.select({"Polish": 'pl', "English": 'en', "French": 'fr'}),
                        getActualSet: async ({guild}) => {
                            return langsSettings[guild.id] || null;
                        },
                        setNew: async ({guild,newData}) => {
                            langsSettings[guild.id] = newData;
                            return;
                        }
                    },
                ]
            },
        ]
    });
    Dashboard.init();
})();
  
module.exports = client;