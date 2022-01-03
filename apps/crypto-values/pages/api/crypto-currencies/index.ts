import { NextApiRequest, NextApiResponse } from 'next'
import axios from 'axios'
const parseurl = require('parseurl')

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  let result, url
  const baseUrl = 'https://coin360.com/api/coins'
  const queryString = parseurl(req).query
  try {
    if (req.query.period === 'custom') {
      url = `${baseUrl}/custom?${queryString}`
    } else {
      url = `${baseUrl}?${queryString}`
    }
    // todo: remove logs
    // console.log(url)
    // console.log(queryString)
    result = await axios.get(url)
    res.status(200).json(result.data)
  } catch (e) {
    res.status(500).json(e)
  }
}
