const fetch = require("node-fetch");

exports.handler = async function (event) {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  const { filename, base64Content } = JSON.parse(event.body);
  const GITHUB_TOKEN = process.env.GITHUB_TOKEN;

  const url = `https://api.github.com/repos/lyquyen551999/streamlit-music-files/contents/songs/${filename}`;

  const res = await fetch(url, {
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${GITHUB_TOKEN}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      message: `Upload ${filename}`,
      content: base64Content
    })
  });

  const result = await res.json();
  return {
    statusCode: res.status,
    body: JSON.stringify(result)
  };
};
