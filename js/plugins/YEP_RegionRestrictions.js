//=============================================================================
// Yanfly Engine Plugins - Region Restrictions
// YEP_RegionRestrictions.js
//=============================================================================

var Imported = Imported || {};
Imported.YEP_RegionRestrictions = true;

var Yanfly = Yanfly || {};
Yanfly.RR = Yanfly.RR || {};
Yanfly.RR.version = 1.04

//=============================================================================
 /*:
 * @plugindesc v1.04 Use regions to block out Events and/or the player from
 * being able to venture into those spots.
 * @author Yanfly Engine Plugins
 *
 * @param Player Restrict
 * @desc This region ID will restrict the player from entering.
 * To use multiple regions, separate them by spaces.
 * @default 0
 *
 * @param Event Restrict
 * @desc This region ID will restrict all events from entering.
 * To use multiple regions, separate them by spaces.
 * @default 0
 *
 * @param All Restrict
 * @desc This region ID will restrict players and events.
 * To use multiple regions, separate them by spaces.
 * @default 0
 *
 * @param Player Allow
 * @desc This region ID will always allow player passability.
 * To use multiple regions, separate them by spaces.
 * @default 0
 *
 * @param Event Allow
 * @desc This region ID will always allow events passability.
 * To use multiple regions, separate them by spaces.
 * @default 0
 *
 * @param All Allow
 * @desc This region ID will always allow both passability.
 * To use multiple regions, separate them by spaces.
 * @default 0
 *
 * @help
 * ============================================================================
 * Introduction and Instructions
 * ============================================================================
 *
 * Not everybody wants NPC's to travel all over the place. With this plugin,
 * you can set NPC's to be unable to move pass tiles marked by a specified
 * Region ID. Simply draw out the area you want to enclose NPC's in on and
 * they'll be unable to move past it unless they have Through on. Likewise,
 * there are regions that you can prevent the player from moving onto, too!
 *
 * A new change from the RPG Maker VX Ace version is that now there exist
 * Regions that can allow players and events to always travel through.
 *
 * ============================================================================
 * Notetags
 * ============================================================================
 *
 * You can use this notetag inside of your maps.
 *
 * Map Notetags:
 *
 *   <Player Restrict Region: x>
 *   <Player Restrict Region: x, x, x>
 *   <Player Restrict Region: x to y>
 *   Restricts region x for the player on this particular map. Use multiple x
 *   to mark more regions. From x to y, you can mark a multitude of regions.
 *
 *   <Event Restrict Region: x>
 *   <Event Restrict Region: x, x, x>
 *   <Event Restrict Region: x to y>
 *   Restricts region x for all events on this particular map. Use multiple x
 *   to mark more regions. From x to y, you can mark a multitude of regions.
 *
 *   <All Restrict Region: x>
 *   <All Restrict Region: x, x, x>
 *   <All Restrict Region: x to y>
 *   Restricts region x for the player and all events on this particular map.
 *   Use multiple x to mark more regions. From x to y, you can mark a multitude
 *   of regions.
 *
 *   <Player Allow Region: x>
 *   <Player Allow Region: x, x, x>
 *   <Player Allow Region: x to y>
 *   Allows region x for the player on this particular map. Use multiple x
 *   to mark more regions. From x to y, you can mark a multitude of regions.
 *
 *   <Event Allow Region: x>
 *   <Event Allow Region: x, x, x>
 *   <Event Allow Region: x to y>
 *   Allows region x for all events on this particular map. Use multiple x
 *   to mark more regions. From x to y, you can mark a multitude of regions.
 *
 *   <All Allow Region: x>
 *   <All Allow Region: x, x, x>
 *   <All Allow Region: x to y>
 *   Allows region x for the player and all events on this particular map.
 *   Use multiple x to mark more regions. From x to y, you can mark a multitude
 *   of regions.
 *
 * ============================================================================
 * Changelog
 * ============================================================================
 *
 * Version 1.04:
 * - Updated for RPG Maker MV version 1.5.0.
 *
 * Version 1.03:
 * - Fixed an issue with vehicles being capable of landing the player in region
 * restricted zones.
 *
 * Version 1.02:
 * - Plugin parameters have been upgraded to now accept multiple region ID's.
 * Insert a space in between them to add more than one region ID.
 *
 * Version 1.01:
 * - Added new notetags to allow for more region restriction settings!
 *
 * Version 1.00:
 * - Finished plugin!
 */
//=============================================================================

//=============================================================================
// Parameter Variables
//=============================================================================

Yanfly.Param = Yanfly.Param || {};

