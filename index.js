const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
require('dotenv').config();

const app = express();

// อ่านข้อมูลจากฟอร์ม
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

// POST route
app.post('/send-news', async (req, res) => {
  const {
    title,
    location,
    date,
    activities,
    host,
    participants,
    chiefMonk,
    chiefLay,
    purpose
  } = req.body;

  const message = `
📢 ข่าวงานพิธี
• ชื่องาน: ${title}
• สถานที่: ${location}
• วันที่: ${date}
• กิจกรรม: ${activities}
• ผู้เปิดงาน: ${host}
• ผู้ร่วมงาน: ${participants}
• ประธานสงฆ์: ${chiefMonk}
• ประธานฆราวาส: ${chiefLay}
• วัตถุประสงค์: ${purpose}
  `;

  try {
    await axios.post('https://api.line.me/v2/bot/message/push', {
      to: process.env.LINE_OA_ID,
      messages: [{ type: 'text', text: message }]
    }, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': Bearer ${process.env.LINE_CHANNEL_TOKEN}
      }
    });

    res.send('✅ ส่งข่าวไปยัง LINE OA เรียบร้อยแล้ว');
  } catch (err) {
    console.error('❌ LINE API error:', err.message);
    res.status(500).send('เกิดข้อผิดพลาดในการส่งข่าวไป LINE');
  }
});

// เริ่มเซิร์ฟเวอร์
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});
