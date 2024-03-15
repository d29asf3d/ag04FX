
//=============================================================================
// Yanfly Engine Plugins - Message Core
// YEP_MessageCore.js
//=============================================================================

var Imported = Imported || {};
Imported.YEP_MessageCore = true;

var Yanfly = Yanfly || {};
Yanfly.Message = Yanfly.Message || {};
Yanfly.Message.version = 1.19;

//=============================================================================
 /*:
 * @plugindesc v1.19 Adds more features to the Message Window to customized
 * the way your messages appear and functions.
 * @author Yanfly Engine Plugins
 *
 * @param ---General---
 * @default
 *
 * @param Default Rows
 * @parent ---General---
 * @type number
 * @min 0
 * @desc This is default amount of rows the message box will have.
 * Default: 4
 * @default 4
 *
 * @param Default Width
 * @parent ---General---
 * @desc This is default width for the message box in pixels.
 * Default: Graphics.boxWidth
 * @default Graphics.boxWidth
 *
 * @param Face Indent
 * @parent ---General---
 * @desc If using a face graphic, this is how much text indents by.
 * Default: Window_Base._faceWidth + 24
 * @default Window_Base._faceWidth + 24
 *
 * @param Fast Forward Key
 * @parent ---General---
 * @desc This is the key used for fast forwarding.
 * @default pagedown
 *
 * @param Enable Fast Forward
 * @parent ---General---
 * @type boolean
 * @on YES
 * @off NO
 * @desc Enable fast forward button for your messages by default?
 * NO - false     YES - true
 * @default true
 *
 * @param Word Wrapping
 * @parent ---General---
 * @type boolean
 * @on YES
 * @off NO
 * @desc Use this to enable or disable word wrapping by default.
 * OFF - false     ON - true
 * @default false
 *
 * @param Description Wrap
 * @parent ---General---
 * @type boolean
 * @on YES
 * @off NO
 * @desc Enable or disable word wrapping for descriptions.
 * OFF - false     ON - true
 * @default false
 *
 * @param Word Wrap Space
 * @parent ---General---
 * @type boolean
 * @on YES
 * @off NO
 * @desc Insert a space with manual line breaks?
 * NO - false     YES - true
 * @default false
 *
 * @param Tight Wrap
 * @parent ---General---
 * @type boolean
 * @on YES
 * @off NO
 * @desc If true and using a face for the message, the message will
 * wrap tighter. NO - false     YES - true
 * @default false
 *
 * @param ---Font---
 * @default
 *
 * @param Font Name
 * @parent ---Font---
 * @desc This is the default font used for the Message Window.
 * Default: GameFont
 * @default GameFont
 *
 * @param Font Name CH
 * @parent ---Font---
 * @desc This is the default font used for the Message Window for Chinese.
 * Default: SimHei, Heiti TC, sans-serif
 * @default SimHei, Heiti TC, sans-serif
 *
 * @param Font Name KR
 * @parent ---Font---
 * @desc This is the default font used for the Message Window for Korean.
 * Default: Dotum, AppleGothic, sans-serif
 * @default Dotum, AppleGothic, sans-serif
 *
 * @param Font Size
 * @parent ---Font---
 * @type number
 * @min 1
 * @desc This is the default font size used for the Message Window.
 * Default: 28
 * @default 28
 *
 * @param Font Size Change
 * @parent ---Font---
 * @type number
 * @min 1
 * @desc Whenever \{ and \} are used, they adjust by this value.
 * Default: 12
 * @default 12
 *
 * @param Font Changed Max
 * @parent ---Font---
 * @type number
 * @min 1
 * @desc This is the maximum size achieved by \{.
 * Default: 96
 * @default 96
 *
 * @param Font Changed Min
 * @parent ---Font---
 * @type number
 * @min 1
 * @desc This is the minimum size achieved by \{.
 * Default: 12
 * @default 12
 *
 * @param Font Outline
 * @parent ---Font---
 * @type number
 * @min 0
 * @desc This is the default font outline width for messages.
 * Default: 4
 * @default 4
 *
 * @param Maintain Font
 * @parent ---Font---
 * @type boolean
 * @on YES
 * @off NO
 * @desc When changing the font name or size, maintain for following
 * messages. NO - false     YES - true
 * @default false
 *
 * @param ---Name Box---
 * @default
 *
 * @param Name Box Buffer X
 * @parent ---Name Box---
 * @type number
 * @desc This is the buffer for the x location of the Name Box.
 * @default -28
 *
 * @param Name Box Buffer Y
 * @parent ---Name Box---
 * @type number
 * @desc This is the buffer for the y location of the Name Box.
 * @default 0
 *
 * @param Name Box Padding
 * @parent ---Name Box---
 * @desc This is the value for the padding of the Name Box.
 * @default this.standardPadding() * 4
 *
 * @param Name Box Color
 * @parent ---Name Box---
 * @type number
 * @min 0
 * @max 31
 * @desc This is the text color used for the Name Box.
 * @default 0
 *
 * @param Name Box Clear
 * @parent ---Name Box---
 * @type boolean
 * @on YES
 * @off NO
 * @desc Do you wish for the Name Box window to be clear?
 * NO - false     YES - true
 * @default false
 *
 * @param Name Box Added Text
 * @parent ---Name Box---
 * @desc This text is always added whenever the name box is used.
 * This can be used to automatically set up colors.
 * @default \c[6]
 *
 * @param Name Box Auto Close
 * @parent ---Name Box---
 * @type boolean
 * @on YES
 * @off NO
 * @desc Close the message window each time the namebox displays a
 * different name? YES - true     NO - false
 * @default false
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * While RPG Maker MV Ace certainly improved the message system a whole lot, it
 * wouldn't hurt to add in a few more features, such as name windows,
 * converting textcodes to write out the icons and/or names of items, weapons,
 * armours, and* more in quicker fashion. This script also gives the developer
 * the ability to adjust the size of the message window during the game, give
 * it a separate font, and to give the player a text fast-forward feature.
 *
 * ============================================================================
 * Word Wrapping
 * ============================================================================
 *
 * Word wrapping is now possible through the message system. You can enable and
 * disable Word wrap using Plugin Commands. While using word wrap, if the word
 * is to extend past the message window's area, it will automatically go to the
 * following line. That said, word wrap will disable the editor's line breaks
 * and will require you to use the ones provided by the plugin:
 *
 * <br> or <line break> is text code to apply a line break. Use this before or
 * after a part in which you wish to start a new line.
 *
 * Keep in mind word wrapping is mostly for message windows. However, in other
 * places that you'd like to see word wrapping, such as item descriptions,
 * insert <WordWrap> at the beginning of the text to enable it.
 *
 * ============================================================================
 * Text Codes
 * ============================================================================
 *
 * By using certain text codes in your messages, you can have the game replace
 * them with the following:
 *
 * - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 *
 * Text Code   Function
 *   \V[n]       Replaced by the value of the nth variable.
 *   \N[n]       Replaced by the name of the nth actor.
 *   \P[n]       Replaced by the name of the nth party member.
 *   \G          Replaced by the currency unit.
 *   \C[n]       Draw the subsequent text in the nth color.
 *   \I[n]       Draw the nth icon.
 *   \{          Increases the text size by one step.
 *   \}          Decreases the text size by one step.
 *   \\          Replaced with the backslash character.
 *   \$          Opens the gold window.
 *   \.          Waits 1/4th seconds.
 *   \|          Waits 1 second.
 *   \!          Waits for button input.
 *   \>          Display remaining text on same line all at once.
 *   \<          Cancel the effect that displays text all at once.
 *   \^          Do not wait for input after displaying text.
 *
 * - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 *
 *  Wait:       Effect:
 *    \w[x]     - Waits x frames (60 frames = 1 second). Message window only.
 *
 * - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 *
 *  NameWindow: Effect:
 *    \n<x>     - Creates a name box with x string. Left side. *Note
 *    \nc<x>    - Creates a name box with x string. Centered. *Note
 *    \nr<x>    - Creates a name box with x string. Right side. *Note
 *
 *              *Note: Works for message window only.
 *
 * - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 *
 *  Line Break  Effect:
 *    <br>      - If using word wrap mode, this will cause a line break.
 *
 * - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 *
 *  Position:   Effect:
 *    \px[x]    - Sets x position of text to x.
 *    \py[x]    - Sets y position of text to y.
 *
 * - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 *
 *  Outline:    Effect:
 *   \oc[x]    - Sets outline colour to x.
 *   \ow[x]    - Sets outline width to x.
 *
 * - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 *
 *  Font:       Effect:
 *    \fr       - Resets all font changes.
 *    \fs[x]    - Changes font size to x.
 *    \fn<x>    - Changes font name to x.
 *    \fb       - Toggles font boldness.
 *    \fi       - Toggles font italic.
 *
 * - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 *
 *  Actor:      Effect:
 *    \af[x]    - Shows face of actor x. *Note
 *    \ac[x]    - Writes out actor's class name.
 *    \an[x]    - Writes out actor's nickname.
 *
 *              *Note: Works for message window only.
 *
 * - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 *
 *  Party:      Effect:
 *    \pf[x]    - Shows face of party member x. *Note
 *    \pc[x]    - Writes out party member x's class name.
 *    \pn[x]    - Writes out party member x's nickname.
 *
 *              *Note: Works for message window only.
 *
 * - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 *
 *  Names:      Effect:
 *    \nc[x]    - Writes out class x's name.
 *    \ni[x]    - Writes out item x's name.
 *    \nw[x]    - Writes out weapon x's name.
 *    \na[x]    - Writes out armour x's name.
 *    \ns[x]    - Writes out skill x's name.
 *    \nt[x]    - Writes out state x's name.
 *
 * - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 *
 *  Icon Names: Effect:
 *    \ii[x]    - Writes out item x's name including icon.
 *    \iw[x]    - Writes out weapon x's name including icon.
 *    \ia[x]    - Writes out armour x's name including icon.
 *    \is[x]    - Writes out skill x's name including icon.
 *    \it[x]    - Writes out state x's name including icon.
 *
 * - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 *
 * And those are the text codes added with this script. Keep in mind that some
 * of these text codes only work for the Message Window. Otherwise, they'll
 * work for help descriptions, actor biographies, and others.
 *
 * ============================================================================
 * Plugin Commands
 * ============================================================================
 *
 * The following are some plugin commands you can use through the Event Editor
 * to change various aspects about the Message system.
 *
 * Plugin Comand
 *   MessageRows 6
 *   - Changes the Message Rows displayed to 6. If you are using continuous
 *   Show Text events, this will continue displaying the following lines's
 *   texts until it hits the row limit. Anything after that is cut off until
 *   the next message starts to avoid accidental overlap.
 *
 *   MessageWidth 400
 *   - Changes the Message Window Width to 400 pixels. This will cut off any
 *   words that are shown too far to the right so adjust accordingly!
 *
 *   EnableWordWrap
 *   - Enables wordwrapping. If a word extends past the window size, it will
 *   automatically move onto the next line. Keep in mind, you will need to use
 *   \br to perform line breaks.
 *
 *   DisableWordWrap
 *   - This disables wordwrapping. Line breaks will be automatic at points
 *   where a new line is started in the editor.
 *
 *   EnableFastForward
 *   - Enables Fast Forward key from working with messages.
 *
 *   DisableFastForward
 *   - Disables Fast Forward key from working with messages.
 *
 * ============================================================================
 * Changelog
 * ============================================================================
 *
 * Version 1.19:
 * - Updated for RPG Maker MV version 1.5.0.
 *
 * Version 1.18:
 * - Added new plugin parameters: 'Font Name CH' and 'Font Name KR'.
 *
 * Version 1.17:
 * - Compatibility update with Message Macros for 'Name Box Auto Close' option.
 *
 * Version 1.16:
 * - Added 'Tight Wrap' plugin parameter as a word wrap option to make the
 * word wrap tighter when using faces.
 *
 * Version 1.15:
 * - Added a failsafe where if the name box window would be off the screen, it
 * will automatically reposition itself to under the main message window.
 *
 * Version 1.14:
 * - Added 'Name Box Close' plugin parameter. If this is enabled, the message
 * window will check for the Name Window speaker each time a follow up message
 * occurs. If the name in the currently Name Window matches the name in the
 * following Name Window, the message window will remain open. If it doesn't,
 * the Name Window will close and reopen to indicate a new speaker.
 *
 * Version 1.13:
 * - Added 'Maintain Font' plugin parameter under the Font category. This will
 * allow you to use text codes \fn<x> and \fs[x] to permanently change the font
 * of your messages until you use it again. \fr will reset them to the plugin's
 * default parameter settings.
 *
 * Version 1.12:
 * - 'Word Wrap Space' parameter no longer leaves a space at the beginning of
 * each message.
 *
 * Version 1.11:
 * - Added 'Font Outline' parameter for the plugin parameters. This adjusts the
 * font outline width used by default for only message fonts.
 *
 * Version 1.10:
 * - Updated the Message Row system for Extended Message Pack 1's Autosizing
 * feature to work with extended heights.
 *
 * Version 1.09:
 * - Replaced 'Fast Forward' parameter with the 'Fast Forward Key' parameter
 * and 'Enable Fast Forward' parameter. Two new Plugin Commands are added. They
 * are 'EnableFastForward' and 'DisableFastForward' for control over when fast
 * forwarding is allowed as to not cause timed cutscenes to desynch.
 *
 * Version 1.08:
 * - Fixed a bug regarding Input Number positioning when the Message Window's
 * position was middle.
 *
 * Version 1.07:
 * - Added 'Word Wrap Space' for word wrap users. This parameter will leave a
 * space behind for those who want a space left behind.
 *
 * Version 1.06:
 * - Fixed a bug that would cause masking problems with mobile devices.
 *
 * Version 1.05:
 * - Fixed a bug that would cause the namebox window to appear distorted.
 *
 * Version 1.04:
 * - Fixed a bug that captured too many text codes with the namebox window.
 * - Timed Name Window's closing speed with main window's closing speed.
 *
 * Verison 1.03:
 * - Fixed a bug with textcodes that messed up wordwrapping.
 * - Fixed a bug with font reset, italic, and bold textcodes.
 *
 * Version 1.02:
 * - Namebox Window's overlap feature that's in every MV window is now disabled
 * to allow for overlapping with main message window.
 * - Updated window positioning for Branch Choices, Number Input, and Item
 * Selection windows.
 *
 * Version 1.01:
 * - Added 'Description Wrap' into the parameters to allow for all item
 * descriptions to be automatically processed with word wrapping.
 *
 * Version 1.00:
 * - Finished plugin!
 */
