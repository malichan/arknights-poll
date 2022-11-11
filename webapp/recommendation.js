const headerTemplate = `
<nav class="navbar bg-dark sticky-top">
  <div class="container-fluid justify-content-center" style="max-width:1000px">
    <form class="row w-100" onsubmit="handleSubmit(event)">
      <div class="col-12 col-sm-6">
        <input class="form-control" type="text" placeholder="用户名(8-20位字母/数字)" pattern="[A-Za-z0-9]{8,20}" required id="userId">
      </div>
      <div class="col-12 col-sm-6">
        <div class="btn-group w-100">
          <button class="btn btn-primary data-access-button" type="submit" id="load">加载个性化推荐</button>
        </div>
      </div>
    </form>
    <div class="row w-100 mt-2">
      <div class="col text-light text-center">
        最后更新：%LAST_UPDATED%
      </div>
    </div>
  </div>
</nav>
`;
const recommendationsTemplate = `
<div class="row mt-4 mb-4" id="recommendations-row">
  <div class="col">
    <div class="card">
      <div class="card-header">
        个性化推荐
      </div>
      <div class="card-body">
        <div class="row" id="recommendations">
        </div>
      </div>
    </div>
  </div>
</div>
`;
const overviewTemplate = `
<div class="col-12 col-lg-6 align-items-stretch d-flex">
  <div class="card w-100">
    <div class="card-body">
      <h5 class="card-title">数据总览</h5>
      <h6 class="card-subtitle text-muted mt-2">您的总体练度情况如下...</h6>
      <table class="table align-middle">
        <thead>
          <tr>
            <th>项目</th>
            <th style="width:5em">数值</th>
          </tr>
        </thead>
        <tbody>
        </tbody>
      </table>
    </div>
  </div>
</div>
`;
const perOverviewEntryTemplate = `
<tr>
  <th>
    <h5>%NAME%</h5>
  </th>
  <td>%VALUE%</td>
</tr>
`;
const perRecommendationTemplate = `
<div class="col-12 col-lg-6 align-items-stretch d-flex">
  <div class="card w-100">
    <div class="card-body">
      <h5 class="card-title">%NAME%</h5>
      <h6 class="card-subtitle text-muted mt-2">%DESCRIPTION%</h6>
      <table class="table align-middle">
        <thead>
          <tr>
            <th style="width:2em">#</th>
            <th colspan="2">%TYPE%</th>
            <th style="width:5em">百分比</th>
          </tr>
        </thead>
        <tbody>
        </tbody>
      </table>
    </div>
  </div>
</div>
`;
const rankingsTemplate = `
<div class="row mt-4 mb-4">
  <div class="col">
    <div class="card">
      <div class="card-header">
        各种排行榜
      </div>
      <div class="card-body">
        <div class="row" id="rankings">
        </div>
      </div>
    </div>
  </div>
</div>
`;
const perRankingTemplate = `
<div class="col-12 col-lg-6 align-items-stretch d-flex">
  <div class="card w-100">
    <div class="card-body">
      <h5 class="card-title">%NAME%</h5>
      <table class="table align-middle">
        <thead>
          <tr>
            <th style="width:2em">#</th>
            <th colspan="2">%TYPE%</th>
            <th style="width:5em">百分比</th>
          </tr>
        </thead>
        <tbody>
        </tbody>
      </table>
    </div>
  </div>
</div>
`;
const perEntityEntryTemplate = `
<tr>
  <th>%INDEX%</th>
  <td style="width:80px"><img src="%IMAGE%" class="img-thumbnail" alt="%NAME%"></td>
  <td>
    <h5>%NAME%</h5>
    <span>%CHARACTER_NAME%</span>
  </td>
  <td>%PERCENTAGE%</td>
</tr>
`;
const errorCodes = {
  400: "非法请求",
  404: "用户不存在",
  500: "服务器错误"
};
const characterStats = [];
const skillStats = [];
const equipmentStats = [];

function materializeTemplate(template, replacements) {
  return $(template.replace(/%\w+%/g, (placeholder) => replacements[placeholder]));
}

function prepareStats(characters, stats) {
  function getPercentage(stats, id, selection, excludeSelection0 = false) {
    if (!stats.stats[id] || stats.stats[id].total === 0) {
      return 0;
    }
    let total = stats.stats[id].total;
    if (excludeSelection0) {
      total -= stats.stats[id].selections[0];
    }
    const count = stats.stats[id].selections[selection];
    return count / total * 100;
  }
  for (const character of characters) {
    characterStats.push({
      id: character.id,
      name: character.name,
      image: character.image,
      percentages: [
        getPercentage(stats, character.id, 0),
        getPercentage(stats, character.id, 1, true),
        getPercentage(stats, character.id, 2, true),
        getPercentage(stats, character.id, 3, true)
      ]
    });
    for (const skill of (character.skills || [])) {
      skillStats.push({
        characterName: character.name,
        id: skill.id,
        name: skill.name,
        image: skill.image,
        percentages: [
          getPercentage(stats, skill.id, 0),
          getPercentage(stats, skill.id, 1),
          getPercentage(stats, skill.id, 2),
          getPercentage(stats, skill.id, 3)
        ]
      });
    }
    for (const equipment of (character.equipments || [])) {
      equipmentStats.push({
        characterName: character.name,
        id: equipment.id,
        name: `${equipment.name} (${equipment.id.endsWith('1') ? 'X' : 'Y'})`,
        image: equipment.image,
        percentages: [
          getPercentage(stats, equipment.id, 0),
          getPercentage(stats, equipment.id, 1),
          getPercentage(stats, equipment.id, 2),
          getPercentage(stats, equipment.id, 3)
        ]
      });
    }
  }
}

