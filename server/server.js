const express = require('express');
const admin = require('firebase-admin');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// IMPORT SERVICE ACCOUNT
const serviceAccount = require('./serviceAccountKey.json');

// INIT FIREBASE ADMIN
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

// TEST ROUTE (biar tau server hidup)
app.get('/', (req, res) => {
  res.send('Server jalan !!');
});

// SET ROLE (CUSTOM CLAIM)
app.post('/set-role', async (req, res) => {
  const { uid, role } = req.body;

  console.log("REQ BODY:", req.body);

  if (!uid || !role) {
    return res.status(400).json({ error: "UID atau role kosong" });
  }

  try {
    await admin.auth().setCustomUserClaims(uid, { role });

    console.log(`✅ Role ${role} diset ke UID ${uid}`);

    res.json({
      message: "Role berhasil diset",
      uid,
      role
    });

  } catch (error) {
    console.error("❌ ERROR:", error);
    res.status(500).json({ error: error.message });
  }
});

// JALANKAN SERVER
app.listen(3000, '0.0.0.0', () => {
  console.log("Server jalan di http://192.168.1.8:3000");
});

app.post('/make-admin', async (req, res) => {
  const { uid } = req.body;

  if (!uid) {
    return res.status(400).json({ error: "UID kosong" });
  }

  try {
    await admin.auth().setCustomUserClaims(uid, { role: "admin" });

    console.log(`👑 UID ${uid} dijadikan admin`);

    res.json({
      message: "User sekarang admin",
      uid
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
});

