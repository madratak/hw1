CREATE TABLE User(
    Username varchar(16) PRIMARY KEY,
    Mail varchar(30) UNIQUE NOT NULL,
    Profile_picture varchar(255) DEFAULT NULL,
    Password VARCHAR(255) NOT NULL,
    Num_posts INTEGER DEFAULT 0,
    Num_Following INTEGER DEFAULT 0,
    Num_Followers INTEGER DEFAULT 0
) ENGINE=InnoDB;

CREATE TABLE Playlist(
    Creator varchar(16),
    Name VARCHAR(20),
    Comment varchar(256),
    Num_likes INTEGER DEFAULT 0,
    Data datetime DEFAULT current_timestamp(),
    INDEX idx_u(Creator),
    FOREIGN KEY(Creator) REFERENCES User(Username),
    PRIMARY KEY(Creator, Name)
) ENGINE=InnoDB;

CREATE Table Likes(
    User varchar(16),
    Playlist_creator VARCHAR(16),
    Playlist_name VARCHAR(20),
    INDEX idx_u(Playlist_creator, Playlist_name),
    FOREIGN KEY(Playlist_creator, Playlist_name) REFERENCES Playlist(Creator, Name) ON DELETE CASCADE,
    PRIMARY KEY(User,Playlist_creator,Playlist_name)
) ENGINE=InnoDB;

CREATE Table Comments(
    id integer primary key auto_increment,
    User varchar(16),
    Playlist_creator VARCHAR(16),
    Playlist_name VARCHAR(20),
    COMMENT VARCHAR(256) NOT NULL,
    Data datetime DEFAULT current_timestamp(),
    INDEX idx_u(Playlist_creator, Playlist_name),
    FOREIGN KEY(Playlist_creator, Playlist_name) REFERENCES Playlist(Creator, Name) ON DELETE CASCADE
) ENGINE=InnoDB;

CREATE Table Contents(
    Playlist_creator VARCHAR(16),
    Playlist_name VARCHAR(20),
    INDEX idx_u(Playlist_creator, Playlist_name),
    FOREIGN KEY(Playlist_creator, Playlist_name) REFERENCES Playlist(Creator, Name) ON DELETE CASCADE,
    Song VARCHAR(100) NOT NULL,
    PRIMARY KEY(Playlist_creator, Playlist_name, Song)
) ENGINE=InnoDB;

CREATE Table Following(
    Follower varchar(16) NOT NULL,
    Followed varchar(16) NOT NULL,
    INDEX idx_fd(Followed),
    FOREIGN KEY(Followed) REFERENCES User(Username),
    INDEX idx_fr(Follower),
    FOREIGN KEY(Follower) REFERENCES User(Username),
    PRIMARY KEY(Followed,Follower)
) ENGINE=InnoDB;

-- TRIGGER PER LIKES
DELIMITER //
CREATE TRIGGER insertNumLikes
after insert on Likes
for each row
begin
update Playlist
set Num_likes=Num_likes + 1
where Creator=new.Playlist_creator AND Name=new.Playlist_name;
end //
delimiter ;

DELIMITER //
CREATE TRIGGER deleteNumLikes
before delete on Likes
for each row
begin
update Playlist
set Num_likes=Num_likes - 1
where Creator=old.Playlist_creator AND Name=old.Playlist_name;
end //
delimiter ;

-- TRIGGER PER SEGUACI E SEGUITI

DELIMITER //
CREATE TRIGGER insertFollowing
after insert on Following
for each row
begin
update Profilo
set Num_Followers=Num_Followers + 1
where Username=new.Followed;
update Profilo
set Num_Following=Num_Following + 1
where Username=new.Follower;
end //
delimiter ;

DELIMITER //
CREATE TRIGGER deleteFollowing
before delete on Following
for each row
begin
update Profilo
set Num_Followers=Num_Followers - 1
where Username=old.Followed;
update Profilo
set Num_Following=Num_Following - 1
where Username=old.Follower;
end //
delimiter ;

-- TRIGGER PER NUM_POST

DELIMITER //
CREATE TRIGGER insertNumPosts
after insert on Playlist
for each row
begin
update User
set Num_posts=Num_posts + 1
where Username=new.Creator;
end //
delimiter ;

DELIMITER //
CREATE TRIGGER deletePlaylist
BEFORE delete on Playlist
for each row
begin
update User
set Num_posts=Num_posts - 1
where Username=old.Creator;
end //
delimiter ;

show TRIGGERs;
