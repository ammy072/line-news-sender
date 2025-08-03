const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
require('dotenv').config();

const app = express();
app.use(bodyParser.json());

app.post('/send', async (req, res) => {
  const {
    eventName, location, date, activity,
    opener, participants, monkLeader,
    layLeader, purpose
  } = req.body;

  const message = 
`📢 งานพิธี: ${eventName}
📍 สถานที่: ${location}
📅 วันที่: ${date}
🕯 กิจกรรม: ${activity}
🙇‍♂️ ผู้เปิดงาน: ${opener}
🤝 ผู้ร่วมงาน: ${participants}
🧘‍♂️ ประธานสงฆ์: ${monkLeader}
🙏 ประธานฆราวาส: ${layLeader}
🎯 วัตถุประสงค์: ${purpose}`;

  try {
    await axios.post('https://api.line.me/v2/bot/message/broadcast', {
      messages: [{ type: 'text', text: message }]
    }, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': \`Bearer \${process.env.LINE_CHANNEL_ACCESS_TOKEN}\`
      }
    });

    res.send({ status: 'ok' });
  } catch (err) {
    console.error(err.response?.data || err.message);
    res.status(500).send({ error: 'ส่งไม่สำเร็จ' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(\`Server running on port \${PORT}\`));