DROP TABLE if EXISTS user_processed;
DROP TABLE if EXISTS recordings;
DROP TABLE if EXISTS sounds;
DROP TABLE if EXISTS windfarms;

CREATE TABLE windfarms (
    code char(5) NOT NULL PRIMARY KEY,
    name varchar(32) NOT NULL
);

CREATE TABLE sounds (
	id INTEGER NOT NULL PRIMARY KEY, 
	type varchar(32) NOT NULL
);

CREATE TABLE recordings (
    id INTEGER NOT NULL PRIMARY KEY,
    filename varchar(260) NOT NULL,
    datetime timestamp NOT NULL,  
    durationSec INTEGER,
    soundId INTEGER CHECK (soundId in(0,1,2)), 
    accuracyPC INTEGER,
	wtgId char(3) NOT NULL,
    capacityMw float(2),
    micModel varchar(32),
    wfCode char(5) NOT NULL,
    FOREIGN key (wfCode) REFERENCES windfarms(code),
	FOREIGN key (soundId) REFERENCES sounds(id)
); 

CREATE TABLE user_processed (
	recId  NOT NULL PRIMARY KEY,
	decision INTEGER CHECK (decision in (0,1)) Not NULL,
	userIntials char(5),
	datetime timestamp NOT NULL,
	FOREIGN key (recId) REFERENCES recordings(id)
);

INSERT INTO sounds VALUES
	(0, 'False Alarm'),
	(1, 'Bolt Sound'),
	(2, 'Other Sound');

INSERT INTO windfarms VALUES
    ('ANH01','Anholt'),
    ('BBW01','Burbo Bank'),    
    ('BBW02','Burbo Bank Extension'),    
    ('BID01','Block Island'),
    ('BKR01','Borkum Riffgrund 1'),
    ('BKR02','Borkum Riffgrund 2'),
    ('BOW01','Barrow'),
    ('BSW01','Borssele 1'),
    ('BSW02','Borssele 2'),
    ('GFS01','Gunfleet Sands 1'),
    ('GFS02','Gunfleet Sands 2'),
	('GFS03','Gunfleet Sands 3'),
	('GOW01','Gode Wind 1'),
	('GOW02','Gode Wind 2'), 
	('HOW01','Hornsea 1'),
	('HOW02','Hornsea 2'),
	('HRV01','Horns Rev 1'),
	('HRV02','Horns Rev 2'),
	('LAW01','London Array'),
	('LIC01','Lincs'),
	('NHP01','Nysted'),
	('ROW01','Race Bank'),
	('WDS01','West of Duddon Sands'),
	('WMR01','Westermost Rough'), 
	('WOW01','Walney 1'),
	('WOW02','Walney 2'), 
	('WOW03','Walney 3');

INSERT INTO recordings VALUES
    (1, 'bolt.mp3','2021-11-06 13:15:40', 3, 1, 83,'A02', 3.6, 'DLO 15026-U', 'BOW01'),
    (2, 'false.mp3','2023-01-24 23:15:40', 2, 0, 90,'C07', 6, 'DLO 15028-B', 'GFS02'),
	(3, 'other.mp3','2023-01-02 08:15:40', 3, 2, 85,'K06', 6, 'DLO 15028-B', 'NHP01'),
	(4, 'other.mp3','2023-01-02 08:15:40', 3, 2, 85,'K06', 6, 'DLO 15028-B', 'NHP01'),
	(5, 'other.mp3','2023-01-02 08:15:40', 3, 2, 85,'K06', 6, 'DLO 15028-B', 'BOW01'),
	(6, 'other.mp3','2023-01-24 23:15:40', 2, 1, 90,'C07', 6, 'DLO 15028-B', 'GFS02'),
	(7, 'bolt.mp3','2023-01-24 23:15:40', 2, 2, 90,'C07', 6, 'DLO 15028-B', 'GFS02');
