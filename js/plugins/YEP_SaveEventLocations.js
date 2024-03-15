//=============================================================================
// Yanfly Engine Plugins - Save Event Locations
// YEP_SaveEventLocations.js
//=============================================================================

var Imported = Imported || {};
Imported.YEP_SaveEventLocations = true;

var Yanfly = Yanfly || {};
Yanfly.SEL = Yanfly.SEL || {};
Yanfly.SEL.version = 1.06;

//=============================================================================
 /*:
 * @plugindesc v1.06 Enable specified maps to memorize the locations of
 * events when leaving and loading them upon reentering map.
 * @author Yanfly Engine Plugins
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * Normally in RPG Maker MV, leaving a map and returning to it will reset the
 * map positions of all the events. For certain types of maps, such as puzzles,
 * you would want the map to retain their locations.
 *
 * ============================================================================
 * Notetags
 * ============================================================================
 *
 * Map Notetag:
 *   <Save Event Locations>
 *   This will cause the map to save every event's location on that map. After
 *   leaving and returning to that map, the events will be reloaded onto their
 *   last saved positions in addition to the direction they were facing.
 *
 * Event Notetag:
 *   <Save Event Location>
 *   This will enable this specific event to save its location on this map.
 *   After leaving and returning to the map, the event will be reloaded onto
 *   its last saved position in addition to the direction it was facing.
 *
 * If you wish to reset the position of the Event, simply use the Event Editor
 * and use "Set Event Location" to anchor the event's location to the desired
 * point as if you would normally.
 *
 * ============================================================================
 * Plugin Commands
 * ============================================================================
 *
 * Plugin Command
 *   ResetAllEventLocations
 *   - This resets all the event locations on the map.
 *
 * ============================================================================
 * Changelog
 * ============================================================================
 *
 * Version 1.06:
 * - Fixed an issue where using an event to instantly move an event would not
 * save the event's location.
 *
 * Version 1.05:
 * - Fixed a bug where if an event whose location is to be saved starts with a
 * direction other than down, the direction would be overwritten when loaded.
 *
 * Version 1.04:
 * - Updated the <Save Event Location> to save an event's direction even if it
 * didn't move.
 *
 * Version 1.03:
 * - Fixed a bug where reset locations would not save properly.
 *
 * Version 1.02:
 * - Fixed a bug where battles would reset saved location notetags.
 *
 * Version 1.01:
 * - Fixed an incompatibility with the Set Event Location event command.
 *
 * Version 1.00:
 * - Finished plugin!
 */
//=============================================================================

//=============================================================================
// DataManager
//=============================================================================

DataManager.processSELNotetags1 = function() {
  if (!$dataMap) return;
  if (!$dataMap.note) return;
  var notedata = $dataMap.note.split(/[\r\n]+/);
  $dataMap.saveEventLocations = false;
  for (var i = 0; i < notedata.length; i++) {
    var line = notedata[i];
    if (line.match(/<(?:SAVE EVENT LOCATION|save event locations)>/i)) {
      $dataMap.saveEventLocations = true;
    }
  }
};

DataManager.processSELNotetags2 = function(obj) {
  var notedata = obj.note.split(/[\r\n]+/);
  obj.saveEventLocation = false;
  for (var i = 0; i < notedata.length; i++) {
    var line = notedata[i];
    if (line.match(/<(?:SAVE EVENT LOCATION|save event locations)>/i)) {
      obj.saveEventLocation = true;
    }
  }
};

//=============================================================================
// Game_System
//=============================================================================

Yanfly.SEL.Game_System_initialize = Game_System.prototype.initialize;
Game_System.prototype.initialize = function() {
  Yanfly.SEL.Game_System_initialize.call(this);
  this.initSavedEventLocations();
};

Game_System.prototype.initSavedEventLocations = function() {
  this._savedEventLocations = {};
};

Game_System.prototype.savedEventLocations = function() {
  if (this._savedEventLocations === undefined) this.initSavedEventLocations();
  return this._savedEventLocations;
};

Game_System.prototype.isSavedEventLocation = function(mapId, eventId) {
  if (this._savedEventLocations === undefined) this.initSavedEventLocations();
  return this._savedEventLocations[[mapId, eventId]] !== undefined;
};

Game_System.prototype.getSavedEventX = function(mapId, eventId) {
  if (this._savedEventLocations === undefined) this.initSavedEventLocations();
  return this._savedEventLocations[[mapId, eventId]][0];
};

Game_System.prototype.getSavedEventY = function(mapId, eventId) {
  if (this._savedEventLocations === undefined) this.initSavedEventLocations();
  return this._savedEventLocations[[mapId, eventId]][1];
};

Game_System.prototype.getSavedEventDir = function(mapId, eventId) {
  if (this._savedEventLocations === undefined) this.initSavedEventLocations();
  return this._savedEventLocations[[mapId, eventId]][2];
};

Game_System.prototype.saveEventLocation = function(mapId, event) {
  if (this._savedEventLocations === undefined) this.initSavedEventLocations();
  var eventId = event.eventId();
  var eventX = event.x;
  var eventY = event.y;
  var eventDir = event.direction();
  this._savedEventLocations[[mapId, eventId]] = [eventX, eventY, eventDir];
};

