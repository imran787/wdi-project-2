const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
const env = require('../config/env');

const Review = require('../models/review');

mongoose.connect(env.db, () => {
  console.log('connected');
});

//delete after seed
Review.collection.drop();

Review
.create([
  {
    title: 'Ghost in the Shell',
    genre: 'Fantasy',
    review: 'Initially, After the Storm has an interesting case of arrested development on its hands. Shinoda Ryota (Hiroshi Abe) is a once-bestselling novelist slumming it as a private detective, trying not to gamble away the alimony he owes. Too soon, though, the film gives up on his seedy universe and coops him up in an apartment with his ex-wife, mother and son. Hirokazu Koreedas script does offer some pearls of wisdom about families teasing and spurning each other. Ultimately, it hangs too much solely on the deadbeat Ryota. Like so many sad-bastard movies, it assumes he has a level of depth we never see',
    rating: 2
  }, {
    title: 'Logan',
    genre: 'Fantasy',
    review: 'The film\'s surfeit of positive elements ultimately can\'t quite combat a palpably overlong running time and thoroughly bland villain, however, with the buildup to the predictably action-packed climax, for example, suffering from a meandering and overly lackadaisical vibe that\'s problematic (to put it mildly). Said climax, when it finally does arrive, is unquestionably worth the wait and the whole thing concludes on an impressively spellbinding note, which, when coupled with the movie\'s refreshingly adult-oriented atmosphere, confirms Logan\'s place as one of the best comic-book adaptations to come around since Christopher Nolan\'s Batman trilogy.',
    rating: 3
  },{
    title: 'Get Out',
    genre: 'Thriller',
    review: ' These kind of dual associations are all over Get Out, the wildly entertaining directorial debut of sketch-comedy chameleon Jordan Peele. For every moment that sparks the recall function of horror buffs, there’s another that may provoke, for some portion of the audience, a much less pleasant twinge of recognition. The cold open described above could have come straight from the comedian\’s brilliant, defunct variety show, Key & Peele—especially one of its Halloween episodes, which put culturally pointed spins on scary-movie tropes. Here, though, a punchline never arrives. And that\’s because Peele, who also wrote the screenplay, has made a bona fide fright flick with dashes of cringe comedy, not the other way around. Maybe he got tired of laughing at the living, breathing reality of racism in America. Screaming is a good reaction, too.',
    rating: 4
  },{
    title: 'Kong: Skull Island',
    genre: 'Fantasy/Science Fiction',
    review: 'Monsters always mean things: the original Godzilla was subjugation under the A-bomb blast, the Cloverfield mega-crustacean raw panic in the face of 21st century terror. This Kong, who kebabs military hardware on palm trees, is humiliation on the world stage writ large – 100 feet large, to be exact. No world power likes to be made a monkey of, but especially by… well, you know.',
    rating: 3
  }, {
    title: 'The Fate of the Furious',
    genre: 'Thriller',
    review: 'The eighth movie in the series, The Fate of the Furious, is as big as the world stage, and as gloriously, unapologetically dumb as its creators could make it. It\’s also meant as a new start for the series, a recentering after the death of original series star Paul Walker, and the kickoff of a trilogy that continues its characters\’ mutation from criminals in a soap opera melodrama to globetrotting, government-sanctioned action-heroes in a soap opera melodrama. We consider the series\’s new and bigger look, and say that this has gotten too fast and too furious for us!',
    rating: 2
  }
])
.then(reviews => {
  console.log(`${reviews.length} reviews have been created`);
})
.catch(err => {
  console.log(`Error: ${err}`);
})
.finally(() => {
  mongoose.connection.close();
});
