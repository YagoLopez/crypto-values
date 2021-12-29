import { NextApiRequest, NextApiResponse } from 'next'
import db from './db.json'

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    res.status(200).json(db)
  } catch (e) {
    res.status(500).json(e)
  }
}
