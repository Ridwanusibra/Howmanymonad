import axios from 'axios';

export default async function handler(req, res) {
  const { username } = req.query;
  const BEARER_TOKEN = process.env.TWITTER_BEARER_TOKEN;

  if (!username) return res.status(400).json({ error: "Username required" });

  try {
    // Get user ID
    const userResp = await axios.get(
      `https://api.twitter.com/2/users/by/username/${username}`,
      { headers: { Authorization: `Bearer ${BEARER_TOKEN}` } }
    );
    const userId = userResp.data.data.id;

    // Get recent tweets
    const tweetsResp = await axios.get(
      `https://api.twitter.com/2/users/${userId}/tweets?max_results=100`,
      { headers: { Authorization: `Bearer ${BEARER_TOKEN}` } }
    );

    const tweets = tweetsResp.data.data || [];
    const count = tweets.reduce((acc, tweet) => {
      return acc + (tweet.text.toLowerCase().match(/monad/g) || []).length;
    }, 0);

    res.status(200).json({ count });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch tweets' });
  }
}