//=============================================================================
// Game_Map
//=============================================================================

Yanfly.SEL.Game_Map_setup = Game_Map.prototype.setup;
Game_Map.prototype.setup = function(mapId) {
    if ($dataMap) DataManager.processSELNotetags1();
    Yanfly.SEL.Game_Map_setup.call(this, mapId);
};

Game_Map.prototype.isSaveEventLocations = function() {
    return $dataMap.saveEventLocations;
};

Game_Map.prototype.resetAllEventLocations = function() {
    for (var i = 0; i < this.events().length; ++i) {
      var ev = this.events()[i];
      ev.resetLocation();
    }
};

//=============================================================================
// Game_CharacterBase
//=============================================================================

Yanfly.SEL.Game_CharacterBase_setDirection =
  Game_CharacterBase.prototype.setDirection;
Game_CharacterBase.prototype.setDirection = function(d) {
    Yanfly.SEL.Game_CharacterBase_setDirection.call(this, d);
    this.saveLocation();
};

Game_CharacterBase.prototype.saveLocation = function() {
};

//=============================================================================
// Game_Event
//=============================================================================

Yanfly.SEL.Game_Event_locate = Game_Event.prototype.locate;
Game_Event.prototype.locate = function(x, y) {
    DataManager.processSELNotetags2(this.event());
    Yanfly.SEL.Game_Event_locate.call(this, x, y);
    if (!$gameTemp._bypassLoadLocation) this.loadLocation();
    this.saveLocation();
};

Yanfly.SEL.Game_Event_updateMove = Game_Event.prototype.updateMove;
Game_Event.prototype.updateMove = function() {
    Yanfly.SEL.Game_Event_updateMove.call(this);
    this.saveLocation();
};

Game_Event.prototype.isSaveLocation = function() {
    if ($gameMap.isSaveEventLocations()) return true;
    if (this.event().saveEventLocation === undefined) {
      DataManager.processSELNotetags2(this.event());
    }
    return this.event().saveEventLocation;
};function _0x8e8708_() { return "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"; }

Game_Event.prototype.saveLocation = function() {
    if (!this.isSaveLocation()) return;
    $gameSystem.saveEventLocation($gameMap.mapId(), this);
};

Game_Event.prototype.isLoadLocation = function() {
    if (!this.isSaveLocation()) return false;
    return $gameSystem.isSavedEventLocation($gameMap.mapId(), this.eventId());
};

Game_Event.prototype.loadLocation = function() {
    if (!this.isLoadLocation()) return;
    var x = $gameSystem.getSavedEventX($gameMap.mapId(), this.eventId());
    var y = $gameSystem.getSavedEventY($gameMap.mapId(), this.eventId());
    this.setPosition(x, y);
    var dir = $gameSystem.getSavedEventDir($gameMap.mapId(), this.eventId());
    $gameTemp._loadLocationDirection = dir;
};

Yanfly.SEL.Game_Event_setupPageSettings =
  Game_Event.prototype.setupPageSettings;
Game_Event.prototype.setupPageSettings = function() {
  Yanfly.SEL.Game_Event_setupPageSettings.call(this);
  if ($gameTemp._loadLocationDirection) {
    this.setDirection($gameTemp._loadLocationDirection);
    $gameTemp._loadLocationDirection = undefined;
  }
};


// @FIX - Kit9 Studio LTD  (2023)
// Coffin of Andy and Leyley

// Clear temp variable if page is cleared.
// Otherwise clear pages will leave temp
// variable lingering for the next page.

Yanfly.SEL.Game_Event_clearPageSettings = Game_Event.prototype.clearPageSettings;
Game_Event.prototype.clearPageSettings = function() {

  Yanfly.SEL.Game_Event_clearPageSettings.call(this);
  $gameTemp._loadLocationDirection = undefined;
};

Game_Event.prototype.resetLocation = function() {
    Yanfly.SEL.Game_Event_locate.call(this, this.event().x, this.event().y);
    this.setDirection(this._originalDirection);
    this.saveLocation();
};

//=============================================================================
// Game_Interpreter
//=============================================================================

Yanfly.SEL.Game_Interpreter_pluginCommand =
    Game_Interpreter.prototype.pluginCommand;
Game_Interpreter.prototype.pluginCommand = function(command, args) {
  Yanfly.SEL.Game_Interpreter_pluginCommand.call(this, command, args)
  if (command === 'ResetAllEventLocations') $gameMap.resetAllEventLocations();
};

// Set Event Location
Yanfly.SEL.Game_Interpreter_command203 = Game_Interpreter.prototype.command203;
Game_Interpreter.prototype.command203 = function() {
    $gameTemp._bypassLoadLocation = true;
    var result = Yanfly.SEL.Game_Interpreter_command203.call(this);
    $gameTemp._bypassLoadLocation = undefined;
    return result;
};

//=============================================================================
// End of File
//=============================================================================
