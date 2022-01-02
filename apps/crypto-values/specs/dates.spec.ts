import { getTimestampFromDate, getTimestampFromDate3 } from '../utils/dates'

describe('Test dates utility functions', () => {
  describe('Test getTimestampFromDate() fn', () => {
    it('Should return correct timestamp in seconds with date format: dd/mm/yyyy', () => {
      const res = getTimestampFromDate('02/13/2009')
      expect(res).toEqual(1234479600)
    })

    it('Should return correct timestamp in seconds with date format: dd/mm/yy', () => {
      const res = getTimestampFromDate('02/13/09')
      expect(res).toEqual(1234479600)
    })
    it('Should return correct timestamp in seconds with date format: dd-mm-yyyy', () => {
      const res = getTimestampFromDate('02-13-2009')
      expect(res).toEqual(1234479600)
    })

    // todo: remove
    it('Should return correct timestamp in seconds with date format: dd-mm-yy', () => {
      const res = getTimestampFromDate('02-13-09')
      expect(res).toEqual(1234479600)
    })

    // bueno
    it('Should return correct unix timestamp in seconds from string date. Example 1', () => {
      const res = getTimestampFromDate3(
        'Wed Aug 25 2021 14:40:26 GMT+0200 (hora de verano de Europa central)'
      )
      expect(res).toEqual(1629895226)
    })

    // bueno
    it('Should return correct unix timestamp in seconds from string date. Example 2', () => {
      const res = getTimestampFromDate3(
        'Tue Jan 12 2021 10:30:14 GMT+0100 (hora estándar de Europa central)'
      )
      expect(res).toEqual(1610443814)
    })

    // bueno
    it('Should return correct unix timestamp in seconds from string date. Example 3', () => {
      const res = getTimestampFromDate3(
        'Fri Jun 25 2021 11:30:14 GMT+0200 (hora de verano de Europa central)'
      )
      expect(res).toEqual(1624613414)
    })
  })
})