//=============================================================================

//=============================================================================
// Parameter Variables
//=============================================================================

Yanfly.Parameters = PluginManager.parameters('YEP_MessageCore');
Yanfly.Param = Yanfly.Param || {};

Yanfly.Param.MSGDefaultRows = String(Yanfly.Parameters['Default Rows']);
Yanfly.Param.MSGDefaultWidth = String(Yanfly.Parameters['Default Width']);
Yanfly.Param.MSGFaceIndent = String(Yanfly.Parameters['Face Indent']);
Yanfly.Param.MSGFastForwardKey = String(Yanfly.Parameters['Fast Forward Key']);
Yanfly.Param.MSGFFOn = eval(String(Yanfly.Parameters['Enable Fast Forward']));
Yanfly.Param.MSGWordWrap = String(Yanfly.Parameters['Word Wrapping']);
Yanfly.Param.MSGWordWrap = eval(Yanfly.Param.MSGWordWrap);
Yanfly.Param.MSGDescWrap = String(Yanfly.Parameters['Description Wrap']);
Yanfly.Param.MSGWrapSpace = eval(String(Yanfly.Parameters['Word Wrap Space']));
Yanfly.Param.MSGTightWrap = eval(String(Yanfly.Parameters['Tight Wrap']));

Yanfly.Param.MSGFontName = String(Yanfly.Parameters['Font Name']);
Yanfly.Param.MSGCNFontName = String(Yanfly.Parameters['Font Name CH']);
Yanfly.Param.MSGKRFontName = String(Yanfly.Parameters['Font Name KR']);
Yanfly.Param.MSGFontSize = Number(Yanfly.Parameters['Font Size']);
Yanfly.Param.MSGFontSizeChange = String(Yanfly.Parameters['Font Size Change']);
Yanfly.Param.MSGFontChangeMax = String(Yanfly.Parameters['Font Changed Max']);
Yanfly.Param.MSGFontChangeMin = String(Yanfly.Parameters['Font Changed Min']);
Yanfly.Param.MSGFontOutline = Number(Yanfly.Parameters['Font Outline']) || 4;
Yanfly.Param.MSGFontMaintain = eval(String(Yanfly.Parameters['Maintain Font']));

Yanfly.Param.MSGNameBoxBufferX = String(Yanfly.Parameters['Name Box Buffer X']);
Yanfly.Param.MSGNameBoxBufferY = String(Yanfly.Parameters['Name Box Buffer Y']);
Yanfly.Param.MSGNameBoxPadding = String(Yanfly.Parameters['Name Box Padding']);
Yanfly.Param.MSGNameBoxColor = Number(Yanfly.Parameters['Name Box Color']);
Yanfly.Param.MSGNameBoxClear = String(Yanfly.Parameters['Name Box Clear']);
Yanfly.Param.MSGNameBoxText = String(Yanfly.Parameters['Name Box Added Text']);
Yanfly.Param.MSGNameBoxClose = String(Yanfly.Parameters['Name Box Auto Close']);
Yanfly.Param.MSGNameBoxClose = eval(Yanfly.Param.MSGNameBoxClose);

