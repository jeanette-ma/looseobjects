const SQL = require("sql-template-strings");
const dbPromise = require("./database.js");

// async function retrieveAllEvents() {
//     const db = await dbPromise;
//     return await db.all(SQL`select r.id, filename, datetime as 'time', durationSec as 'duration', wtgId, wfCode, s.type as 'soundType'
//     from recordings as r
//     INNER JOIN sounds as s
//     on s.id = r.soundId`);
// }

async function retrieveNewEvents() {
    const db = await dbPromise;
    return await db.all(SQL`select r.id, filename, r.datetime as 'time', durationSec as 'duration', wtgId, wfCode, s.type as 'soundType'
    from (SELECT r.* FROM recordings as r
    LEFT JOIN user_processed as p
    on p.recId = r.id
    WHERE p.recId is NULL) as r
    INNER JOIN sounds as s
    on s.id = r.soundId`);
}

// async function getCountbyWindfarmAndSound() {
//     const db = await dbPromise;
//     return await db.all(SQL`SELECT r.code, r.soundId, l.cnt FROM
//     (SELECT code, soundId
//     	FROM windfarms as w
//     	LEFT JOIN recordings as r
//     	GROUP by code, soundId
//     	) as r
//     	LEFT JOIN
//     (SELECT code, soundId, count(soundId) as cnt
//     	FROM windfarms as w
//     	LEFT JOIN recordings as r
//     	on w.code = r.wfCode
//     	GROUP by code, soundId
//     	) as l
//     	on l.code = r.code and l.soundId = r.soundId`);
// }

async function getCountbyWindfarmAndSound() {
    const db = await dbPromise;
    return await db.all(SQL`SELECT r.code, r.soundId, l.cnt FROM
        (SELECT code, soundId
        FROM windfarms as w
        LEFT JOIN (SELECT r.* FROM recordings as r
        LEFT JOIN user_processed as p
        on p.recId = r.id
        WHERE p.recId is NULL) as r
    
        GROUP by code, soundId
        ) as r
        LEFT JOIN
    (SELECT code, soundId, count(soundId) as cnt
        FROM windfarms as w
        LEFT JOIN (SELECT r.* FROM recordings as r
    LEFT JOIN user_processed as p
    on p.recId = r.id
    WHERE p.recId is NULL) as r
    
        on w.code = r.wfCode
        GROUP by code, soundId
        ) as l
        on l.code = r.code and l.soundId = r.soundId;`);
}

async function retrieveSingleEvent(eventId) {
    const db = await dbPromise;

    const recording = await db.get(SQL`
        select r.*, s.type as soundType, w.name as wfName
        from recordings as r
        INNER JOIN sounds as s
        on s.id = r.soundId 
        INNER JOIN windfarms as w
        on w.code = r.wfCode
        where r.id = ${eventId}`);

    return recording;
};

async function updateUserDecision(recId, decision, userIntials) {
    const db = await dbPromise;

    await db.run(SQL`
        INSERT INTO user_processed VALUES
	    (${recId},${decision},${userIntials},datetime('now'))`);
};

module.exports = {

    retrieveNewEvents,
    getCountbyWindfarmAndSound,
    retrieveSingleEvent,
    updateUserDecision
};