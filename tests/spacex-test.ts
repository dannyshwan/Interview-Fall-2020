import {} from 'jasmine';
import { Launches, ILaunch } from '../src/spaceX/launches';

describe('daily_launch_tests', () => {
  it('test filtering fields', async () => {
    const res = [
      {
        flight_number: 1,
        mission_name: 'Mission 1',
        rocket: {
          rocket_name: 'Rocket 1',
          rocket_type: 'Rocket Type 1',
        },
        details: 'space is cool man',
        launch_date_utc: '2020-09-01',
        launch_success: true,
        extraField1: 1,
        extraField2: 2,
        extraField3: 3,
      },
    ];
    const expected = [
      {
        flight_number: 1,
        mission_name: 'Mission 1',
        launch_date_utc: '2020-09-01',
        rocket_name: 'Rocket 1',
        rocket_type: 'Rocket Type 1',
        details: 'space is cool man',
        launch_success: true,
      },
    ];
    const launches = new Launches();
    expect(launches.filterFields(res)).toEqual(expected);
  });

  it('test with invalid date', async () => {
    const launches = new Launches();
    const result = await launches.getLaunchesByYear('jaslkdjalskjdalksdj');
    expect(result).toEqual([
      {
        error: `invalid year`,
      },
    ]);
  });

  it('test with mock call', async () => {
    const res = [
      {
        flight_number: 1,
        mission_name: 'Mission 1',
        rocket: {
          rocket_name: 'Rocket 1',
          rocket_type: 'Rocket Type 1',
        },
        details: 'space is cool man',
        launch_success: true,
      },
    ];
    const expected = [
      {
        flight_number: 1,
        mission_name: 'Mission 1',
        rocket_name: 'Rocket 1',
        rocket_type: 'Rocket Type 1',
        details: 'space is cool man',
        launch_success: true,
      },
    ];
    const launches = new Launches();
    spyOn(launches, 'requestLaunchesByYear').and.returnValue(
      Promise.resolve(res)
    );
    const result = await launches.getLaunchesByYear('2020');
    expect(result).toEqual(expected);
  });

    it('actually make api call, check required fields', async () => {
      const launches = new Launches();
      const result = await launches.getLaunchesByYear('2020');
      expect(!!(result.length
          && result[0].flight_number
          && result[0].mission_name
          && result[0].rocket_name
          && result[0].rocket_type
          )).toBe(true);
    });


  //DANIEL SHWAN TESTS
  it("Making a valid call for getLaunchesByRange", async () => {
    const launches = new Launches();
    const result = await launches.getLaunchesByRange('2018-07-20', '2020-07-20');
    expect(!!(result.length
      && result[0].flight_number
      && result[0].launch_date_utc
      && result[0].mission_name
      && result[0].rocket_name
      && result[0].rocket_type
      )).toBe(true)
  });

  it('testing with an invalid range', async () => {
    const launches = new Launches();
    const result = await launches.getLaunchesByRange('2019-09-20', '2018-07-20');
    expect(result).toEqual([
      {
        error: `end date must be after start date`,
      },
    ]);
  });

  it('testing with an invalid starting date', async () => {
    const launches = new Launches();
    const result = await launches.getLaunchesByRange('Hello World!', '2018-09-20');
    expect(result).toEqual([
      {
        error: `invalid start date`,
      },
    ]);
  });

  it('testing with an invalid end date', async () => {
    const launches = new Launches();
    const result = await launches.getLaunchesByRange('2019-09-20', 'Hello Again World!');
    expect(result).toEqual([
      {
        error: `invalid end date`,
      },
    ]);
  });
});
