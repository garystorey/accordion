var Accordion = function( $elm, options ) {

  this.debug = false;
  this.$el = $elm;
  this.options = jQuery.extend( true, {}, jQuery.fn.accordion.defaults, options );

  this.$headers = this.$el.find( '.' + this.options.headerClass );
  this.$parents = this.$headers.parent();  
  this.$el.data('Accordion', this);

};

Accordion.prototype = {

  init : function () {
    this._addButtons();
    this._eventBindings();
    this.reset();
    this._log(this.$el);
    this._log(this.options);

  },

  destroy : function () {
    this._log('Destroy!');
    this.$el.off('click.accordion')
      .find( '.' + this.options.collapseAndExpand.expandAllClass ).remove().end()
      .find( '.' + this.options.collapseAndExpand.collapseAllClass ).remove().end();
  },

  reset : function () {
    this._log('Reseting Accordion to default state...');
    this._collapseAll();
    if ( this.options.showFirstArea ) {
      this.$parents.first().addClass( this.options.expandClass );
    }    
  },

  _log : function ( txt ) {
    if ( this.debug ) { console.log( txt ); }
  },

  _clickHandler : function( event ) {

    var $el = jQuery( event.target ),
        $p = $el.parent(),
        obj = event.data,
        opts = obj.options;
    
    if ( $el.hasClass( opts.collapseAndExpand.expandAllClass ) ) {
      $el.trigger('accordion-expand-all');
      obj._expandAll(); obj._isOneButton($el); return;
    }

    if ( $el.hasClass( opts.collapseAndExpand.collapseAllClass ) ) {
      $el.trigger('accordion-collapse-all');
      obj._collapseAll(); obj._isOneButton($el); return;
    }

    if ( $p.hasClass( opts.expandClass ) && !opts.oneAreaAlwaysVisible ) {
      $el.trigger('accordion-click');
      obj._itemClick( $el );return;
    }

    if ( $el.hasClass( opts.headerClass ) ) {
      obj._allowMultipleAreas();
      $el.trigger('accordion-click');
      obj._itemClick( $el );return;
    }
  },

  _allowMultipleAreas : function() {
    if ( !this.options.showMultipleAreas ) {
      this._log('   - Multiples arent allowed.');
      this._log('   - Collapsing Items.');
      this._collapseAll();
    }
  },

  _isOneButton : function ($el) {
    this._log('   - Is this One Button? ' + this.options.collapseAndExpand.showAsOneButton);
    if ( this.options.collapseAndExpand.showAsOneButton ) {
      this._log('   - Switching button context.');
      if (! $el.hasClass( this.options.collapseAndExpand.expandAllClass ) ) {
        $el.removeClass( this.options.collapseAndExpand.collapseAllClass ).addClass( this.options.collapseAndExpand.expandAllClass ).text( this.options.collapseAndExpand.expandAllText );
        return;
      }
      $el.removeClass( this.options.collapseAndExpand.expandAllClass ).addClass( this.options.collapseAndExpand.collapseAllClass ).text( this.options.collapseAndExpand.collapseAllText );
    }
  }, 

  _eventBindings : function () {
    var self = this;
    this._log('Binding Events...');
    this.$el.on( 'click.accordion' , self, self._clickHandler );
  },


  _addButtons : function() {
    var expand, collapse;
    if ( this.options.showCollapseAndExpand ) {
      this._log('Adding Expand All Button...');
      expand = jQuery('<span/>', {'class' : this.options.collapseAndExpand.expandAllClass, 'text': this.options.collapseAndExpand.expandAllText});
      this._log('Add Collpase All button?');
      this._log(( !this.options.collapseAndExpand.showAsOneButton )? 'No.' : 'Yes.');
      collapse = ( !this.options.collapseAndExpand.showAsOneButton ) ? jQuery('<span/>', {'class' : this.options.collapseAndExpand.collapseAllClass, 'text': this.options.collapseAndExpand.collapseAllText}) : '';
      $(this.$el).prepend( expand, collapse ); 
    }
    expand=null; collapse=null;
  },

  _itemClick : function ( $el ) {
      var $p = $el.parent();
      $p.toggleClass( this.options.expandClass );
  },

  _expandAll : function () {
    this.$parents.addClass( this.options.expandClass );
  },

  _collapseAll : function () {
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
    Accordion = jQuery(this).data('Accordion');
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
