const buildMakeUserChallenge = require('./user-challenge');
const buildMakeUser = require('./user');

const makeUserChallenge = buildMakeUserChallenge();
const makeUser = buildMakeUser();

module.exports = Object.freeze(
    {
        makeUserChallenge,
        makeUser
    }
)