
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
    "image_url" VARCHAR (300) 
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