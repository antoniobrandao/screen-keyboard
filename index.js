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
    	keyboardHTML: '<textarea id="screen-keyboard-textarea" rows="6" cols="60"></textarea><ul id="screen-keyboard-keys"><li class="symbol"><span class="off">`</span><span class="on">~</span></li><li class="symbol"><span class="off">1</span><span class="on">!</span></li><li class="symbol"><span class="off">2</span><span class="on">@</span></li><li class="symbol"><span class="off">3</span><span class="on">#</span></li><li class="symbol"><span class="off">4</span><span class="on">$</span></li><li class="symbol"><span class="off">5</span><span class="on">%</span></li><li class="symbol"><span class="off">6</span><span class="on">^</span></li><li class="symbol"><span class="off">7</span><span class="on">&amp;</span></li><li class="symbol"><span class="off">8</span><span class="on">*</span></li><li class="symbol"><span class="off">9</span><span class="on">(</span></li><li class="symbol"><span class="off">0</span><span class="on">)</span></li><li class="symbol"><span class="off">-</span><span class="on">_</span></li><li class="symbol"><span class="off">=</span><span class="on">+</span></li><li class="delete lastitem">delete</li><li class="tab">tab</li><li class="letter">q</li><li class="letter">w</li><li class="letter">e</li><li class="letter">r</li><li class="letter">t</li><li class="letter">y</li><li class="letter">u</li><li class="letter">i</li><li class="letter">o</li><li class="letter">p</li><li class="symbol"><span class="off">[</span><span class="on">{</span></li><li class="symbol"><span class="off">]</span><span class="on">}</span></li><li class="symbol lastitem"><span class="off">/\</span><span class="on">|</span></li><li class="capslock">caps lock</li><li class="letter">a</li><li class="letter">s</li><li class="letter">d</li><li class="letter">f</li><li class="letter">g</li><li class="letter">h</li><li class="letter">j</li><li class="letter">k</li><li class="letter">l</li><li class="symbol"><span class="off">;</span><span class="on">:</span></li><li class="symbol"><span class="off">' + "'" + '</span><span class="on">&quot;</span></li><li class="return lastitem">return</li><li class="left-shift">shift</li><li class="letter">z</li><li class="letter">x</li><li class="letter">c</li><li class="letter">v</li><li class="letter">b</li><li class="letter">n</li><li class="letter">m</li><li class="symbol"><span class="off">,</span><span class="on">&lt;</span></li><li class="symbol"><span class="off">.</span><span class="on">&gt;</span></li><li class="symbol"><span class="off">/</span><span class="on">?</span></li><li class="right-shift lastitem">shift</li><li class="space lastitem">&nbsp;</li></ul>',
        draggable: false,
    };

    this.settings = this.extend(this.settings, options);

    this.visible = false;

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
	this.keyboard_element.style.position 	= 'absolute';
    
	this.keyboard_textarea_element.style.padding 			= '10px';
	this.keyboard_textarea_element.style.width 				= '655px';
	this.keyboard_textarea_element.style.height 			= '200px';
	this.keyboard_textarea_element.style.background 		= 'keyboard-main-color-faded';
	this.keyboard_textarea_element.style.border 			= '1px solid keyboard-main-color';
	this.keyboard_textarea_element.style.borderRadius 		= '3px';
	this.keyboard_textarea_element.style.webkitBorderRadius = '3px';
	this.keyboard_textarea_element.style.color 				= '#333';
	this.keyboard_textarea_element.style.fontSize 			= '30px';
	this.keyboard_textarea_element.style.lineHeight 		= '120%';
	this.keyboard_textarea_element.style.resize 			= 'none';

    this.keyboard_keys_element.style.margin 	= '0';
	this.keyboard_keys_element.style.padding 	= '0';
	this.keyboard_keys_element.style.listStyle 	= 'none';

    
    window.mystyle = document.createElement("STYLE");
	window.mystyle.appendChild(document.createTextNode(""));
	document.head.appendChild(window.mystyle);
	var sheet = window.mystyle.sheet;
	
	sheet.insertRule("#screen-keyboard .lastitem { margin-right: 0 !important; }", sheet.cssRules.length);
	sheet.insertRule("#screen-keyboard .uppercase { text-transform: uppercase !important; }", sheet.cssRules.length);
	sheet.insertRule("#screen-keyboard .on { display: none !important; }", sheet.cssRules.length);

	sheet.insertRule("#screen-keyboard .capslock { width: 80px !important; }", sheet.cssRules.length);
	sheet.insertRule("#screen-keyboard .return { width: 77px !important; }", sheet.cssRules.length);
	sheet.insertRule("#screen-keyboard .left-shift { width: 95px !important; }", sheet.cssRules.length);
	sheet.insertRule("#screen-keyboard .right-shift { width: 109px !important; }", sheet.cssRules.length);
	
	sheet.insertRule(".space { clear: left !important; width: 659px !important; }", sheet.cssRules.length);
	sheet.insertRule(".screen-keyboard-key:active { background: rgba(255,255,255,0) !important; }", sheet.cssRules.length);
	sheet.insertRule(".screen-keyboard-key.active { border: 1px solid rgba(255,255,255,0.8) !important; }", sheet.cssRules.length);

	sheet.insertRule("#screen-keyboard .capslock, #screen-keyboard .tab, #screen-keyboard .left-shift { clear: left !important; }", 		sheet.cssRules.length);
	sheet.insertRule("#screen-keyboard .tab, #screen-keyboard .delete { width: 70px !important; }", sheet.cssRules.length);

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
		keys[i].style.margin 		= '0 5px 5px 0';
		keys[i].style.width 		= '40px';
		keys[i].style.height 		= '40px';
		keys[i].style.lineHeight 	= '40px';
		keys[i].style.fontSize 		= '16px';
		keys[i].style.textAlign 	= 'center';
		keys[i].style.background 	= 'rgba(255,255,255,0.2)';
		keys[i].style.border 		= '1px solid rgba(255,255,255,0.2)';
		keys[i].style.webkitBorderRadius = '3px';
		keys[i].style.color 		= 'white';
		keys[i].addClass('screen-keyboard-key');
		keys[i].activateCSSTransitions();

    	keys[i].onTap(function(event)
    	{
    		// console.log('event:');
    		// console.dir(event);

			var _this = event.target;

			var character = _this.innerHTML; // If it's a lowercase letter, nothing happens to _this variable

			// Shift keys
			if (_this.hasClass('left-shift') || _this.hasClass('right-shift')) {
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
			 
			// Add the character
			self.keyboard_textarea_element.innerHTML = self.keyboard_textarea_element.innerHTML + character;
    	});
    };

    var new_position_x  = (window.screen_width - this.keyboard_element.clientWidth) / 2;
    var new_position_y  = window.screen_height;
    var next_position_x = new_position_x;
    var next_position_y = window.screen_height - this.keyboard_element.clientHeight - 100;

    this.keyboard_element.style.transform = 'translate3d(' + new_position_x + 'px, ' + new_position_y + 'px, 0px)';
    this.keyboard_element.style.webkitTransform = 'translate3d(' + new_position_x + 'px, ' + new_position_y + 'px, 0px)';

   	setTimeout(function()
   	{
	    self.keyboard_element.activateCSSTransitions('all', 0.3, 'cubic-bezier(0, 0, 0.58, 1)');
	    self.keyboard_element.setupDragging({init_x: next_position_x, init_y: next_position_y });
   	}, 200);
}

