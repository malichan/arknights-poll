'use strict';

const request = require('sync-request');
const sharp = require('sharp');
const fs = require('fs');

const imageType = {
  character: '%E5%A4%B4%E5%83%8F',
  skill: '%E6%8A%80%E8%83%BD',
  equipment: '%E6%A8%A1%E7%BB%84'
};
function downloadImageFromPrtsWiki(imageType, name, id) {
  const imagePath = `static/images/${id}.png`;
  if (!fs.existsSync(imagePath)) {
    const prtsWikiUrl = "https://prts.wiki";
    const html = request('GET', `${prtsWikiUrl}/w/%E6%96%87%E4%BB%B6:${imageType}_${encodeURIComponent(name)}.png`).getBody('UTF-8');
    const relativeUrl = html.match(/<a href="(\/images\/.+?\.png)"/)[1];
    const image = request('GET', prtsWikiUrl + relativeUrl).getBody();
    sharp(image).resize(100, 100, {
      fit: 'contain',
      background: {r: 0, g: 0, b: 0, alpha: 0}
    }).toFile(imagePath);
  }
  return `images/${id}.png`;
}

const tableUrl = "https://raw.githubusercontent.com/Kengxxiao/ArknightsGameData/master/zh_CN/gamedata/excel";
const characters = JSON.parse(request('GET', `${tableUrl}/character_table.json`).getBody());
const skills = JSON.parse(request('GET', `${tableUrl}/skill_table.json`).getBody());
const equipments = JSON.parse(request('GET', `${tableUrl}/uniequip_table.json`).getBody());
let result = [];
for (const characterId in characters) {
  const rawCharacter = characters[characterId];
  if (!characterId.startsWith('char_') || rawCharacter.rarity != 5) {
    continue;
  }

  let character = {};
  character.id = characterId;

  const characterName = rawCharacter.name;
  character.name = characterName;
  character.profession = rawCharacter.profession;
  character.image = downloadImageFromPrtsWiki(imageType.character, characterName, character.id);

  character.skills = [];
  for (const [index, rawSkill] of rawCharacter.skills.entries()) {
    let skill = {};
    const skillId = rawSkill.skillId;
    skill.id = `${characterId}_skill_${index + 1}`;

    const skillName = skills[skillId].levels[0].name;
    skill.name = skillName;
    skill.image = downloadImageFromPrtsWiki(imageType.skill, skillName, skill.id);

    character.skills.push(skill);
  }

  character.equipments = [];
  const rawEquipments = Object.values(equipments.equipDict)
    .filter(rawEquipment => rawEquipment.charId === characterId && rawEquipment.charEquipOrder !== 0)
    .sort((rawEquipment1, rawEquipment2) => rawEquipment1.charEquipOrder - rawEquipment2.charEquipOrder);
  for (const rawEquipment of rawEquipments) {
    let equipment = {};
    equipment.id = `${characterId}_equipment_${rawEquipment.charEquipOrder}`;

    const equipmentName = rawEquipment.uniEquipName;
    equipment.name = equipmentName;
    equipment.image = downloadImageFromPrtsWiki(imageType.equipment, equipmentName, equipment.id);

    character.equipments.push(equipment);
  }

  result.push(character);
  console.log(`Successfully processed ${characterId}`);
}

function getCharacterIndex(id) {
  return parseInt(id.match(/_(\d+)_/)[1]);
}

result.sort((character1, character2) => getCharacterIndex(character1.id) - getCharacterIndex(character2.id));
fs.writeFileSync("webapp/data/base.json", JSON.stringify(result));
