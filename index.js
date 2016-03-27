'use strict';

function ScreenKeyboard(options)
{
    if (!(this instanceof ScreenKeyboard))
    {
        return new ScreenKeyboard(options);
    }
    
    var self = this;

    this.settings =
    {
        parentElement: document.body,
        draggable: false,
        keyTapCallback: null,
        showTextarea : true,
    	keyboardHTML: '<textarea id="screen-keyboard-textarea" rows="6" cols="60"></textarea>'
			    	+ '<ul id="screen-keyboard-keys">'
			    	+ '<li class="row1 symbol">' 
				    +	'<span class="off">`</span>'
				    +	'<span class="on">~</span>'
			    	+ '</li>'
			    	+ '<li class="row1 symbol">'
			    	+ 	'<span class="on">1</span>'
			    	+ 	'<span class="off">!</span>'
			    	+ '</li>'
			    	+ '<li class="row1 symbol">'
				    + 	'<span class="on">2</span>'
				    + 	'<span class="off">@</span>'
				    + '</li>'
			    	+ '<li class="row1 symbol">'
				    + 	'<span class="on">3</span>'
				    + 	'<span class="off">#</span>'
				    + '</li>'
			    	+ '<li class="row1 symbol">'
				    + 	'<span class="on">4</span>'
				    + 	'<span class="off">$</span>'
				    + '</li>'
			    	+ '<li class="row1 symbol">'
				    + 	'<span class="on">5</span>'
				    + 	'<span class="off">%</span>'
				    + '</li>'
			    	+ '<li class="row1 symbol">'
				    + 	'<span class="on">6</span>'
				    + 	'<span class="off">^</span>'
				    + '</li>'
			    	+ '<li class="row1 symbol">'
				    + 	'<span class="on">7</span>'
				    + 	'<span class="off">&amp;</span>'
				    + '</li>'
			    	+ '<li class="row1 symbol">'
				    + 	'<span class="on">8</span>'
				    + 	'<span class="off">*</span>'
				    + '</li>'
			    	+ '<li class="row1 symbol">'
			    	+ 	'<span class="on">9</span>'
			    	+ 	'<span class="off">{</span>'
			    	+ '</li>'
			    	+ '<li class="row1 symbol">'
				    + 	'<span class="on">0</span>'
				    + 	'<span class="off">}</span>'
					+ '</li>'
					+ '<li class="row1 symbol">'
					+ 	'<span class="on">-</span>'
					+ 	'<span class="off">_</span>'
					+ '</li>'
					+ '<li class="row1 symbol">'
					+ 	'<span class="off">=</span>'
					+ 	'<span class="on">+</span>'
					+ '</li>'
					+ '<li class="row1 delete lastitem">delete</li>'
					+ '<li class="row2 tab">tab</li>'
					+ '<li class="row2 letter">q</li>'
					+ '<li class="row2 letter">w</li>'
					+ '<li class="row2 letter">e</li>'
					+ '<li class="row2 letter">r</li>'
					+ '<li class="row2 letter">t</li>'
					+ '<li class="row2 letter">y</li>'
					+ '<li class="row2 letter">u</li>'
					+ '<li class="row2 letter">i</li>'
					+ '<li class="row2 letter">o</li>'
					+ '<li class="row2 letter">p</li>'
					+ '<li class="row2 symbol">'
					+ 	'<span class="off">[</span>'
					+ 	'<span class="on">(</span>'
					+ '</li>'
					+ '<li class="row2 symbol">'
					+ 	'<span class="off">]</span>'
					+ 	'<span class="on">)</span>'
					+ '</li>'
					+ '<li class="row2 symbol lastitem">'
					+ 	'<span class="off">/\</span>'
					+ 	'<span class="on">|</span>'
					+ '</li>'
					+ '<li class="row3 capslock">caps lock</li>'
					+ '<li class="row3 letter">a</li>'
					+ '<li class="row3 letter">s</li>'
					+ '<li class="row3 letter">d</li>'
					+ '<li class="row3 letter">f</li>'
					+ '<li class="row3 letter">g</li>'
					+ '<li class="row3 letter">h</li>'
					+ '<li class="row3 letter">j</li>'
					+ '<li class="row3 letter">k</li>'
					+ '<li class="row3 letter">l</li>'
					+ '<li class="row3 symbol">'
					+ 	'<span class="off">;</span>'
					+ 	'<span class="on">:</span></li>'
					+ '<li class="row3 symbol">'
					+ 	'<span class="off">' + "'" + '</span>'
					+ 	'<span class="on">&quot;</span>'
					+ '</li>'
					+ '<li class="row3 return lastitem">return</li>'
					+ '<li class="row4 left-shift">shift</li>'
					+ '<li class="row4 letter">z</li>'
					+ '<li class="row4 letter">x</li>'
					+ '<li class="row4 letter">c</li>'
					+ '<li class="row4 letter">v</li>'
					+ '<li class="row4 letter">b</li>'
					+ '<li class="row4 letter">n</li>'
					+ '<li class="row4 letter">m</li>'
					+ '<li class="row4 symbol">'
					+ 	'<span class="off">,</span>'
					+ 	'<span class="on">&lt;</span>'
					+ '</li>'
					+ '<li class="row4 symbol">'
					+ 	'<span class="off">.</span>'
					+ 	'<span class="on">&gt;</span>'
					+ '</li>'
					+ '<li class="row4 symbol">'
					+ 	'<span class="off">/</span>'
					+ 	'<span class="on">?</span>'
					+ '</li>'
					+ '<li class="row4 right-shift lastitem">shift</li>'
					+ '<li class="space lastitem">&nbsp;</li>'
					+ '</ul>'
					+ '<div id="screen-keyboard-submit-button">'
					+ '<svg version="1.1" id="screen-keyboard-submit-button-svg" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="45.022px" height="39.035px" viewBox="0 0 45.022 39.035" enable-background="new 0 0 45.022 39.035" xml:space="preserve" class="checkmark"><path d="M44.577,9.863L16.592,38.6c-0.595,0.579-1.559,0.579-2.153,0L0.446,24.981c-0.595-0.576-0.595-1.517,0-2.094l6.458-6.288c0.594-0.576,1.559-0.576,2.152,0l5.345,5.203L34.889,0.435c0.596-0.58,1.559-0.58,2.153,0l7.535,7.334C45.171,8.346,45.171,9.286,44.577,9.863z M36.003,3.614L15.515,24.981c-0.594,0.58-1.558,0.58-2.152,0L7.98,19.744l-4.306,4.189l11.812,11.495L41.377,8.844L36.003,3.614z"></path></svg>'
					+ '</div>'
    };

    this.settings = this.extend(this.settings, options);

    this.visible = false;

    this.submitHandler = null;

    // window.screenKeyboard = this;
    // window.screenKeyboard.clearText = this.clearText;
    // window.screenKeyboard.showKeyboard = this.showKeyboard;
    // window.screenKeyboard.hideKeyboard = this.hideKeyboard;
    // window.screenKeyboard.getTypedText = this.getTypedText;

    this.init();
}

