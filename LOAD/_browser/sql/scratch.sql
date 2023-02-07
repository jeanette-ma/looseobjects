SELECT r.code, r.soundId, l.cnt FROM
(SELECT code, soundId
	FROM windfarms as w
	LEFT JOIN recordings as r
	GROUP by code, soundId
	) as r
	LEFT JOIN
(SELECT code, soundId, count(soundId) as cnt
	FROM windfarms as w
	LEFT JOIN recordings as r
	on w.code = r.wfCode
	GROUP by code, soundId
	) as l
	on l.code = r.code and l.soundId = r.soundId;
	
select filename, datetime as 'time', durationSec as 'duration', wtgId, wfCode, s.type
from recordings as r
INNER JOIN sounds as s
on s.id = r.soundId

INSERT INTO user_processed VALUES
	(1,0,'CHWMA'),
	(2,1,'HUITE'),
	(3,1,'OLITI');

select r.id, filename, r.datetime as 'time', durationSec as 'duration', wtgId, wfCode, s.type as 'soundType'
    from recordings as r
    INNER JOIN sounds as s
    on s.id = r.soundId
	
SELECT t.id, filename, time, duration, wtgId, wfCode, soundType
FROM
(select r.id, filename, r.datetime as 'time', durationSec as 'duration', wtgId, wfCode, s.type as 'soundType'
    from recordings as r
    INNER JOIN sounds as s
    on s.id = r.soundId) as t 
	
LEFT JOIN user_processed as p
on p.recId = t.id
WHERE p.recId is not NULL

select r.id, filename, r.datetime as 'time', durationSec as 'duration', wtgId, wfCode, s.type as 'soundType'
    from (SELECT r.* FROM recordings as r
LEFT JOIN user_processed as p
on p.recId = r.id
WHERE p.recId is not NULL) as r
    INNER JOIN sounds as s
    on s.id = r.soundId

(SELECT r.* FROM recordings as r
LEFT JOIN user_processed as p
on p.recId = r.id
WHERE p.recId is not NULL) as r

SELECT r.* FROM recordings as r
LEFT JOIN user_processed as p
on p.recId = r.id
WHERE p.recId is NULL

SELECT r.code, r.soundId, l.cnt FROM
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
	on l.code = r.code and l.soundId = r.soundId;
