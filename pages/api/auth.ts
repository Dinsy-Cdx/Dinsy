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

export const generateReferralLink = (username: string) => {
    return `https://dinsy.pro/home/auth?ref=${username}`;
};

export async function getRefLinkByUsername(username: string): Promise<string | null> {
    return new Promise((resolve, reject) => {
        db.query('SELECT refLink FROM users WHERE username = ?', [username], (err, rows) => {
            if (err) {
                console.error('Error fetching refLink:', err);
                resolve(null);
            } else {
                if (rows.length > 0) {
                    resolve(rows[0].refLink);
                } else {
                    resolve(null); // No se encontró el usuario o refLink no está definido
                }
            }
        });
    });
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        const { firstName, lastName, username, sponsor, level, wallet, refLink } = req.body;

        const finalRefLink = refLink || generateReferralLink(username);
        const finalSponsor = sponsor || 'Master';

        try {
            db.query(
                'INSERT INTO users (firstName, lastName, username, sponsor, level, wallet, refLink) VALUES (?, ?, ?, ?, ?, ?, ?)',
                [firstName, lastName, username, finalSponsor, level, wallet, finalRefLink],
                (err, result) => {
                    if (err) {
                        console.error('Failed to register user:', err);
                        res.status(500).json({ message: 'Failed to register user' });
                    } else {
                        res.status(200).json({ message: 'User registered successfully', refLink: finalRefLink });
                    }
                }
            );
        } catch (error) {
            console.error('Error inserting user:', error);
            res.status(500).json({ message: 'Failed to register user' });
        }
    } else if (req.method === 'GET') {
        const { username, wallet } = req.query;

        if (username) {
            try {
                const refLink = await getRefLinkByUsername(username as string);
                if (refLink) {
                    res.status(200).json({ refLink });
                } else {
                    const generatedLink = generateReferralLink(username as string);
                    res.status(200).json({ refLink: generatedLink });
                }
            } catch (error) {
                console.error('Error fetching refLink:', error);
                res.status(500).json({ message: 'Failed to fetch refLink' });
            }
        } else if (wallet) {
            try {
                db.query(
                    'SELECT * FROM users WHERE wallet = ?',
                    [wallet as string],
                    (err, rows) => {
                        if (err) {
                            console.error('Error checking wallet:', err);
                            res.status(500).json({ message: 'Failed to check wallet registration' });
                        } else {
                            if (rows.length > 0) {
                                res.status(200).json({ isRegistered: true, user: rows[0] });
                            } else {
                                res.status(200).json({ isRegistered: false });
                            }
                        }
                    }
                );
            } catch (error) {
                console.error('Error checking wallet:', error);
                res.status(500).json({ message: 'Failed to check wallet registration' });
            }
        } else {
            res.status(400).json({ message: 'Missing username or wallet address' });
        }
    } else {
        res.status(405).json({ message: 'Method not allowed' });
    }
}
