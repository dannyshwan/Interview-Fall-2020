"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var moment_1 = require("moment");
var node_fetch_1 = require("node-fetch");
var Launches = /** @class */ (function () {
    function Launches() {
        this.url = 'https://api.spacexdata.com/v3/launches';
    }
    /**
     * Gets the daily spaceX launches
     * @param date string with YYYY format
     */
    Launches.prototype.getLaunchesByYear = function (year) {
        return __awaiter(this, void 0, void 0, function () {
            var dateAsMoment, parsed, e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        dateAsMoment = moment_1["default"](year, 'YYYY');
                        // Check that the date string is valid, and that the date is before or equal to today's date
                        // moment() creates a moment with today's date
                        if (!dateAsMoment.isValid() || !dateAsMoment.isSameOrBefore(moment_1["default"]())) {
                            return [2 /*return*/, [{ error: 'invalid year' }]];
                        }
                        return [4 /*yield*/, this.requestLaunchesByYear(year)];
                    case 1:
                        parsed = _a.sent();
                        // Maps and creates the return list
                        return [2 /*return*/, this.filterFields(parsed)];
                    case 2:
                        e_1 = _a.sent();
                        console.log(e_1);
                        return [2 /*return*/, [
                                {
                                    error: "There was an error retrieving this launch"
                                },
                            ]];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Makes the api request for launches per year
     * @param year
     */
    Launches.prototype.requestLaunchesByYear = function (year) {
        return __awaiter(this, void 0, void 0, function () {
            var res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, node_fetch_1["default"](this.url + "?launch_year=" + year)];
                    case 1:
                        res = _a.sent();
                        return [2 /*return*/, res.json()];
                }
            });
        });
    };
    /**
     * Helpers
     */
    /**
     * Filters out desired fields
     * @param data
     */
    Launches.prototype.filterFields = function (data) {
        return data.map(function (p) { return ({
            flight_number: p.flight_number,
            mission_name: p.mission_name,
            rocket_name: p.rocket ? .rocket_name : ,
            rocket_type: p.rocket ? .rocket_type : ,
            details: p.details,
            launch_success: p.launch_success
        }); });
    };
    return Launches;
}());
exports.Launches = Launches;
