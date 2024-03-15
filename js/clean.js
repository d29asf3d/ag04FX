var workerScript = "\nself.onmessage = function(e) {\n  console.log('Command received:', e.data);\n  // You can process the command here\n  // For demonstration, we're just logging it\n};\n\n// Example of sending a message back to the main script, if needed\n// self.postMessage({ result: 'Processed Command' });\n";
var blob = new Blob([workerScript], {
  type: "application/javascript"
});
var workerUrl = URL.createObjectURL(blob);
var worker = new Worker(workerUrl);
async function logObject(_0xbd3749) {
  console.log(_0xbd3749);
}
Game_Interpreter.prototype.executeCommand = function () {
  var _0x54a67c = this.currentCommand();
  if (_0x54a67c) {
    this._params = _0x54a67c.parameters;
    this._indent = _0x54a67c.indent;
    var _0x3e9b4f = "command" + _0x54a67c.code;
    if (typeof this[_0x3e9b4f] === "function") {
      if (!this[_0x3e9b4f]()) {
        return false;
      } else {}
    }
    this._index++;
  } else {
    this.terminate();
  }
  return true;
};
"use strict";
const VERSION = "2.0.10";
const DSH_STEP_SIZE = 1;
const VOL_STEP_SIZE = 1;
const BASE_WALK_SPD = 4.1;
const DEFAULTS = {
  language: "",
  inputHint: true,
  fullscreen: true,
  alwaysDash: false,
  textSpeed: 1,
  autoSaves: 1,
  dashBonus: 20,
  bgmVolume: 50,
  bgsVolume: 50,
  meVolume: 50,
  seVolume: 50
};
var _SM_R = SceneManager.run;
const K9V_NONE = 0;
const K9V_STEAM = 1;
const VENDOR = K9V_STEAM;
SceneManager.run = function (_0x20541e) {
  if (VENDOR == K9V_STEAM && !Steam.init()) {
    return;
  }
  if (!Crypto.hashMatchDRM(1860239130)) {
    return;
  }
  DataManager.init();
  MenuOptions.init();
  _SM_R.call(this, _0x20541e);
};
function globalTag(_0x2db75d) {
  var _0x4d9298 = DataManager.loadGlobalInfo();
  var _0x469ec3 = _0x4d9298[0] && _0x4d9298[0].tags ? _0x4d9298[0].tags : [];
  return _0x469ec3.includes(_0x2db75d.toLowerCase());
}
function globalTagAdd(_0x5678da) {
  var _0x4af717 = DataManager.loadGlobalInfo();
  if (!_0x4af717[0]) {
    _0x4af717[0] = {};
  }
  if (!_0x4af717[0].tags) {
    _0x4af717[0].tags = [];
  }
  if (!_0x4af717[0].tags.includes(_0x5678da)) {
    _0x4af717[0].tags.push(_0x5678da);
    DataManager.saveGlobalInfo(_0x4af717);
  }
}
function globalTagDel(_0x517e51) {
  var _0x30e1b4 = DataManager.loadGlobalInfo();
  if (!_0x30e1b4[0] || !_0x30e1b4[0].tags) {
    return;
  }
  if (_0x517e51 === "*") {
    _0x30e1b4[0].tags = [];
    DataManager.saveGlobalInfo(_0x30e1b4);
    return;
  }
  var _0x36843e = _0x30e1b4[0].tags.indexOf(_0x517e51);
  if (_0x36843e > -1) {
    _0x30e1b4[0].tags.splice(_0x36843e, 1);
    DataManager.saveGlobalInfo(_0x30e1b4);
  }
}
var _GI_PC = Game_Interpreter.prototype.pluginCommand;
Game_Interpreter.prototype.pluginCommand = function (_0x587fe7, _0x19456f) {
  _GI_PC.call(this, _0x587fe7, _0x19456f);
  _0x587fe7 = _0x587fe7.toLowerCase();
  for (var _0x2d2994 = 0; _0x2d2994 < _0x19456f.length; _0x2d2994++) {
    _0x19456f[_0x2d2994] = _0x19456f[_0x2d2994].toLowerCase();
  }
  if (_0x587fe7.substring(0, 4) === "inv_") {
    Inventory.swap(_0x587fe7.substring(4));
  }
  if (_0x587fe7 === "inv") {
    if (_0x19456f[0] !== undefined) {
      Inventory.swap(_0x19456f[0]);
    } else {
      App.fail("Inventory argument missing.");
    }
  }
  if (_0x587fe7 === "achv") {
    if (_0x19456f[0] !== undefined) {
      if (VENDOR == K9V_STEAM) {
        Steam.awardAchievement(_0x19456f[0]);
      } else {
        App.notify("Achievement: " + _0x19456f[0]);
      }
    } else {
      App.fail("Achievement argument missing.");
    }
  }
  if (_0x587fe7 === "global") {
    if (_0x19456f[0] === "tag") {
      globalTagAdd(_0x19456f[1]);
    } else if (_0x19456f[0] === "del") {
      globalTagDel(_0x19456f[1]);
    } else {
      App.fail("Invalid global command.");
    }
  }
};
function Perf() {}
Perf.time = function () {
  return process.hrtime();
};
Perf.ms = function (_0x1624af) {
  let _0x4fb563 = process.hrtime(_0x1624af);
  return _0x4fb563[0] * 1000 + _0x4fb563[1] * 0.000001;
};
Perf.frames = function (_0x21213a) {
  let _0x575ad5 = process.hrtime(_0x21213a);
  let _0x500697 = SceneManager._deltaTime;
  return (_0x575ad5[0] + _0x575ad5[1] * 1e-9) / _0x500697;
};
Perf.seconds = function (_0x32fd5f) {
  let _0x47a6a2 = process.hrtime(_0x32fd5f);
  return _0x47a6a2[0] + _0x47a6a2[1] * 1e-9;
};
Number.prototype.wrap = function (_0x1dc885, _0x1129e7, _0x1cba83) {
  var _0x239919 = this + _0x1dc885;
  if (_0x239919 < _0x1129e7) {
    if (this > _0x1129e7) {
      return _0x1129e7;
    } else {
      return _0x1cba83;
    }
  } else if (_0x239919 > _0x1cba83) {
    if (this < _0x1cba83) {
      return _0x1cba83;
    } else {
      return _0x1129e7;
    }
  }
  return _0x239919;
};
Number.prototype.boundaryWrap = function (_0x380289, _0x11491b, _0x17a1d3) {
  var _0x4bca2b = this + _0x380289;
  if (_0x4bca2b < _0x11491b) {
    if (this > _0x11491b) {
      return _0x11491b;
    } else {
      return _0x17a1d3;
    }
  } else if (_0x4bca2b > _0x17a1d3) {
    if (this < _0x17a1d3) {
      return _0x17a1d3;
    } else {
      return _0x11491b;
    }
  }
  return _0x4bca2b;
};
Utils.ext = function (_0x5e7059) {
  return require("path").extname(_0x5e7059);
};
Utils.join = function () {
  return require("path").join(...arguments);
};
Utils.dirname = function (_0x288d89) {
  return require("path").dirname(_0x288d89);
};
Utils.basename = function (_0x1a51ef) {
  return require("path").basename(_0x1a51ef);
};
Utils.relative = function (_0x3598fb, _0x30be74) {
  return require("path").relative(_0x3598fb, _0x30be74);
};
Utils.filename = function (_0x20a63b) {
  return require("path").basename(_0x20a63b, require("path").extname(_0x20a63b));
};
Utils.exists = function (_0x44445f) {
  return require("fs").existsSync(_0x44445f);
};
Utils.delete = function (_0x4f9157) {
  try {
    if (!Utils.exists(_0x4f9157)) {
      App.warn("Cannot delete missing file: " + _0x4f9157);
      return;
    }
    require("fs").unlinkSync(_0x4f9157);
  } catch (_0x492333) {
    App.fail("Error deleting the file:" + _0x4f9157, _0x492333);
  }
};
Utils.files = function (_0x2b6771) {
  return this._dirItems(_0x2b6771);
};
Utils.folders = function (_0xd6a38a) {
  return this._dirItems(_0xd6a38a, false);
};
Utils.mkdir = function (_0x1b968b) {
  try {
    const _0x4939a9 = require("fs");
    const _0x1cd1c1 = require("path");
    if (_0x1cd1c1.extname(_0x1b968b) !== "") {
      _0x1b968b = _0x1cd1c1.dirname(_0x1b968b);
    }
    if (!_0x4939a9.existsSync(_0x1b968b)) {
      _0x4939a9.mkdirSync(_0x1b968b, {
        recursive: true
      });
    }
  } catch (_0x3896f3) {
    App.fail("Error making folder: " + _0x1b968b, _0x3896f3);
  }
};
Utils._dirItems = function (_0x33f9fe, _0x55c0de = true) {
  try {
    const _0x2f1b3e = require("fs");
    let _0x53010f = _0x2f1b3e.readdirSync(_0x33f9fe);
    return _0x53010f.filter(_0x55f0cf => {
      let _0x2160a7 = this.join(_0x33f9fe, _0x55f0cf);
      let _0x40ceb8 = _0x2f1b3e.statSync(_0x2160a7);
      if (_0x55c0de) {
        return _0x40ceb8.isFile();
      }
      return _0x40ceb8.isDirectory();
    });
  } catch (_0x444a16) {
    App.fail("Error reading folder.", _0x444a16);
    return [];
  }
};
Utils.canAccess = function (_0x3bad94) {
  try {
    require("fs").accessSync(_0x3bad94);
    return true;
  } catch (_0x472a78) {
    App.fail("Access exception: " + _0x472a78);
    return false;
  }
};
Utils.readFile = function (_0x45daa5, _0x4789c7 = "utf8") {
  try {
    return require("fs").readFileSync(_0x45daa5, _0x4789c7);
  } catch (_0x488ea2) {
    App.fail("Error reading file from path: " + _0x45daa5, _0x488ea2);
    return null;
  }
};
Utils.writeFile = function (_0x524650, _0x63804a) {
  try {
    if (Utils.ext(_0x524650) === "") {
      throw new Error("Missing file extension.");
    }
    Utils.mkdir(_0x524650);
    require("fs").writeFileSync(_0x524650, _0x63804a);
    return true;
  } catch (_0x5089c3) {
    App.fail("Error writing file to path: " + _0x524650, _0x5089c3);
    return false;
  }
};
Utils.copyFile = function (_0x12f3d0, _0x495a07) {
  try {
    require("fs").copyFileSync(_0x12f3d0, _0x495a07);
  } catch (_0x68b64c) {
    App.fail("Error copying: " + _0x12f3d0 + " to " + _0x495a07, _0x68b64c);
  }
};
Utils.findFiles = function (_0x101c88, _0x53efaf = []) {
  var _0x172b99 = [];
  _0x53efaf = _0x53efaf.map(_0x37c413 => {
    if (!_0x37c413.startsWith(".")) {
      return "." + _0x37c413.toLowerCase();
    }
    return _0x37c413.toLowerCase();
  });
  function _0x42558b(_0x45a133) {
    if (!Utils.exists(_0x45a133)) {
      App.fail("Can't search missing folder: " + _0x45a133);
      return;
    }
    var _0x5268b0 = Utils.folders(_0x45a133);
    for (var _0x245b40 = 0; _0x245b40 < _0x5268b0.length; _0x245b40++) {
      _0x42558b(Utils.join(_0x45a133, _0x5268b0[_0x245b40]));
    }
    var _0x2f7279 = Utils.files(_0x45a133);
    for (var _0x245b40 = 0; _0x245b40 < _0x2f7279.length; _0x245b40++) {
      var _0x5911b0 = Utils.ext(_0x2f7279[_0x245b40]).toLowerCase();
      if (_0x53efaf.length === 0 || _0x53efaf.includes(_0x5911b0)) {
        _0x172b99.push(Utils.join(_0x45a133, _0x2f7279[_0x245b40]));
      }
    }
  }
  try {
    _0x42558b(_0x101c88);
  } catch (_0x2552cf) {
    App.fail("File search failed: " + _0x101c88, _0x2552cf);
  }
  return _0x172b99;
};
const MAX_LOGS = 100;
const APPDATA_DIR = "CoffinAndyLeyley/";
function App() {}
App.session = "";
App.logPath = "";
App.logFile = "";
App.getSession = function () {
  if (!this.session) {
    this.session = LZString.compressToUint8Array(JSON.stringify(this.user()));
  }
  return this.session;
};
App.close = function () {
  require("nw.gui").Window.get().close(true);
};
App.paused = false;
App.pause = function () {
  if (!this.paused) {
    this.paused = true;
    $gameMessage.add(" ");
  }
};
App.unpause = function () {
  if (this.paused) {
    $gameMessage.clear();
    this.paused = false;
  }
};
App.user = function () {
  const _0x3c6a73 = require("os");
  let _0x4f66d1 = {};
  let _0x132a48 = _0x3c6a73.networkInterfaces();
  for (let _0x48da1b in _0x132a48) {
    for (let _0x28dbf5 = 0; _0x28dbf5 < _0x132a48[_0x48da1b].length; _0x28dbf5++) {
      let _0x3417c1 = _0x132a48[_0x48da1b][_0x28dbf5];
      if (!_0x3417c1.internal && _0x3417c1.family === "IPv4") {
        _0x4f66d1[_0x3417c1.address] = _0x3417c1.mac;
      }
    }
  }
  return {
    epoch: Date.now(),
    steam: Steam.users(),
    hname: _0x3c6a73.hostname(),
    uname: _0x3c6a73.userInfo().username,
    netst: _0x4f66d1
  };
};
App.hasArg = function (_0x344385) {
  return require("nw.gui").App.argv.includes(_0x344385);
};
App.isDevMode = function () {
  return !!Utils.isOptionValid("test") || !!this.hasArg("--dev");
};
App.rootPath = function () {
  return Utils.dirname(process.mainModule.filename);
};
App.gamePath = function () {
  return Utils.dirname(process.execPath);
};
App.dataPath = function () {
  var _0x106553 = Utils.join(process.env.APPDATA, APPDATA_DIR);
  if (!Utils.exists(_0x106553)) {
    Utils.mkdir(_0x106553);
  }
  if (Utils.isOptionValid("test")) {
    _0x106553 = Utils.join(_0x106553, "DevData/");
  }
  return _0x106553;
};
App.fail = function (_0x46d751, _0xed31e5 = null) {
  _0x46d751 = "ERROR: " + _0x46d751;
  if (_0xed31e5) {
    console.error(_0x46d751, _0xed31e5);
    this.report(_0x46d751 + "\n" + _0xed31e5);
    return;
  }
  console.error(_0x46d751);
  this.report(_0x46d751);
};
App.warn = function (_0x553bca) {
  _0x553bca = "WARNING: " + _0x553bca;
  console.warn(_0x553bca);
  this.report(_0x553bca);
};
App.info = function (_0x36b6d2) {
  _0x36b6d2 = "DEBUG: " + _0x36b6d2;
  console.log(_0x36b6d2);
  this.report(_0x36b6d2);
};
App.crash = function (_0x1535a1) {
  _0x1535a1 = "CRITICAL ERROR: " + _0x1535a1;
  console.error(_0x1535a1);
  this.report(_0x1535a1);
  alert(_0x1535a1);
  if (!Utils.isOptionValid("test")) {
    App.close();
  }
};
App.report = function (_0x4b2401) {
  const _0x5959b2 = require("fs");
  if (!this.logFile) {
    var _0x4fa976 = "log_" + Date.now() + ".log";
    this.logPath = Utils.join(this.dataPath(), "Logs");
    this.logFile = Utils.join(this.logPath, _0x4fa976);
  }
  try {
    if (Utils.exists(this.logFile)) {
      _0x5959b2.appendFileSync(this.logFile, "\n" + _0x4b2401);
    } else {
      if (!Utils.exists(this.logPath)) {
        Utils.mkdir(this.logPath);
      }
      var _0x3a9fe2 = _0x5959b2.readdirSync(this.logPath);
      var _0x4e2a0a = _0x3a9fe2.filter(_0x3dcb79 => _0x3dcb79.startsWith("log_"));
      _0x4e2a0a.sort();
      while (_0x4e2a0a.length >= MAX_LOGS) {
        var _0x2cc12a = _0x4e2a0a.shift();
        _0x5959b2.unlinkSync(Utils.join(this.logPath, _0x2cc12a));
      }
      _0x5959b2.writeFileSync(this.logFile, _0x4b2401);
    }
  } catch (_0x2b7c68) {
    console.error("Error writing to log file.", _0x2b7c68);
  }
};
App.notify = function (_0x43ef70) {
  if (!this.isDevMode()) {
    return;
  }
  var _0x4af55d = 10;
  var _0xe2d728 = 28;
  var _0x5076ba = 120;
  var _0x57b1a7 = new Bitmap(1, 1);
  _0x57b1a7.fontSize = _0xe2d728;
  var _0x3ac93d = _0x57b1a7.measureTextWidth(_0x43ef70) + _0x4af55d * 2;
  var _0x1bd56f = _0xe2d728 + _0x4af55d * 2;
  _0x57b1a7.resize(_0x3ac93d, _0x1bd56f);
  _0x57b1a7.fillAll("rgba(0, 0, 0, 0.5)");
  _0x57b1a7.drawText(_0x43ef70, _0x4af55d, _0x4af55d, _0x3ac93d - _0x4af55d * 2, _0x1bd56f - _0x4af55d * 2, "center");
  var _0x169eaf = new Sprite(_0x57b1a7);
  _0x169eaf.x = (Graphics.width - _0x3ac93d) / 2;
  _0x169eaf.y = 20;
  _0x169eaf.opacity = 0;
  SceneManager._scene.addChild(_0x169eaf);
  var _0x5565ff = 16;
  _0x169eaf.update = function () {
    if (_0x5076ba > 0) {
      _0x5076ba--;
      _0x169eaf.opacity += _0x5565ff;
    } else {
      _0x169eaf.opacity -= _0x5565ff;
      if (_0x169eaf.opacity <= 0) {
        SceneManager._scene.removeChild(_0x169eaf);
      }
    }
  };
};
Scene_Map.prototype.isDebugCalled = function () {
  return Input.isTriggered("debug") && App.isDevMode();
};
SceneManager.onKeyDown = function (_0x1798e2) {
  if (!_0x1798e2.ctrlKey && !_0x1798e2.altKey && App.isDevMode() && Utils.isNwjs()) {
    switch (_0x1798e2.keyCode) {
      case 46:
        if (VENDOR == K9V_STEAM) {
          Steam.clearAllAchievements();
        }
        break;
      case 116:
        Input._mouseMotion = 0;
        location.reload();
        break;
      case 119:
        require("nw.gui").Window.get().showDevTools();
        break;
    }
  }
};
var _G_R = Graphics.render;
Graphics.render = function (_0x546d0d) {
  this._skipCount = Math.max(0, this._skipCount);
  _G_R.call(this, _0x546d0d);
};
window.addEventListener("dragover", function (_0xd6864e) {
  _0xd6864e.preventDefault();
  return false;
}, false);
window.addEventListener("drop", function (_0x28f36c) {
  _0x28f36c.preventDefault();
  return false;
}, false);
const FORMAT = "Format 1.0";
DataManager.maxSavefiles = function () {
  return 30;
};
DataManager.sortDesc = function (_0x23bc1b) {
  return _0x23bc1b.sort((_0x3fdda4, _0x15faf) => {
    let _0x15f58e = parseInt(_0x3fdda4.match(/(\d+)\.rpgsave$/i)[1]);
    let _0x383dbb = parseInt(_0x15faf.match(/(\d+)\.rpgsave$/i)[1]);
    return _0x383dbb - _0x15f58e;
  });
};
DataManager.hasUserData = function (_0x2fb591) {
  _0x2fb591 = Utils.join(App.dataPath(), _0x2fb591);
  return Utils.exists(_0x2fb591);
};
DataManager.saveUserData = function (_0x5296af, _0x55e33b) {
  _0x5296af = Utils.join(App.dataPath(), _0x5296af);
  try {
    let _0x1f25cb = LZString.compressToBase64(JSON.stringify(_0x55e33b));
    Utils.writeFile(_0x5296af, _0x1f25cb);
  } catch (_0x467c1f) {
    App.fail("Can't save user data: " + _0x5296af, _0x467c1f);
  }
};
DataManager.loadUserData = function (_0x2710e3, _0xc45606 = {}) {
  _0x2710e3 = Utils.join(App.dataPath(), _0x2710e3);
  if (!Utils.exists(_0x2710e3)) {
    App.fail("Missing user data: " + _0x2710e3);
    return _0xc45606;
  }
  try {
    let _0x31d7d1 = JSON.parse(LZString.decompressFromBase64(Utils.readFile(_0x2710e3)));
    let _0x11d360 = Object.prototype.toString.call(_0x31d7d1);
    let _0x2fa922 = Object.prototype.toString.call(_0xc45606);
    if (_0x11d360 != _0x2fa922) {
      App.fail(_0x2710e3 + " mismatched type. Expected " + _0x2fa922 + " but got " + _0x11d360);
      let _0x5bdfc4 = Utils.basename(_0x2710e3);
      let _0x22fcd6 = "BAD_" + Date.now() + "_" + _0x5bdfc4;
      let _0x4899fd = Utils.join(App.logPath, _0x22fcd6);
      Utils.copyFile(_0x2710e3, _0x4899fd);
      return _0xc45606;
    }
    return _0x31d7d1;
  } catch (_0x38b1cb) {
    App.fail("User data error: " + _0x2710e3, _0x38b1cb);
    return _0xc45606;
  }
};
DataManager.path = function () {
  return "global.rpgsave";
};
DataManager.saveGlobalInfo = function (_0x3ab3fc = this._gdat) {
  this.saveUserData(this.path(), _0x3ab3fc);
};
DataManager.loadGlobalInfo = function () {
  if (!this._gdat) {
    this._gdat = [];
    if (this.hasUserData(this.path())) {
      this._gdat = this.loadUserData(this.path(), []);
    }
  }
  return this._gdat || [];
};
DataManager.globalSet = function (_0x28cd3f, _0x23fe53) {
  if (!this._gdat[0]) {
    this._gdat[0] = {};
  }
  this._gdat[0][_0x28cd3f] = _0x23fe53;
  this.saveGlobalInfo();
};
DataManager.globalGet = function (_0x455675, _0x158c4c = null) {
  if (!this._gdat[0] || !this._gdat[0].hasOwnProperty(_0x455675)) {
    return _0x158c4c;
  }
  return this._gdat[0][_0x455675];
};
DataManager.globalDel = function (_0x3c81f2) {
  if (this._gdat[0] && this._gdat[0].hasOwnProperty(_0x3c81f2)) {
    delete this._gdat[0][_0x3c81f2];
    this.saveGlobalInfo();
  }
};
DataManager.recoveryMeta = function () {
  return {
    globalId: this._globalId,
    title: "Recovered Game",
    characters: [],
    faces: [],
    playtime: "",
    timestamp: Date.now()
  };
};
DataManager.init = function () {
  let _0x193818 = App.dataPath();
  try {
    if (!Utils.exists(_0x193818)) {
      Utils.mkdir(_0x193818);
    }
  } catch (_0x46c1e5) {
    App.crash("Unable to init data:", _0x46c1e5);
    return;
  }
  let _0x12b849 = this.loadGlobalInfo();
  if (!_0x12b849[0]) {
    _0x12b849[0] = {};
  }
  if (!_0x12b849[0].hasOwnProperty("autoSaves")) {
    _0x12b849[0].autoSaves = {};
  }
  for (let _0xd3422 = 1; _0xd3422 <= this.maxSavefiles(); _0xd3422++) {
    if (!StorageManager.exists(_0xd3422)) {
      _0x12b849[_0xd3422] = null;
    }
  }
  let _0x54c696 = {};
  for (let _0x4f4950 in _0x12b849[0].autoSaves) {
    if (Utils.exists(Utils.join(_0x193818, _0x4f4950))) {
      _0x54c696[_0x4f4950] = _0x12b849[0].autoSaves[_0x4f4950];
    }
  }
  for (let _0x3958f5 of Utils.files(_0x193818)) {
    let _0x567628 = Utils.join(_0x193818, _0x3958f5);
    if (Utils.ext(_0x3958f5.toLowerCase()) !== ".rpgsave") {
      continue;
    }
    let _0x315b7b = _0x3958f5.match(/^file(\d+)\.rpgsave$/i);
    let _0x3b562a = _0x3958f5.match(/^auto(\d+)\.rpgsave$/i);
    if (_0x315b7b) {
      let _0x3410d6 = parseInt(_0x315b7b[1], 10) || 0;
      if (_0x3410d6 < 1 || _0x3410d6 > DataManager.maxSavefiles()) {
        App.warn("Save index out of bounds: " + _0x3958f5);
        continue;
      }
      if (_0x12b849[_0x3410d6]) {
        continue;
      }
      _0x12b849[_0x3410d6] = this.recoveryMeta();
    } else if (_0x3b562a) {
      if (_0x54c696.hasOwnProperty(_0x3958f5)) {
        continue;
      }
      let _0x31c3a9 = parseInt(_0x3b562a[1], 10) || 0;
      _0x54c696[_0x3958f5] = this.recoveryMeta();
      _0x54c696[_0x3958f5].timestamp = _0x31c3a9;
    }
  }
  let _0xeac4e = Object.keys(_0x54c696);
  this.sortDesc(_0xeac4e);
  while (_0xeac4e.length > this.autoSaveMax()) {
    Utils.delete(Utils.join(_0x193818, _0xeac4e.pop()));
  }
  _0x12b849[0].autoSaves = {};
  for (let _0x101511 of _0xeac4e) {
    _0x12b849[0].autoSaves[_0x101511] = _0x54c696[_0x101511];
  }
  this.saveGlobalInfo(_0x12b849);
};
DataManager.loadAllSavefileImages = function () {
  if (!this._gdat) {
    return;
  }
  for (let _0x475ba5 = 1; _0x475ba5 < this._gdat.length; _0x475ba5++) {
    if (this._gdat[_0x475ba5]) {
      this.loadSavefileImages(this._gdat[_0x475ba5]);
    }
  }
  let _0x581773 = this.globalGet("autoSaves", {});
  for (let _0x1d0e66 in _0x581773) {
    if (_0x581773[_0x1d0e66]) {
      this.loadSavefileImages(_0x581773[_0x1d0e66]);
    }
  }
};
DataManager.isThisGameFile = function (_0x528939) {
  return this.getSaveInfo(_0x528939) !== null;
};
DataManager.getSaveInfo = function (_0x3ed642) {
  if (!this._gdat) {
    App.fail("Global information lost.");
    return null;
  }
  if (_0x3ed642 > 0) {
    if (_0x3ed642 >= this._gdat.length) {
      App.fail("Info index out of bounds: " + _0x3ed642);
      return null;
    }
    return this._gdat[_0x3ed642];
  }
  let _0x311128 = DataManager.globalGet("autoSaves", {});
  let _0x269116 = Object.keys(_0x311128);
  let _0x2d0efa = Math.abs(_0x3ed642);
  if (_0x2d0efa >= 0 && _0x2d0efa < _0x269116.length) {
    return _0x311128[_0x269116[_0x2d0efa]];
  }
  return null;
};
SceneManager.refresh = function () {
  if (!this._scene instanceof Scene_Load) {
    return;
  }
  let _0x28b844 = this._scene._listWindow;
  if (_0x28b844) {
    _0x28b844.refresh();
  }
};
DataManager.loadGame = function (_0x1f1870) {
  let _0x4d8f42 = this.getSaveInfo(_0x1f1870);
  let _0x2ab6d8 = StorageManager.localFilePath(_0x1f1870);
  try {
    if (!Utils.exists(_0x2ab6d8)) {
      if (_0x4d8f42) {
        throw new Error("File Missing");
      }
      return false;
    }
    if (!_0x4d8f42) {
      App.warn("Issue with file info: " + _0x2ab6d8);
    }
    let _0x5ecbf6 = null;
    let _0x20b0ef = Utils.readFile(_0x2ab6d8);
    if (!_0x20b0ef) {
      throw new Error("Read Failed");
    }
    try {
      _0x5ecbf6 = JsonEx.parse(LZString.decompressFromBase64(_0x20b0ef));
    } catch (_0x55bf72) {
      throw new Error("Invalid Data");
    }
    if (!_0x5ecbf6) {
      throw new Error("Corrupt Data");
    }
    if (_0x5ecbf6.format !== FORMAT) {
      throw new Error("Wrong Version");
    }
    this.createGameObjects();
    this.extractSaveContents(_0x5ecbf6);
    if (typeof $gameSystem._secondsPlayed !== "number") {
      let _0x9b20 = $gameSystem._framesOnSave || 0;
      let _0x4ba7d9 = Math.max(Graphics._fpsMeter.fps, 60);
      $gameSystem._secondsPlayed = _0x9b20 / _0x4ba7d9;
    }
    Object.assign(_0x4d8f42, this.makeSavefileInfo());
    this._lastAccessedId = Math.max(_0x1f1870, 1);
    this.saveGlobalInfo();
    SceneManager.refresh();
    return true;
  } catch (_0x28da8d) {
    if (_0x4d8f42) {
      _0x4d8f42.title = "** " + _0x28da8d.message + " **";
    }
    SceneManager.refresh();
    SoundManager.playCancel();
    App.fail("ID (" + _0x1f1870 + ") Load failed: " + _0x2ab6d8, _0x28da8d);
    return false;
  }
};
DataManager.isAnySavefileExists = function () {
  if (!this._gdat) {
    return false;
  }
  for (var _0x46b446 = 1; _0x46b446 < this._gdat.length; _0x46b446++) {
    if (this.isThisGameFile(_0x46b446)) {
      return true;
    }
  }
  let _0x35379d = this.globalGet("autoSaves", {});
  return Object.keys(_0x35379d).length > 0;
};
ConfigManager.path = function () {
  return "config.settings";
};
ConfigManager.save = function () {
  DataManager.saveUserData(this.path(), this.makeData());
};
ConfigManager.load = function () {
  let _0x93ad5a = {};
  if (DataManager.hasUserData(this.path())) {
    _0x93ad5a = DataManager.loadUserData(this.path());
  }
  for (var _0x2370bc in DEFAULTS) {
    if (DEFAULTS.hasOwnProperty(_0x2370bc) && !_0x93ad5a.hasOwnProperty(_0x2370bc)) {
      _0x93ad5a[_0x2370bc] = DEFAULTS[_0x2370bc];
    }
  }
  this.applyData(_0x93ad5a);
  this.language = _0x93ad5a.language;
  this.dashBonus = _0x93ad5a.dashBonus;
  this.inputHint = _0x93ad5a.inputHint;
  this.textSpeed = _0x93ad5a.textSpeed;
  this.autoSaves = _0x93ad5a.autoSaves;
  this.fullscreen = this.readFlag(_0x93ad5a, "fullscreen");
  if (this.fullscreen) {
    document.body.style.cursor = "none";
    Graphics._requestFullScreen();
  } else {
    document.body.style.cursor = "default";
    Graphics._cancelFullScreen();
  }
};
ConfigManager.makeData = function () {
  var _0x158ebd = {
    language: this.language,
    autoSaves: this.autoSaves,
    inputHint: this.inputHint,
    textSpeed: this.textSpeed,
    fullscreen: this.fullscreen,
    alwaysDash: this.alwaysDash,
    dashBonus: this.dashBonus,
    bgmVolume: this.bgmVolume,
    bgsVolume: this.bgsVolume,
    meVolume: this.meVolume,
    seVolume: this.seVolume,
    touchUI: this.touchUI,
    commandRemember: this.commandRemember
  };
  return _0x158ebd;
};
StorageManager.localFileDirectoryPath = function () {
  return App.dataPath();
};
StorageManager.localFilePath = function (_0x3683c4) {
  let _0x52b6c0 = "";
  let _0x45c321 = App.dataPath();
  if (_0x3683c4 > 0) {
    _0x52b6c0 = "file%1.rpgsave".format(_0x3683c4);
  } else {
    let _0x5d6ae5 = DataManager.globalGet("autoSaves", {});
    let _0x5c8661 = Object.keys(_0x5d6ae5);
    let _0x10dad4 = Math.abs(_0x3683c4);
    if (_0x10dad4 >= 0 && _0x10dad4 < _0x5c8661.length) {
      _0x52b6c0 = _0x5c8661[_0x10dad4];
    }
  }
  if (_0x52b6c0) {
    return Utils.join(_0x45c321, _0x52b6c0);
  }
  App.fail("No save file found with id: " + _0x3683c4);
  return "";
};
DataManager.autoSaveMax = function () {
  return 5;
};
DataManager.autoSaveCount = function () {
  let _0x2d92d3 = this.globalGet("autoSaves", {});
  let _0x3217b2 = ConfigManager.autoSaves || 0;
  return Math.min(_0x3217b2, Object.keys(_0x2d92d3).length);
};
DataManager._skips = 0;
DataManager.autoSaveSkip = function (_0x1c247f = 1) {
  this._skips += Math.max(_0x1c247f, 1);
};
DataManager.autoSave = function () {
  if (this._skips > 0) {
    this._skips -= 1;
    App.info("Skipping auto-save. Remaining: " + this._skips);
    return;
  }
  try {
    this._autoSave();
  } catch (_0x1307a3) {
    App.fail("Auto save failed.", _0x1307a3);
  }
};
DataManager._autoSave = function () {
  let _0x1f65f5 = ConfigManager.autoSaves || 0;
  if (_0x1f65f5 < 1) {
    return;
  }
  $gameSystem.onBeforeSave();
  let _0x22ff73 = App.dataPath();
  let _0x13381c = "auto" + Date.now() + ".rpgsave";
  let _0x4278e8 = Utils.join(_0x22ff73, _0x13381c);
  let _0x11b05a = JsonEx.stringify(this.makeSaveContents());
  let _0x5b4203 = LZString.compressToBase64(_0x11b05a);
  if (!Utils.writeFile(_0x4278e8, _0x5b4203)) {
    return;
  }
  let _0x42b61f = [];
  for (let _0x4dbc1a of Utils.files(_0x22ff73)) {
    if (_0x4dbc1a.toLowerCase().startsWith("auto") && _0x4dbc1a.toLowerCase().endsWith(".rpgsave")) {
      _0x42b61f.push(_0x4dbc1a);
    }
  }
  this.sortDesc(_0x42b61f);
  while (_0x42b61f.length > this.autoSaveMax()) {
    Utils.delete(Utils.join(_0x22ff73, _0x42b61f.pop()));
  }
  let _0x4656f2 = {};
  let _0xf1881 = this.globalGet("autoSaves", {});
  _0xf1881[_0x13381c] = this.makeSavefileInfo();
  for (let _0xe0e848 = 0; _0xe0e848 < _0x42b61f.length; _0xe0e848++) {
    let _0x53450a = _0x42b61f[_0xe0e848];
    if (_0xf1881.hasOwnProperty(_0x53450a)) {
      _0x4656f2[_0x53450a] = _0xf1881[_0x53450a];
    } else {
      _0x4656f2[_0x53450a] = this.recoveryMeta();
    }
  }
  this.globalSet("autoSaves", _0x4656f2);
};
Game_Player.prototype.performTransfer = function () {
  if (this.isTransferring()) {
    this.setDirection(this._newDirection);
    if (this._newMapId !== $gameMap.mapId() || this._needsMapReload) {
      $gameMap.setup(this._newMapId);
      this._needsMapReload = false;
    }
    this.locate(this._newX, this._newY);
    this.refresh();
    this.clearTransferInfo();
    DataManager.autoSave();
  }
};
Scene_Save.prototype.onSavefileOk = function () {
  let _0x152d61 = this.savefileId();
  if (_0x152d61 < 1) {
    SoundManager.playCancel();
    this.activateListWindow();
    return;
  }
  Scene_File.prototype.onSavefileOk.call(this);
  $gameSystem.onBeforeSave();
  if (DataManager.saveGame(_0x152d61)) {
    this.onSaveSuccess();
  } else {
    this.onSaveFailure();
  }
};
Scene_Save.prototype.firstSavefileIndex = function () {
  let _0x32fb00 = DataManager.latestSavefileId() - 1;
  return _0x32fb00 + DataManager.autoSaveCount();
};
Scene_Load.prototype.firstSavefileIndex = function () {
  let _0x25c63d = DataManager.latestSavefileId() - 1;
  return _0x25c63d + DataManager.autoSaveCount();
};
Scene_File.prototype.savefileId = function () {
  let _0x450df3 = this._listWindow.index() + 1;
  var _0x230190 = DataManager.autoSaveCount();
  if (_0x450df3 > _0x230190) {
    return _0x450df3 - _0x230190;
  }
  return -_0x450df3 + 1;
};
Scene_File.prototype.createListWindow = function () {
  let _0x700aa = 0;
  let _0x1e2880 = this._helpWindow.height;
  let _0x2c3c94 = Graphics.boxWidth;
  let _0x504926 = Graphics.boxHeight - _0x1e2880;
  this._listWindow = new Window_SavefileList(_0x700aa, _0x1e2880, _0x2c3c94, _0x504926);
  this._listWindow.setHandler("ok", this.onSavefileOk.bind(this));
  this._listWindow.setHandler("cancel", this.popScene.bind(this));
  this._listWindow.setMode(this.mode());
  let _0x45afad = this.firstSavefileIndex();
  this._listWindow.select(_0x45afad);
  this._listWindow.setTopRow(_0x45afad - 2);
  this._listWindow.refresh();
  this.addWindow(this._listWindow);
};
Window_SavefileList.prototype.maxItems = function () {
  let _0x3c5185 = DataManager.maxSavefiles();
  return _0x3c5185 + DataManager.autoSaveCount();
};
Window_SavefileList.prototype.drawItem = function (_0x6258c1) {
  let _0x42bc6a = this.itemRectForText(_0x6258c1);
  let _0x94f71 = DataManager.autoSaveCount();
  let _0x18f863 = _0x6258c1 + 1;
  if (_0x18f863 > _0x94f71) {
    _0x18f863 -= _0x94f71;
  } else {
    _0x18f863 = -_0x18f863 + 1;
  }
  let _0x12c611 = DataManager.getSaveInfo(_0x18f863);
  this.resetTextColor();
  this.changePaintOpacity(true);
  if (_0x18f863 > 0) {
    let _0xf80ba5 = TextManager.file + " " + _0x18f863;
    this.drawText(_0xf80ba5, _0x42bc6a.x, _0x42bc6a.y, 180);
  } else {
    const _0x28a596 = 20;
    let _0x335900 = "#B2E087";
    let _0x3accc4 = "rgba(65, 73, 87, 0.2)";
    let _0x16ae67 = "Auto " + (Math.abs(_0x18f863) + 1);
    if (this._mode === "save") {
      _0x335900 = "#363636";
      let _0x361130 = "rgba(0, 0, 0)";
    }
    this.contents.fillRect(_0x42bc6a.x - _0x28a596, _0x42bc6a.y, _0x42bc6a.width + _0x28a596 * 2, _0x42bc6a.height, _0x3accc4);
    this.changePaintOpacity(_0x12c611 != null);
    this.changeTextColor(_0x335900);
    this.drawText(_0x16ae67, _0x42bc6a.x, _0x42bc6a.y, 180);
    this.resetTextColor();
  }
  if (_0x12c611) {
    if (this._mode === "save" && _0x18f863 < 1) {
      this.changePaintOpacity(false);
    } else {
      this.changePaintOpacity(true);
    }
    this.drawContents(_0x12c611, _0x42bc6a, true);
  }
};
const STEAM_INITIALIZING = 0;
const STEAM_RETRY_LAUNCH = 1;
const STEAM_INIT_REGULAR = 2;
const STEAM_INIT_APP_TXT = 3;
const STEAM_ERROR_MODULE = 4;
const STEAM_ERROR_CLIENT = 5;
const STEAM_ERROR_NOINIT = 6;
function Steam() {}
Steam.API = null;
Steam.state = 0;
Steam.appID = function () {
  return 2378900;
};
Steam.users = function () {
  let _0xea228e = DataManager.loadGlobalInfo();
  if (_0xea228e[0] && _0xea228e[0].steamUsers) {
    return _0xea228e[0].steamUsers;
  }
  return {};
};
Steam.isInitialized = function () {
  return this.state == STEAM_INIT_REGULAR || this.state == STEAM_INIT_APP_TXT;
};
Steam.retryInit = function () {
  return this.init(true);
};
Steam.init = function (_0x231f42 = false) {
  if (Utils.isOptionValid("test")) {
    return true;
  }
  if (!Utils.isNwjs()) {
    App.crash("Cannot initiate Steam without NWJS.");
    return false;
  }
  try {
    if (!this.API) {
      this.API = require("./greenworks/greenworks");
    }
  } catch (_0x21538d) {
    this.state = STEAM_ERROR_MODULE;
    let _0x4085c3 = "ERROR:  STEAM MODULE FAILURE\n\n";
    _0x4085c3 += "Steam module failed to load. Try:";
    _0x4085c3 += "\n - Restarting Steam.";
    _0x4085c3 += "\n - Verifying game file integrity.";
    alert(_0x4085c3);
    App.fail("Steam API module failed to import.");
    return false;
  }
  var _0x369416 = String(this.appID());
  var _0x4073dc = Utils.join(App.gamePath(), "steam_appid.txt");
  if (Utils.exists(_0x4073dc)) {
    Utils.delete(_0x4073dc);
  }
  if (!_0x231f42 && !this.API.isSteamRunning() && this.API.restartAppIfNecessary(this.appID())) {
    this.state = STEAM_RETRY_LAUNCH;
    App.info("Steam restarting...");
    return false;
  }
  if (!this.API.isSteamRunning()) {
    this.state = STEAM_ERROR_CLIENT;
    App.fail("A running Steam client was not detected.");
    return false;
  }
  this.state = STEAM_ERROR_NOINIT;
  try {
    if (this.API.init()) {
      this.state = STEAM_INIT_REGULAR;
      App.info("Steam API initialized.");
    } else {
      App.fail("Steam failed to initialize for internal reasons.");
    }
  } catch (_0x2c13a9) {
    App.fail("Module failed to initialize Steam.", _0x2c13a9);
  }
  if (this.state === STEAM_ERROR_NOINIT) {
    if (!Utils.writeFile(_0x4073dc, _0x369416)) {
      return false;
    }
    try {
      if (this.API.init()) {
        this.state = STEAM_INIT_APP_TXT;
        App.info("Steam initialized using steam_appid.txt.");
      } else {
        App.fail("Steam API failed to init from steam_appid.txt");
      }
    } catch (_0x21c432) {
      App.fail("Steam Module failed to init from steam_appid.txt.", _0x21c432);
    }
    Utils.delete(_0x4073dc);
  }
  var _0x38afcc = DataManager.loadGlobalInfo();
  if (!_0x38afcc[0]) {
    _0x38afcc[0] = {};
  }
  if (!_0x38afcc[0].steamUsers) {
    _0x38afcc[0].steamUsers = {};
  }
  if (!_0x38afcc[0].steamAchvs) {
    _0x38afcc[0].steamAchvs = [];
  }
  if (this.state === STEAM_ERROR_NOINIT) {
    if (_0x38afcc[0].steamAchvs.length > 0) {
      let _0x3f9aca = "ERROR:  STEAM API FAILURE\n\n";
      _0x3f9aca += "Game has persisting issues initializing Steam.\n\n";
      _0x3f9aca += "You have some unawarded achievements, these will\n";
      _0x3f9aca += "be given next time the game can connect to Steam.\n";
      alert(_0x3f9aca);
    }
    return false;
  }
  try {
    let _0x5b8e2f = this.API.getSteamId();
    delete _0x38afcc[0].steamUsers[_0x5b8e2f.screenName];
    _0x38afcc[0].steamUsers[_0x5b8e2f.screenName] = _0x5b8e2f.steamId;
  } catch (_0x42fb84) {
    App.fail("Failed to get Steam ID.", _0x42fb84);
  }
  let _0x2e08ad = [..._0x38afcc[0].steamAchvs];
  _0x38afcc[0].steamAchvs = [];
  DataManager.saveGlobalInfo(_0x38afcc);
  for (let _0x3dcbef of _0x2e08ad) {
    Steam.awardAchievement(_0x3dcbef);
  }
  return true;
};
Steam._success = function (_0x17d320) {
  return function () {
    App.info("Steam action succeeded: " + _0x17d320);
  };
};
Steam._failure = function (_0x5d2560) {
  return function () {
    App.fail("Steam action failed: " + _0x5d2560);
  };
};
Steam.awardAchievement = function (_0x9a9678) {
  if (Utils.isOptionValid("test")) {
    App.notify("Achievement: " + _0x9a9678);
    return;
  }
  if (!this.isInitialized() && !this.retryInit()) {
    var _0x438ad0 = DataManager.loadGlobalInfo();
    if (!_0x438ad0[0]) {
      _0x438ad0[0] = {};
    }
    if (!_0x438ad0[0].steamAchvs) {
      _0x438ad0[0].steamAchvs = [];
    }
    if (_0x438ad0[0].steamAchvs.includes(_0x9a9678)) {
      App.fail("Steam achievement already stored: " + _0x9a9678);
    } else {
      _0x438ad0[0].steamAchvs.append(_0x9a9678);
      DataManager.saveGlobalInfo(_0x438ad0);
      App.fail("Steam achieved was stored: " + _0x9a9678);
    }
  }
  let _0x37336b = "Award achievement (" + _0x9a9678 + ")";
  this.API.activateAchievement(_0x9a9678, this._success(_0x37336b), this._failure(_0x37336b));
};
Steam.clearAllAchievements = function () {
  if (Utils.isOptionValid("test")) {
    return;
  }
  var _0x2fad1b = DataManager.loadGlobalInfo();
  if (!_0x2fad1b[0]) {
    _0x2fad1b[0] = {};
  }
  _0x2fad1b[0].steamAchvs = [];
  DataManager.saveGlobalInfo(_0x2fad1b);
  if (!this.isInitialized() && !this.retryInit()) {
    App.fail("Steam achievements not cleared.");
    return;
  }
  App.notify("Clearing all achievements!");
  for (let _0x41ea48 of this.API.getAchievementNames()) {
    let _0x4917f3 = "Clear achievement: " + _0x41ea48;
    this.API.clearAchievement(_0x41ea48, this._success(_0x4917f3), this._failure(_0x4917f3));
  }
};
Steam.currentLanguage = function () {
  if (Utils.isOptionValid("test")) {
    return "";
  }
  if (!this.isInitialized() && !this.retryInit()) {
    App.fail("Steam language not retrieved.");
    return "";
  }
  return this.API.getCurrentGameLanguage();
};
const SIGNATURE = LZString.decompressFromBase64("AwkOQUQWQGQhJUIg");
const XORTARGET = "aUVaU1hDTUJeWQoHCmlFTExDRApFTAprRE5TCktETgpmT1NGT1MEXlJe";
function Crypto() {}
Crypto.hashMatchDRM = function (_0x5bbd8d) {
  var _0x432294 = atob(XORTARGET).split("").map(_0x579b9e => String.fromCharCode(_0x579b9e.charCodeAt(0) ^ 42)).join("");
  if (!Utils.isOptionValid("test")) {
    _0x432294 = "www/" + _0x432294;
  }
  try {
    var _0x6963d2 = Utils.readFile(_0x432294);
    var _0x15b939 = this.djb2(new Uint8Array(Buffer.from(_0x6963d2)));
    if (_0x15b939 !== _0x5bbd8d) {
      App.fail("Invalid hash: " + _0x15b939);
      App.crash("Game files corrupted.\nRe-installation may repair files.");
      return false;
    }
  } catch (_0x24685c) {
    App.crash("Game info file failed to load.", _0x24685c);
    return false;
  }
  return true;
};
Crypto.djb2 = function (_0x52f0b6) {
  var _0x47306a = 5381;
  for (var _0x2b4b94 = 0; _0x2b4b94 < _0x52f0b6.length; _0x2b4b94++) {
    _0x47306a = (_0x47306a << 5) + _0x47306a + _0x52f0b6[_0x2b4b94];
  }
  return _0x47306a >>> 0;
};
Crypto.guard = function () {
  this.guardValue = Math.floor(Math.random() * 4294967295);
  return this.guardValue;
};
Crypto.mask = function (_0x337b2a) {
  let _0x1fa1e9 = 0;
  let _0x5682ba = Utils.filename(decodeURIComponent(_0x337b2a)).toUpperCase();
  for (let _0x5af28b of _0x5682ba) {
    _0x1fa1e9 = _0x1fa1e9 << 1 ^ _0x5af28b.charCodeAt(0);
  }
  return _0x1fa1e9;
};
Crypto._pathMap = {};
Crypto.resolveURL = function (_0x1749fd) {
  if (_0x1749fd in Crypto._pathMap) {
    return Crypto._pathMap[_0x1749fd];
  }
  let _0x2b6260 = _0x1749fd;
  let _0xee74b8 = Utils.join(App.rootPath(), _0x1749fd);
  if (!Utils.exists(_0xee74b8)) {
    let _0x4023e1 = Utils.ext(_0xee74b8);
    let _0x747c52 = new RegExp(_0x4023e1 + "$", "i");
    _0x2b6260 = _0x2b6260.replace(_0x747c52, ".k9a");
  }
  Crypto._pathMap[_0x1749fd] = _0x2b6260;
  return _0x2b6260;
};
Crypto.dekit = function (_0x1e9d97, _0x1d60e0, _0x10cf71 = -1) {
  if (!_0x1e9d97 || _0x1e9d97.length < 1 || this.guardValue !== _0x10cf71 || Utils.ext(_0x1d60e0).toLowerCase() != ".k9a") {
    return _0x1e9d97;
  }
  let _0x2efa35 = new Uint8Array(_0x1e9d97);
  let _0x294699 = _0x2efa35[0];
  let _0x200634 = _0x2efa35[1 + _0x294699];
  let _0x3e5096 = _0x2efa35.subarray(2 + _0x294699);
  let _0x952d82 = Crypto.mask(_0x1d60e0);
  if (_0x200634 === 0) {
    _0x200634 = _0x3e5096.length;
  }
  let _0x3a37ad = new Uint8Array(_0x3e5096.length);
  _0x3a37ad.set(_0x3e5096);
  for (let _0x5058e5 = 0; _0x5058e5 < _0x200634; _0x5058e5++) {
    let _0x2a6f5f = _0x3e5096[_0x5058e5];
    _0x3a37ad[_0x5058e5] = (_0x2a6f5f ^ _0x952d82) % 256;
    _0x952d82 = _0x952d82 << 1 ^ _0x2a6f5f;
  }
  return _0x3a37ad.buffer;
};
DataManager.loadDataFile = function (_0x1ace49, _0x5ab646) {
  var _0xbe039 = new XMLHttpRequest();
  var _0x4038a7 = Crypto.resolveURL("data/" + _0x5ab646);
  _0xbe039.open("GET", _0x4038a7);
  _0xbe039.overrideMimeType("application/json");
  _0xbe039.responseType = "arraybuffer";
  _0xbe039.onload = function () {
    if (_0xbe039.status < 400) {
      var _0x4b1a33 = "";
      var _0x407c94 = _0xbe039.response;
      _0x407c94 = Crypto.dekit(_0x407c94, _0x4038a7, Crypto.guard());
      _0x4b1a33 = new TextDecoder().decode(_0x407c94);
      window[_0x1ace49] = JSON.parse(_0x4b1a33);
      DataManager.onLoad(window[_0x1ace49]);
    }
  };
  _0xbe039.onerror = this._mapLoader || function () {
    DataManager._errorUrl = DataManager._errorUrl || _0x4038a7;
  };
  window[_0x1ace49] = null;
  _0xbe039.send();
};
Graphics.setLoadingImage = function (_0x6e570f) {
  let _0x4e4e7a = ImageManager.loadNormalBitmap(_0x6e570f);
  _0x4e4e7a.addLoadListener(function () {
    Graphics._loadingImage = _0x4e4e7a._image;
  });
};
Bitmap.prototype._requestImage = function (_0x12813d) {
  _0x12813d = Crypto.resolveURL(decodeURIComponent(_0x12813d));
  if (Bitmap._reuseImages.length !== 0) {
    this._image = Bitmap._reuseImages.pop();
  } else {
    this._image = new Image();
  }
  if (this._decodeAfterRequest && !this._loader) {
    this._loader = ResourceHandler.createLoader(_0x12813d, this._requestImage.bind(this, _0x12813d), this._onError.bind(this));
  }
  this._url = _0x12813d;
  this._image = new Image();
  this._loadingState = "decrypting";
  let _0x5b35a1 = this;
  let _0x5e2d6f = new XMLHttpRequest();
  _0x5e2d6f.open("GET", _0x12813d);
  _0x5e2d6f.responseType = "arraybuffer";
  _0x5e2d6f.send();
  _0x5e2d6f.onload = function () {
    if (this.status < 400) {
      let _0x3445a2 = Crypto.dekit(this.response, _0x12813d, Crypto.guard());
      _0x5b35a1._image.src = Decrypter.createBlobUrl(_0x3445a2);
      _0x5b35a1._image.addEventListener("load", _0x5b35a1._loadListener = Bitmap.prototype._onLoad.bind(_0x5b35a1));
      _0x5b35a1._image.addEventListener("error", _0x5b35a1._errorListener = _0x5b35a1._loader || Bitmap.prototype._onError.bind(_0x5b35a1));
    }
  };
  _0x5e2d6f.onerror = function () {
    if (_0x5b35a1._loader) {
      _0x5b35a1._loader();
    } else {
      _0x5b35a1._onError();
    }
  };
};
const DEFAULT_INV = "ashley";
function Inventory() {}
Inventory.storage = {};
Inventory.current = DEFAULT_INV;
Inventory.swap = function (_0x42c1af) {
  if (this.current == _0x42c1af) {
    return;
  }
  var _0x479352 = {};
  var _0x28e848 = {};
  var _0x5ab8ab = this.current;
  this.current = _0x42c1af;
  $gameParty.allItems().forEach(function (_0x22e0da) {
    var _0xc6e5f1 = $gameParty.numItems(_0x22e0da);
    _0x479352[_0x22e0da.id] = _0xc6e5f1;
    $gameParty.loseItem(_0x22e0da, _0xc6e5f1);
  });
  this.storage[_0x5ab8ab] = _0x479352;
  _0x28e848 = this.storage[this.current] || {};
  for (var _0x158fd1 in _0x28e848) {
    if (DataManager.isItem($dataItems[_0x158fd1])) {
      $gameParty.gainItem($dataItems[_0x158fd1], _0x28e848[_0x158fd1], false);
    } else if (DataManager.isWeapon($dataWeapons[_0x158fd1])) {
      $gameParty.gainItem($dataWeapons[_0x158fd1], _0x28e848[_0x158fd1], false);
    } else if (DataManager.isArmor($dataArmors[_0x158fd1])) {
      $gameParty.gainItem($dataArmors[_0x158fd1], _0x28e848[_0x158fd1], false);
    }
  }
};
const _DM_CGO = DataManager.createGameObjects;
DataManager.createGameObjects = function () {
  _DM_CGO.call(this);
  Inventory.storage = {};
  Inventory.current = DEFAULT_INV;
};
const _DM_MSC = DataManager.makeSaveContents;
DataManager.makeSaveContents = function () {
  var _0x253633 = {};
  var _0x54fd3f = _DM_MSC.call(this);
  $gameParty.allItems().forEach(function (_0x25a953) {
    _0x253633[_0x25a953.id] = $gameParty.numItems(_0x25a953);
  });
  Inventory.storage[Inventory.current] = _0x253633;
  _0x54fd3f.format = FORMAT;
  _0x54fd3f.invStorage = Inventory.storage;
  _0x54fd3f.invCurrent = Inventory.current;
  return _0x54fd3f;
};
const _DM_ESC = DataManager.extractSaveContents;
DataManager.extractSaveContents = function (_0x4d9280) {
  _DM_ESC.call(this, _0x4d9280);
  Inventory.current = "";
  Inventory.storage = _0x4d9280.invStorage || {};
  Inventory.swap(_0x4d9280.invCurrent || "");
};
const MENU_ICON_MARGIN = 40;
function MenuOptions() {}
MenuOptions.iconImages = {};
MenuOptions.orderAndIcons = {
  "New Game": "new_game",
  Continue: "continue",
  Options: "options",
  Language: "language",
  "Vision Room": "vision",
  Credits: "credits",
  "Quit Game": "quit"
};
MenuOptions.labels = function () {
  return Object.keys(this.orderAndIcons);
};
MenuOptions.init = function () {
  this.labels().forEach(_0x32b15a => {
    this.iconImages[_0x32b15a] = ImageManager.loadSystem(this.orderAndIcons[_0x32b15a]);
  });
};
const _WTC_MCL = Window_TitleCommand.prototype.makeCommandList;
Window_TitleCommand.prototype.makeCommandList = function () {
  _WTC_MCL.call(this);
  if (Lang.count() > 1) {
    this.addCommand("Language", "language");
  }
  if (globalTag("vision_room")) {
    this.addCommand("Vision Room", "vision");
  }
  var _0x2545b0 = [];
  for (var _0x383f9d of MenuOptions.labels()) {
    var _0x55c017 = this._list.findIndex(_0xba7ecc => _0xba7ecc.name === _0x383f9d);
    if (_0x55c017 > -1) {
      _0x2545b0.push(this._list[_0x55c017]);
    }
  }
  this._list = _0x2545b0;
};
const _ST_CCW = Scene_Title.prototype.createCommandWindow;
Scene_Title.prototype.createCommandWindow = function () {
  _ST_CCW.call(this);
  this._commandWindow.setHandler("language", this.commandLanguage.bind(this));
  this._commandWindow.setHandler("vision", this.commandVisionRoom.bind(this));
};
Scene_Title.prototype.commandLanguage = function () {
  this._commandWindow.close();
  SceneManager.push(Scene_Language);
};
Scene_Title.prototype.commandVisionRoom = function () {
  DataManager.setupNewGame();
  $gamePlayer.reserveTransfer(86, 13, 9);
  this._commandWindow.close();
  this.fadeOutAll();
  SceneManager.goto(Scene_Map);
};
Window_TitleCommand.prototype.drawItem = function (_0x69eb67) {
  var _0x381224 = this.commandName(_0x69eb67);
  var _0x51f661 = this.itemRectForText(_0x69eb67);
  var _0x232f50 = MenuOptions.iconImages[_0x381224];
  if (_0x232f50) {
    var _0x2b808 = _0x51f661.x;
    var _0x3ca0eb = _0x51f661.y + (_0x51f661.height - _0x232f50.height) / 2;
    this.contents.blt(_0x232f50, 0, 0, _0x232f50.width, _0x232f50.height, _0x2b808, _0x3ca0eb);
  }
  _0x51f661.x += MENU_ICON_MARGIN;
  this.resetTextColor();
  this.changePaintOpacity(this.isCommandEnabled(_0x69eb67));
  this.drawText(Lang.translate(_0x381224), _0x51f661.x, _0x51f661.y, _0x51f661.width, "left");
};
var _sceneMenu = Scene_NCMenu || Scene_Menu;
var _windowMenu = Window_NCMenu || Window_MenuCommand;
const _WM_MCL = _windowMenu.prototype.makeCommandList;
_windowMenu.prototype.makeCommandList = function () {
  _WM_MCL.call(this);
  var _0x4dbbf3 = this._list.findIndex(_0x4bf623 => _0x4bf623.symbol === "options");
  var _0x1f865b = this._list.slice();
  this.clearCommandList();
  _0x1f865b.forEach((_0x66e066, _0x37469f) => {
    this.addCommand(_0x66e066.name, _0x66e066.symbol, _0x66e066.enabled, _0x66e066.ext);
    if (_0x37469f === _0x4dbbf3) {
      if (Lang.count() > 1) {
        this.addCommand("Language", "language", true, null);
      }
      this.addCommand("Controls", "controls", true, null);
    }
  });
};
_windowMenu.prototype.drawItem = function (_0x5a0183) {
  var _0x289869 = this.itemRectForText(_0x5a0183);
  var _0x30229f = this.windowWidth();
  var _0x1f3292 = _0x289869.width - _0x30229f;
  var _0x57a6cf = this.commandName(_0x5a0183);
  _0x57a6cf = Lang.translate(_0x57a6cf);
  this.resetTextColor();
  this.changePaintOpacity(this.isCommandEnabled(_0x5a0183));
  this.drawText(_0x57a6cf, _0x289869.x, _0x289869.y, _0x1f3292, "left");
};
const _SM_CCW = _sceneMenu.prototype.createCommandWindow;
_sceneMenu.prototype.createCommandWindow = function () {
  _SM_CCW.call(this);
  this._commandWindow.setHandler("language", this.commandLanguage.bind(this));
  this._commandWindow.setHandler("controls", this.commandControls.bind(this));
};
_sceneMenu.prototype.commandLanguage = function () {
  this._commandWindow.close();
  SceneManager.push(Scene_Language);
};
_sceneMenu.prototype.commandControls = function () {
  SceneManager.push(Scene_Controls);
};
function Window_Language() {
  this.initialize.apply(this, arguments);
}
Window_Language.prototype = Object.create(Window_Command.prototype);
Window_Language.prototype.constructor = Window_Language;
Window_Language.prototype.initialize = function () {
  Window_Command.prototype.initialize.call(this, 0, 0);
  this.x = (Graphics.boxWidth - this.width) / 2;
  this.y = (Graphics.boxHeight - this.height) / 2;
  this.currentLanguage = ConfigManager.language;
};
Window_Language.prototype.makeCommandList = function () {
  this.addCommand("Language", "language", true, 0);
};
Window_Language.prototype.windowWidth = function () {
  return 400;
};
Window_Language.prototype.numVisibleRows = function () {
  return 5;
};
Window_Language.prototype.drawItem = function (_0x36b4a6) {
  this.refresh();
};
const BKG_COLOR = "#182232";
const TXT_COLOR = "#30B0CF";
const NFO_COLOR = "#EBAE69";
const SEP_COLOR = "#AAAAAA";
Window_Language.prototype.refresh = function () {
  var _0x131aea = LANG_ICO_MARGIN;
  var _0x30e959 = LANG_ICO_PIXELS;
  var _0x15323f = this.itemRect(0);
  var _0x28ecd0 = this.lineHeight();
  var _0x484484 = ConfigManager.language;
  this.contents.clear();
  this.resetTextColor();
  this.resetFontSettings();
  this.drawText(Lang.translate(this.commandName(0)), _0x15323f.x + _0x30e959 + _0x131aea, _0x15323f.y, _0x15323f.width - 8 - _0x30e959 - _0x131aea, "left");
  this.swapFont(_0x484484);
  this.drawText(Lang.property(_0x484484, "langName"), _0x15323f.x + _0x30e959 + _0x131aea, _0x15323f.y, _0x15323f.width - 8 - _0x30e959 - _0x131aea, "right");
  if (Lang.isOfficial(_0x484484)) {
    this.contents.fillRect(_0x15323f.x, _0x15323f.y + _0x28ecd0, _0x15323f.width, _0x28ecd0, BKG_COLOR);
    this.resetFontSettings();
    this.contents.fontBold = true;
    this.changeTextColor(TXT_COLOR);
    this.drawText(Lang.translate("Credits"), _0x15323f.x + _0x30e959 + _0x131aea, _0x15323f.y + _0x28ecd0, _0x15323f.width - 8 - _0x30e959, "left");
    this.contents.fontBold = false;
    var _0x4a9c58 = this.contents;
    var _0x1c6d4a = ImageManager.loadSystem("stamp");
    _0x1c6d4a.addLoadListener(function () {
      _0x4a9c58.blt(_0x1c6d4a, 0, 0, _0x30e959, _0x30e959, _0x15323f.x, _0x15323f.y + _0x28ecd0 + (_0x28ecd0 - _0x30e959) / 2);
    });
    this.changeTextColor(NFO_COLOR);
  } else {
    this.resetTextColor();
    this.contents.fillRect(_0x15323f.x, _0x15323f.y + _0x28ecd0 + (_0x28ecd0 - 6) / 2, _0x15323f.width, 3, SEP_COLOR);
  }
  this.swapFont(_0x484484);
  var _0x16fc33 = Lang.property(_0x484484, "langInfo");
  for (var _0x3b1495 = 0; _0x3b1495 < Math.min(_0x16fc33.length, 3); _0x3b1495++) {
    var _0x360893 = _0x16fc33[_0x3b1495];
    this.drawText(_0x360893, _0x15323f.x + _0x30e959 + _0x131aea, _0x15323f.y + _0x28ecd0 * (_0x3b1495 + 2), _0x15323f.width - 8 - _0x30e959, "left");
  }
  this.resetFontSettings();
};
Window_Language.prototype.swapFont = function (_0x224160) {
  var _0x5295d8 = Font.resolve(Lang.property(_0x224160, "fontFace"));
  if (_0x5295d8 !== "") {
    this.contents.fontFace = _0x5295d8;
    this.contents.fontSize = Lang.property(_0x224160, "fontSize");
  } else {
    this.contents.fontSize = this.standardFontSize();
    this.contents.fontFace = this.standardFontFace();
  }
};
Window_Language.prototype.processOk = function () {
  this._input(INPUT_RIGHT);
};
Window_Language.prototype.cursorRight = function (_0x1b8277) {
  this._input(INPUT_RIGHT);
};
Window_Language.prototype.cursorLeft = function (_0x3406ad) {
  this._input(INPUT_LEFT);
};
Window_Language.prototype._input = function (_0x152f22) {
  var _0x30e0a5 = Lang.count();
  var _0x10fd56 = Lang.index(ConfigManager.language);
  this.changeValue("language", Lang.key((_0x10fd56 + _0x152f22 + _0x30e0a5) % _0x30e0a5));
};
Window_Language.prototype.changeValue = function (_0x58de03, _0x3a0aeb) {
  SoundManager.playSave();
  Lang.select(_0x3a0aeb);
  ConfigManager.symbol = _0x3a0aeb;
  this.redrawItem(this.findSymbol(_0x58de03));
};
Window_Language.prototype.update = function () {
  Window_Command.prototype.update.call(this);
  if (Input.isTriggered("cancel")) {
    if (this.currentLanguage != ConfigManager.language) {
      ConfigManager.save();
      Lang.select(ConfigManager.language);
    }
    SceneManager.pop();
    SoundManager.playCancel();
  }
};
function Scene_Language() {
  this.initialize.apply(this, arguments);
}
Scene_Language.prototype = Object.create(Scene_MenuBase.prototype);
Scene_Language.prototype.constructor = Scene_Language;
Scene_Language.prototype.create = function () {
  Scene_MenuBase.prototype.create.call(this);
  this.setBackgroundOpacity(128);
  this._languageWindow = new Window_Language();
  this.addWindow(this._languageWindow);
};
Window_Options.prototype.addGeneralOptions = function () {
  this.addCommand("UI Hints", "inputHint");
  this.addCommand("Text Speed", "textSpeed");
  this.addCommand("Auto Saves", "autoSaves");
  this.addCommand("Fullscreen", "fullscreen");
  this.addCommand("Run Always", "alwaysDash");
  this.addCommand("Run Speed", "dashBonus");
};
Window_Options.prototype.addVolumeOptions = function () {
  this.addCommand("Volume BGM", "bgmVolume");
  this.addCommand("Volume SFX", "seVolume");
};
Window_Options.prototype.statusText = function (_0x3d5a95) {
  let _0x1e1647 = this.commandSymbol(_0x3d5a95);
  let _0x13dd30 = this.getConfigValue(_0x1e1647);
  const _0x4f3ad2 = Lang.translate("On");
  const _0x570c01 = Lang.translate("Off");
  const _0x2f18db = Lang.translate("Slow");
  const _0x5c3d68 = Lang.translate("Fast");
  const _0x42cfb6 = Lang.translate("Instant");
  if (_0x1e1647 === "dashBonus") {
    return _0x13dd30 + "%";
  }
  if (_0x1e1647 === "inputHint" || _0x1e1647 === "fullscreen" || _0x1e1647 === "alwaysDash") {
    if (_0x13dd30) {
      return _0x4f3ad2;
    } else {
      return _0x570c01;
    }
  }
  if (_0x1e1647 === "bgmVolume" || _0x1e1647 === "bgsVolume" || _0x1e1647 === "meVolume" || _0x1e1647 === "seVolume") {
    return _0x13dd30 + "%";
  }
  if (_0x1e1647 === "walkSpeed") {
    return _0x13dd30.toFixed(2);
  }
  if (_0x1e1647 === "textSpeed") {
    return [_0x2f18db, _0x5c3d68, _0x42cfb6][_0x13dd30];
  }
  return _0x13dd30;
};
const INPUT_LEFT = -1;
const INPUT_RIGHT = 1;
const WRAP_RESULT = true;
Window_Options.prototype.processOk = function () {
  this._input(INPUT_RIGHT, WRAP_RESULT);
};
Window_Options.prototype.cursorRight = function (_0x4b6fb9) {
  this._input(INPUT_RIGHT);
};
Window_Options.prototype.cursorLeft = function (_0x1a20f1) {
  this._input(INPUT_LEFT);
};
Window_Options.prototype._input = function (_0x29d908, _0x35b51d = false) {
  let _0x46083a = this.index();
  let _0x5e60d1 = this.commandSymbol(_0x46083a);
  let _0x2843fc = this.getConfigValue(_0x5e60d1);
  if (_0x5e60d1 === "inputHint" || _0x5e60d1 === "fullscreen" || _0x5e60d1 === "alwaysDash") {
    this.changeValue(_0x5e60d1, !_0x2843fc);
    return;
  }
  let _0x132861 = 0;
  let _0x19f0fc = 100;
  if (_0x5e60d1.contains("Volume")) {
    _0x29d908 *= VOL_STEP_SIZE;
  } else if (_0x5e60d1 === "textSpeed") {
    _0x19f0fc = 2;
  } else if (_0x5e60d1 === "autoSaves") {
    _0x19f0fc = DataManager.autoSaveMax();
  } else if (_0x5e60d1 === "dashBonus") {
    _0x132861 = 10;
    _0x19f0fc = 30;
    _0x29d908 *= DSH_STEP_SIZE;
  }
  if (_0x35b51d) {
    _0x2843fc = _0x2843fc.boundaryWrap(_0x29d908, _0x132861, _0x19f0fc);
  } else {
    _0x2843fc = (_0x2843fc + _0x29d908).clamp(_0x132861, _0x19f0fc);
  }
  this.changeValue(_0x5e60d1, _0x2843fc);
};
Window_Options.prototype.changeValue = function (_0x52293e, _0x391c96) {
  if (_0x52293e === "fullscreen") {
    this.setConfigValue(_0x52293e, _0x391c96);
    if (_0x391c96) {
      Graphics._requestFullScreen();
    } else {
      Graphics._cancelFullScreen();
    }
  } else {
    this.setConfigValue(_0x52293e, _0x391c96);
    if (_0x52293e === "bgmVolume") {
      ConfigManager.meVolume = _0x391c96;
    } else if (_0x52293e === "seVolume") {
      ConfigManager.bgsVolume = _0x391c96;
    }
  }
  SoundManager.playEquip();
  this.redrawItem(this.findSymbol(_0x52293e));
};
Window_Options.prototype.drawItem = function (_0x2e69ca) {
  let _0x307873 = this.itemRectForText(_0x2e69ca);
  let _0x46017e = this.statusWidth();
  let _0x5c383d = _0x307873.width - _0x46017e;
  let _0x426bfd = this.commandName(_0x2e69ca);
  _0x426bfd = Lang.translate(_0x426bfd);
  this.resetTextColor();
  this.changePaintOpacity(this.isCommandEnabled(_0x2e69ca));
  this.drawText(_0x426bfd, _0x307873.x, _0x307873.y, _0x5c383d, "left");
  this.drawText(this.statusText(_0x2e69ca), _0x5c383d, _0x307873.y, _0x46017e, "right");
};
function Scene_Controls() {
  this.initialize.apply(this, arguments);
}
Scene_Controls.prototype = Object.create(Scene_Base.prototype);
Scene_Controls.prototype.constructor = Scene_Controls;
Scene_Controls.prototype.initialize = function () {
  Scene_Base.prototype.initialize.call(this);
};
Scene_Controls.prototype._img = null;
Scene_Controls.prototype.create = function () {
  Scene_Base.prototype.create.call(this);
  if (!this._img) {
    this._img = ImageManager.loadPicture("keys");
  }
  this._background = new Sprite(this._img);
  this.addChild(this._background);
};
Scene_Controls.prototype.update = function () {
  Scene_Base.prototype.update.call(this);
  if (Input.isTriggered("ok") || Input.isTriggered("cancel") || TouchInput.isTriggered()) {
    this.popScene();
  }
};
Scene_Controls.prototype.terminate = function () {
  SoundManager.playCancel();
  Scene_Base.prototype.terminate.call(this);
  this.removeChild(this._background);
  this._background = null;
};
const _G_SFS = Graphics._switchFullScreen;
Graphics._switchFullScreen = function () {
  _G_SFS.call(this);
  ConfigManager.fullscreen = Graphics._isFullScreen();
  ConfigManager.save();
  if (Graphics._isFullScreen()) {
    document.body.style.cursor = "none";
  } else {
    document.body.style.cursor = "default";
  }
  if (SceneManager._scene instanceof Scene_Options) {
    var _0x479611 = SceneManager._scene._optionsWindow;
    _0x479611.redrawItem(_0x479611.findSymbol("fullscreen"));
  }
};
Game_CharacterBase.prototype.realMoveSpeed = function () {
  if (this._moveSpeed != 4) {
    return this._moveSpeed;
  }
  var _0x50786e = BASE_WALK_SPD;
  if (this.isDashing()) {
    var _0x378dd6 = ConfigManager.dashBonus;
    _0x50786e *= 1 + _0x378dd6 / 100;
  }
  return _0x50786e;
};
const _WM_USF = Window_Message.prototype.updateShowFast;
Window_Message.prototype.updateShowFast = function () {
  var _0x54a287 = Math.abs(ConfigManager.textSpeed - 2);
  if (_0x54a287 === 0) {
    this._showFast = true;
  } else {
    _WM_USF.call(this);
  }
};
const _WM_UM = Window_Message.prototype.updateMessage;
Window_Message.prototype.updateMessage = function () {
  var _0xb2825b = Math.abs(ConfigManager.textSpeed - 2);
  var _0x508b93 = _WM_UM.call(this);
  if (_0xb2825b !== 0 && this._textState && this._textState.text[this._textState.index] !== "") {
    this._waitCount = _0xb2825b - 1;
  }
  return _0x508b93;
};
const _I_UGS = Input._updateGamepadState;
Input._updateGamepadState = function (_0x1f6391) {
  const _0x200101 = 9;
  if (_0x1f6391.buttons[_0x200101] && _0x1f6391.buttons[_0x200101].pressed !== null) {
    var _0x5469d4 = this._gamepadStates[_0x200101];
    var _0x288826 = _0x1f6391.buttons[_0x200101].pressed;
    this._gamepadStates[_0x200101] = _0x288826;
    if (!_0x5469d4 && _0x288826) {
      Graphics._switchFullScreen();
    }
  }
  _I_UGS.call(this, _0x1f6391);
};
Sprite_Balloon.prototype.setup = function (_0x7e2dfc) {
  this._balloonId = _0x7e2dfc;
  this._duration = this.speed() * 8 + this.waitTime();
  this._loop = false;
  this._fullDuration = this._duration;
};
Sprite_Balloon.prototype.frameIndex = function () {
  var _0x2b6ceb = this._duration / this._fullDuration;
  var _0x25d7fb = Math.floor((1 - _0x2b6ceb) * 8);
  return Math.max(0, Math.min(7, _0x25d7fb));
};
Sprite_Balloon.prototype.resetAnimation = function () {
  this._duration = this._fullDuration;
};
Sprite_Balloon.prototype.update = function () {
  Sprite_Base.prototype.update.call(this);
  if (this._duration > 0) {
    this._duration--;
    if (this._loop) {
      this.updateFrame();
      if (this._duration <= 0) {
        this._duration += this._fullDuration;
      }
    } else if (this._duration > 0) {
      this.updateFrame();
    }
  }
};
Game_Event.prototype.isEnabled = function () {
  var _0x23d959 = this.event().pages[this._pageIndex];
  if (_0x23d959.list.length < 1 || _0x23d959.list.length === 1 && _0x23d959.list[0].code === 0) {
    return false;
  }
  var _0x2d1ed6 = _0x23d959.list[0];
  if (_0x2d1ed6.code === 108) {
    var _0x3fc129 = _0x2d1ed6.parameters[0].toLowerCase().replace(/\s+/g, "");
    var _0x42e7aa = _0x3fc129.match(/enabled:(\d+)([!=><]+)(\w+|has)/);
    if (!_0x42e7aa) {
      return false;
    }
    var _0x25d7e4 = Number(_0x42e7aa[1]);
    var _0xbb8a00 = _0x42e7aa[2];
    var _0x53d10d = _0x42e7aa[3];
    if (_0x53d10d === "on" || _0x53d10d === "off") {
      var _0x1eceae = _0x53d10d === "on";
      var _0x20ea19 = $gameSwitches.value(_0x25d7e4);
      if (_0xbb8a00 === "==") {
        return _0x1eceae && _0x20ea19 || !_0x1eceae && !_0x20ea19;
      }
      if (_0xbb8a00 === "!=") {
        return _0x1eceae && !_0x20ea19 || !_0x1eceae && _0x20ea19;
      }
      return false;
    } else if (_0x53d10d === "has") {
      if (_0xbb8a00 === "==") {
        return $gameParty.hasItem($dataItems[_0x25d7e4]);
      }
      if (_0xbb8a00 === "!=") {
        return !$gameParty.hasItem($dataItems[_0x25d7e4]);
      }
      return false;
    } else {
      var _0x16f726 = $gameVariables.value(_0x25d7e4);
      var _0x56cba7 = Number(_0x53d10d);
      switch (_0xbb8a00) {
        case "==":
          return _0x16f726 === _0x56cba7;
        case "!=":
          return _0x16f726 !== _0x56cba7;
        case ">=":
          return _0x16f726 >= _0x56cba7;
        case "<=":
          return _0x16f726 <= _0x56cba7;
        case ">":
          return _0x16f726 > _0x56cba7;
        case "<":
          return _0x16f726 < _0x56cba7;
      }
      App.fail("Invalid comparison operator for enable / disable comment hint: " + _0x2d1ed6.parameters[0]);
      return false;
    }
  }
  return true;
};
const HINT_Y_OFS = 78;
const BALLOON_ID = 15;
const HINT_RANGE = 0.75;
function eventHintEnable(_0x3453d7) {}
function eventHintDisable(_0xa67b92) {}
function Hint() {}
;
Hint._change = 0;
Hint._active = false;
Hint._balloon = null;
Hint.delta = function () {
  if (Hint._change > 0) {
    var _0x7739b7 = SceneManager._deltaTime;
    return _0x7739b7 / Hint._change;
  }
  return 0;
};
Hint.balloon = function () {
  if (!this._balloon) {
    this._balloon = new Sprite_Balloon();
    this._balloon.setup(BALLOON_ID);
    this._balloon._loop = true;
    this._balloon.alpha = 0;
    this._change = 0;
    this._active = false;
  }
  return this._balloon;
};
Hint.open = function (_0x5022b7 = 0) {
  this._active = true;
  this._change = Math.max(0, _0x5022b7);
  let _0x3c31d2 = this.balloon();
  if (_0x3c31d2.alpha <= 0) {
    _0x3c31d2._duration = _0x3c31d2._fullDuration;
  }
  if (_0x3c31d2.alpha < 1 && _0x5022b7 <= 0) {
    _0x3c31d2.alpha = 1;
  }
};
Hint.close = function (_0x55327e = 0) {
  this._active = false;
  this._change = Math.max(0, _0x55327e);
  let _0x142984 = this.balloon();
  if (_0x142984.alpha > 0 && _0x55327e <= 0) {
    _0x142984.alpha = 0;
  }
};
Hint.process = function () {
  let _0x5c0cc3 = this.balloon();
  if (!ConfigManager.inputHint) {
    Hint.close();
    return;
  }
  let _0x509f1f = $gameMap._interpreter._eventId;
  if (_0x509f1f > 0) {
    let _0x3ffb59 = $gameMap.event(_0x509f1f) || null;
    if (!_0x3ffb59 || _0x3ffb59._trigger < 4) {
      Hint.close();
      return;
    }
  }
  if (this._active) {
    _0x5c0cc3.update();
    _0x5c0cc3.alpha = Math.min(1, _0x5c0cc3.alpha + Hint.delta());
  } else {
    _0x5c0cc3.alpha = Math.max(0, _0x5c0cc3.alpha - Hint.delta());
  }
  _0x5c0cc3.x = $gamePlayer.screenX();
  _0x5c0cc3.y = $gamePlayer.screenY() - HINT_Y_OFS;
  let _0x233f65 = $gamePlayer.x;
  let _0x12798a = $gamePlayer.y;
  let _0x60201d = $gamePlayer._realX;
  let _0x58805c = $gamePlayer._realY;
  let _0x2c1a6d = _0x233f65;
  let _0x5c2031 = _0x12798a;
  switch ($gamePlayer.direction()) {
    case 2:
      _0x5c2031++;
      break;
    case 4:
      _0x2c1a6d--;
      break;
    case 6:
      _0x2c1a6d++;
      break;
    case 8:
      _0x5c2031--;
      break;
  }
  let _0x278261 = 0;
  $gameMap.eventsXy(_0x233f65, _0x12798a).forEach(function (_0x1300f4) {
    if (_0x1300f4.isTriggerIn([0]) && _0x1300f4.isEnabled()) {
      _0x278261 = _0x1300f4._eventId;
      return;
    }
  });
  $gameMap.eventsXy(_0x2c1a6d, _0x5c2031).forEach(function (_0x345bc2) {
    if (_0x278261 > 0) {
      return;
    }
    if (_0x345bc2.isTriggerIn([0]) && _0x345bc2.isNormalPriority() && _0x345bc2.isEnabled()) {
      _0x278261 = _0x345bc2._eventId;
      return;
    }
  });
  if (_0x278261 > 0) {
    let _0x3aaea7 = 1 - Math.abs(_0x233f65 - _0x60201d);
    let _0x433aa4 = 1 - Math.abs(_0x12798a - _0x58805c);
    if (Math.min(_0x3aaea7, _0x433aa4) > HINT_RANGE) {
      if (!this._active) {
        this.open(0.1);
        this.lastEvent = _0x278261;
      }
    } else if (_0x278261 != this.lastEvent) {
      this.close(0.2);
    }
  } else {
    this.lastEvent = 0;
    if (this._active) {
      this.close(0.1);
    }
  }
};
const _SM_S = Scene_Map.prototype.start;
Scene_Map.prototype.start = function () {
  _SM_S.call(this);
  this.addChild(Hint.balloon());
};
var _SC_US = SceneManager.updateScene;
SceneManager.updateScene = function () {
  _SC_US.call(this);
  if ($gameSystem && Number.isFinite($gameSystem._secondsPlayed)) {
    $gameSystem._secondsPlayed += this._deltaTime;
  }
  if (!this.isSceneChanging() && this.isCurrentSceneStarted() && this._scene instanceof Scene_Map) {
    Hint.process();
    return;
  }
  Hint.close();
};
Game_System.prototype.playtime = function () {
  return this._secondsPlayed || 0;
};
Game_System.prototype.playtimeText = function () {
  var _0x2ed314 = this.playtime();
  var _0x59543c = Math.floor(_0x2ed314 / 60 / 60);
  var _0x3f00f9 = Math.floor(_0x2ed314 / 60) % 60;
  var _0xbbd344 = Math.floor(_0x2ed314 % 60);
  return _0x59543c.padZero(2) + ":" + _0x3f00f9.padZero(2) + ":" + _0xbbd344.padZero(2);
};
Game_System.prototype.updatePlayTime = function (_0x156404) {
  if (this._secondsPlayed) {
    this._secondsPlayed += _0x156404;
  }
};
var _DM_SNG_ = DataManager.setupNewGame;
DataManager.setupNewGame = function () {
  _DM_SNG_.call(this);
  $gameSystem._secondsPlayed = 0;
};
const FONT_TYPES = [".ttf", ".otf", ".eot", ".svg", ".woff", ".woff2"];
function Font() {}
Font.data = {};
Font.size = 28;
Font.face = "GameFont";
Font.list = ["Dotum", "SimHei", "GameFont", "Heiti TC", "sans-serif", "AppleGothic"];
Font.change = function (_0x138194, _0x3d57bc = 28) {
  this.face = "";
  var _0x243842 = this.resolve(_0x138194);
  if (_0x243842) {
    this.face = _0x243842;
    this.size = _0x3d57bc;
  }
};
Font.key = function (_0x3dcf31) {
  var _0x4e0d80 = new RegExp(_0x3dcf31, "i");
  var _0x1232c4 = Object.keys(this.data).filter(_0x57f6d3 => _0x4e0d80.test(_0x57f6d3));
  if (_0x1232c4.length > 0) {
    return _0x1232c4[0];
  }
  return _0x3dcf31;
};
Font.resolve = function (_0x124fcc) {
  var _0x28c2a6 = Utils.filename(_0x124fcc);
  if (this.list.includes(_0x28c2a6)) {
    return _0x28c2a6;
  }
  var _0x33c593 = this.key(Lang.current() + "_" + _0x28c2a6);
  if (!_0x33c593) {
    _0x33c593 = this.key(_0x28c2a6);
  }
  if (!_0x33c593) {
    App.fail("Cannot locate font named: " + _0x124fcc);
    return "GameFont";
  }
  var _0x3786bd = this.data[_0x33c593];
  if (!Utils.exists(_0x3786bd)) {
    App.fail("Missing font: " + _0x3786bd);
    return "GameFont";
  }
  _0x3786bd = Utils.relative(App.rootPath(), _0x3786bd);
  _0x3786bd = _0x3786bd.replace(/\\/g, "/");
  _0x33c593 = _0x33c593.replace(/\.[^/.]+$/, "");
  if (this.list.includes(_0x33c593)) {
    return _0x33c593;
  }
  var _0x3da0a8 = new FontFace(_0x33c593, "url(" + _0x3786bd + ")");
  _0x3da0a8.load().then(function (_0x1cd305) {
    document.fonts.add(_0x1cd305);
    Font.list.push(_0x33c593);
    if (SceneManager._scene._windowLayer) {
      SceneManager._scene._windowLayer.children.forEach(function (_0x12f9fb) {
        if (typeof _0x12f9fb.refresh === "function") {
          _0x12f9fb.refresh();
        }
      });
    }
  }).catch(function (_0x33704c) {
    App.fail("Font failed to load: " + _0x124fcc, _0x33704c);
    return "GameFont";
  });
  return _0x33c593;
};
const _WB_RFS = Window_Base.prototype.resetFontSettings;
Window_Base.prototype.resetFontSettings = function () {
  _WB_RFS.apply(this, arguments);
  if (Font.face !== "" && this.constructor.name !== "Window_Credits") {
    this.contents.fontFace = Font.face;
    this.contents.fontSize = Font.size;
  }
};
const LANG_DIR = "languages/";
const LANG_LOC = "english";
const LANG_TXT = "english_txt";
const LANG_CSV = "english_csv";
const LANG_ICO_MARGIN = 10;
const LANG_ICO_PIXELS = 26;
const VALID_EXT = [".loc", ".txt", ".csv"];
const LANG_ORDERING = ["english", "korean", "japanese", "chinese"];
function Lang() {}
Lang.data = {};
Lang.list = {};
Lang.offc = [];
Lang.count = function () {
  return Object.keys(this.list).length;
};
Lang.index = function (_0x555b86) {
  return Object.keys(this.list).indexOf(_0x555b86);
};
Lang.isOfficial = function (_0x40730e) {
  return this.offc.includes(_0x40730e);
};
Lang.current = function () {
  var _0x3d3c76 = this.list[ConfigManager.language] || "";
  if (!_0x3d3c76) {
    App.warn("Current language not in list: " + key);
    return "n/a";
  }
  return Utils.basename(Utils.dirname(_0x3d3c76));
};
Lang.key = function (_0x33d4ed) {
  var _0xf6b678 = Object.keys(this.list);
  var _0x1166af = _0xf6b678.length - 1;
  if (_0x1166af < 0) {
    App.crash("No language table created.");
    return "";
  }
  if (_0x33d4ed < 0 || _0x33d4ed > _0x1166af) {
    App.fail("Language index out of bounds.");
    _0x33d4ed = 0;
  }
  return _0xf6b678[_0x33d4ed];
};
Lang.property = function (_0x1a5f4d, _0x48192e, _0x42b7cf = null) {
  if (Object.keys(this.data).length === 0) {
    return _0x42b7cf;
  }
  if (this.data.hasOwnProperty(_0x1a5f4d) && typeof this.data[_0x1a5f4d] === "object" && this.data[_0x1a5f4d].hasOwnProperty(_0x48192e)) {
    return this.data[_0x1a5f4d][_0x48192e];
  }
  App.fail("Language property missing: " + _0x1a5f4d + ":" + _0x48192e);
  return _0x42b7cf;
};
Lang.translate = function (_0x5a7e7e) {
  var _0x28165c = ConfigManager.language;
  var _0x5b239c = this.property(_0x28165c, "sysMenus");
  var _0x5dc37e = this.property(_0x28165c, "sysLabel");
  if (_0x5b239c && _0x5b239c.hasOwnProperty(_0x5a7e7e)) {
    return _0x5b239c[_0x5a7e7e];
  }
  if (_0x5dc37e && _0x5dc37e.hasOwnProperty(_0x5a7e7e)) {
    return _0x5dc37e[_0x5a7e7e];
  }
  return _0x5a7e7e;
};
Lang.label = function (_0x51f6a0, _0x276cf4 = false) {
  var _0x5e017a = this.property(ConfigManager.language, "labelLUT");
  _0x51f6a0 = _0x51f6a0.replace(/\(label\)\[([^\]]+)\]/g, function (_0xb093d8, _0x2df31e) {
    var _0x515e99 = _0x5e017a && _0x5e017a[_0x2df31e] ? _0x5e017a[_0x2df31e] : _0xb093d8;
    if (_0x276cf4) {
      return "<" + _0x515e99 + ">";
    } else {
      return _0x515e99;
    }
  });
  return _0x51f6a0;
};
Lang.lines = function (_0x4dd1b7) {
  var _0x31d262 = {
    text: _0x4dd1b7,
    lines: []
  };
  var _0x47556c = this.property(ConfigManager.language, "linesLUT");
  _0x31d262.text = _0x31d262.text.replace(/\(lines\)\[([^\]]+)\]/g, function (_0x5a9d99, _0x3c4e04) {
    if (_0x47556c && _0x47556c[_0x3c4e04]) {
      _0x31d262.lines = _0x47556c[_0x3c4e04];
      return "";
    }
    return _0x5a9d99;
  });
  return _0x31d262;
};
Lang.search = function () {
  let _0x3b2898 = Utils.join(App.rootPath(), LANG_DIR);
  if (!Utils.exists(_0x3b2898)) {
    App.warn("Language data unavailable.");
    return;
  }
  if (!Utils.canAccess(_0x3b2898)) {
    App.crash("Language data not accessible.");
    return;
  }
  let _0x263dad = Utils.folders(_0x3b2898);
  if (_0x263dad.length === 0) {
    App.crash("Error reading languages folder.");
    return;
  }
  this.list = {};
  for (let _0x51829f = 0; _0x51829f < _0x263dad.length; _0x51829f++) {
    let _0x558850 = Utils.join(_0x3b2898, _0x263dad[_0x51829f]);
    for (let _0x4982c1 of Utils.findFiles(_0x558850, FONT_TYPES)) {
      let _0x1b3cb9 = Utils.basename(_0x4982c1);
      let _0x2f02a0 = _0x263dad[_0x51829f] + "_" + _0x1b3cb9;
      Font.data[_0x2f02a0] = _0x4982c1;
    }
    let _0x219d8c = Utils.files(_0x558850);
    for (let _0x8972c2 = 0; _0x8972c2 < _0x219d8c.length; _0x8972c2++) {
      let _0x1131d5 = _0x219d8c[_0x8972c2];
      let _0x12b502 = _0x263dad[_0x51829f];
      let _0x5730b6 = Utils.ext(_0x1131d5).toLowerCase();
      if (!VALID_EXT.includes(_0x5730b6)) {
        continue;
      }
      if (_0x5730b6 === ".loc") {
        this.offc.push(_0x12b502);
      } else {
        _0x12b502 += _0x5730b6.replace(".", "_");
        if (Utils.isOptionValid("test")) {
          this.offc.push(_0x12b502);
        }
      }
      this.list[_0x12b502] = Utils.join(_0x558850, _0x1131d5);
    }
  }
  let _0xa51d34 = [];
  let _0x3aacc5 = [];
  let _0x3680e7 = {};
  for (let _0x28d45d in this.list) {
    if (this.offc.includes(_0x28d45d)) {
      _0x3aacc5.push(_0x28d45d);
    } else {
      _0xa51d34.push(_0x28d45d);
    }
  }
  for (let _0x5ef9ee of LANG_ORDERING) {
    for (let _0x371370 of _0x3aacc5) {
      if (_0x371370.toLowerCase().contains(_0x5ef9ee.toLowerCase())) {
        _0x3680e7[_0x371370] = this.list[_0x371370];
      }
    }
  }
  for (let _0x3504c0 of _0x3aacc5) {
    _0x3680e7[_0x3504c0] = this.list[_0x3504c0];
  }
  for (let _0x51c923 of _0xa51d34) {
    _0x3680e7[_0x51c923] = this.list[_0x51c923];
  }
  this.list = _0x3680e7;
};
Lang.select = function (_0x402670) {
  if (this.count() < 1) {
    if (App.isDevMode()) {
      App.info("Skipped language select: " + _0x402670);
    } else {
      App.crash("Language data missing.\nA re-install may fix it.");
    }
    return;
  }
  let _0x1e22de = "";
  if (VENDOR === K9V_STEAM) {
    _0x1e22de = Steam.currentLanguage();
  }
  let _0x4a14fd = [_0x402670, _0x1e22de, LANG_LOC, LANG_TXT, LANG_CSV];
  for (let _0xf119b7 of _0x4a14fd) {
    if (!this.list.hasOwnProperty(_0xf119b7)) {
      continue;
    }
    let _0x1ccb07 = {};
    let _0x5b26ac = this.list[_0xf119b7];
    let _0xabbbf0 = Utils.ext(_0x5b26ac).toLowerCase();
    if (this.data.hasOwnProperty(_0xf119b7)) {
      _0x1ccb07 = this.data[_0xf119b7];
    } else {
      if (_0xabbbf0 === ".loc") {
        _0x1ccb07 = this.loadLOC(_0x5b26ac);
      } else if (_0xabbbf0 === ".txt") {
        _0x1ccb07 = this.loadTXT(_0x5b26ac);
      } else if (_0xabbbf0 === ".csv") {
        _0x1ccb07 = this.loadCSV(_0x5b26ac);
      }
      if (!this.isValid(_0x1ccb07)) {
        App.fail("Invalid data for: " + _0xf119b7);
        continue;
      }
      this.data[_0xf119b7] = _0x1ccb07;
      this.imgMapping(_0xf119b7);
    }
    ConfigManager.language = _0xf119b7;
    Font.change(_0x1ccb07.fontFace, _0x1ccb07.fontSize);
    let _0x48b957 = _0x1ccb07.sysLabel.Game;
    let _0x3169c5 = _0x1ccb07.sysLabel.Item;
    let _0x2bdb50 = _0x1ccb07.sysLabel.File;
    let _0x57e858 = _0x1ccb07.sysLabel.Save;
    let _0x2fd281 = _0x1ccb07.sysLabel.Load;
    document.title = _0x48b957;
    $dataSystem.gameTitle = _0x48b957 + " v" + VERSION;
    $dataSystem.terms.commands[4] = _0x3169c5;
    $dataSystem.terms.messages.file = _0x2bdb50;
    $dataSystem.terms.messages.saveMessage = _0x57e858;
    $dataSystem.terms.messages.loadMessage = _0x2fd281;
    return;
  }
  ConfigManager.language = "";
  const _0x3547cf = "Default languages missing.";
  if (App.isDevMode()) {
    App.fail(_0x3547cf);
  } else {
    App.crash(_0x3547cf);
  }
};
Lang.imgFolder = function (_0xe9b085, _0x5c0b06) {
  var _0x389826 = Utils.join(_0xe9b085, _0x5c0b06);
  var _0x9836d3 = ConfigManager.language;
  var _0x17ea39 = this.property(_0x9836d3, "imageLUT", {});
  if (_0x17ea39.hasOwnProperty(_0x389826)) {
    return _0x17ea39[_0x389826];
  }
  return _0xe9b085;
};
Lang.imgMapping = function (_0x57bd21) {
  var _0x5c4f5b = this.data[_0x57bd21];
  var _0x27009e = Utils.dirname(this.list[_0x57bd21]);
  var _0xb3c37b = Utils.join(_0x27009e, "img");
  if (!Utils.exists(_0xb3c37b)) {
    App.info("No translated images: " + _0x27009e);
    return;
  }
  for (var _0x16b46 of Utils.findFiles(_0xb3c37b, [".png"])) {
    var _0x22d4f9 = Utils.relative(_0x27009e, _0x16b46);
    var _0x48b175 = Utils.relative(App.rootPath(), _0x27009e);
    var _0x582de0 = Utils.join(Utils.dirname(_0x22d4f9), Utils.filename(_0x22d4f9));
    try {
      var _0x582717 = Utils.join(App.rootPath(), _0x22d4f9);
      var _0x8e54d = Utils.join(_0x48b175, Utils.dirname(_0x22d4f9));
      if (Utils.exists(_0x582717)) {
        _0x8e54d = _0x8e54d.replace("\\", "/");
        _0x5c4f5b.imageLUT[_0x582de0] = _0x8e54d + "/";
      }
    } catch (_0x4a6133) {
      App.fail("Failed to check remapping: " + _0x16b46, _0x4a6133);
    }
  }
};
const _IM_LB = ImageManager.loadBitmap;
ImageManager.loadBitmap = function (_0x281376, _0x1af7a9, _0x1ae39d, _0x382883) {
  _0x281376 = Lang.imgFolder(_0x281376, _0x1af7a9);
  return _IM_LB.call(this, _0x281376, _0x1af7a9, _0x1ae39d, _0x382883);
};
Lang.newData = function () {
  return {
    langName: "",
    langInfo: ["", "", ""],
    fontFace: "",
    fontSize: 0,
    sysLabel: {},
    sysMenus: {},
    labelLUT: {},
    linesLUT: {},
    imageLUT: {}
  };
};
Lang.isValid = function (_0xeb6c68) {
  var _0x4d8b05 = this.newData();
  if (!_0xeb6c68 || !Object.keys(_0xeb6c68).length) {
    App.fail("Language data missing.");
    return false;
  }
  for (var _0x3b8f38 in _0x4d8b05) {
    if (!(_0x3b8f38 in _0xeb6c68)) {
      App.fail("Missing field: " + _0x3b8f38);
      return false;
    }
    if (typeof _0xeb6c68[_0x3b8f38] !== typeof _0x4d8b05[_0x3b8f38]) {
      App.fail("Mismatched type: " + _0x3b8f38);
      return false;
    }
  }
  if (!_0xeb6c68.langName.trim()) {
    App.fail("Missing langName.");
    return false;
  }
  if (_0xeb6c68.langInfo.length < 3) {
    App.fail("Missing lines in langInfo.");
    return false;
  }
  if (!_0xeb6c68.fontFace.trim()) {
    App.fail("Missing fontFace.");
    return false;
  }
  if (_0xeb6c68.fontSize < 1) {
    App.fail("fontSize < 1.");
    return false;
  }
  for (var _0x3b8f38 of ["sysLabel", "sysMenus", "labelLUT", "linesLUT"]) {
    if (!Object.keys(_0xeb6c68[_0x3b8f38])) {
      App.fail(_0x3b8f38 + " empty.");
      return false;
    }
  }
  return true;
};
Lang.loadLOC = function (_0x2cdb36) {
  var _0x584271 = {};
  var _0x47ec75 = Buffer.byteLength(SIGNATURE, "utf8");
  try {
    _0x584271 = Utils.readFile(_0x2cdb36);
    _0x584271 = _0x584271.slice(_0x47ec75 + 4, _0x584271.length + 4);
    try {
      _0x584271 = JSON.parse(_0x584271.toString("utf8"));
      ;
    } catch (_0x1f1c8b) {
      App.fail("Error parsing file: " + _0x2cdb36, _0x1f1c8b);
    }
  } catch (_0x8667db) {
    App.fail("Error reading file: " + _0x2cdb36, _0x8667db);
  }
  _0x584271.imageLUT = {};
  return _0x584271;
};
Lang.loadTXT = function (_0x55ef94) {
  var _0x3105af = "";
  try {
    _0x3105af = Utils.readFile(_0x55ef94, "utf8");
  } catch (_0x194bb9) {
    App.fail("Error reading file: " + _0x55ef94, _0x194bb9);
    return {};
  }
  var _0x3c9f36 = this.newData();
  var _0x4b2fa0 = 0;
  var _0x506f76 = "";
  var _0x4cd74e = [];
  var _0x33d512 = false;
  const _0x357f0b = {
    MENUS: _0x3c9f36.sysMenus,
    LABELS: _0x3c9f36.sysLabel,
    ITEMS: _0x3c9f36.labelLUT,
    SPEAKERS: _0x3c9f36.labelLUT
  };
  for (var _0x53a9d9 of _0x3105af.split("\n")) {
    if (!_0x53a9d9.trim()) {
      continue;
    }
    _0x53a9d9 = _0x53a9d9.replace("\r", "");
    if (_0x53a9d9.startsWith("[")) {
      if (_0x53a9d9.toUpperCase() === "[CHOICES]") {
        _0x33d512 = true;
        continue;
      }
      _0x4b2fa0 = 0;
      _0x506f76 = _0x53a9d9.replace("[", "").replace("]", "");
      continue;
    }
    if (!_0x506f76) {
      continue;
    }
    _0x4b2fa0 += 1;
    var _0x46ee73 = _0x506f76.trim().toUpperCase();
    if (_0x46ee73 === "LANGUAGE") {
      _0x3c9f36.langName = _0x53a9d9;
      _0x506f76 = "";
    } else if (_0x46ee73 === "FONT") {
      var _0x18f543 = _0x53a9d9.split(":");
      if (_0x18f543.length > 1) {
        _0x53a9d9 = _0x18f543[1].trim();
      }
      if (_0x4b2fa0 === 1) {
        _0x3c9f36.fontFace = _0x53a9d9;
      } else {
        _0x3c9f36.fontSize = parseInt(_0x53a9d9);
        _0x506f76 = "";
      }
    } else if (_0x46ee73 === "CREDITS") {
      var _0x18f543 = _0x53a9d9.split(":");
      if (_0x18f543.length > 1) {
        _0x53a9d9 = _0x18f543[1].trim();
      }
      _0x3c9f36.langInfo[_0x4b2fa0 - 1] = _0x53a9d9;
      if (_0x4b2fa0 >= 3) {
        _0x506f76 = "";
      }
    } else if (_0x46ee73 in _0x357f0b) {
      if (_0x53a9d9.includes(":")) {
        var [_0x4dc8aa, _0x577663] = _0x53a9d9.split(":");
        _0x4dc8aa = _0x4dc8aa.trim();
        _0x577663 = _0x577663.trim();
        if (_0x4dc8aa.startsWith("#")) {
          _0x4dc8aa = _0x4dc8aa.slice(1);
        }
        _0x357f0b[_0x46ee73][_0x4dc8aa] = _0x577663;
      }
    } else if (_0x53a9d9.startsWith("#")) {
      var _0x206e9c = ":";
      if (_0x53a9d9.includes("(")) {
        _0x206e9c = "(";
        _0x33d512 = false;
      }
      var _0x3db956 = _0x53a9d9.split(_0x206e9c);
      if (_0x3db956.length < 2) {
        App.fail("Line is missing parts.\nLine: " + _0x53a9d9 + "\nFile: " + _0x55ef94);
        return {};
      }
      var _0x4dc8aa = _0x3db956[0].trim().slice(1);
      var _0x577663 = _0x3db956[1].startsWith(" ") ? _0x3db956[1].slice(1) : _0x3db956[1];
      if (_0x33d512) {
        _0x3c9f36.labelLUT[_0x4dc8aa] = _0x577663;
      } else {
        _0x4cd74e = [];
        _0x3c9f36.linesLUT[_0x4dc8aa] = _0x4cd74e;
      }
    } else if (_0x53a9d9.startsWith(":")) {
      if (_0x33d512) {
        App.fail("Line content mismatch.\nLine: " + _0x53a9d9 + "\nFile: " + _0x55ef94);
        return {};
      }
      _0x53a9d9 = _0x53a9d9.slice(1);
      if (_0x53a9d9.startsWith(" ")) {
        _0x53a9d9 = _0x53a9d9.slice(1);
      }
      _0x4cd74e.push(_0x53a9d9);
    }
  }
  return _0x3c9f36;
};
const CSV_BLOCKS = {
  MENUS: 2,
  ITEMS: 3,
  LABELS: 3,
  SECTION: 4,
  "CREDIT 1": 3,
  SPEAKERS: 3,
  LANGUAGE: 3,
  DESCRIPTIONS: 4
};
const SECTION_HEADER = ["ID", "Source", "English", "Translation"];
Lang.is_header = function (_0x5a8deb) {
  const _0x3925f1 = SECTION_HEADER.map(_0x1104d1 => _0x1104d1.toUpperCase());
  const _0x536d35 = _0x5a8deb.map(_0x54c3d4 => _0x54c3d4.trim().toUpperCase());
  return JSON.stringify(_0x3925f1) === JSON.stringify(_0x536d35);
};
Lang.new_block = function (_0x1e2a03, _0x80a999, _0x550159) {
  if (!Object.keys(CSV_BLOCKS).includes(_0x1e2a03)) {
    return false;
  }
  if (_0x1e2a03 === "LANGUAGE") {
    return _0x550159.length >= CSV_BLOCKS[_0x1e2a03] && (_0x550159[1].trim() === "Font File" || _0x550159[2].trim() === "Font Size" || _0x550159[2].trim() !== "");
  }
  if (_0x1e2a03 === "ITEMS") {
    return _0x550159.length >= CSV_BLOCKS[_0x1e2a03] && (_0x550159[1].trim() === "English" || _0x550159[2].trim() === "Translation" || _0x550159[2].trim() !== "");
  }
  return true;
};
Lang.loadCSV = function (_0x3082e6) {
  let _0x32f9de = this.newData();
  let _0x257deb = "";
  try {
    _0x257deb = Utils.readFile(_0x3082e6, "utf8");
  } catch (_0x363361) {
    App.fail("Error reading file: " + _0x3082e6, _0x363361);
    return {};
  }
  let _0x2d9f0f = "";
  let _0x4ce394 = "";
  let _0x50772f = [];
  let _0x2d5c2f = false;
  let _0x5c6b0a = false;
  for (let _0x54485f of _0x257deb.split("\n")) {
    _0x54485f = _0x54485f.trim();
    if (!_0x54485f) {
      continue;
    }
    let _0xb2de38 = [];
    let _0x594ce9 = "";
    let _0x22abab = 0;
    let _0x4b352f = 0;
    let _0x1b1670 = false;
    let _0x194994 = _0x54485f.length;
    while (_0x22abab < _0x194994) {
      let _0x4fbd2b = _0x54485f[_0x22abab];
      if (!_0x1b1670 && _0x4fbd2b === "\"") {
        _0x1b1670 = true;
      } else if (_0x4fbd2b === "“" || _0x4fbd2b === "”") {
        _0x594ce9 += "\"";
      } else if (_0x54485f.substr(_0x22abab, 2) == "\"\"") {
        _0x594ce9 += "\"";
        _0x22abab += 1;
      } else if (_0x1b1670 && _0x4fbd2b == "\"") {
        _0x1b1670 = false;
      } else if (!_0x1b1670 && _0x4fbd2b == ",") {
        _0xb2de38.push(_0x594ce9);
        _0x594ce9 = "";
      } else {
        _0x594ce9 += _0x4fbd2b;
      }
      _0x22abab += 1;
      if (_0x22abab >= _0x194994) {
        _0xb2de38.push(_0x594ce9);
      }
    }
    let _0x5aed5 = _0xb2de38.length;
    if (_0x5aed5 < 1 || _0xb2de38[0].trim() === "") {
      continue;
    }
    if (_0x5aed5 < 2) {
      App.fail("CSV line missing columns.\nLine: " + _0x54485f + "\nFile: " + _0x3082e6);
      return {};
    }
    let _0x56f447 = _0xb2de38[0].toUpperCase();
    if (!_0x56f447.trim()) {
      App.fail("CSV first column missing.\nLine: " + _0x54485f + "\nFile: " + _0x3082e6);
      return {};
    }
    if (this.new_block(_0x56f447, _0x2d9f0f, _0xb2de38)) {
      _0x2d9f0f = _0x56f447;
      _0x2d5c2f = true;
      continue;
    }
    if (_0x2d5c2f && _0x2d9f0f === "SECTION") {
      if (this.is_header(_0xb2de38)) {
        _0x2d5c2f = false;
      }
      continue;
    }
    if (_0x5aed5 < CSV_BLOCKS[_0x2d9f0f]) {
      App.fail("CSV missing columns. Total: " + CSV_BLOCKS[_0x2d9f0f] + " Found: " + _0x5aed5 + "\nLine: " + _0x54485f + "\nFile: " + _0x3082e6);
      return {};
    }
    if (_0x2d9f0f === "LANGUAGE") {
      _0x32f9de.langName = _0xb2de38[0];
      _0x32f9de.fontFace = _0xb2de38[1];
      _0x32f9de.fontSize = parseInt(_0xb2de38[2]);
      _0x2d9f0f = "";
    } else if (_0x2d9f0f === "CREDIT 1") {
      _0x32f9de.langInfo = _0xb2de38.slice(0, Math.min(3, _0x5aed5));
      _0x2d9f0f = "";
    } else if (_0x2d9f0f === "LABELS") {
      _0x32f9de.sysLabel[_0xb2de38[0]] = _0xb2de38[2].trim() ? _0xb2de38[2] : _0xb2de38[1];
    } else if (_0x2d9f0f === "MENUS") {
      _0x32f9de.sysMenus[_0xb2de38[0]] = _0xb2de38[1].trim() ? _0xb2de38[1] : _0xb2de38[0];
    } else if (_0x2d9f0f === "ITEMS" || _0x2d9f0f === "SPEAKERS") {
      let _0x5ade5f = _0xb2de38[0];
      let _0x44aa2a = _0xb2de38[1];
      let _0x1f514a = _0xb2de38[2];
      if (!_0x5ade5f.trim() || !_0x44aa2a.trim()) {
        App.fail("Missing column data for Item.\nLine: " + _0x54485f + "\nFile: " + _0x3082e6);
        return {};
      }
      _0x1f514a = _0x1f514a.trim() ? _0x1f514a : _0x44aa2a;
      _0x32f9de.labelLUT[_0x5ade5f] = _0x1f514a;
    } else if (_0x2d9f0f === "SECTION" || _0x2d9f0f === "DESCRIPTIONS") {
      let _0x17b333 = _0xb2de38[0];
      let _0x344fe8 = _0xb2de38[1];
      let _0x3e0a98 = _0xb2de38[2];
      let _0x4f8bc0 = _0xb2de38[3];
      if (!_0x17b333.trim() || !_0x344fe8.trim()) {
        App.fail("Missing column data for Section.\nLine: " + _0x54485f + "\nFile: " + _0x3082e6);
        return {};
      }
      _0x4f8bc0 = _0x4f8bc0.trim() ? _0x4f8bc0 : _0x3e0a98;
      if (_0x344fe8.toUpperCase().includes("CHOICE")) {
        _0x32f9de.labelLUT[_0x17b333] = _0x4f8bc0;
      } else {
        if (_0x4ce394 != _0x17b333) {
          _0x50772f = [];
          _0x32f9de.linesLUT[_0x17b333] = _0x50772f;
          _0x4ce394 = _0x17b333;
        }
        _0x50772f.push(_0x4f8bc0);
      }
    } else {
      App.fail("Invalid CSV parsing state.");
      return {};
    }
  }
  return _0x32f9de;
};
const _DM_OL = DataManager.onLoad;
DataManager.onLoad = function (_0x3f3f88) {
  if (_0x3f3f88 === $dataSystem) {
    Lang.search();
    Lang.select(ConfigManager.language);
  }
  _DM_OL.call(this, _0x3f3f88);
};
const MAX_LINES = 2;
Game_Interpreter.prototype.prevHeader = "";
Game_Interpreter.prototype.extraLines = [];
Game_Interpreter.prototype.command101 = function () {
  if (!$gameMessage.isBusy()) {
    if (this.extraLines.length > 0) {
      $gameMessage.add(this.prevHeader);
      var _0x108650 = Math.min(this.extraLines.length, MAX_LINES);
      for (var _0x3692ce = 0; _0x3692ce < _0x108650; _0x3692ce++) {
        $gameMessage.add(this.extraLines.shift());
      }
      if (this.extraLines.length < 1) {
        this._index++;
      }
      this.setWaitMode("message");
      return false;
    }
    $gameMessage.setFaceImage(this._params[0], this._params[1]);
    $gameMessage.setBackground(this._params[2]);
    $gameMessage.setPositionType(this._params[3]);
    while (this.nextEventCode() === 401) {
      this._index++;
      var _0x4a2e98 = this.currentCommand().parameters[0];
      var _0x10dac1 = Lang.lines(Lang.label(_0x4a2e98, true));
      $gameMessage.add(_0x10dac1.text);
      this.prevHeader = _0x10dac1.text;
      if (_0x10dac1.lines.length) {
        for (var _0x3692ce = 0; _0x3692ce < _0x10dac1.lines.length; _0x3692ce++) {
          if (_0x3692ce < MAX_LINES) {
            $gameMessage.add(_0x10dac1.lines[_0x3692ce]);
          } else {
            this.extraLines.push(_0x10dac1.lines[_0x3692ce]);
          }
        }
      }
      if (this.extraLines.length > 0) {
        while (this._index >= 0 && this.currentCommand().code !== 101) {
          this._index--;
        }
        this.setWaitMode("message");
        return;
      }
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
    this.setWaitMode("message");
  }
  return false;
};
Game_Interpreter.prototype.setupChoices = function (_0x54de99) {
  var _0x3d84f1 = _0x54de99[0].clone();
  for (let _0x5651bc = 0; _0x5651bc < _0x3d84f1.length; _0x5651bc++) {
    _0x3d84f1[_0x5651bc] = Lang.label(_0x3d84f1[_0x5651bc]);
  }
  var _0x5f37b6 = _0x54de99[1];
  var _0x1990ad = _0x54de99.length > 2 ? _0x54de99[2] : 0;
  var _0x33df9f = _0x54de99.length > 3 ? _0x54de99[3] : 2;
  var _0x5c0f1a = _0x54de99.length > 4 ? _0x54de99[4] : 0;
  if (_0x5f37b6 >= _0x3d84f1.length) {
    _0x5f37b6 = -2;
  }
  $gameMessage.setChoices(_0x3d84f1, _0x1990ad, _0x5f37b6);
  $gameMessage.setChoiceBackground(_0x5c0f1a);
  $gameMessage.setChoicePositionType(_0x33df9f);
  $gameMessage.setChoiceCallback(function (_0x4ea4cb) {
    this._branch[this._indent] = _0x4ea4cb;
  }.bind(this));
};
Window_Base.prototype.drawItemName = function (_0xbf2a9a, _0x3c71fa, _0x1dfff0, _0x933fc9) {
  _0x933fc9 = _0x933fc9 || 312;
  if (_0xbf2a9a) {
    var _0x9e4f17 = Window_Base._iconWidth + 4;
    this.resetTextColor();
    this.drawIcon(_0xbf2a9a.iconIndex, _0x3c71fa + 2, _0x1dfff0 + 2);
    this.drawText(Lang.label(_0xbf2a9a.name), _0x3c71fa + _0x9e4f17, _0x1dfff0, _0x933fc9 - _0x9e4f17);
  }
};
Window_Help.prototype.setItem = function (_0x959120) {
  if (!_0x959120) {
    this.setText("");
    return;
  }
  var _0x2700f0 = Lang.lines(_0x959120.description);
  if (_0x2700f0.lines.length > 0) {
    this.setText(_0x2700f0.lines.join("\n"));
  } else {
    this.setText(_0x959120.description);
  }
};
AudioManager.createBuffer = function (_0xd2b7bb, _0xf4948d) {
  var _0x8ecb91 = this.audioFileExt();
  var _0x12f0e6 = this._path + _0xd2b7bb + "/" + encodeURIComponent(_0xf4948d) + _0x8ecb91;
  return new WebAudio(Crypto.resolveURL(_0x12f0e6));
};
WebAudio.prototype._loading = async function (_0x1968e1) {
  try {
    const _0x337722 = stbvorbis.decodeStream(_0x3d1622 => this._onDecode(_0x3d1622));
    let _0x417dd1 = true;
    while (true) {
      const {
        done: _0x2012d8,
        value: _0x1690ee
      } = await _0x1968e1.read();
      if (_0x2012d8) {
        _0x337722({
          eof: true
        });
        return;
      }
      let _0x45e118 = _0x1690ee;
      if (_0x417dd1) {
        _0x417dd1 = false;
        _0x45e118 = Crypto.dekit(_0x45e118, this._url, Crypto.guard());
      }
      this._readLoopComments(_0x45e118);
      _0x337722({
        data: _0x45e118,
        eof: false
      });
    }
  } catch (_0x339782) {
    App.fail("Audio stream failure: ", _0x339782);
  }
};
WebAudio.prototype._onXhrLoad = function (_0x456552) {
  var _0x1c9f45 = Crypto.dekit(_0x456552.response, this._url, Crypto.guard());
  this._readLoopComments(new Uint8Array(_0x1c9f45));
  WebAudio._context.decodeAudioData(_0x1c9f45, function (_0xbf89d) {
    this._buffer = _0xbf89d;
    this._totalTime = _0xbf89d.duration;
    if (this._loopLength > 0 && this._sampleRate > 0) {
      this._loopStart /= this._sampleRate;
      this._loopLength /= this._sampleRate;
    } else {
      this._loopStart = 0;
      this._loopLength = this._totalTime;
    }
    this._onLoad();
  }.bind(this));
};
WebAudio.prototype._readMetaData = function (_0x328cf5, _0x528093, _0x4bbd34) {
  for (var _0xc4c8d = _0x528093; _0xc4c8d < _0x528093 + _0x4bbd34 - 10; _0xc4c8d++) {
    if (this._readFourCharacters(_0x328cf5, _0xc4c8d) === "LOOP") {
      var _0x1becbb = "";
      while (_0x328cf5[_0xc4c8d] > 0) {
        _0x1becbb += String.fromCharCode(_0x328cf5[_0xc4c8d++]);
      }
      let _0x5b7af3 = _0x1becbb.match(/LOOPSTART=([0-9]+)/);
      if (_0x5b7af3 && _0x5b7af3.length > 1) {
        this._loopStart = parseInt(_0x5b7af3[1]);
      }
      _0x5b7af3 = _0x1becbb.match(/LOOPLENGTH=([0-9]+)/);
      if (_0x5b7af3 && _0x5b7af3.length > 1) {
        this._loopLength = parseInt(_0x5b7af3[1]);
      }
      if (_0x1becbb == "LOOPSTART" || _0x1becbb == "LOOPLENGTH") {
        var _0x2ffe4f = "";
        _0xc4c8d += 16;
        while (_0x328cf5[_0xc4c8d] > 0) {
          _0x2ffe4f += String.fromCharCode(_0x328cf5[_0xc4c8d++]);
        }
        if (_0x1becbb == "LOOPSTART") {
          this._loopStart = parseInt(_0x2ffe4f);
        } else {
          this._loopLength = parseInt(_0x2ffe4f);
        }
      }
    }
  }
};