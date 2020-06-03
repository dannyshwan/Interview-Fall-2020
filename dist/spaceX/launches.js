"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Launches = void 0;
const moment_1 = __importDefault(require("moment"));
const node_fetch_1 = __importDefault(require("node-fetch"));
class Launches {
    constructor() {
        this.url = 'https://api.spacexdata.com/v3/launches';
    }
    /**
     * Gets the daily spaceX launches
     * @param date string with YYYY format
     */
    getLaunchesByYear(year) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // Get the date as a moment object
                const dateAsMoment = moment_1.default(year, 'YYYY');
                // Check that the date string is valid, and that the date is before or equal to today's date
                // moment() creates a moment with today's date
                if (!dateAsMoment.isValid() || !dateAsMoment.isSameOrBefore(moment_1.default())) {
                    return [{ error: 'invalid year' }];
                }
                // Get the parsed request
                const parsed = yield this.requestLaunchesByYear(year);
                // Maps and creates the return list
                return this.filterFields(parsed);
            }
            catch (e) {
                console.log(e);
                return [
                    {
                        error: `There was an error retrieving this launch`,
                    },
                ];
            }
        });
    }
    /**
     * Makes the api request for launches per year
     * @param year
     */
    requestLaunchesByYear(year) {
        return __awaiter(this, void 0, void 0, function* () {
            const res = yield node_fetch_1.default(`${this.url}?launch_year=${year}`);
            return res.json();
        });
    }
    /**
     * Get launches by range
     * @param start Date in YYYY-MM-DD format
     * @param end Date in YYYY-MM-DD format
     */
    getLaunchesByRange(start, end) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const getStartDateAsMoment = moment_1.default(start, 'YYYY-MM-DD'); //get start date as a moment
                const getEndDateAsMoment = moment_1.default(end, 'YYYY-MM-DD'); //get end date as a moment
                //Check if starting date is valid
                if (!getStartDateAsMoment.isValid() || !getStartDateAsMoment.isSameOrBefore(moment_1.default())) {
                    return [{ error: 'invalid start date' }];
                }
                //Check if end date is valid
                else if (!getEndDateAsMoment.isValid() || !getEndDateAsMoment.isSameOrBefore(moment_1.default())) {
                    return [{ error: 'invalid end date' }];
                }
                //Check that start date is not after end date
                else if (!getStartDateAsMoment.isBefore(getEndDateAsMoment)) {
                    return [{ error: 'end date must be after start date' }];
                }
                // Get the parsed request
                const parsed = yield this.requestLaunchesByRange(start, end);
                // Maps and creates the return list
                return this.filterFields(parsed);
            }
            catch (e) {
                console.log(e);
                return [
                    {
                        error: `An error has occurred while trying to retrieve launches`,
                    },
                ];
            }
        });
    }
    /**
     * Makes the api request for launches per year
     * @param year
     */
    requestLaunchesByRange(start, end) {
        return __awaiter(this, void 0, void 0, function* () {
            const res = yield node_fetch_1.default(`${this.url}?start=${start}&end=${end}`);
            return res.json();
        });
    }
    /**
     * Helpers
     */
    /**
     * Filters out desired fields
     * @param data
     */
    filterFields(data) {
        return data.map((p) => {
            var _a, _b;
            return ({
                flight_number: p.flight_number,
                mission_name: p.mission_name,
                launch_date_utc: p.launch_date_utc,
                rocket_name: (_a = p.rocket) === null || _a === void 0 ? void 0 : _a.rocket_name,
                rocket_type: (_b = p.rocket) === null || _b === void 0 ? void 0 : _b.rocket_type,
                details: p.details,
                launch_success: p.launch_success,
            });
        });
    }
}
exports.Launches = Launches;
//# sourceMappingURL=launches.js.map