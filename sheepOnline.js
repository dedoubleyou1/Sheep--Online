BoxBoard = new Meteor.Collection('boxBoard');
FencesBoard = new Meteor.Collection('fencesBoard');


if (Meteor.isClient) {
  Meteor.subscribe('boxBoard');
  Meteor.subscribe('fencesBoard');


  Template.gameBoard.helpers({
    gameBoxes: function() {
      return BoxBoard.find();
    },
    gameFences: function() {
      return FencesBoard.find();
    }
  });

  Template.gameBox.events({
    'click' : function() {
      console.log(this.boxid);
      BoxBoard.update(this._id, {'content': 'S' });
    }
  });

  Template.gameFence.helpers({
    orient: function() {
      if (this.visibility) {
        return 'class="' + this.orientation + ' visibleFence"';
      } else {
        return 'class=' + this.orientation;
      }
    }//,
    // visible: function(){
    //   return 'sup';
    // }
  });

  Template.gameFence.events({
    'click' : function() {
      console.log(this.fenceParents);
      FencesBoard.update(this._id, {'$set': {'visibility': true}});
    }
  });

  Template.hello.events({
    'click input' : function() {
      // template data, if any, is available in 'this'
      if (typeof console !== 'undefined') {
        BoxBoard.find().forEach(function(spot) {
          BoxBoard.update(spot._id, {'content': ''});
        });
      }
    }
  });
}

if (Meteor.isServer) {
  Meteor.startup(function() {
    // code to run on server at startup
    if (BoxBoard.find().count() === 0) {
      for (var i = 5; i < 105; i++) {
        BoxBoard.insert({content: '', boxid: i});
      }
    }

    if (FencesBoard.find().count() === 0) {
      var parent1;
      var parent2;
      var j;
      for (var i = 0; i < 10; i++) {
        for (j = 0; j < 10; j++) {
          if (i === 0) {
            parent1 = 1;
          } else {
            parent1 = i * 10 + j - 5;
          }
          parent2 = i * 10 + j + 5;
          FencesBoard.insert({orientation: 'oddRow', visibility: false, fenceParents: [parent1, parent2]});
        }
        for (j = 0; j < 11; j++) {
          if (j === 0) {
            parent1 = 2;
            parent2 = i * 10 + j + 5;
          } else if (j === 10) {
            parent1 = i * 10 + j + 4;
            parent2 = 3;
          } else {
            parent1 = i * 10 + j + 4;
            parent2 = i * 10 + j + 5;
          }
          FencesBoard.insert({orientation: 'evenRow', visibility: false, fenceParents: [parent1, parent2]});
        }
      }
      for (j = 0; j < 10; j++) {
          parent1 = 95 + j;
          parent2 = 4;
          FencesBoard.insert({orientation: 'oddRow', visibility: false, fenceParents: [parent1, parent2]});
      }

    }

  });
}