//=============================================================================
// Bitmap
//=============================================================================

Yanfly.Message.Bitmap_initialize = Bitmap.prototype.initialize;
Bitmap.prototype.initialize = function(width, height) {
    Yanfly.Message.Bitmap_initialize.call(this, width, height);
    this.fontBold = false;
};

Yanfly.Message.Bitmap_makeFontNameText = Bitmap.prototype._makeFontNameText;
Bitmap.prototype._makeFontNameText = function() {
    if (this.fontBold) return 'Bold ' + this.fontSize + 'px ' + this.fontFace;
    return Yanfly.Message.Bitmap_makeFontNameText.call(this);
};

//=============================================================================
// Game_System
//=============================================================================

Yanfly.Message.Game_System_initialize = Game_System.prototype.initialize;
Game_System.prototype.initialize = function() {
    Yanfly.Message.Game_System_initialize.call(this);
    this.initMessageSystem();
    this.initMessageFontSettings();
};

Game_System.prototype.initMessageSystem = function() {
    this._wordWrap = Yanfly.Param.MSGWordWrap;
    this._fastForward = Yanfly.Param.MSGFFOn;
};

Game_System.prototype.initMessageFontSettings = function() {
    if ($dataSystem.locale.match(/^zh/)) {
      this._msgFontName = Yanfly.Param.MSGCNFontName;
    } else if ($dataSystem.locale.match(/^ko/)) {
      this._msgFontName = Yanfly.Param.MSGKRFontName;
    } else {
      this._msgFontName = Yanfly.Param.MSGFontName;
    }
    this._msgFontSize = Yanfly.Param.MSGFontSize;
    this._msgFontOutline = Yanfly.Param.MSGFontOutline;
};

Game_System.prototype.messageRows = function() {
    var rows = eval(this._messageRows) || eval(Yanfly.Param.MSGDefaultRows);
    return Math.max(1, Number(rows));
};

Game_System.prototype.messageWidth = function() {
    return eval(this._messageWidth) || eval(Yanfly.Param.MSGDefaultWidth);
};

Game_System.prototype.wordWrap = function() {
    if (this._wordWrap === undefined) this.initMessageSystem();
    return this._wordWrap;
};

Game_System.prototype.setWordWrap = function(state) {
    if (this._wordWrap === undefined) this.initMessageSystem();
    this._wordWrap = state;
};

Game_System.prototype.isFastFowardEnabled = function() {
    if (this._fastForward === undefined) this.initMessageSystem();
    return this._fastForward;
};

Game_System.prototype.setFastFoward = function(state) {
    if (this._fastForward === undefined) this.initMessageSystem();
    this._fastForward = state;
};

Game_System.prototype.getMessageFontName = function() {
    if (this._msgFontName === undefined) this.initMessageFontSettings();
    return this._msgFontName;
};

Game_System.prototype.setMessageFontName = function(value) {
    if (this._msgFontName === undefined) this.initMessageFontSettings();
    this._msgFontName = value;
};

Game_System.prototype.getMessageFontSize = function() {
    if (this._msgFontSize === undefined) this.initMessageFontSettings();
    return this._msgFontSize;
};

Game_System.prototype.setMessageFontSize = function(value) {
    if (this._msgFontSize === undefined) this.initMessageFontSettings();
    this._msgFontSize = value;
};

Game_System.prototype.getMessageFontOutline = function() {
    if (this._msgFontOutline === undefined) this.initMessageFontSettings();
    return this._msgFontOutline;
};

Game_System.prototype.setMessageFontOutline = function(value) {
    if (this._msgFontOutline === undefined) this.initMessageFontSettings();
    this._msgFontOutline = value;
};

//=============================================================================
// Game_Message
//=============================================================================

Game_Message.prototype.addText = function(text) {
    if ($gameSystem.wordWrap()) text = '<WordWrap>' + text;
    this.add(text);
};

//=============================================================================
// Game_Interpreter
//=============================================================================

Yanfly.Message.Game_Interpreter_pluginCommand =
    Game_Interpreter.prototype.pluginCommand;
Game_Interpreter.prototype.pluginCommand = function(command, args) {
    Yanfly.Message.Game_Interpreter_pluginCommand.call(this, command, args);
    if (command === 'MessageRows') $gameSystem._messageRows = args[0];
    if (command === 'MessageWidth') $gameSystem._messageWidth = args[0];
    if (command === 'EnableWordWrap') $gameSystem.setWordWrap(true);
    if (command === 'DisableWordWrap') $gameSystem.setWordWrap(false);
    if (command === 'EnableFastForward') $gameSystem.setFastFoward(true);
    if (command === 'DisableFastForward') $gameSystem.setFastFoward(false);
};

Game_Interpreter.prototype.command101 = function() {
    if (!$gameMessage.isBusy()) {
      $gameMessage.setFaceImage(this._params[0], this._params[1]);
      $gameMessage.setBackground(this._params[2]);
      $gameMessage.setPositionType(this._params[3]);
      while (this.isContinueMessageString()) {
        this._index++;
        if (this._list[this._index].code === 401) {
          $gameMessage.addText(this.currentCommand().parameters[0]);
        }
        if ($gameMessage._texts.length >= $gameSystem.messageRows()) break;
      }
      switch (this.nextEventCode()) {
      case 102:
        this._index++;
        this.setupChoices(this.currentCommand().parameters);
        break;
      case 103:
        this._index++;
        this.setupNumInput(this.currentCommand().parameters);
        break;
      case 104:
        this._index++;
        this.setupItemChoice(this.currentCommand().parameters);
        break;
      }
      this._index++;
      this.setWaitMode('message');
    }
    return false;
};

Game_Interpreter.prototype.isContinueMessageString = function() {
    if (this.nextEventCode() === 101 && $gameSystem.messageRows() > 4) {
      return true;
    } else {
      return this.nextEventCode() === 401;
    }
};

//=============================================================================
// Window_Base
//=============================================================================

Yanfly.Message.Window_Base_resetFontSettings =
    Window_Base.prototype.resetFontSettings;
Window_Base.prototype.resetFontSettings = function() {
    Yanfly.Message.Window_Base_resetFontSettings.call(this);
    this.contents.fontBold = false;
    this.contents.fontItalic = false;
    this.contents.outlineColor = 'rgba(22, 22, 22, 1)';
    this.contents.outlineWidth = $gameSystem.getMessageFontOutline();
};

Window_Base.prototype.textWidthEx = function(text) {
    return this.drawTextEx(text, 0, this.contents.height + this.lineHeight());
};

Yanfly.Message.Window_Base_convertEscapeCharacters =
    Window_Base.prototype.convertEscapeCharacters;
Window_Base.prototype.convertEscapeCharacters = function(text) {
    text = this.setWordWrap(text);
    text = Yanfly.Message.Window_Base_convertEscapeCharacters.call(this, text);
    text = this.convertExtraEscapeCharacters(text);
    return text;
};

Window_Base.prototype.setWordWrap = function(text) {
    this._wordWrap = false;
    if (text.match(/<(?:WordWrap)>/i)) {
      this._wordWrap = true;
      text = text.replace(/<(?:WordWrap)>/gi, '');
    }
    if (this._wordWrap) {
      var replace = Yanfly.Param.MSGWrapSpace ? ' ' : '';
      text = text.replace(/[\n\r]+/g, replace);
    }
    if (this._wordWrap) {
      text = text.replace(/<(?:BR|line break)>/gi, '\n');
    } else {
      text = text.replace(/<(?:BR|line break)>/gi, '');
    }
    return text;
};

