{\rtf1\ansi\ansicpg874\cocoartf2822
\cocoatextscaling0\cocoaplatform0{\fonttbl\f0\fswiss\fcharset0 Helvetica;}
{\colortbl;\red255\green255\blue255;}
{\*\expandedcolortbl;;}
\margl1440\margr1440\vieww11520\viewh8400\viewkind0
\pard\tx720\tx1440\tx2160\tx2880\tx3600\tx4320\tx5040\tx5760\tx6480\tx7200\tx7920\tx8640\pardirnatural\partightenfactor0

\f0\fs24 \cf0 require('dotenv').config();\
\
const express = require('express');\
const bodyParser = require('body-parser');\
const axios = require('axios');\
\
const app = express();\
\
// Middleware\
app.use(bodyParser.json());\
app.use(bodyParser.urlencoded(\{ extended: true \}));\
app.use(express.static('public'));\
\
// Route \uc0\u3626 \u3635 \u3627 \u3619 \u3633 \u3610 \u3619 \u3633 \u3610  POST \u3592 \u3634 \u3585 \u3615 \u3629 \u3619 \u3660 \u3617 \
app.post('/send-news', async (req, res) => \{\
  const \{\
    title,\
    location,\
    date,\
    activities,\
    host,\
    participants,\
    chiefMonk,\
    chiefLay,\
    purpose\
  \} = req.body;\
\
  const message = `\
\uc0\u55357 \u56546  \u3586 \u3656 \u3634 \u3623 \u3591 \u3634 \u3609 \u3614 \u3636 \u3608 \u3637 \
\'95 \uc0\u3594 \u3639 \u3656 \u3629 \u3591 \u3634 \u3609 : $\{title\}\
\'95 \uc0\u3626 \u3606 \u3634 \u3609 \u3607 \u3637 \u3656 : $\{location\}\
\'95 \uc0\u3623 \u3633 \u3609 \u3607 \u3637 \u3656 : $\{date\}\
\'95 \uc0\u3585 \u3636 \u3592 \u3585 \u3619 \u3619 \u3617 : $\{activities\}\
\'95 \uc0\u3612 \u3641 \u3657 \u3648 \u3611 \u3636 \u3604 \u3591 \u3634 \u3609 : $\{host\}\
\'95 \uc0\u3612 \u3641 \u3657 \u3619 \u3656 \u3623 \u3617 \u3591 \u3634 \u3609 : $\{participants\}\
\'95 \uc0\u3611 \u3619 \u3632 \u3608 \u3634 \u3609 \u3626 \u3591 \u3590 \u3660 : $\{chiefMonk\}\
\'95 \uc0\u3611 \u3619 \u3632 \u3608 \u3634 \u3609 \u3590 \u3619 \u3634 \u3623 \u3634 \u3626 : $\{chiefLay\}\
\'95 \uc0\u3623 \u3633 \u3605 \u3606 \u3640 \u3611 \u3619 \u3632 \u3626 \u3591 \u3588 \u3660 : $\{purpose\}\
  `;\
\
  try \{\
    await axios.post('https://api.line.me/v2/bot/message/push', \{\
      to: process.env.LINE_OA_ID,\
      messages: [\{ type: 'text', text: message \}]\
    \}, \{\
      headers: \{\
        'Content-Type': 'application/json',\
        'Authorization': Bearer $\{process.env.LINE_CHANNEL_ACCESS_TOKEN\}\
      \}\
    \});\
\
    res.send('\uc0\u9989  \u3626 \u3656 \u3591 \u3586 \u3656 \u3634 \u3623 \u3652 \u3611 \u3618 \u3633 \u3591  LINE OA \u3648 \u3619 \u3637 \u3618 \u3610 \u3619 \u3657 \u3629 \u3618 \u3649 \u3621 \u3657 \u3623 ');\
  \} catch (err) \{\
    console.error('\uc0\u10060  LINE API error:', err.response?.data || err.message);\
    res.status(500).send('\uc0\u3648 \u3585 \u3636 \u3604 \u3586 \u3657 \u3629 \u3612 \u3636 \u3604 \u3614 \u3621 \u3634 \u3604 \u3651 \u3609 \u3585 \u3634 \u3619 \u3626 \u3656 \u3591 \u3586 \u3656 \u3634 \u3623 \u3652 \u3611  LINE');\
  \}\
\});\
\
// \uc0\u3648 \u3619 \u3636 \u3656 \u3617 \u3648 \u3595 \u3636 \u3619 \u3660 \u3615 \u3648 \u3623 \u3629 \u3619 \u3660 \
const PORT = process.env.PORT || 3000;\
app.listen(PORT, () => \{\
  console.log(`\uc0\u55357 \u56960  Server is running on port $\{PORT\}`);\
\});}