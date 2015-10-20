import Mirage, {faker}  from 'ember-cli-mirage';

export default Mirage.Factory.extend({
  title: faker.lorem.sentence,
  isCompleted: faker.random.boolean,
  type: 'todos'
});