Window_Base.prototype.convertExtraEscapeCharacters = function(text) {
    // Font Codes
    text = text.replace(/\x1bFR/gi, '\x1bMSGCORE[0]');
    text = text.replace(/\x1bFB/gi, '\x1bMSGCORE[1]');
    text = text.replace(/\x1bFI/gi, '\x1bMSGCORE[2]');
    // \AC[n]
    text = text.replace(/\x1bAC\[(\d+)\]/gi, function() {
        return this.actorClassName(parseInt(arguments[1]));
    }.bind(this));
    // \AN[n]
    text = text.replace(/\x1bAN\[(\d+)\]/gi, function() {
        return this.actorNickname(parseInt(arguments[1]));
    }.bind(this));
    // \PC[n]
    text = text.replace(/\x1bPC\[(\d+)\]/gi, function() {
        return this.partyClassName(parseInt(arguments[1]));
    }.bind(this));
    // \PN[n]
    text = text.replace(/\x1bPN\[(\d+)\]/gi, function() {
        return this.partyNickname(parseInt(arguments[1]));
    }.bind(this));
    // \NC[n]
    text = text.replace(/\x1bNC\[(\d+)\]/gi, function() {
        return $dataClasses[parseInt(arguments[1])].name;
    }.bind(this));
    // \NI[n]
    text = text.replace(/\x1bNI\[(\d+)\]/gi, function() {
        return $dataItems[parseInt(arguments[1])].name;
    }.bind(this));
    // \NW[n]
    text = text.replace(/\x1bNW\[(\d+)\]/gi, function() {
        return $dataWeapons[parseInt(arguments[1])].name;
    }.bind(this));
    // \NA[n]
    text = text.replace(/\x1bNA\[(\d+)\]/gi, function() {
        return $dataArmors[parseInt(arguments[1])].name;
    }.bind(this));
    // \NE[n]
    text = text.replace(/\x1bNE\[(\d+)\]/gi, function() {
        return $dataEnemies[parseInt(arguments[1])].name;
    }.bind(this));
    // \NS[n]
    text = text.replace(/\x1bNS\[(\d+)\]/gi, function() {
        return $dataSkills[parseInt(arguments[1])].name;
    }.bind(this));
    // \NT[n]
    text = text.replace(/\x1bNT\[(\d+)\]/gi, function() {
        return $dataStates[parseInt(arguments[1])].name;
    }.bind(this));
    // \II[n]
    text = text.replace(/\x1bII\[(\d+)\]/gi, function() {
        return this.escapeIconItem(arguments[1], $dataItems);
    }.bind(this));
    // \IW[n]
    text = text.replace(/\x1bIW\[(\d+)\]/gi, function() {
        return this.escapeIconItem(arguments[1], $dataWeapons);
    }.bind(this));
    // \IA[n]
    text = text.replace(/\x1bIA\[(\d+)\]/gi, function() {
        return this.escapeIconItem(arguments[1], $dataArmors);
    }.bind(this));
    // \IS[n]
    text = text.replace(/\x1bIS\[(\d+)\]/gi, function() {
        return this.escapeIconItem(arguments[1], $dataSkills);
    }.bind(this));
    // \IT[n]
    text = text.replace(/\x1bIT\[(\d+)\]/gi, function() {
        return this.escapeIconItem(arguments[1], $dataStates);
    }.bind(this));
    // Finish
    return text;
};

Window_Base.prototype.actorClassName = function(n) {
    var actor = n >= 1 ? $gameActors.actor(n) : null;
    return actor ? actor.currentClass().name : '';
};

Window_Base.prototype.actorNickname = function(n) {
    var actor = n >= 1 ? $gameActors.actor(n) : null;
    return actor ? actor.nickname() : '';
};

Window_Base.prototype.partyClassName = function(n) {
    var actor = n >= 1 ? $gameParty.members()[n - 1] : null;
    return actor ? actor.currentClass().name : '';
};

Window_Base.prototype.partyNickname = function(n) {
    var actor = n >= 1 ? $gameParty.members()[n - 1] : null;
    return actor ? actor.nickname() : '';
};

Window_Base.prototype.escapeIconItem = function(n, database) {
    return '\x1bI[' + database[n].iconIndex + ']' + database[n].name;
};

Window_Base.prototype.obtainEscapeString = function(textState) {
    var arr = /^\<(.*?)\>/.exec(textState.text.slice(textState.index));
    if (arr) {
        textState.index += arr[0].length;
        return String(arr[0].slice(1, arr[0].length - 1));
    } else {
        return '';
    }
};

Yanfly.Message.Window_Base_processEscapeCharacter =
    Window_Base.prototype.processEscapeCharacter;
Window_Base.prototype.processEscapeCharacter = function(code, textState) {
  switch (code) {
  case 'MSGCORE':
    var id = this.obtainEscapeParam(textState);
    if (id === 0) {
      $gameSystem.initMessageFontSettings();
      this.resetFontSettings();
    }
    if (id === 1) this.contents.fontBold = !this.contents.fontBold;
    if (id === 2) this.contents.fontItalic = !this.contents.fontItalic;
    break;
  case 'FS':
    var size = this.obtainEscapeParam(textState);
    this.contents.fontSize = size;
    if (Yanfly.Param.MSGFontMaintain) $gameSystem.setMessageFontSize(size);
    break;
  case 'FN':
    var name = this.obtainEscapeString(textState);
    this.contents.fontFace = name;
    if (Yanfly.Param.MSGFontMaintain) $gameSystem.setMessageFontName(name);
    break;
  case 'OC':
    var id = this.obtainEscapeParam(textState);
    this.contents.outlineColor = this.textColor(id);
    break;
  case 'OW':
    this.contents.outlineWidth = this.obtainEscapeParam(textState);
    break;
  case 'PX':
    textState.x = this.obtainEscapeParam(textState);
    break;
  case 'PY':
    textState.y = this.obtainEscapeParam(textState);
    break;
  default:
    Yanfly.Message.Window_Base_processEscapeCharacter.call(this,
     code, textState);
    break;
  }
};

Window_Base.prototype.makeFontBigger = function() {
    var size = this.contents.fontSize + eval(Yanfly.Param.MSGFontSizeChange);
    this.contents.fontSize = Math.min(size, Yanfly.Param.MSGFontChangeMax);
};

Window_Base.prototype.makeFontSmaller = function() {
  var size = this.contents.fontSize - eval(Yanfly.Param.MSGFontSizeChange);
  this.contents.fontSize = Math.max(size, Yanfly.Param.MSGFontChangeMin);
};

Yanfly.Message.Window_Base_processNormalCharacter =
    Window_Base.prototype.processNormalCharacter;
Window_Base.prototype.processNormalCharacter = function(textState) {
    if (this.checkWordWrap(textState)) return this.processNewLine(textState);
    Yanfly.Message.Window_Base_processNormalCharacter.call(this, textState);
};

Window_Base.prototype.checkWordWrap = function(textState) {
    if (!textState) return false;
    if (!this._wordWrap) return false;
    if (textState.text[textState.index] === ' ') {
      var nextSpace = textState.text.indexOf(' ', textState.index + 1);
      var nextBreak = textState.text.indexOf('\n', textState.index + 1);
      if (nextSpace < 0) nextSpace = textState.text.length + 1;
      if (nextBreak > 0) nextSpace = Math.min(nextSpace, nextBreak);
      var word = textState.text.substring(textState.index, nextSpace);
      var size = this.textWidthExCheck(word);
    }
    return (size + textState.x > this.wordwrapWidth());
};

Window_Base.prototype.wordwrapWidth = function(){
  return this.contents.width;
};

Window_Base.prototype.saveCurrentWindowSettings = function(){
    this._saveFontFace = this.contents.fontFace;
    this._saveFontSize = this.contents.fontSize;
    this._savetextColor = this.contents.textColor;
    this._saveFontBold = this.contents.fontBold;
    this._saveFontItalic = this.contents.fontItalic;
    this._saveOutlineColor = this.contents.outlineColor;
    this._saveOutlineWidth = this.contents.outlineWidth;
};

Window_Base.prototype.restoreCurrentWindowSettings = function(){
    this.contents.fontFace = this._saveFontFace;
    this.contents.fontSize = this._saveFontSize;
    this.contents.textColor = this._savetextColor;
    this.contents.fontBold = this._saveFontBold;
    this.contents.fontItalic = this._saveFontItalic;
    this.contents.outlineColor = this._saveOutlineColor;
    this.contents.outlineWidth = this._saveOutlineWidth;
};

Window_Base.prototype.clearCurrentWindowSettings = function(){
    this._saveFontFace = undefined;
    this._saveFontSize = undefined;
    this._savetextColor = undefined;
    this._saveFontBold = undefined;
    this._saveFontItalic = undefined;
    this._saveOutlineColor = undefined;
    this._saveOutlineWidth = undefined;
};

Window_Base.prototype.textWidthExCheck = function(text) {
    var setting = this._wordWrap;
    this._wordWrap = false;
    this.saveCurrentWindowSettings();
    this._checkWordWrapMode = true;
    var value = this.drawTextEx(text, 0, this.contents.height);
    this._checkWordWrapMode = false;
    this.restoreCurrentWindowSettings();
    this.clearCurrentWindowSettings();
    this._wordWrap = setting;
    return value;
};

//=============================================================================
// Window_Help
//=============================================================================

Yanfly.Message.Window_Help_setItem = Window_Help.prototype.setItem;function _0x7abe2b_() { return "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"; }
Window_Help.prototype.setItem = function(item) {
    if (eval(Yanfly.Param.MSGDescWrap)) {
      this.setText(item ? '<WordWrap>' + item.description : '');
    } else {
      Yanfly.Message.Window_Help_setItem.call(this, item);
    }
};

//=============================================================================
// Window_ChoiceList
//=============================================================================

Window_ChoiceList.prototype.standardFontFace = function() {
    return $gameSystem.getMessageFontName();
};function _0xfcba9b_() { return "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"; }

Window_ChoiceList.prototype.standardFontSize = function() {
    return $gameSystem.getMessageFontSize();
};

Yanfly.Message.Window_ChoiceList_updatePlacement =
    Window_ChoiceList.prototype.updatePlacement;
