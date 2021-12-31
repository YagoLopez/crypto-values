import { getTimestampFromDate } from '../utils/dates'

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

    it('Should return correct timestamp in seconds with date format: dd-mm-yy', () => {
      const res = getTimestampFromDate('02-13-09')
      expect(res).toEqual(1234479600)
    })
  })
})