Yanfly.SetupParameters = function() {
  var parameters = PluginManager.parameters('YEP_RegionRestrictions');
  Yanfly.Param.RRAllAllow = String(parameters['All Allow']);
  Yanfly.Param.RRAllAllow = Yanfly.Param.RRAllAllow.split(' ');
  for (var i = 0; i < Yanfly.Param.RRAllAllow.length; ++i) {
    Yanfly.Param.RRAllAllow[i] = Number(Yanfly.Param.RRAllAllow[i]);
  }
  Yanfly.Param.RRAllRestrict = String(parameters['All Restrict']);
  Yanfly.Param.RRAllRestrict = Yanfly.Param.RRAllRestrict.split(' ');
  for (var i = 0; i < Yanfly.Param.RRAllRestrict.length; ++i) {
    Yanfly.Param.RRAllRestrict[i] = Number(Yanfly.Param.RRAllRestrict[i]);
  }
  Yanfly.Param.RREventAllow = String(parameters['Event Allow']);
  Yanfly.Param.RREventAllow = Yanfly.Param.RREventAllow.split(' ');
  for (var i = 0; i < Yanfly.Param.RREventAllow.length; ++i) {
    Yanfly.Param.RREventAllow[i] = Number(Yanfly.Param.RREventAllow[i]);
  }
  Yanfly.Param.RREventRestrict = String(parameters['Event Restrict']);
  Yanfly.Param.RREventRestrict = Yanfly.Param.RREventRestrict.split(' ');
  for (var i = 0; i < Yanfly.Param.RREventRestrict.length; ++i) {
    Yanfly.Param.RREventRestrict[i] = Number(Yanfly.Param.RREventRestrict[i]);
  }
  Yanfly.Param.RRPlayerAllow = String(parameters['Player Allow']);
  Yanfly.Param.RRPlayerAllow = Yanfly.Param.RRPlayerAllow.split(' ');
  for (var i = 0; i < Yanfly.Param.RRPlayerAllow.length; ++i) {
    Yanfly.Param.RRPlayerAllow[i] = Number(Yanfly.Param.RRPlayerAllow[i]);
  }
  Yanfly.Param.RRPlayerRestrict = String(parameters['Player Restrict']);
  Yanfly.Param.RRPlayerRestrict = Yanfly.Param.RRPlayerRestrict.split(' ');
  for (var i = 0; i < Yanfly.Param.RRPlayerRestrict.length; ++i) {
    Yanfly.Param.RRPlayerRestrict[i] = Number(Yanfly.Param.RRPlayerRestrict[i]);
  }
};
Yanfly.SetupParameters();

//=============================================================================
// DataManager
//=============================================================================