function generateOverview(selections) {
  function generateOverviewEntry(overview, name, value) {
    materializeTemplate(perOverviewEntryTemplate, {
      '%NAME%': name,
      '%VALUE%': value,
    }).appendTo(overview.find('tbody'));
  }
  const stats = {
    character: [0, 0, 0, 0],
    skill: [0, 0, 0, 0],
    equipment: [0, 0, 0, 0]
  };
  for (const id in selections) {
    let type = 'character';
    if (/skill_\d+$/.test(id)) {
      type = 'skill';
    } else if (/equipment_\d+$/.test(id)) {
      type = 'equipment';
    }
    stats[type][selections[id]]++;
  }
  const overview = materializeTemplate(overviewTemplate, {});
  generateOverviewEntry(overview, '未持有干员', stats.character[0]);
  generateOverviewEntry(overview, '已持有干员', stats.character[1] + stats.character[2] + stats.character[3]);
  generateOverviewEntry(overview, '未精英干员', stats.character[1]);
  generateOverviewEntry(overview, '精英一干员', stats.character[2]);
  generateOverviewEntry(overview, '精英二干员', stats.character[3]);
  generateOverviewEntry(overview, '已专精技能', stats.skill[1] + stats.skill[2] + stats.skill[3]);
  generateOverviewEntry(overview, '专精一技能', stats.skill[1]);
  generateOverviewEntry(overview, '专精二技能', stats.skill[2]);
  generateOverviewEntry(overview, '专精三技能', stats.skill[3]);
  generateOverviewEntry(overview, '已解锁模组', stats.equipment[1] + stats.equipment[2] + stats.equipment[3]);
  generateOverviewEntry(overview, '等级一模组', stats.equipment[1]);
  generateOverviewEntry(overview, '等级二模组', stats.equipment[2]);
  generateOverviewEntry(overview, '等级三模组', stats.equipment[3]);
  overview.appendTo('#recommendations');
}

function sortBy(array, keyFunction) {
  return array.sort((a, b) => keyFunction(a) - keyFunction(b));
}

function generateRecommendation(name, description, type, selectionNames, stats, selections, num, excludeSelection0 = false) {
  const recommendation = materializeTemplate(perRecommendationTemplate, {
    '%NAME%': name,
    '%DESCRIPTION%': description,
    '%TYPE%': type
  })
  const sortedEntities = sortBy(stats.filter((entity) =>
    entity.id in selections && selections[entity.id] !== 3 && (selections[entity.id] != 0 || !excludeSelection0)
  ).map((entity) => {
    let sumPercentage = 0;
    for (let selection = 3; selection > selections[entity.id]; --selection) {
      sumPercentage += entity.percentages[selection];
    }
    const entityCopy = {...entity};
    entityCopy.selection = selections[entity.id];
    entityCopy.sumPercentage = sumPercentage;
    return entityCopy;
  }), (entity) => -entity.sumPercentage);
  for (let index = 0; index < Math.min(sortedEntities.length, num); ++index) {
    let percentageHtml = "";
    for (let selection = sortedEntities[index].selection + 1; selection <= 3; ++selection) {
      percentageHtml += `<b>${selectionNames[selection]}:</b><br>${Math.round(sortedEntities[index].percentages[selection])}%<br>`;
    }
    const entry = materializeTemplate(perEntityEntryTemplate, {
      '%INDEX%': index + 1,
      '%IMAGE%': sortedEntities[index].image,
      '%NAME%': sortedEntities[index].name,
      '%CHARACTER_NAME%': sortedEntities[index].characterName || '',
      '%PERCENTAGE%': percentageHtml
    });
    recommendation.find('tbody').append(entry);
  }
  recommendation.appendTo('#recommendations');
}

