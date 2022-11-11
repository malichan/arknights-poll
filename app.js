'use strict';

const base = require('./webapp/data/base.json');
const characterIds = new Set(base.map(character => character.id));
const characterIdToSkillOrEquipmentIds = new Map(base.map(character => 
  [character.id, (character.skills || []).concat(character.equipments || []).map(skillOrEquipment => skillOrEquipment.id)]
));
const allIds = Array.from(characterIds.values()).concat(Array.from(characterIdToSkillOrEquipmentIds.values()).flat());
const userDataMaxStalenessMs = 3 * 30 * 24 * 60 * 60 * 1000; // 3 months

function isUserIdValid(userId) {
  return /^[A-Za-z0-9]{8,20}$/.test(userId);
}
function isPutPayloadValid(payload) {
  if (payload === null || typeof payload !== 'object') {
    return false;
  }
  for (const id in payload) {
    const selection = payload[id];
    if (!Number.isInteger(selection) || selection < 0 || selection > 3) {
      return false;
    }
    const matcher = id.match(/^(.+)_(?:skill|equipment)_\d+$/);
    if (matcher) {
      const characterId = matcher[1];
      if (!characterIds.has(characterId) || !characterIdToSkillOrEquipmentIds.get(characterId).includes(id) || payload[characterId] != 3) {
        return false;
      }
    } else {
      if (!characterIds.has(id)) {
        return false;
      }
      if (selection === 3) {
        for (const skillOrEquipmentId of characterIdToSkillOrEquipmentIds.get(id)) {
          if (!(skillOrEquipmentId in payload)) {
            payload[skillOrEquipmentId] = 0;
          }
        }
      }
    }
  }
  return true;
}
function getEmptyStats() {
  const stats = {};
  for (const id of allIds) {
    stats[id] = {
      total: 0,
      selections: [0, 0, 0, 0]
    };
  }
  return stats;
}

const express = require('express');
const app = express();
const {Datastore} = require('@google-cloud/datastore');
const datastore = new Datastore();
let dirty = true;

app.use(express.json());
app.use(express.static('static', {
  immutable: true,
  lastModified: false,
  maxAge: '1y'
}));
app.use(express.static('webapp', {
  lastModified: false,
  maxAge: '1h'
}));

app.get("/users/:userId", async (req, res) => {
  try {
    if (!isUserIdValid(req.params.userId)) {
      res.status(400).end();
      return;
    }
    const [data] = await datastore.get(datastore.key(['users', req.params.userId]));
    if (data === undefined) {
      res.status(404).end();
      return;
    }
    res.status(200).json(data);
  } catch (e) {
    console.error(e);
    res.status(500).end();
  }
});
app.put("/users/:userId", async (req, res) => {
  try {
    if (!isUserIdValid(req.params.userId) || !isPutPayloadValid(req.body)) {
      res.status(400).end();
      return;
    }
    await datastore.save({
      key: datastore.key(['users', req.params.userId]),
      data: {
          timestamp: Date.now(),
          selections: req.body
      }
    });
    dirty = true;
    res.status(200).end();
  } catch (e) {
    console.error(e);
    res.status(500).end();
  }
});

app.get("/data/stats.json", async (req, res) => {
  try {
    let [data] = await datastore.get(datastore.key(['stats', 'latest']));
    if (data === undefined) {
      data = {
        timestamp: 0,
        stats: getEmptyStats()
      }
    }
    res.status(200).set('Cache-Control', "public, max-age=600").json(data);
  } catch (e) {
    console.error(e);
    res.status(500).end();
  }
});

app.post("/internal/update_stats", async (req, res) => {
  try {
    const now = Date.now();
    const stats = getEmptyStats();
    if (dirty || req.query.force) {
      dirty = false;
      const [users] = await datastore.runQuery(datastore.createQuery('users'));
      for (const user of users) {
        if (now - user.timestamp > userDataMaxStalenessMs) {
          continue;
        }
        for (const id in user.selections) {
          stats[id].total += 1;
          stats[id].selections[user.selections[id]] += 1;
        }
      }
    } else {
      const [data] = await datastore.get(datastore.key(['stats', 'latest']));
      if (data !== undefined) {
        for (const id in data.stats) {
          stats[id] = data.stats[id];
        }
      }
    }
    await datastore.save({
      key: datastore.key(['stats', 'latest']),
      data: {
        timestamp: now,
        stats: stats
      }
    });
    res.status(200).end();
  } catch (e) {
    console.error(e);
    res.status(500).end();
  }
});
app.post("/internal/export_data", async (req, res) => {
  try {
    if (!req.query.bucket) {
      res.status(400).end();
      return;
    }
    const bucket = req.query.bucket;
    await datastore.export({
      bucket,
      kinds: ['users'],
      namespaces: ['']
    });
    res.status(200).end();
  } catch (e) {
    console.error(e);
    res.status(500).end();
  }
});

const port = parseInt(process.env.PORT) || 8080;

app.listen(port, () => {
  console.log(`Start listening on port ${port}`);
});

module.exports = app;
