var Accordion = function( $elm, options ) {

  this.debug = false;
  this.$el = $elm;
  this.options = jQuery.extend( true, {}, $.fn.accordion.defaults, options );

  this.$headers = this.$el.find( '.' + this.options.headerClass );
  this.$parents = this.$headers.parent();  
  this.$el.data('Accordion', this);

};

Accordion.prototype = {

  init : function () {
    this.addButtons();
    this.eventBindings();
    this.reset();
    this.log(this.$el);
    this.log(this.options);

  },

  destroy : function () {
    this.log('Destroy!');
    this.$el.off('click.accordion')
      .find( '.' + this.options.collapseAndExpand.expandAllClass ).remove().end()
      .find( '.' + this.options.collapseAndExpand.collapseAllClass ).remove().end();
  },

  reset : function () {
    this.log('Reseting Accordion to default state...');
    this.collapseAll();
    if ( this.options.showFirstArea ) {
      this.$parents.first().addClass( this.options.expandClass );
    }    
  },

  log : function ( txt ) {
    if ( this.debug ) { console.log( txt ); }
  },

  clickHandler : function( event ) {

    var $el = $( event.target ),
        $p = $el.parent(),
        obj = event.data,
        opts = obj.options;
    
    if ( $el.hasClass( opts.collapseAndExpand.expandAllClass ) ) {
      $el.trigger('accordion-expand-all');
      obj.expandAll(); obj.isOneButton($el); return;
    }

    if ( $el.hasClass( opts.collapseAndExpand.collapseAllClass ) ) {
      $el.trigger('accordion-collapse-all');
      obj.collapseAll(); obj.isOneButton($el); return;
    }

    if ( $p.hasClass( opts.expandClass ) && !opts.oneAreaAlwaysVisible ) {
      $el.trigger('accordion-click');
      obj.itemClick( $el );return;
    }

    if ( $el.hasClass( opts.headerClass ) ) {
      obj.allowMultipleAreas();
      $el.trigger('accordion-click');
      obj.itemClick( $el );return;
    }
  },

  allowMultipleAreas : function() {
    if ( !this.options.showMultipleAreas ) {
      this.log('   - Multiples arent allowed.');
      this.log('   - Collapsing Items.');
      this.collapseAll();
    }
  },

  isOneButton : function ($el) {
    this.log('   - Is this One Button? ' + this.options.collapseAndExpand.showAsOneButton);
    if ( this.options.collapseAndExpand.showAsOneButton ) {
      this.log('   - Switching button context.');
      if (! $el.hasClass( this.options.collapseAndExpand.expandAllClass ) ) {
        $el.removeClass( this.options.collapseAndExpand.collapseAllClass ).addClass( this.options.collapseAndExpand.expandAllClass ).text( this.options.collapseAndExpand.expandAllText );
        return;
      }
      $el.removeClass( this.options.collapseAndExpand.expandAllClass ).addClass( this.options.collapseAndExpand.collapseAllClass ).text( this.options.collapseAndExpand.collapseAllText );
    }
  }, 

  eventBindings : function () {
    var self = this;
    this.log('Binding Events...');
    this.$el.on( 'click.accordion' , self, self.clickHandler );
  },


  addButtons : function() {
    var expand, collapse;
    if ( this.options.showCollapseAndExpand ) {
      this.log('Adding Expand All Button...');
      expand = $('<span/>', {'class' : this.options.collapseAndExpand.expandAllClass, 'text': this.options.collapseAndExpand.expandAllText});
      this.log('Add Collpase All button?');
      this.log(( !this.options.collapseAndExpand.showAsOneButton )? 'No.' : 'Yes.');
      collapse = ( !this.options.collapseAndExpand.showAsOneButton ) ? $('<span/>', {'class' : this.options.collapseAndExpand.collapseAllClass, 'text': this.options.collapseAndExpand.collapseAllText}) : '';
      $(this.$el).prepend( expand, collapse ); 
    }
    expand=null; collapse=null;
  },

  itemClick : function ( $el ) {
      var $p = $el.parent();
      $p.toggleClass( this.options.expandClass );
  },

  expandAll : function () {
    this.$parents.addClass( this.options.expandClass );
  },

  collapseAll : function () {
    this.$parents.removeClass( this.options.expandClass );
  }

};

jQuery.fn.accordion = function( options ){
  if (typeof options !== 'string') {
    return this.each(function(){
      var obj = new Accordion( jQuery( this ), options );
      obj.init();
    });
  } else {
    Accordion = $(this).data('Accordion');
    if (Accordion !== null) {
      switch(options) {
        case "init":
          Accordion.init();
          break;
        case "reset":
          Accordion.reset();
          break;
        case "destroy":
        Accordion.destroy();
          break;
      }
    }
  }
};

jQuery.fn.accordion.defaults = {

  headerClass : 'accordion-header',
  contentClass : 'accordion-content',
  expandClass : 'accordion-expanded',
  showMultipleAreas : false,
  showFirstArea : false,
  oneAreaAlwaysVisible : false,
  showCollapseAndExpand : false,
  collapseAndExpand : {
    showAsOneButton : false,
    expandAllClass : 'accordion-expand-all',
    collapseAllClass : 'accordion-collapse-all',
    expandAllText : 'Expand All',
    collapseAllText : 'Collapse All'
  }
};
