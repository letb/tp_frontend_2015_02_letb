define([
	'backbone',
	'models/score'
], function(
	Backbone,
	ScoreModel
) {
	var ScoreCollection = Backbone.Collection.extend({
		model: ScoreModel,

    comparator: function(score) {
      return -score.get('score')
    }
	});

	return new ScoreCollection
    ([
      { name: "Flying Dutchman", score: 123  },
      { name: "Black Pearl", score: 27381    },
      { name: "lladrona", score: 9287        },
      { name: "Simply doodler", score: 28    },
      { name: "eliot White", score: 11       },
      { name: "shallowday", score: 892       },
      { name: "helloworld", score: 198       },
      { name: "LkJASdjkhASh", score: 0       },
      { name: "llll", score: 999999999       },
      { name: "Londoners Prisoner", score: 0 }
    ]);
});
