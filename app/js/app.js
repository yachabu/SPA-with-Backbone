MyApp.App = Backbone.View.extend({

  el: '#app',
  
  tmpl: _.template(
    '<header id="search_bar"></header>' +
    '<div id="main" class="container-fluid">' +
    '  　<div class="row-fluid">' +
    '    <div id="history" class="span2"></div>' +
    '    <div id="search_results" class="span10"></div>' +
    '  </div>' +
    '</div>' +
    '<footer id="footer" class="footer"></footer>'
  ),

  events: {
    'search #search_bar': 'newSerach'
  },

  initialize: function() {
    
    //Mediator作成
    _.extend(MyApp.Mediator, Backbone.Events);
    
    this.$el.html(this.tmpl());

    this.history = new MyApp.Views.History({
      el: this.$el.find('#history'),
      searches: new MyApp.Collections.SearchList()
    });

    this.searchBar = new MyApp.Views.SearchBar({
      el: this.$el.find('#search_bar')
    });

    this.searchResult = new MyApp.Views.SearchResults({
      el: this.$el.find('#search_results')
    });
    
    this.footer = new MyApp.Views.Footer({
      el: this.$el.find('#footer')
    });
    
  },
  
  newSerach: function(e, search){
    MyApp.Mediator.trigger('add:search', search);
  }

});

new MyApp.App();