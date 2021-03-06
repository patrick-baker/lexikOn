
-- USER is a reserved keyword with Postgres
-- You must use double quotes in every query that user is in:
-- ex. SELECT * FROM "user";
-- Otherwise you will have errors!


-- User information for each user
CREATE TABLE "user" (
    "id" SERIAL PRIMARY KEY,
    "username" VARCHAR (80) UNIQUE NOT NULL,
    "password" VARCHAR (1000) NOT NULL
);

-- Table of all existing words, 
CREATE TABLE "words" (
    "id" SERIAL PRIMARY KEY,
    "english_entry" VARCHAR (80) NOT NULL,
    "russian_entry" VARCHAR (80) NOT NULL,
    "image_url" VARCHAR (300),
    "image_artist" VARCHAR (100) 
);

-- Card sets in application, viewable by everyone, only editable by creator
CREATE TABLE "card_sets" (
    "id" SERIAL PRIMARY KEY,
    "name" VARCHAR (80) NOT NULL,
    "creator_user_id" INT REFERENCES "user" NOT NULL
);

-- Junction table of card_sets and user for all card sets registered to show up in each user's card_sets view
CREATE TABLE "user_sets" (
    "id" SERIAL PRIMARY KEY,
    "user_id" INT REFERENCES "user" NOT NULL,
    "set_id" INT REFERENCES "card_sets" NOT NULL
);

-- Junction table of words and card_sets for which words are included in which sets, 
-- 1 - M relation between words and sets (one word can show up in many sets)
CREATE TABLE "words_in_sets" (
    "id" SERIAL PRIMARY KEY,
    "word_id" INT REFERENCES "words" NOT NULL,
    "set_id" INT REFERENCES "card_sets" NOT NULL
);

-- Junction table of user and words for word statistics for each user,
-- archived boolean decides whether that word should show up on the DOM for that user in all card sets where it is included
CREATE TABLE "user_words" (
    "id" SERIAL PRIMARY KEY,
    "user_id" INT REFERENCES "user",
    "word_id" INT REFERENCES "words",
    "archived" boolean DEFAULT FALSE,
    "number_of_guesses" INT DEFAULT 0,
    "correct_guesses" INT DEFAULT 0,
    "correct_in_a_row" INT DEFAULT 0,
    "last_correct_guess" date
);

-- make two or more users on registration page before running following code

-- -- initial word entries
-- INSERT INTO "words" ("english_entry", "russian_entry", "image_url")
-- VALUES ('Water', 'Воды', 'https://pixabay.com/get/57e8d44a4f5aaa14f6da8c7dda79367a163fd9e256556c4870287fd5974bcd5bbd_640.jpg');

-- INSERT INTO "words" ("english_entry", "russian_entry", "image_url")
-- VALUES ('Food', 'Еда', 'https://pixabay.com/get/57e8dd444851ad14f6da8c7dda79367a163fd9e256556c4870287fd59f49c25bbb_1280.jpg');

-- -- initial card set creations, one for each user
-- INSERT INTO "card_sets" ("name", "creator_user_id")
-- VALUES ('simple words', 1), ('easy words', 2);

-- -- entries so that each card set shows up for each user.
-- INSERT INTO "user_sets" ("user_id", "set_id")
-- VALUES (1, 1), (1, 2), (2, 1), (2, 2);