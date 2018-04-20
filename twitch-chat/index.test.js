
const twitch_votes = require('./index');

beforeEach(() => {
  delete twitch_votes['word_count']['ak47'];
});

test('add a vote for ak47 and validate', () => {

  twitch_votes['add_vote']('ak47');
  expect(twitch_votes['word_count']['ak47']).toBe(1);
});

test('add 2 and remove 1  vote for ak47 and validate', () => {

  twitch_votes['add_vote']('ak47');
  twitch_votes['add_vote']('ak47');
  twitch_votes['sub_vote']('ak47');
  expect(twitch_votes['word_count']['ak47']).toBe(1);

});
