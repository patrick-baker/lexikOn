# LexikOn

## Description
_Duration: 2-Week Sprint_

LexikOn is created for Russian learners of English who would like to improve their vocabulary in their target language. Whether through reading books, speaking to native speakers, or watching movies and TV shows, these learners are bound to come across new words, which they should like to record and review to learn that new word. With LexikOn, these learners can use a nifty translation system to create word cards with the translated term and an image to boot. These cards are organized in card sets, which users can share and review at their convenience.

## Usage

1. After logging in, users will be brought to their ```home``` page, which will list all of their active card sets.
2. By clicking the plus button near the top of the ```home``` page, users can add a new card set to their list; they can use another users premade set, or they can create their own. 
3. By clicking the edit button near the top ```home``` page, users can remove sets from their list, or edit the name of the set if they are that set's creator. Note that a set will be permanently deleted if a user tries to remove their own set from their list.
4. By clicking on a set, a user will go to that set's ```word list``` page.
5. The ```word list``` page shows all of the words in the chosen set. If the user is the set's creator, there will be a plus button and an x button near the set title. The plus button brings the user to the ```add word```, while the x button allows the user to delete a word from that set.
6. The ```add word``` page allows a user to enter input, either Russian or English, and generates a translation in the target language for that user. An image is also generated for the translation. If a user is satisfied with the output, they can add the word by pressing the Add Word button near the bottom of the screen, and that word will be added to their card set.

### Prerequisites

Link to software that is required to install the app (e.g. node).

- [Node.js](https://nodejs.org/en/)
- [PostgreSQL](https://www.postgresql.org/download/)

## Installation

1. Get to main project directory in command line, assuming node is installed, and type in `npm install` to install required dependencies.
2. Install postgreSQL at [this](https://www.postgresql.org/download/) link.
3. Install postgreSQL GUI like [Postico](https://eggerapps.at/postico/).
4. Run commands from database.sql file in Postico to create table, in `prime_feedback` database.


## Built With
- _node.js_
- _Express.js_
- _React_ 
- _Redux_
- _Redux-Sagas_
- _postgreSQL_
- _MaterialUI_
- _React-Transition-Group_
- _Yandex-Translate-API_
- _Unsplash-API_

## Support

If you have any questions, feel free to email me at bakerpj1992@gmail.com

## Acknowledgments

* Shoutout to all of Prime staff for being so supportive and being such great teachers.
* Thanks to Yandex and Unsplash for having great documentation and APIs that are quick and easy to implement.

---

## Where I want to go from here

- [ ] Study mode, which allows a user to study words from either origin language, and keeps track of their success throughout (correct guesses, date since last correct[most likely using moment.js], amount of times guessed, a guess timer, and some algorigthm for deciding the order in which to show the words).
- [ ] A words information page that renders according to user, with their information in regards to study mode.
- [ ] Some sort of gamification to encorage users to study more often.
- [ ] A search feature which allows users to search all translations stored in the database.
- [ ] Improvements to the UI which make it more intuitive for new users.