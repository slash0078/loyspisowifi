// LOYS Pisowifi Fibernetworks IT Solutions - AI Chat Bot (Bisaya)
// Page: LOYS Pisowifi Fibernetworks IT Solutions
// Contact: 09999690008 | GCash: 09664903825 / 09999690008 SHN J
// Node.js Messenger Webhook - Ready for Render / VPS / Pisowifi Server
// Install: npm install express body-parser axios dotenv

require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');

const app = express();
app.use(bodyParser.json());

const PAGE_ACCESS_TOKEN = process.env.PAGE_ACCESS_TOKEN; // from developers.facebook.com
const VERIFY_TOKEN = process.env.VERIFY_TOKEN || 'loys_verify_2024'; // bisan unsa nga word

const CONTACT = '09999690008';
const GCASH = '09664903825 / 09999690008 (SHN J)';

const PLANS = [
  { name: 'Plan599', speed: '8Mbps', price: 'P599', kw: ['599','8mbps','plan599'], desc: 'Pang FB, YouTube, 2-3 devices' },
  { name: 'Plan699', speed: '15Mbps', price: 'P699', kw: ['699','15mbps','plan699'], desc: 'Pang Online Class, 3-4 devices' },
  { name: 'Plan799', speed: '60Mbps', price: 'P799', kw: ['799','60mbps','plan799'], desc: 'BEST SELLER - Pang Pamilya 6-8 devices' },
  { name: 'Plan999', speed: '80Mbps', price: 'P999', kw: ['999','80mbps','plan999'], desc: 'Pang Gaming, Netflix 4K' },
  { name: 'Plan1299', speed: '120Mbps', price: 'P1299', kw: ['1299','120mbps','plan1299'], desc: 'Pang WFH + Gaming' },
  { name: 'Plan1499', speed: '150Mbps', price: 'P1499', kw: ['1499','150mbps','plan1499'], desc: 'Pang Small Business' },
  { name: 'Plan1999', speed: '200Mbps', price: 'P1999', kw: ['1999','200mbps','plan1999'], desc: 'Pang Heavy Users' },
  { name: 'Plan2499', speed: '300Mbps', price: 'P2499', kw: ['2499','300mbps','plan2499'], desc: 'Pang Pisowifi Business' },
  { name: 'Plan2999', speed: '600Mbps', price: 'P2999', kw: ['2999','600mbps','plan2999'], desc: 'Pang Enterprise' },
  { name: 'Plan3499', speed: '800Mbps', price: 'P3499', kw: ['3499','800mbps','plan3499'], desc: 'Pang Enterprise Pro' },
  { name: 'Plan3999', speed: '1.2Gbps', price: 'P3999', kw: ['3999','1.2gbps','1200mbps','plan3999'], desc: 'ULTRA Pinakakusog' },
];

function getAllPlansReply() {
  return `📡 LOYS Fibernet Plans (Updated):\n\n` +
  PLANS.map(p => `• ${p.name} - ${p.speed} - ${p.price} - ${p.desc}`).join('\n') +
  `\n\nFree install + 24/7 support.\nI-type ang PLAN nga ganahan ka, ex: Plan999\n\nTawag: ${CONTACT}\nGCash: ${GCASH}`;
}

function findPlan(text) {
  const t = text.toLowerCase();
  return PLANS.find(p => p.kw.some(k => t.includes(k)));
}

