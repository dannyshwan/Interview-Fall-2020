import moment from 'moment';
import fetch from 'node-fetch';

export interface ILaunch {
  flight_number?: number;
  mission_name?: string;
  rocket_name?: string;
  rocket_type?: string;
  details?: string;
  launch_date_utc?: string;
  launch_success?: boolean;
  error?: string;
}

export class Launches {
  url = 'https://api.spacexdata.com/v3/launches';

  /**
   * Gets the daily spaceX launches
   * @param date string with YYYY format
   */
  public async getLaunchesByYear(year: string): Promise<ILaunch[]> {
    try {
      // Get the date as a moment object
      const dateAsMoment = moment(year, 'YYYY');
      // Check that the date string is valid, and that the date is before or equal to today's date
      // moment() creates a moment with today's date
      if (!dateAsMoment.isValid() || !dateAsMoment.isSameOrBefore(moment())) {
        return [{ error: 'invalid year' }];
      }
      // Get the parsed request
      const parsed = await this.requestLaunchesByYear(year);
      // Maps and creates the return list
      return this.filterFields(parsed);
    } catch (e) {
      console.log(e);
      return [
        {
          error: `There was an error retrieving this launch`,
        },
      ];
    }
  }

  /**
   * Makes the api request for launches per year
   * @param year
   */
  async requestLaunchesByYear(year: string): Promise<any[]> {
    const res = await fetch(`${this.url}?launch_year=${year}`);
    return res.json();
  }


  /**
   * Get launches by range
   * @param start Date in YYYY-MM-DD format
   * @param end Date in YYYY-MM-DD format
   */

  public async getLaunchesByRange(start: string, end: string): Promise<any>{
    try{
      const getStartDateAsMoment = moment(start,'YYYY-MM-DD'); //get start date as a moment
      const getEndDateAsMoment = moment(end,'YYYY-MM-DD'); //get end date as a moment

      //Check if starting date is valid
      if (!getStartDateAsMoment.isValid() || !getStartDateAsMoment.isSameOrBefore(moment())) {
        return [{ error: 'invalid start date' }];
      }
      //Check if end date is valid
      else if(!getEndDateAsMoment.isValid() || !getEndDateAsMoment.isSameOrBefore(moment())){
        return [{ error: 'invalid end date' }];
      }
      //Check that start date is not after end date
      else if(!getStartDateAsMoment.isBefore(getEndDateAsMoment)){
        return [{ error: 'end date must be after start date' }];
      }

      // Get the parsed request
      const parsed = await this.requestLaunchesByRange(start, end);
      // Maps and creates the return list
      return this.filterFields(parsed);
    }
    catch(e){
      console.log(e);
      return [
        {
          error: `An error has occurred while trying to retrieve launches`,
        },
      ];
    }
  }


  /**
   * Makes the api request for launches per year
   * @param year
   */
  async requestLaunchesByRange(start: string, end:string): Promise<any[]> {
    const res = await fetch(`${this.url}?start=${start}&end=${end}`);
    return res.json();
  }

  /**
   * Helpers
   */

  /**
   * Filters out desired fields
   * @param data
   */
  filterFields(data: any[]) {
    return data.map((p) => ({
      flight_number: p.flight_number,
      mission_name: p.mission_name,
      launch_date_utc: p.launch_date_utc,
      rocket_name: p.rocket?.rocket_name,
      rocket_type: p.rocket?.rocket_type,
      details: p.details,
      launch_success: p.launch_success,
    }));
  }
}
