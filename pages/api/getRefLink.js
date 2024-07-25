import { getRefLinkByUsername } from './auth';

const handler = async (req, res) => {
    const { username } = req.query;

    if (!username) {
        return res.status(400).json({ error: 'Missing username' });
    }

    try {
        const refLink = await getRefLinkByUsername(username);
        if (!refLink) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.status(200).json({ refLink });
    } catch (error) {
        console.error('Failed to fetch refLink:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

export default handler;