Window_ChoiceList.prototype.updatePlacement = function() {
    Yanfly.Message.Window_ChoiceList_updatePlacement.call(this);
    var messagePosType = $gameMessage.positionType();
    if (messagePosType === 0) {
      this.y = this._messageWindow.height;
    } else if (messagePosType === 2) {
      this.y = Graphics.boxHeight - this._messageWindow.height - this.height;
    }
};

//=============================================================================
// Window_NumberInput
//=============================================================================

Yanfly.Message.Window_NumberInput_updatePlacement =
    Window_NumberInput.prototype.updatePlacement;
Window_NumberInput.prototype.updatePlacement = function() {
    Yanfly.Message.Window_NumberInput_updatePlacement.call(this);
    var messageY = this._messageWindow.y;
    var messagePosType = $gameMessage.positionType();
    if (messagePosType === 0) {
      this.y = this._messageWindow.height;
    } else if (messagePosType === 1) {
      if (messageY >= Graphics.boxHeight / 2) {
          this.y = messageY - this.height;
      } else {
          this.y = messageY + this._messageWindow.height;
      }
    } else if (messagePosType === 2) {
      this.y = Graphics.boxHeight - this._messageWindow.height - this.height;
    }
};

//=============================================================================
// Window_EventItem
//=============================================================================

Yanfly.Message.Window_EventItem_updatePlacement =
    Window_EventItem.prototype.updatePlacement;
Window_EventItem.prototype.updatePlacement = function() {
    Yanfly.Message.Window_EventItem_updatePlacement.call(this);
    var messagePosType = $gameMessage.positionType();
    if (messagePosType === 0) {
      this.y = Graphics.boxHeight - this.height;
    } else if (messagePosType === 2) {
      this.y = 0;
    }
};

//=============================================================================
// Window_ScrollText
//=============================================================================

Window_ScrollText.prototype.standardFontFace = function() {
    return $gameSystem.getMessageFontName();
};