ScreenKeyboard.prototype.init = function init()
{
    var self = this;

    this.shift 		= false,
    this.capslock 	= false;

    this.keyboard_element 			= document.createElement('DIV');
    this.keyboard_element.id 		= 'screen-keyboard';
    this.keyboard_element.innerHTML = this.settings.keyboardHTML;

    this.settings.parentElement.appendChild(this.keyboard_element);

    this.keyboard_textarea_element 	= document.getElementById('screen-keyboard-textarea');
    this.keyboard_keys_element 		= document.getElementById('screen-keyboard-keys');
    this.keyboard_shift_element_l	= this.keyboard_keys_element.querySelector('.left-shift');
    this.keyboard_shift_element_r	= this.keyboard_keys_element.querySelector('.right-shift');

	this.keyboard_element.style.width 		= '688px';
	this.keyboard_element.style.position 	= 'fixed';
    
    if (this.settings.showTextarea) {
		this.keyboard_textarea_element.style.padding 		= '10px';
		this.keyboard_textarea_element.style.width 			= '616px';
		this.keyboard_textarea_element.style.height 		= '150px';
		this.keyboard_textarea_element.style.background 	= 'rgba(86, 189, 183, 0.46)';
		this.keyboard_textarea_element.style.border 		= '1px solid keyboard-main-color';
		this.keyboard_textarea_element.style.color 			= 'white';
		this.keyboard_textarea_element.style.marginBottom 	= '1px';
		this.keyboard_textarea_element.style.fontSize 		= '30px';
		this.keyboard_textarea_element.style.lineHeight 	= '120%';
		this.keyboard_textarea_element.style.resize 		= 'none';
		this.keyboard_textarea_element.style.border 		= 'none';
    } else {
		this.keyboard_textarea_element.style.display 		= 'none';
    }

	var submit_button = document.getElementById('screen-keyboard-submit-button');
	var submit_button_svg = document.getElementById('screen-keyboard-submit-button-svg');

	submit_button.onTap(function() {
		if (self.submitHandler) {
			self.submitHandler();
		}
	}, 5, true, true, true);

	submit_button.style.position 	= 'absolute';
    submit_button.style.right 		= '9px';
    submit_button.style.top 		= '0';
    submit_button.style.height 		= '100%';
    submit_button.style.background 	= '#333';
    submit_button.style.fill 		= 'white';
    submit_button.style.width 		= '60px';
    submit_button.style.background 	= 'rgba(86,189,183,0.3)';

	submit_button_svg.style.position 	= 'absolute';
	submit_button_svg.style.top 		= '80px';
	submit_button_svg.style.left 		= '14px';
	submit_button_svg.style.width 		= '29px';

    this.keyboard_keys_element.style.margin 	= '0';
	this.keyboard_keys_element.style.padding 	= '0';
	this.keyboard_keys_element.style.listStyle 	= 'none';

    window.mystyle = document.createElement("STYLE");
	window.mystyle.appendChild(document.createTextNode(""));
	document.head.appendChild(window.mystyle);
	var sheet = window.mystyle.sheet;
	
	sheet.insertRule("#screen-keyboard li span { pointer-events: none !important; -webkit-user-select: none !important; }", sheet.cssRules.length);
	sheet.insertRule("#screen-keyboard .lastitem { margin-right: 0 !important; }", sheet.cssRules.length);
	sheet.insertRule("#screen-keyboard .uppercase { text-transform: uppercase !important; }", sheet.cssRules.length);
	sheet.insertRule("#screen-keyboard .off { display: none !important; }", sheet.cssRules.length);

	sheet.insertRule("#screen-keyboard .capslock { width: 80px !important; }", sheet.cssRules.length);
	sheet.insertRule("#screen-keyboard .return { width: 72px !important; }", sheet.cssRules.length);
	sheet.insertRule("#screen-keyboard .left-shift { width: 95px !important; }", sheet.cssRules.length);
	sheet.insertRule("#screen-keyboard .right-shift { width: 99px !important; }", sheet.cssRules.length);
	
	sheet.insertRule(".space { clear: left !important; width: 616px !important; }", sheet.cssRules.length);
	// sheet.insertRule(".screen-keyboard-key:active { background: rgba(255,255,255,0) !important; }", sheet.cssRules.length);
	// sheet.insertRule(".screen-keyboard-key:active { background: rgba(86, 189, 183, 0.1); }", sheet.cssRules.length);
	// sheet.insertRule(".screen-keyboard-key.active { border: 1px solid rgba(255,255,255,0.8) !important; }", sheet.cssRules.length);

	
	sheet.insertRule("#screen-keyboard .capslock, #screen-keyboard .tab, #screen-keyboard .left-shift { clear: left !important; }", 		sheet.cssRules.length);
	sheet.insertRule("#screen-keyboard .tab, #screen-keyboard .delete { width: 70px !important; }", sheet.cssRules.length);
	sheet.insertRule("#screen-keyboard { top: 0 !important; }", sheet.cssRules.length);

    var keys 	= this.keyboard_keys_element.querySelectorAll('LI');
	var letters = self.keyboard_keys_element.querySelectorAll('.letter');
	var symbols = self.keyboard_keys_element.querySelectorAll('.symbol');

    // console.log('keys:');
    // console.dir(keys);
    // console.log('letters:');
    // console.dir(letters);
    // console.log('symbols:');
    // console.dir(symbols);

    for (var i = keys.length - 1; i >= 0; i--)
    {
    	keys[i].style.float 		= 'left';
		keys[i].style.margin 		= '0 2px 2px 0';
		keys[i].style.width 		= '40px';
		keys[i].style.height 		= '40px';
		keys[i].style.lineHeight 	= '42px';
		keys[i].style.fontSize 		= '16px';
		keys[i].style.textAlign 	= 'center';
		keys[i].style.cursor 		= 'default';
		keys[i].style.userSelect 	= 'none';
		keys[i].style.webkitUserSelect 	= 'none';
		keys[i].style.color 		= 'white';
		keys[i].addClass('screen-keyboard-key');

    	keys[i].onTap(function(event)
    	{
			var _this = event.target;

			var character = _this.innerHTML; // If it's a lowercase letter, nothing happens to _this variable

			// Shift keys
			if (_this.hasClass('left-shift') || _this.hasClass('right-shift'))
			{
			    for (var i = letters.length - 1; i >= 0; i--) {
			    	letters[i].toggleClass('uppercase');
			    };

			    for (var i = symbols.length - 1; i >= 0; i--) {
			    	for (var x = symbols[i].childNodes.length - 1; x >= 0; x--) {
			    		symbols[i].childNodes[x].toggleClass('on');
			    		symbols[i].childNodes[x].toggleClass('off');
			    	};
			    };

			    self.keyboard_shift_element_l.toggleClass('active');
				self.keyboard_shift_element_r.toggleClass('active');
			     
			    self.capslock = false;
			    self.shift = (self.shift === true) ? false : true;
			    return false;
			}
			 
			// Caps lock
			if (_this.hasClass('capslock')) {
			    for (var i = letters.length - 1; i >= 0; i--) {
			    	letters[i].toggleClass('uppercase');
			    };
			    self.capslock = true;
			    return false;
			}
			 
			// Delete
			if (_this.hasClass('delete')) {
			    var html = self.keyboard_textarea_element.innerHTML;
			     
			    self.keyboard_textarea_element.innerHTML = html.substr(0, html.length - 1);
			    if (self.settings.keyTapCallback) {
					self.settings.keyTapCallback(character);
				};
			    return false;
			}
			 
			// Special characters
			if (_this.hasClass('symbol'))
			{
				for (var i = _this.childNodes.length - 1; i >= 0; i--) {
					if (_this.childNodes[i].hasClass('on')) {
						character = this.childNodes[i].innerHTML;
					};
				};
			};

			if (_this.hasClass('space')) character = ' ';
			if (_this.hasClass('tab')) character = "\t";
			if (_this.hasClass('return')) character = "\n";
			 
			// Uppercase letter
			if (_this.hasClass('uppercase')) character = character.toUpperCase();
			 
			// Remove self.shift once a key is clicked.
			if (self.shift === true) {
				self.keyboard_shift_element_l.removeClass('active');
				self.keyboard_shift_element_r.removeClass('active');
				for (var i = symbols.length - 1; i >= 0; i--) {
			    	for (var x = symbols[i].childNodes.length - 1; x >= 0; x--) {
			    		symbols[i].childNodes[x].toggleClass('on');
			    		symbols[i].childNodes[x].toggleClass('off');
			    	};
			    };
			    if (self.capslock === false) {
			    	for (var i = letters.length - 1; i >= 0; i--) {
				    	letters[i].toggleClass('uppercase');
				    };
			    }
			     
			    self.shift = false;
			}

			// console.log('character: ' + character);
			// Add the character
			// console.log('self.keyboard_textarea_element: ' + self.keyboard_textarea_element);

			self.keyboard_textarea_element.innerHTML = self.keyboard_textarea_element.innerHTML + character;

			if (self.settings.keyTapCallback) {
				self.settings.keyTapCallback(character);
			};
			// console.log('self.keyboard_textarea_element.innerHTML: ' + self.keyboard_textarea_element.innerHTML);
    	}, 5, true);
    };

    this.keyboard_width  = this.keyboard_element.clientWidth;
    this.keyboard_height = this.keyboard_element.clientHeight;

    var new_position_x  = (window.screen_width - this.keyboard_width) / 2;
    var new_position_y  = window.screen_height + 200;
    var next_position_x = new_position_x;
    var next_position_y = window.screen_height - this.keyboard_height - 100;

    this.keyboard_element.style.transform = 'translate3d(' + new_position_x + 'px, ' + new_position_y + 'px, 0px)';
    this.keyboard_element.style.webkitTransform = 'translate3d(' + new_position_x + 'px, ' + new_position_y + 'px, 0px)';

   	setTimeout(function()
   	{
	    self.keyboard_element.activateCSSTransitions('all', 0.3, 'cubic-bezier(0, 0, 0.58, 1)');
	    self.keyboard_element.setupDragging({init_x: next_position_x, init_y: next_position_y });
   	}, 200);
}

