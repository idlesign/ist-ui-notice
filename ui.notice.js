/*
 * Notice Draft 0.2
 * for jQuery UI
 *
 * Copyright (c) 2009 idle sign
 *
 * Depends:
 *	ui.core.js
 *	effects.pulsate.js
 */
(function($) {

	$.widget('ui.notice', {

		// create notice
		_init: function() {
			
			if (this.element.is('div')) {
				var o = this.options;

				this.noticeBox = this.element;
				if (!o.autoShow) this.hide();
				this.noticeBox.attr('role', 'notice')
				this.noticeBox.wrapInner('<div><span></span></div>');
				this.innerBox = this.noticeBox.children().eq(0).addClass(o.innerBoxClass);
				this.textBox = this.innerBox.children().eq(0);					
				this.storedText = this.textBox.html();
				// custom text
				if (o.text) this.text(o.text);
				this.innerBox.prepend('<span/>');
				this.iconBox = this.innerBox.children().eq(0);
				this.noticeBox.addClass(o.widgetClass);
				this.setType(o.type);
				if (o.autoShow)	this.animate();
			}

		},

		text: function(text){
			this.textBox.html(text);
		},

		setType: function(type){
			if (this.bordersClass) this.innerBox.removeClass(this.bordersClass);
			if (this.iconClass) this.iconBox.removeClass(this.iconClass);
			switch (type) {
				case 'error':
					this.bordersClass = 'ui-state-error';
					this.iconClass = 'ui-icon ui-notice-icon ui-icon-alert';
					break;
				default:
					this.bordersClass = 'ui-state-highlight';
					this.iconClass = 'ui-icon ui-notice-icon ui-icon-info';
					break;
			}
			this.innerBox.addClass(this.bordersClass);
			this.iconBox.addClass(this.iconClass);
		},

		show: function(params){
			if (params){
				if (params.type) this.setType(params.type)
				if (params.text) this.text(params.text);
			}
			this.animate();
		},

		animate: function(){
			var o = this.options,
				fn = '';

			if (o.animate){
				if (o.autoHide){
					fn = function(){ $(this).hide(); }
				}
				this.noticeBox.effect('pulsate', { times:3 }, 1000, fn );
			} else {
				this.noticeBox.show();
			}
		},

		hide: function(){
			this.noticeBox.hide();
		},

		destroy: function(){
			var o = this.options;
			this.innerBox
				.removeClass(o.innerBoxClass)
				.removeClass(this.borderClass);
			this.noticeBox
				.html(this.storedText)
				.removeAttr('role')
				.removeClass(o.widgetClass);
		}

	});

	$.extend($.ui.notice, {
		version: '0.2',
		defaults: {
			type: 'alert',
			text: false,
			animate: true,
			autoShow: true,
			autoHide: false,
			// styling
			widgetClass: 'ui-helper-reset ui-widget',
			innerBoxClass: 'ui-corner-all ui-notice-inner'
		}
	});


})(jQuery);