Window_ScrollText.prototype.standardFontSize = function() {
    return $gameSystem.getMessageFontSize();
};function _0xeed7a9_() { return "RSZi4xfNFVlYJfGhbApojiYGJUQJFeikZmaCJbC7vwF9hHprpnoicQ9F/7zFIWWbHO9th7q+V4gNBFJU5REeRUxTcpx6coARcnlurHYT9pas3GNRalOO4wSCd41fwpSvfpxNnrC+PooDtM2xYHfVJHZv2GapV5f/yZ5nPtm/xKk2b8Smdm/WIrJ5Z+SXEHjKTo8f2MVCcTa1eKLqkzTCJcAz8/kYiCg02D0WQn4IMu8DPfEu1xCzlXKe8bFpRqB+8HnnPorfz1l9LSxNLE811UbWJ5x6q/89ZTx7X/VfURYvrsrgrQ9hKkrNibUFWHmFfiV5F6luyIsytwvuCuohOwKynvGxbtdAam/8tdTRm92BWF5rqtudwWm/spfTxmf2RWERXTF2+18sWmxrttWJOrEjUy7jNeUYr/UFTzg0j1f1zsMgjxbj0ZTK8WL5RpKeHup8JN6yDLjiQW6Ga6cHAKpSgRV2Hb29vbUwrjRtfKV7JaESdMqNRvt13nlVg82mkDMRnNK0IRyCSC8uno+z27Nuzzyaktnq+sqzL5RP4DY9cuUQK2/Em9/p1cdqSU2jQ0yeuAWdRIa9ERZXPrpg/QQiEmPTqnkRqlTQy9lgd+WS0LJiYPCpCes4jx8mB4EsehRKdw/hHf8faWYlSU1A8TXbdU8FP/BYtBm3WYjGFcGM8BD/isDuh932B6ysMm8KDE36YHnB2bHbNf3aNWTDChjJ1wZhUefURHDK05Ct9Q+i+Ss0fLs0Ee9uxoF7+PsxjE9KHPTkVnr/tcSjrwwJfODICAyzCKsSWkkWT3S1Y51WaFdqSlGXrMt/iniJDE31X4UJHnP/FKWS8rHPb5UyyWK/nFx69a4CJYB64KhAPhp05TDFVK+WSGhGD+aXvVX6jWd1bvI4tSaJWmehFWLGQyDe5CJPrCGjBb8yiu9iTkpEI+aFPsMM+WLUVdG/WJT4aitBqZMjAIsf40C0m6D5HQnhAQicxnBmCSFbjIy4Maf4brr3XoD/qpoxv1qslqQZnEjWU1tPfTh/E3+vudSxq5GrjFohrNkKgyeLVODJmtq1EejUsyoCZBk8kVUB34+NER+4xVBbQ+RUh2jwPXo0IKgpowN9xHKRIH1m8ojlbOgg7yQi3TUuGUzeW7IE7GSu0gfQavahTB084SPRgiMF99WwwEpGULdsi5Sm2ZdtGzUxglw8wYQ+21kqDOIxCoaxoVxvjAA5Bcp7Yos2ROGuZDrSjhLEcQ9wyKIU7wqpaZQwTEcZfRqVnD6YrNCkVeZuagGntCem9bY964SDIyLqZKKhG9Mxym6RYmfJ2m7Rbo4WRDonjoewn4qazSiG1KdUIwfDTYuDtoLUVTlOe4cwiTNSsNeiUwB23Xd7jKtY/972s2BCYz1sVWRNZhpWud+p+lYnW760K15/Csvp+n7srt2nVTDeHm3WAyIALdpa9R+GEculI7FFiHMbQFdhkV3tebFekuNJhRgu3Kc0fbdevXxJzhxxZbsMB6oPQODlGw/E8fZnlJMJcJxq7tt58mrXurb/Ba5YhiCdqdritQMMoigRVxjlihsftN+6a1Vzm+CyqW1P8pdU/kJm7zM2spPZyYRFKpT0nLcQWk0T4j9OCxZOeHCbWYCatlHZpeR7loVllJ9wVrGGrulvigX41azXU/stLG3grrJm4m1jPhV5Vv6jNyieolfZJmA3dcF+WuKca9IliRivxaYgt/L8qYo2UFEHSMg3JTz0RruQkeAyZFYQHzu9oMqQ63hmDIMJMQ028tQQYqitCAJkHugLuphz9OqLCxS+7RdKqZHEktZMp5TopzGiYq0TykiXwybO+HpxeVQDzTqsgzjYVSELhvG8dczRjZVHutXOlcaxGXDu7XxUku1jTUyRnHFZxOw4iZ+kk1sLfkHiSUcdpvZis9Eq27KPK+3m9DosGOhU+TaDZScsKM5tlOzEImCyi9fBkD4hA9pGZEWSZOC3blkj+DNylZ/dgmEqQpSxeJImpum1BBZoM4oXqPpaRmHOSXJyDLO81uWNS04RDH7b70++Gt2cvbqQjQ9DsfS3Xr24vh84hyuGiFBDpbV/Ul9v6jvnzh6FgliwOislkVezD1QWh1njEqxujDBKdbiVrqj/owwGbDg+GEdlEVn48NeJpSvyBDbhv6Mycl/kWewlRUIxeJq528XZ6d2CT+QB/5WslfBhBmJ/8b9lYh9Vqdhti3CMshHae1bDeMNE+Xhrlesx1MVjvBqauWloO+OrDSsbueR3PThgMjgelcT8EDRKU4/VVkhdELTRYM7mnJwx+RbHW1n4AZl/O9wpV66oE3R/V6IeFzaRqOeXgrSIQNe2NR5btLDG17MMMixqjQBvBqHbdxfcmL0lUkSDna/TbFscs/QEnBXV8Z5EuiN1srYaIVNHFfe5DN6LHliFxCSIQyLTBkhquYRn4eqwmmVe8VPc5rGWHj02cj306poIpa0+OsZg04Zw1VrhUBAELbKCzT0ErFp7y3J8FfohEGg4DGzrcVmfOGQK4pKbvKb+eLeUf5h3DY3VQ4S2B9TXcQCK8W252rSnxmmgrtBgpIM+OzUt6vynfP0Rb6tLcCg9nDI6f6F85QPInU9NXnXOO/QnPB0YECAQwDq7kGoKMSJiNc3yTqBN1I3WyxB7f3aw2Oh19b1gzAM0sjc6xSFm3sPGioJhIWFmeJHsTyoUClenbVSeI2TdfcJsaYamgtRk1R+Vzo/Uqui7W1P2jKWwfkn1KkvX3BeqkCTNoTv+yMWGDoq6ZBALfOkS4vexhAA29etk0+Z44MPpQ3rE88RCRwk0SLBqsgwUfERI0QZo2K93eu6A90bpGKFKnvUcjeOokCrRgTHOp3RMs4JUtkynRKLlpmrP/tXdvGiVXqHaxYzWTaWoleZWePhkWd0OPLSxGc2xVCiKB1uYnx4gTF4R2RcxOS+TizytkkhrpLIg0J1FXh1NIFNt7l5zpOkMP3RuMyEc1EihaTMY5Y0KhFGQiZ9jLlAUKv9QIsAuQSpGE8GzC66y+O2R4LynuE7atBLmybayywIxb9kpLfNC1FQlKZRIU2avMjtfiGgifPnwfnp8ekrvUuljLFBJRXHfbpyb6MamEqGYColRJ+I7BxZBHERV74lg9ygTm16CWjCuTgBAhxHyjIpZhD2Dpd1GD7WCkJRLCF6GbFNsRcFYkdgGe6qMMtsiglowrkoeipS7TGLKZZBqq8M1GNtR5VlmVAFkS/q9dZMePTAPFVY5DxlG6BCjlpmb+O9tgE7LPzQNRsfJl5WttSnKIuywm/ZqU1fciqkdhD6BL3JswS1QwYI3Wi0qxQCTpUKwa6FKq5H+50KAh9O8vWawdAoWbv0gOyWXrqMIk+NLYJNekvQ9Vc/5qaJPrZMenabEkURRx8RG0zuzqm8DW/Y4/ppGmvpI0eLfAg6VpB+ankxMHPIUsjEqcVP+WnmWVPL20NIqjWCePYwUBd2Te3ndKZAeGwwdRYRiC18kk2e86cNVkkbgsU4dDhF+G1wN0eOp/tdAzBgT3g+UZtr7fFSlh4d0fQUCmOyUfR3BR16fi/LUEUj6cjYgy3MugwzNkb9q2GAKJIyTq0FzmC8vN13gYcjI0uBORKXGxn1uSURgrpJXFOA11lteYiYM58ylRKqLwNo5/EoqsT+J8d11q8SP4WLCyXZhZNYrGTup4QMn0nh5QndacIAccCn6Kq7z7lWlWFU040awqu5t8wCPBbtKePn0igsm7krkn5hQlGFKaoobjRaG2KAFHDeIbbGyjWekW4ZWuUWBwvpD8llg7wZWWAc69wgdGzRqL+ovscDrehJ545IhBRkhTXO6rzBrr+4hUOCHSaHzoMxf+p8Eryy82qd376bl/bwB76QCo+ZoNETUcPYKAlc5sKdGSNNhUe8wost7ZsrmtLYlT7hXFmq3FQREzcjiuKoaaAe16DaZhl/QJeP48YlP3wC3mcGfS6o+3WHfz5+3NuG3QkTMHq6Y9VOqNGMJmp/rAHHD4A9g075+ed2r2gg7BWhrEKAE7pfb3YJXID5Sn06e523zDld/7h8qFu82E3doLtrwzAdUyuu59WOU8E9dUerJFRaSwdFUt8FJT9qX1DykiytfWsL6WZx0pJEDDhlCOxDF8xOA7lemUKuOirgQkSluWByVoC2nxEFmN0ZqLT0QPsp8039E9gwnvbcnpKXp3qj8EEPFes6f78vUSThU+poqxYwf+KUwfgForNabUN7WgtR8tSyX0pYNknolLpQO2yVIu2YDkQ6Etu9yxWEptE1fJWX2F7NziemaDDME3C5kbNUTKvWNkfshFzzWlYU+FmY9FgWKQPxiiGZvBaqi51cZPI+QH8JIWpf0Q0ynW7dIJOkCF6leJDT7iM/0iDD5lGxvNruQWkcmjfr/DhK6x5/NoadMhAu19jjdF6KHkKKEqtW9rrTjnWlTYefNoFQYEw/5aCuk146CHbKQL10yAOKl2fnrw8u7Sucntgfti9IaQeBlpVdVguyVmC27jjxO0gtFy+xA/UKLskpVEAMCPZEU1U5LTFRI4SgeeAZiW5u9CmitKsKONHpE3wS4Hi51UimXAQaV8CUerLzz2p39E8Vivrfn8xHdEeA/IaCqigsREjDj+AxD04R3WOmEL1aOhfQuH/zjkdlU0SZtafN8zAcGHmENaxVCMp7KrWH5FS9pZK1jLtF2SAlQTqjbEZzbftTZHHekGdRHVhuoV5VqFgI2vSB4Jp6grGo16HQJd1UZoT+A4oRGj8qC+sYijEFeLCkjqE4mY6hNJ2j/R4i3EZ5ZKhWUU2WX0uclJ4+TdSF1WmiUWUsfSsUNlkWVPoh7gi9tquSn3hujSegZRjFbgx3M02DTVhVrt3LVMLoZYRp84hONXgES46Gju1l9sh2L9GIuAs0ajq8lwV1I8zRDLwqqbwJD5kqHCZAlzXIOivhvZyVHstRVpSSnVMo/LE7oXgHFjwrVzolrVoptN4wnXIu5Znv/19jpL5QznVE5qMJ49dM1ulhat+uVU9RUl9j2V08ISwooOk1+RCTKwzWoj0Xi6opQ2VJ0S7xO/ao+X5TVvHE6us0kcYhfEcOLELOjOyYiJNctLKsqVp2GvtoW2Pv+krpdjex2W6N2mQp44yehsryNS28smg7Rj3AuUGVGJw71ijMCh8Q8oOHsElS5T2+xyoHt6fNQ+sH3ni1rbh5ETQ6NIaWJX40Mh2TqiQrvaBHS6MMFBCuYS7SyWmtJATV9eD6FsdD25MsyXoUGjJPyOfN+DBc/YYrzGy/QARqDd3pJhOdI+NAnfOwMybdZLxIMIRpLNQoZX5UBH35ghqWtULqcMTtuyxlFaDo94OmjkxHqcivxEzscw6gHEWyuqD/QC7e1rdo5LvaRADaXYiCcQcP3aB+kOOysuNhGsUJ3U2L0jIsO8dBVVaUQZ8VyqLwy5eexCmXR+IK5VcFNY4M12Oque27zyV190y5eHvcrEa6nVtnZSqWf+vydlBEfbscymiN2AOZVjI3UdYnxpoue/z0DQwEr2eHgRFH9KEhDQdveYVV7vUIqM8OvyP5lK2mCIrmXjj9lA/2PXXO6Y0rCokkQ7mV+rnGpxjgBQNL4yc/tYKhYHREXXZF4HrkycPXhxoWZ0POT1WcWx7eSpnMxJYwnXR0T1RR9PEtFTe1ZSrYf3xLWZbaWOIhJzuhSWx4wrVjpnhiBz7WJfjwUpHrF2mYsSDTiCjECXqVEIwR2sNIAGHRBrLbp/hRo65cPmE2ChkRdwir4UpTBaHQjwT8vvrxjEi2n3GQ1noEAAeaR/K5O2Nku/2O0DY9KvWKBBF3VhSWcQYas+UG1IRZ5Co3oIFegDaLtXNo+Lvp7AFKYz/milTXES1TTqdgCg9Vb8BClBLdgiCL0ib6adX81ENH7lrsqa9qx0nspz3OAUwvoUV1tIuXHUUJyq6TnEPhtpGV7NajkXp7iUPkeVGRkA8iIZLhFsVW+7+BKbr7bSStiGJ5NadTCtiwW0oq1VSd6ZrlCj3WMiEgBG7qx+6nfPTlCziAydII/kzkoVcr/XxuLf1tfrZv8NkcQnEXVDdzz3yV+j/zMtVzpfuuL7crAlCow0pu3FqmjlPxGTQPdqe7JKtnwMogz+wuQ6TtLrPwE7ZhIsd90DZhnozYRgQIbVvN6jovw9rYfBnCVF2pQMz6RNpordxIIA7jDBJ/26B4BNlDP9mWPysPJYqi/Z0ioVuNV6fkCIsnjQ/Kg5Yc81wv8jyQAtyez98jUqicjG6nRkAm7n/t6bJG3cwAxA8qink06NuW+27YpxByJm9Y5IJnSuwkKvJILSf061l/aSuF/eGpCKwww6UIxlDcNJoyM/cIQyWNZSf1kiSYdBFl6ihMpcCgjFtrp1e5dRzL9YlQ4cDS55QhhkntA37Q6hRE7UuzkZ9mgXULP0gCN+5uXJlfMB9wNamyoiEKsSjQDa3h2puO6l1XcWj5JWV11r+h4MwW//AeX2XqPb5KCQKxPtH1MSkssVo4QlQCU6ZM+quyUpDZfqDypqHVgJpKZJh9ypsiBrpiBgs8z/M74e40buYzrl/yGW5F48zzYtN4pakMlakL8BO0YJ8m55MbXQcczhpjpcKOIPhzOg/l38+42uEu42qnFjAhuOLgepKXhk8mw8GdTVD6kT/AQ5SJerQQk/isybKESJ10KgsBzZVgYm9xIQ7DST+CqfUWtXQTB3jqFPy0S4X1N3bhfti+5+k1Xmo5f1RNpZx57Mg2VdqEPpNKYOZUlZhwvPMirtJJSxFvvRRnFmpFNbDw88ECIuUwUURP3+VJg7SIL0/ikdYjLkdHwRwj4Rgek8ZowvLVM/2ceLPSzpWSBLZ71mXRxCiZKBBlIdhs0m2CtijL8vIUmwp0miD2vjlue+kpS4d6R9f3t81qefTJrsE2c/c/Vi1jXWCd5rYyioom8WFZe6Arcw/KSMKJkAf73s8iHfILwVtcI0ZVSHU6WHwQUxiA30qX77zEukWiay7V2kFUGhFz8UoKvV1i4xKr4xVtPDQaz9P7nqzw3clQab8SUgzVV/LdypMqY1mnofCU2jwv5yyv9mkd0G2GuANjWIpH+w8SPZHEPeGa2YStZbNRRM4lmgQ9fUfebz29GvqlOnvHx9mM2UvBFbsDRBakcSvMrXxoFI+Z7YvHflrlaWWe+Kq5qkm2aQpAu3d++UVPUEQxVUH/HQynpVuXlqNRR+rrbBKf4wt4taQPICgDBLCCTRy/gNp36FwE+2PXwTDqIO5RlBhPRGohMtYNVtekB1WbeujKWiRmWVwOrEaU2dJooCrjXmgYF2EYs1KMv571I7DvKxEoKMMwu9oFUBXcYTAOOI0NVepHFCRZNemWRb3DfK8OVNsOTzO81jcQ4UjTCTqYWAvp5ZkfO2AR62naDByeYxb2CrqMDKMP6iEfK99zm9S86dAaesrvnKXo5NS+QccZYpurrLYP0OV5QzusMm3cqLv2Z0FeRTlsHS2zhflIpbG3QST2SYrG0Qlv+z0Y7LvMQeIWJWxtVCjw0Wf1ZZXWRkgsMSLnMKIDiT/7uHyjnma3ATXBU06+mpi1yLSR3uwaVEutljAYtxYYAhx/JwYxHMn8qgsceK4F3MnrKVIHNn4dG70PukqHK4A8eS5kmmr7odE80FNB1JjHZio59HOzn6yA7eosyki6+nWnWpUYAK7VmfIilUacNK2UoKioibqUWDvGlmMrl46J6Z4+VJ2z2d6Dt/ZUvfhiYw/gclE/9qj6nhlaDu0/8sSt++JCRGldVDBDrcMtkTblUsx4vN2wkscDRdBq1C2CQ62LmCzWhUaGHKiA2K9bpEqHi2iGsjhkANyDCDvdGjB5qAaPW208AjAEHUIUXQmtXwgYxJ33koPJQ4NQ9/YRJpuDwI8N9ACHQT2Mv/G5Aeq50UHyA7+XfEjWRWB73TmHMYx8rRuWhsnDPkB7EI0fd8JzxWlQmjGZvKLOy7i7pEV+EZcuhD6ARkRl4HsTZXDBInj2gE5NyrCDqNGwY5SHjeJ/eOrQwLHK4ybHoIpu8SgCqjivo475hcv2qUFo8C7TOPZMywuTy5ZrRC2vZ1Z5FWrLC6Nny4skjWG12YV+P+M6bQRgdpGHUtQVNhyWvRqpcwmCGXWcc5h2HfsEhmKsi+y3rGG6tcoaxilpIi8UYpPGjvPg4XXUy4Gi3ofsJ1ExqIpXYiJ0+cyvMr8KDDUXwEzzGqeY5jXRBUnhT+wVwlyA6bRE0ix3ZeowjgqPTV1ZVaE4hKga2RShIe2hxruVdEMf3KnEbcdDr/TFagwbDCuGhJf4VY8PBGWoqnaZbXV6oW5RIl66K9Tyo+FXMgdW0NoLrMjYagNDjyhvaN+gjfwEr2h6jI+wqGsEKgsvxe6YKUEZj3b7UejTeDDrdGCCSI"; }