ScreenKeyboard.prototype.getElement = function getElement()
{
    return this.keyboard_element;
};

ScreenKeyboard.prototype.toggleKeyboard = function toggleKeyboard()
{
	console.log('this.visible: ' + this.visible);
    if (this.visible) {
		this.visible = false;
		this.hideKeyboard();
    }
    else {
		this.visible = true;
		this.showKeyboard();
    }
};

ScreenKeyboard.prototype.showKeyboard = function showKeyboard()
{
    var new_position_x = (window.screen_width - this.keyboard_element.clientWidth) / 2;
    var new_position_y = window.screen_height - this.keyboard_element.clientHeight - 20;

    this.keyboard_element.updateDragStartCoordinates(
    {
    	x: new_position_x, 
    	y: new_position_y 
    });

    var new_transform = 'translate3d(' + new_position_x + 'px, ' + new_position_y + 'px, 0px) rotateZ(45deg)';

    this.keyboard_element.style.transform 		= new_transform;
    this.keyboard_element.style.webkitTransform = new_transform; 		
};

ScreenKeyboard.prototype.hideKeyboard = function hideKeyboard()
{
	var new_position_x  = (window.screen_width - this.keyboard_element.clientWidth) / 2;
    var new_position_y  = window.screen_height;

    this.keyboard_element.updateDragStartCoordinates(
    {
    	x: new_position_x, 
    	y: new_position_y 
    });

    var new_transform = 'translate3d(' + new_position_x + 'px, ' + new_position_y + 'px, 0px) rotateZ(45deg)';

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