function getBotReply(text) {
  const lower = text.toLowerCase().trim();

  // Greetings
  if (['hi','hello','kumusta','hey','maayong buntag','maayong hapon','good morning'].some(w => lower.includes(w))) {
    return `Kumusta! 👋 Ako ang AI Support sa LOYS Pisowifi Fibernetworks IT Solutions.\n\nUnsaon tika pagtabang karon?\n\n1️⃣ Fibernet Plans\n2️⃣ Pisowifi Problem\n3️⃣ Wala Internet / LOS Pula\n4️⃣ Payment / GCash\n5️⃣ Magpa-install\n\nI-type lang, pananglitan: "Plan799" o "wala internet"`;
  }

  // Plans list
  if (lower.includes('plan') || lower.includes('pila') || lower.includes('package') || lower.includes('price') || lower.includes('presyo')) {
    const plan = findPlan(lower);
    if (plan) {
      return `Ang ${plan.name} - ${plan.speed} - ${plan.price}/month - ${plan.desc}.\n\nGusto ka magpa-install ani? I-send lang:\n1. Full Name\n2. Exact Barangay/Location\n3. Phone Number\n4. ${plan.name}\n\nI-check namo kung covered ka. Libre survey. Tawag: ${CONTACT}`;
    }
    return getAllPlansReply();
  }

  // Payment / GCash
  if (['bayad','payment','gcash','asa mag bayad','due'].some(w => lower.includes(w))) {
    return `Pwede ka magbayad via GCash maam/sir:\n\n📱 GCash: 09664903825\n📱 GCash: 09999690008\nName: SHN J\n\nI-send ang screenshot sa payment + Full Name + Plan para ma-confirm namo dayon.\n\nSalamat sa LOYS Fibernetworks!\nTawag: ${CONTACT}`;
  }

  // No internet / LOS
  if (['walay internet','wala net','los','pula','blinking','putol','hinay','walay connection'].some(w => lower.includes(w))) {
    return `Pasensya sa inconvenience sir/maam. Palihog buhata ni:\n\n1. I-restart ang ONU/modem - i-unplug 10 seconds tapos ibalik\n2. I-check kung pula ang LOS light - kung pula, putol ang fiber, need tech\n3. I-send: Name + Plan + Location + picture sa modem lights\n\nI-forward namo sa technician karon. Kung dinalian tawag sa ${CONTACT}.`;
  }

  // Pisowifi
  if (['pisowifi','piso wifi','pisonet','dili maka connect','walay piso','dili mo hulog','voucher'].some(w => lower.includes(w))) {
    return `Para sa Pisowifi problem:\n1. I-restart ang vendo - i-unplug 10sec\n2. I-check kung naay internet ang main router\n3. Kung dili gihapon, i-send Vendo Location + picture sa screen/error\n\nIpa-check namo sa tech dayon. Tawag: ${CONTACT}`;
  }

  // Installation
  if (['pa install','pa taod','magpakabit','apply','installation','install'].some(w => lower.includes(w))) {
    return `Gusto ka magpa-install? Yay! 🎉\n\nPalihog i-send:\n1. Full Name:\n2. Exact Location / Barangay:\n3. Phone Number:\n4. Plan nga ganahan (ex: Plan799):\n\nI-check namo kung covered imong area. Libre ang survey.\n\nTawag dayon sa ${CONTACT} para paspas!\nLOYS Pisowifi Fibernetworks IT Solutions`;
  }

  // Human agent
  if (['tawo','tao','agent','staff','kausap','operator'].some(w => lower.includes(w))) {
    return `Gi-connect tika sa among staff sir/maam. Palihog hulata kadali.\n\nPwede sad direct tawag sa ${CONTACT} para mas paspas.\nSalamat!`;
  }

  // Default
  return `Pasensya, wala ko kasabot sa "${text}".\n\nPwede ka mo-pili:\n- I-type "Plans" para sa Fibernet Plans\n- "Wala Internet" kung walay net\n- "GCash" para sa payment\n- "Magpa-install" kung magpakabit ka\n\nO tawag lang sa ${CONTACT} - LOYS Team`;
}

async function sendMessage(psid, text) {
  try {
    await axios.post(`https://graph.facebook.com/v19.0/me/messages?access_token=${PAGE_ACCESS_TOKEN}`, {
      recipient: { id: psid },
      message: { text: text }
    });
  } catch (e) {
    console.error('Send error', e.response?.data || e.message);
  }
}

// Webhook verification - para sa Facebook
app.get('/webhook', (req, res) => {
  if (req.query['hub.verify_token'] === VERIFY_TOKEN) {
    res.send(req.query['hub.challenge']);
  } else {
    res.sendStatus(403);
  }
});

// Receive messages
app.post('/webhook', async (req, res) => {
  const body = req.body;
  if (body.object === 'page') {
    for (const entry of body.entry) {
      const webhook_event = entry.messaging[0];
      if (webhook_event.message && webhook_event.message.text) {
        const psid = webhook_event.sender.id;
        const userText = webhook_event.message.text;
        const reply = getBotReply(userText);
        await sendMessage(psid, reply);
      }
    }
    res.status(200).send('EVENT_RECEIVED');
  } else {
    res.sendStatus(404);
  }
});

app.get('/', (req,res) => {
  res.send(`LOYS Bot Running! Plans: ${PLANS.length} loaded. Contact: ${CONTACT}`);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`LOYS Bisaya Bot running on port ${PORT}`));

/*
.env file sample:
PAGE_ACCESS_TOKEN=EAAxxxxxxxxxxxxxx
VERIFY_TOKEN=loys_verify_2024
PORT=3000

Setup sa Facebook Developers:
1. Create App > Business > Add Messenger product
2. Set Webhook URL: https://your-domain.com/webhook
3. Verify Token: loys_verify_2024
4. Subscribe to: messages
5. Generate Page Access Token for Page: LOYS Pisowifi Fibernetworks IT Solutions
6. Deploy this code sa Render.com (free) o sa imong Pisowifi server
*/