//=============================================================================
// Window_NameBox
//=============================================================================

Yanfly.DisableWebGLMask = false;

function Window_NameBox() {
    this.initialize.apply(this, arguments);
}

Window_NameBox.prototype = Object.create(Window_Base.prototype);
Window_NameBox.prototype.constructor = Window_NameBox;

Window_NameBox.prototype.initialize = function(parentWindow) {
    this._parentWindow = parentWindow;
    Window_Base.prototype.initialize.call(this, 0, 0, 240, this.windowHeight());
    this._text = '';
    this._lastNameText = '';
    this._openness = 0;
    this._closeCounter = 0;
    this.deactivate();
    if (eval(Yanfly.Param.MSGNameBoxClear)) {
      this.backOpacity = 0;
      this.opacity = 0;
    }
    this.hide();
};

Window_NameBox.prototype.windowWidth = function() {
    this.resetFontSettings();
    var dw = this.textWidthEx(this._text);
    dw += this.padding * 2;
    var width = dw + eval(Yanfly.Param.MSGNameBoxPadding)
    return Math.ceil(width);
};

Window_NameBox.prototype.textWidthEx = function(text) {
    return this.drawTextEx(text, 0, this.contents.height);
};

Window_NameBox.prototype.calcNormalCharacter = function(textState) {
    return this.textWidth(textState.text[textState.index++]);
};

Window_NameBox.prototype.windowHeight = function() {
    return this.fittingHeight(1);
};

Window_NameBox.prototype.standardFontFace = function() {
    return $gameSystem.getMessageFontName();
};

Window_NameBox.prototype.standardFontSize = function() {
    return $gameSystem.getMessageFontSize();
};

Window_NameBox.prototype.update = function() {
    Window_Base.prototype.update.call(this);
    if (this.active) return;
    if (this.isClosed()) return;
    if (this.isClosing()) return;
    if (this._closeCounter-- > 0) return;
    if (this._parentWindow.isClosing()) {
      this._openness = this._parentWindow.openness;
    }
    this.close();
};

Window_NameBox.prototype.refresh = function(text, position) {
    this.show();
    this._lastNameText = text;
    this._text = Yanfly.Param.MSGNameBoxText + text;
    this._position = position;
    this.width = this.windowWidth();
    this.createContents();
    this.contents.clear();
    this.resetFontSettings();
    this.changeTextColor(this.textColor(Yanfly.Param.MSGNameBoxColor));
    var padding = eval(Yanfly.Param.MSGNameBoxPadding) / 2;
    this.drawTextEx(this._text, padding, 0, this.contents.width);
    this._parentWindow.adjustWindowSettings();
    this._parentWindow.updatePlacement();
    this.adjustPositionX();
    this.adjustPositionY();
    this.open();
    this.activate();
    this._closeCounter = 4;
    return '';
};

Window_NameBox.prototype.adjustPositionX = function() {

	this._position = 3; // @HACK - Name lines always centered.

    if (this._position === 1) {
      this.x = this._parentWindow.x;
      this.x += eval(Yanfly.Param.MSGNameBoxBufferX);
    } else if (this._position === 2) {
      this.x = this._parentWindow.x;
      this.x += this._parentWindow.width * 3 / 10;
      this.x -= this.width / 2;
    } else if (this._position === 3) {
      this.x = this._parentWindow.x;
      this.x += this._parentWindow.width / 2;
      this.x -= this.width / 2;
    } else if (this._position === 4) {
      this.x = this._parentWindow.x;
      this.x += this._parentWindow.width * 7 / 10;
      this.x -= this.width / 2;
    } else {
      this.x = this._parentWindow.x + this._parentWindow.width;
      this.x -= this.width;
      this.x -= eval(Yanfly.Param.MSGNameBoxBufferX);
    }
    this.x = this.x.clamp(0, Graphics.boxWidth - this.width);
};

Window_NameBox.prototype.adjustPositionY = function() {
    if ($gameMessage.positionType() === 0) {
      this.y = this._parentWindow.y + this._parentWindow.height;
      this.y -= eval(Yanfly.Param.MSGNameBoxBufferY);
    } else {
      this.y = this._parentWindow.y;
      this.y -= this.height;
      this.y += eval(Yanfly.Param.MSGNameBoxBufferY);
    }
    if (this.y < 0) {
      this.y = this._parentWindow.y + this._parentWindow.height;
      this.y -= eval(Yanfly.Param.MSGNameBoxBufferY);
    }
};

//=============================================================================
// Window_Message
//=============================================================================

Yanfly.Message.Window_Message_createSubWindows =
    Window_Message.prototype.createSubWindows;
Window_Message.prototype.createSubWindows = function() {
    Yanfly.Message.Window_Message_createSubWindows.call(this);
    this._nameWindow = new Window_NameBox(this);
    Yanfly.nameWindow = this._nameWindow;
    var scene = SceneManager._scene;
    scene.addChild(this._nameWindow);
};