ScreenKeyboard.prototype.setSubmitHandler = function setSubmitHandler(handler)
{
    this.submitHandler = handler;
};

ScreenKeyboard.prototype.detroySubmitHandler = function detroySubmitHandler(handler)
{
    this.submitHandler = null;
};

ScreenKeyboard.prototype.getElement = function getElement()
{
    return this.keyboard_element;
};

ScreenKeyboard.prototype.toggleKeyboard = function toggleKeyboard()
{
	console.log('this.visible: ' + this.visible);
	
    if (this.visible) 
    { this.hideKeyboard(); } 
	else { this.showKeyboard(); }
};

ScreenKeyboard.prototype.showKeyboard = function showKeyboard()
{
    this.visible = true;

    var new_position_x = (window.screen_width - this.keyboard_width) / 2;
    var new_position_y = window.screen_height - this.keyboard_height - 100;

    this.keyboard_element.updateDragStartCoordinates(
    {
    	x: new_position_x, 
    	y: new_position_y 
    });

    var new_transform = 'translate3d(' + new_position_x + 'px, ' + new_position_y + 'px, 0px)';

    this.keyboard_element.style.transform 		= new_transform;
    this.keyboard_element.style.webkitTransform = new_transform; 		
};

ScreenKeyboard.prototype.getTypedText = function getTypedText()
{
    var text = this.keyboard_textarea_element.value;
	text = text.replace(/\r?\n/g, '<br />');
    return text;
};

ScreenKeyboard.prototype.clearText = function clearText()
{
    this.keyboard_textarea_element.innerHTML = '';
};

ScreenKeyboard.prototype.hideKeyboard = function hideKeyboard()
{
	this.visible = false;

	var new_position_x  = (window.screen_width - this.keyboard_width) / 2;
    var new_position_y  = window.screen_height + 200;

    this.keyboard_element.updateDragStartCoordinates(
    {
    	x: new_position_x, 
    	y: new_position_y 
    });

    var new_transform = 'translate3d(' + new_position_x + 'px, ' + new_position_y + 'px, 0px)';

    this.keyboard_element.style.transform 		= new_transform;
    this.keyboard_element.style.webkitTransform = new_transform;
};

ScreenKeyboard.prototype.extend = function extend( defaults, options ) 
{
    var extended = {};
    var prop;

    for (prop in defaults) {
        if (Object.prototype.hasOwnProperty.call(defaults, prop)) {
            extended[prop] = defaults[prop];
        }
    }

    for (prop in options) {
        if (Object.prototype.hasOwnProperty.call(options, prop)) 
        {
            extended[prop] = options[prop];
        }
    }
    return extended;
};

module.exports = ScreenKeyboard;
