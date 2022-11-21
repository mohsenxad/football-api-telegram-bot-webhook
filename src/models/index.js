const buildMakeUserChallenge = require('./user-challenge');
const buildMakeUser = require('./user');
const buildMakeUserEvent = require('./user-event');

const makeUserChallenge = buildMakeUserChallenge();
const makeUser = buildMakeUser();
const makeUserEvent = buildMakeUserEvent();

module.exports = Object.freeze(
    {
        makeUserChallenge,
        makeUser,
        makeUserEvent
    }
)