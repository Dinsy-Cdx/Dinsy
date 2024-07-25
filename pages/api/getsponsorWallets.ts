// pages/api/getsponsorWallets.ts

import { NextApiRequest, NextApiResponse } from 'next';
import mysql from 'mysql';

// Configuración de la base de datos
const db = mysql.createPool({
  host: 'auth-db1436.hstgr.io',
  user: 'u408348937_cdx',
  password: 'Jorgitotuterror666',
  database: 'u408348937_dinsy',
  port: 3306,
});

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { username } = req.query;

  if (req.method === 'GET') {
    if (!username) {
      res.status(400).json({ error: 'Missing username' });
      return;
    }

    // Búsqueda de la wallet del sponsor en la base de datos
    db.query('SELECT wallet FROM users WHERE username = ?', [username], (err, rows) => {
      if (err) {
        console.error('Error fetching sponsor wallet:', err);
        res.status(500).json({ error: 'Error fetching sponsor wallet' });
        return;
      }

      if (rows.length > 0) {
        res.status(200).json({ wallet: rows[0].wallet || '' }); // Ensure wallet field is not undefined
      } else {
        res.status(404).json({ wallet: '' }); // Return an empty wallet if sponsor not found
      }
    });
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