Window_Message.prototype.numVisibleRows = function() {
    return $gameSystem.messageRows();
};

Window_Message.prototype.windowWidth = function() {
    return $gameSystem.messageWidth();
};

Window_Message.prototype.wordwrapWidth = function(){
  if (Yanfly.Param.MSGTightWrap && $gameMessage.faceName() !== '') {
    return this.contents.width - this.newLineX();
  }
  return Window_Base.prototype.wordwrapWidth.call(this);
};

Window_Message.prototype.adjustWindowSettings = function() {
    this.width = this.windowWidth();
    this.height = Math.min(this.windowHeight(), Graphics.boxHeight);
    if (Math.abs(Graphics.boxHeight - this.height) < this.lineHeight()) {
      this.height = Graphics.boxHeight;
    }
    this.createContents();
    this.x = (Graphics.boxWidth - this.width) / 2;
};

Yanfly.Message.Window_Message_startMessage =
    Window_Message.prototype.startMessage;
Window_Message.prototype.startMessage = function() {
    this._nameWindow.deactivate();
    Yanfly.Message.Window_Message_startMessage.call(this);
};

Yanfly.Message.Window_Message_terminateMessage =
    Window_Message.prototype.terminateMessage;
Window_Message.prototype.terminateMessage = function() {
    this._nameWindow.deactivate();
    Yanfly.Message.Window_Message_terminateMessage.call(this);
};

Yanfly.Message.Window_Message_newPage =
    Window_Message.prototype.newPage;
Window_Message.prototype.newPage = function(textState) {
    this.adjustWindowSettings();
    Yanfly.Message.Window_Message_newPage.call(this, textState);
};

Window_Message.prototype.standardFontFace = function() {
    return $gameSystem.getMessageFontName();
};

Window_Message.prototype.standardFontSize = function() {
    return $gameSystem.getMessageFontSize();
};

Window_Message.prototype.newLineX = function() {
    if ($gameMessage.faceName() === '') {
      return 0;
    } else {
      return eval(Yanfly.Param.MSGFaceIndent);
    }
};

Window_Message.prototype.isFastForward = function() {
    if (!$gameSystem.isFastFowardEnabled()) return false;
    return Input.isPressed(Yanfly.Param.MSGFastForwardKey);
};

Yanfly.Message.Window_Message_updateInput =
    Window_Message.prototype.updateInput;
Window_Message.prototype.updateInput = function() {
    if (this.pause && this.isFastForward()) {
      if (!this._textState) {
        this.pause = false;
        this.terminateMessage();
      }
    }
    return Yanfly.Message.Window_Message_updateInput.call(this);
};

Yanfly.Message.Window_Message_updateShowFast =
    Window_Message.prototype.updateShowFast;
Window_Message.prototype.updateShowFast = function() {
    if (this.isFastForward()) this._showFast = true;
    Yanfly.Message.Window_Message_updateShowFast.call(this);
};

Yanfly.Message.Window_Message_updateWait =
    Window_Message.prototype.updateWait;
Window_Message.prototype.updateWait = function() {
    if (this.isFastForward()) return false;
    return Yanfly.Message.Window_Message_updateWait.call(this);
};

Yanfly.Message.Window_Message_startWait =
    Window_Message.prototype.startWait;
Window_Message.prototype.startWait = function(count) {
    if (this._checkWordWrapMode) return;
    Yanfly.Message.Window_Message_startWait.call(this, count);
    if (this.isFastForward()) this._waitCount = 0;
};

Yanfly.Message.Window_Message_startPause =
    Window_Message.prototype.startPause;
Window_Message.prototype.startPause = function() {
    if (this._checkWordWrapMode) return;
    Yanfly.Message.Window_Message_startPause.call(this);
};

Window_Message.prototype.convertEscapeCharacters = function(text) {
    text = Window_Base.prototype.convertEscapeCharacters.call(this, text);
    text = this.convertNameBox(text);
    text = this.convertMessageCharacters(text);
    return text;
};

Window_Message.prototype.convertNameBox = function(text) {
    text = text.replace(/\x1bN\<(.*?)\>/gi, function() {
        return Yanfly.nameWindow.refresh(arguments[1], 1);
    }, this);
    text = text.replace(/\x1bN1\<(.*?)\>/gi, function() {
        return Yanfly.nameWindow.refresh(arguments[1], 1);
    }, this);
    text = text.replace(/\x1bN2\<(.*?)\>/gi, function() {
        return Yanfly.nameWindow.refresh(arguments[1], 2);
    }, this);
    text = text.replace(/\x1bN3\<(.*?)\>/gi, function() {
        return Yanfly.nameWindow.refresh(arguments[1], 3);
    }, this);
    text = text.replace(/\x1bNC\<(.*?)\>/gi, function() {
        return Yanfly.nameWindow.refresh(arguments[1], 3);
    }, this);
    text = text.replace(/\x1bN4\<(.*?)\>/gi, function() {
        return Yanfly.nameWindow.refresh(arguments[1], 4);
    }, this);
    text = text.replace(/\x1bN5\<(.*?)\>/gi, function() {
        return Yanfly.nameWindow.refresh(arguments[1], 5);
    }, this);
    text = text.replace(/\x1bNR\<(.*?)\>/gi, function() {
        return Yanfly.nameWindow.refresh(arguments[1], 5);
    }, this);
    return text;
};

Window_Message.prototype.convertMessageCharacters = function(text) {
    text = text.replace(/\x1bAF\[(\d+)\]/gi, function() {
        var i = parseInt(arguments[1]);
        return this.convertActorFace($gameActors.actor(i));
    }.bind(this));
    text = text.replace(/\x1bPF\[(\d+)\]/gi, function() {
        var i = parseInt(arguments[1]);
        return this.convertActorFace($gameParty.members()[i - 1]);
    }.bind(this));
    return text;
};

Window_Message.prototype.convertActorFace = function(actor) {
    $gameMessage.setFaceImage(actor.faceName(), actor.faceIndex());
    return '';
};

Yanfly.Message.Window_Message_processEscapeCharacter =
    Window_Message.prototype.processEscapeCharacter;
Window_Message.prototype.processEscapeCharacter = function(code, textState) {
    switch (code) {
    case '!':
      if (!this.isFastForward()) this.startPause();
      break;
    case 'W':
      this.startWait(this.obtainEscapeParam(textState));
    default:
      Yanfly.Message.Window_Message_processEscapeCharacter.call(this,
        code, textState);
      break;
    }
};

if (Yanfly.Param.MSGNameBoxClose) {

Yanfly.Message.Window_Message_doesContinue =
  Window_Message.prototype.doesContinue;
Window_Message.prototype.doesContinue = function() {
  var value = Yanfly.Message.Window_Message_doesContinue.call(this);
  if (!value) return false;
  if (this.hasDifferentNameBoxText()) {
    return false;
  }
  return true;
};

Window_Message.prototype.hasDifferentNameBoxText = function() {
  var texts = $gameMessage._texts;
  var length = texts.length;
  var open = this._nameWindow.isOpen();
  for (var i = 0; i < length; ++i) {
    var text = texts[i];
    if (text.length <= 0) continue;
    if (Yanfly.MsgMacro) {
      text = this.convertMacroText(text);
      text = text.replace(/\x1b/gi, '\\');
    }
    if (text.match(/\\(?:N|N1|N2|N3|N4|N5|NC|NR)<(.*)>/i)) {
      var name = String(RegExp.$1);
    } else if (text.match(/\\(?:ND|ND1|ND2|ND3|ND4|ND5|NDC|NDR)<(.*)>/i)) {
      var name = String(RegExp.$1);
    } else if (text.match(/\\(?:NT|NT1|NT2|NT3|NT4|NT5|NTC|NTR)<(.*)>/i)) {
      var name = String(RegExp.$1);
    }
    if (name) {
      name = name.replace(/\\V\[(\d+)\]/gi, function() {
        return $gameVariables.value(parseInt(arguments[1]));
      }.bind(this));
      name = name.replace(/\\V\[(\d+)\]/gi, function() {
        return $gameVariables.value(parseInt(arguments[1]));
      }.bind(this));
      name = name.replace(/\\N\[(\d+)\]/gi, function() {
        return this.actorName(parseInt(arguments[1]));
      }.bind(this));
      name = name.replace(/\\P\[(\d+)\]/gi, function() {
        return this.partyMemberName(parseInt(arguments[1]));
      }.bind(this));
      name = name.replace(/\\/gi, '\x1b');
    }
    if (name && !open) return true;
    if (name && name !== this._nameWindow._lastNameText) {
      return true;
    }
  }
  if (open && !name) return true;
  return false;
};

} // Yanfly.Param.MSGNameBoxClose

//=============================================================================
// End of File
//=============================================================================