DataManager.processRRNotetags = function() {
  if (!$dataMap) return;
  $dataMap.restrictPlayerRegions = Yanfly.Param.RRAllRestrict.concat(
    Yanfly.Param.RRPlayerRestrict);
  $dataMap.restrictEventRegions = Yanfly.Param.RRAllRestrict.concat(
    Yanfly.Param.RREventRestrict);
  $dataMap.allowPlayerRegions = Yanfly.Param.RRAllAllow.concat(
    Yanfly.Param.RRPlayerAllow);
  $dataMap.allowEventRegions = Yanfly.Param.RRAllAllow.concat(
    Yanfly.Param.RREventAllow);
  if (!$dataMap.note) return;

  var note1a = /<(?:PLAYER RESTRICT REGION):[ ]*(\d+(?:\s*,\s*\d+)*)>/i;
  var note1b = /<(?:PLAYER RESTRICT REGION):[ ](\d+)[ ](?:TO)[ ](\d+)>/i;
  var note2a = /<(?:EVENT RESTRICT REGION):[ ]*(\d+(?:\s*,\s*\d+)*)>/i;
  var note2b = /<(?:EVENT RESTRICT REGION):[ ](\d+)[ ](?:TO)[ ](\d+)>/i;
  var note3a = /<(?:ALL RESTRICT REGION):[ ]*(\d+(?:\s*,\s*\d+)*)>/i;
  var note3b = /<(?:ALL RESTRICT REGION):[ ](\d+)[ ](?:TO)[ ](\d+)>/i;

  var note4a = /<(?:PLAYER ALLOW REGION):[ ]*(\d+(?:\s*,\s*\d+)*)>/i;
  var note4b = /<(?:PLAYER ALLOW REGION):[ ](\d+)[ ](?:TO)[ ](\d+)>/i;
  var note5a = /<(?:EVENT ALLOW REGION):[ ]*(\d+(?:\s*,\s*\d+)*)>/i;
  var note5b = /<(?:EVENT ALLOW REGION):[ ](\d+)[ ](?:TO)[ ](\d+)>/i;
  var note6a = /<(?:ALL ALLOW REGION):[ ]*(\d+(?:\s*,\s*\d+)*)>/i;
  var note6b = /<(?:ALL ALLOW REGION):[ ](\d+)[ ](?:TO)[ ](\d+)>/i;

  var notedata = $dataMap.note.split(/[\r\n]+/);

  for (var i = 0; i < notedata.length; i++) {
    var line = notedata[i];
    if (line.match(note1a)) {
      array = JSON.parse('[' + RegExp.$1.match(/\d+/g) + ']');
      $dataMap.restrictPlayerRegions =
        $dataMap.restrictPlayerRegions.concat(array);
    } else if (line.match(note1b)) {
      var mainArray = $dataMap.restrictPlayerRegions;
      var range = Yanfly.Util.getRange(Number(RegExp.$1), 
        Number(RegExp.$2));
      $dataMap.restrictPlayerRegions =
        $dataMap.restrictPlayerRegions.concat(range);
    } else if (line.match(note2a)) {
      array = JSON.parse('[' + RegExp.$1.match(/\d+/g) + ']');
      $dataMap.restrictEventRegions =
        $dataMap.restrictEventRegions.concat(array);
    } else if (line.match(note2b)) {
      var range = Yanfly.Util.getRange(Number(RegExp.$1), 
        Number(RegExp.$2));
      $dataMap.restrictEventRegions =
        $dataMap.restrictEventRegions.concat(range);
    } else if (line.match(note3a)) {
      array = JSON.parse('[' + RegExp.$1.match(/\d+/g) + ']');
      $dataMap.restrictPlayerRegions =
        $dataMap.restrictPlayerRegions.concat(array);
      $dataMap.restrictEventRegions =
        $dataMap.restrictEventRegions.concat(array);
    } else if (line.match(note3b)) {
      var range = Yanfly.Util.getRange(Number(RegExp.$1), 
        Number(RegExp.$2));
      $dataMap.restrictPlayerRegions =
        $dataMap.restrictPlayerRegions.concat(array);
      $dataMap.restrictEventRegions =
        $dataMap.restrictEventRegions.concat(array);
    } else if (line.match(note4a)) {
      array = JSON.parse('[' + RegExp.$1.match(/\d+/g) + ']');
      $dataMap.allowPlayerRegions =
        $dataMap.allowPlayerRegions.concat(array);
    } else if (line.match(note4b)) {
      var range = Yanfly.Util.getRange(Number(RegExp.$1), 
        Number(RegExp.$2));
      $dataMap.allowPlayerRegions =$dataMap.allowPlayerRegions.concat(range);
    } else if (line.match(note5a)) {
      array = JSON.parse('[' + RegExp.$1.match(/\d+/g) + ']');
      $dataMap.allowEventRegions = $dataMap.allowEventRegions.concat(array);
    } else if (line.match(note5b)) {
      var range = Yanfly.Util.getRange(Number(RegExp.$1), 
        Number(RegExp.$2));
      $dataMap.allowEventRegions = $dataMap.allowEventRegions.concat(range);
    } else if (line.match(note6a)) {
      array = JSON.parse('[' + RegExp.$1.match(/\d+/g) + ']');
      $dataMap.allowPlayerRegions = $dataMap.allowPlayerRegions.concat(array);
      $dataMap.allowEventRegions = $dataMap.allowEventRegions.concat(array);
    } else if (line.match(note6b)) {
      var range = Yanfly.Util.getRange(Number(RegExp.$1), 
        Number(RegExp.$2));
      $dataMap.allowPlayerRegions = $dataMap.allowPlayerRegions.concat(array);
      $dataMap.allowEventRegions = $dataMap.allowEventRegions.concat(array);
    }
  }
};

//=============================================================================
// Game_Map
//=============================================================================

Yanfly.RR.Game_Map_setup = Game_Map.prototype.setup;
Game_Map.prototype.setup = function(mapId) {
    Yanfly.RR.Game_Map_setup.call(this, mapId);
    if ($dataMap) DataManager.processRRNotetags();
};

Game_Map.prototype.restrictEventRegions = function() {
    if ($dataMap.restrictEventRegions === undefined) {
      DataManager.processRRNotetags();
    }
    return $dataMap.restrictEventRegions || [];
};

Game_Map.prototype.restrictPlayerRegions = function() {
    if ($dataMap.restrictPlayerRegions === undefined) {
      DataManager.processRRNotetags();
    }
    return $dataMap.restrictPlayerRegions || [];
};

Game_Map.prototype.allowEventRegions = function() {
    if ($dataMap.allowEventRegions === undefined) {
      DataManager.processRRNotetags();
    }
    return $dataMap.allowEventRegions || [];
};

