require("dotenv").config();

module.exports = {
    token: process.env.TOKEN || "MTAzMzY3NzUzMjQzMzc0Mzk1Mg.GhVxBB.gcVZF8KWpDu8J3oBq1ddfFQIhjcD8a45Gw0PCo",
    clientID: process.env.CLIENT_ID || "1033677532433743952", // your bot client id
    prefix: process.env.PREFIX || "$", // bot prefix
    ownerID: process.env.OWNERID || "936206955050041356", //your discord id,
    dbd_license: 'd0ffb3cc-cacb-4111-b82f-99a20516caa2',
    redirect_uri: 'http://localhost/discord/callback',
    discord: {
        bot_token: 'MTAzMzY3NzUzMjQzMzc0Mzk1Mg.GhVxBB.gcVZF8KWpDu8J3oBq1ddfFQIhjcD8a45Gw0PCo',
        client_id: '1033677532433743952',
        client_secret: 'A1vSLD8luPbvl5oHNb9Ut_l8GVnO5_Zx'
    }
}