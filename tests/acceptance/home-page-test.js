import Ember from 'ember';
import { module, test } from 'qunit';
import startApp from 'todo-list/tests/helpers/start-app';

module('Acceptance | When visiting the home page', {
  beforeEach: function() {
    this.application = startApp();
    server.createList('todo', 2);
  },

  afterEach: function() {
    Ember.run(this.application, 'destroy');
  }
});

test('the URL should be /', function(assert) {
  visit('/');

  andThen(function() {
    assert.equal(currentURL(), '/');
  });
});

test('a header should be visible', function(assert) {
  visit('/');

  andThen(function() {
    var $header = Ember.$('[data-test-id="header"]');
    assert.equal($header.length, 1);
    assert.equal($header.text().trim(), 'My Todo List');
  });
});

test('you should see a list of todos', function(assert) {
  server.create('todo', 1, {title: 'Test Object'});
  
  visit('/todos');

  andThen(function() {
    var $todos = Ember.$('[data-test-id="todo-card"]');
    assert.equal($todos.length, 2);
  });
});