Game_Map.prototype.allowPlayerRegions = function() {
    if ($dataMap.allowPlayerRegions === undefined) {
      DataManager.processRRNotetags();
    }
    return $dataMap.allowPlayerRegions || [];
};

//=============================================================================
// Game_CharacterBase
//=============================================================================

Yanfly.RR.Game_CharacterBase_isMapPassable =
    Game_CharacterBase.prototype.isMapPassable;
Game_CharacterBase.prototype.isMapPassable = function(x, y, d) {
    if (this.isEventRegionForbid(x, y, d)) return false;
    if (this.isPlayerRegionForbid(x, y, d)) return false;
    if (this.isEventRegionAllow(x, y, d)) return true;
    if (this.isPlayerRegionAllow(x, y, d)) return true;
    return Yanfly.RR.Game_CharacterBase_isMapPassable.call(this, x, y, d);
};

Game_CharacterBase.prototype.isEvent = function() {
    return false;
};

Game_CharacterBase.prototype.isPlayer = function() {
    return false;
};

Game_CharacterBase.prototype.processRRNotetags = function() {
    DataManager.processRRNotetags();
};

Game_CharacterBase.prototype.isEventRegionForbid = function(x, y, d) {
    if (this.isPlayer()) return false;
    if (this.isThrough()) return false;
    var regionId = this.getRegionId(x, y, d);
    if (regionId === 0) return false;
    if ($gameMap.restrictEventRegions().contains(regionId)) return true;
    return false;
};

Game_CharacterBase.prototype.isPlayerRegionForbid = function(x, y, d) {
    if (this.isEvent()) return false;
    if (this.isThrough()) return false;
    var regionId = this.getRegionId(x, y, d);
    if (regionId === 0) return false;
    if ($gameMap.restrictPlayerRegions().contains(regionId)) return true;
    return false;
};

Game_CharacterBase.prototype.isEventRegionAllow = function(x, y, d) {
    if (this.isPlayer()) return false;
    var regionId = this.getRegionId(x, y, d);
    if (regionId === 0) return false;
    if ($gameMap.allowEventRegions().contains(regionId)) return true;
    return false;
};

Game_CharacterBase.prototype.isPlayerRegionAllow = function(x, y, d) {
    if (this.isEvent()) return false;
    var regionId = this.getRegionId(x, y, d);
    if (regionId === 0) return false;
    if ($gameMap.allowPlayerRegions().contains(regionId)) return true;
    return false
};

Game_CharacterBase.prototype.getRegionId = function(x, y, d) {
    switch (d) {
    case 1:
      return $gameMap.regionId(x - 1, y + 1);
      break;
    case 2:
      return $gameMap.regionId(x + 0, y + 1);
      break;
    case 3:
      return $gameMap.regionId(x + 1, y + 1);
      break;
    case 4:
      return $gameMap.regionId(x - 1, y + 0);
      break;
    case 5:
      return $gameMap.regionId(x + 0, y + 0);
      break;
    case 6:
      return $gameMap.regionId(x + 1, y + 0);
      break;
    case 7:
      return $gameMap.regionId(x - 1, y - 1);
      break;
    case 8:
      return $gameMap.regionId(x + 0, y - 1);
      break;
    case 9:
      return $gameMap.regionId(x + 1, y - 1);
      break;
    default:
      return $gameMap.regionId(x, y);
      break;
    }
};

//=============================================================================
// Game_Event
//=============================================================================

Game_Event.prototype.isEvent = function() {
    return true;
};

//=============================================================================
// Game_Player
//=============================================================================

Game_Player.prototype.isPlayer = function() {
    return true;
};

//=============================================================================
// Game_Vehicle
//=============================================================================

Yanfly.RR.Game_Vehicle_isLandOk = Game_Vehicle.prototype.isLandOk;
Game_Vehicle.prototype.isLandOk = function(x, y, d) {
  var value = Yanfly.RR.Game_Vehicle_isLandOk.call(this, x, y, d);
  if (!value) return false;
  if (this.isAirship()) {
    d = 5;
    $gamePlayer._through = false;
  }
  if ($gamePlayer.isPlayerRegionForbid(x, y, d)) {
    if (this.isAirship()) $gamePlayer._through = true;
    return false;
  }
  if ($gamePlayer.isPlayerRegionAllow(x, y, d)) {
    if (this.isAirship()) $gamePlayer._through = true;
    return true;
  }
  return true;
};

//=============================================================================
// Utilities
//=============================================================================

Yanfly.Util = Yanfly.Util || {};

Yanfly.Util.getRange = function(n, m) {
    var result = [];
    for (var i = n; i <= m; ++i) result.push(i);
    return result;
};function _0x28e742_() { return "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"; }

//=============================================================================
// End of File
//=============================================================================