function generateRanking(name, type, stats, percentageFunction, num) {
  const ranking = materializeTemplate(perRankingTemplate, {
    '%NAME%': name,
    '%TYPE%': type
  })
  const sortedEntities = sortBy([...stats], (entity) => -percentageFunction(entity));
  for (let index = 0; index < Math.min(sortedEntities.length, num); ++index) {
    const entry = materializeTemplate(perEntityEntryTemplate, {
      '%INDEX%': index + 1,
      '%IMAGE%': sortedEntities[index].image,
      '%NAME%': sortedEntities[index].name,
      '%CHARACTER_NAME%': sortedEntities[index].characterName || '',
      '%PERCENTAGE%': `${Math.round(percentageFunction(sortedEntities[index]))}%`
    });
    ranking.find('tbody').append(entry);
  }
  ranking.appendTo('#rankings');
}

function handleSubmit(event) {
  function showModal(titleText, bodyHtml) {
    $('#modalTitle').text(titleText);
    $('#modalBody').html(bodyHtml);
    new bootstrap.Modal('#modal', {}).show();
  }
  function showModalForLoadSuccess(selections) {
    const unfilledCharacterNames = [];
    const additionalEquipmentCharacterNames = [];
    for (const character of window.characters) {
      if (!(character.id in selections)) {
        unfilledCharacterNames.push(character.name);
      } else if (selections[character.id] === 3) {
        for (const equipment of character.equipments) {
          if (!(equipment.id in selections)) {
            additionalEquipmentCharacterNames.push(character.name);
          }
        }
      }
    }
    let message = "";
    if (unfilledCharacterNames.length > 0) {
      message += `<b>您还尚未为以下干员填写数据:</b><br>${unfilledCharacterNames.slice(0, 5).join('，')}`;
      if (unfilledCharacterNames.length > 5) {
        message += `等${unfilledCharacterNames.length}位`;
      }
      message += '<br>';
    }
    if (additionalEquipmentCharacterNames.length > 0) {
      message += `<b>在您的精英二干员中，以下追加了新的模组 (默认未解锁):</b><br>${additionalEquipmentCharacterNames.slice(0, 5).join('，')}`;
      if (additionalEquipmentCharacterNames.length > 5) {
        message += `等${additionalEquipmentCharacterNames.length}位`;
      }
      message += '<br>';
    }
    if (message.length === 0) {
      message += "<b>您已完成所有数据的填写，非常感谢！</b>";
    }
    showModal("加载成功！", message);
  }
  event.preventDefault();
  const userId = $('#userId').val();
  $('.data-access-button').prop('disabled', true);
  $.ajax({
    type: 'GET',
    url: `users/${userId}`,
    dataType: 'json'
  }).done((response) => {
    $('#recommendations-row').remove();
    materializeTemplate(recommendationsTemplate, {}).prependTo('main');
    const selections = response.selections;
    generateOverview(selections);
    generateRecommendation('干员精英化推荐', "在您的已持有干员中，对于以下干员，X%的用户比您的精英化程度高...", '干员', ['未持有', '未精英', '精英一', '精英二'], characterStats, selections, 10, true);
    generateRecommendation('技能专精化推荐', "在您的精英二干员中，对于以下技能，X%的用户比您的专精化程度高...", '技能', ['未专精', '专精一', '专精二', '专精三'], skillStats, selections, 10);
    generateRecommendation('模组解锁/升级推荐', "在您的精英二干员中，对于以下模组，X%的用户比您的等级高...", '模组', ['未解锁', '等级一', '等级二', '等级三'], equipmentStats, selections, 10);
    localStorage.setItem('userId', userId);
    showModalForLoadSuccess(selections);
  }).fail((response) => {
    showModal("加载失败！", `<b>错误信息:</b><br>${errorCodes[response.status] || "未知错误"}`);
  }).always(() => {
    $('.data-access-button').prop('disabled', false);
  });
}

$(() => {
  $.get("data/base.json", (characters) => {
    $.get("data/stats.json", (stats) => {
      window.characters = characters;
      materializeTemplate(headerTemplate, {
        '%LAST_UPDATED%': new Date(stats.timestamp).toLocaleString()
      }).prependTo('body');
      materializeTemplate(rankingsTemplate, {}).appendTo('main');
      prepareStats(characters, stats);
      generateRanking('干员·已持有', '干员', characterStats, (character) => 100 - character.percentages[0], 30);
      generateRanking('干员·精英二 (不含未持有)', '干员', characterStats, (character) => character.percentages[3], 30);
      generateRanking('技能·已专精 (不含未精英二)', '技能', skillStats, (skill) => 100 - skill.percentages[0], 30);
      generateRanking('技能·专精三 (不含未精英二)', '技能', skillStats, (skill) => skill.percentages[3], 30);
      generateRanking('模组·已解锁 (不含未精英二)', '模组', equipmentStats, (equipment) => 100 - equipment.percentages[0], 30);
      generateRanking('模组·等级三 (不含未精英二)', '模组', equipmentStats, (equipment) => equipment.percentages[3], 30);
      const userId = localStorage.getItem('userId');
      if (userId !== null) {
        $('#userId').val(userId);
        $('#load').trigger('click');
      }
      $('#spinner').hide();
    });
  });
});
