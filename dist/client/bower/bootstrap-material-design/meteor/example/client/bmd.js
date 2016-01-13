'use strict';

var Buttons = new Mongo.Collection(null);

Template.hello.helpers({
  buttons: function buttons() {
    return Buttons.find();
  }
});

Template.hello.events({
  'click button': function clickButton(event, template) {
    Buttons.insert({ name: _.sample(['No, click ME!', 'Click me too!', 'Click here!', 'Hey!', 'Psst!']) });
  }
});