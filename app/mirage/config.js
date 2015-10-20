/* jshint ignore:start */

import Ember from 'ember';

var Mirage = Ember.Object.extend();

Mirage.reopenClass({
  serialize: function(object) {
    let attributes = Ember.copy(object, true);
    delete attributes.id;
    delete attributes.type;
    return {
      id: object.id,
      type: object.type,
      attributes: attributes
    };
  },
  serializeCollection: function(collection) {
    return {
      data: collection.map(u => { return this.serialize(u); })
    };
  },
  serializeSingle: function(single) {
    return {
      data: this.serialize(single)
    };
  },
  deSerialize: function(object) {
    var data = object['data'];
    var type = data['type'];
    var attributes = data['attributes'];
    attributes['type'] = type;
    return attributes;
  }
});

export default function() {
  this.get('/todos', function(db, request) {
    var todos = db.todos;
    return Mirage.serializeCollection(todos);
  });
}

/* jshint ignore:end */