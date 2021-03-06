MyApp.Views.History = Backbone.View.extend({

	tmpl: MyApp.Templates.history,

	events: {
		'click .btn_delete': 'removeHistory',
		'click .history_contents': 'searchHistory'
	},

	initialize: function () {

		_.bindAll(this);

		this.searches = this.options.searches;

		this.searches.fetch();
		this.render();

		MyApp.mediator.on('search', this.addHistory);
		MyApp.mediator.on('changeTab', this.searchCurrentHistory);

		this.listenTo(this.searches, 'add remove', this.render);

	},

	addHistory: function (search) {

		search.id = +new Date();
		this.searches.create(search);

	},

	removeHistory: function (e) {

		var id = this._getHistory(e).id;
		this.searches.get(id).destroy();

	},

	searchHistory: function (e) {

		var history = this._getHistory(e);

		MyApp.mediator.trigger('historySearch', history);
		MyApp.mediator.trigger('historySearch:' + history.service, history);
	},

	searchCurrentHistory: function (service) {

		var historys = [],
			history;

		historys = this.searches.where({
			service: service
		});
		
		if (historys.length) {

			history = historys[0].attributes;
			
			MyApp.mediator.trigger('historySearch', history);
			MyApp.mediator.trigger('historySearch:' + history.service, history);

		}

	},

	render: function () {

		this.$el.html(this.tmpl({
			history: this.searches.toJSON()
		}));

	},

	_getHistory: function (e) {

		var history = {},
		$target = $(e.target).closest('.history');

		history.id = $target.attr('data-id');
		history.service = $target.find('.service').text().replace(/^\(|\)$/g, '');
		history.query = $target.find('.query').text();

		return history;

	}

});