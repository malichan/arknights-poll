const headerTemplate = `
<nav class="navbar bg-dark sticky-top">
  <div class="container-fluid justify-content-center" style="max-width:1000px">
    <div class="row w-100">
      <div class="col text-light text-center">
        最后更新：%LAST_UPDATED%
      </div>
    </div>
    <div class="row w-100 mt-2">
      <div class="col-3 col-md gx-2 text-center">
        <a href="#PIONEER">
          <img class="w-100" style="max-width:80px;filter:invert(1);-webkit-filter:invert(1)" src="images/pioneer.png" alt="先锋">
        </a>
      </div>
      <div class="col-3 col-md gx-2 text-center">
        <a href="#WARRIOR">
          <img class="w-100" style="max-width:80px;filter:invert(1);-webkit-filter:invert(1)" src="images/warrior.png" alt="近卫">
        </a>
      </div>
      <div class="col-3 col-md gx-2 text-center">
        <a href="#TANK">
          <img class="w-100" style="max-width:80px;filter:invert(1);-webkit-filter:invert(1)" src="images/tank.png" alt="重装">
        </a>
      </div>
      <div class="col-3 col-md gx-2 text-center">
        <a href="#SNIPER">
          <img class="w-100" style="max-width:80px;filter:invert(1);-webkit-filter:invert(1)" src="images/sniper.png" alt="狙击">
        </a>
      </div>
      <div class="col-3 col-md gx-2 text-center">
        <a href="#CASTER">
          <img class="w-100" style="max-width:80px;filter:invert(1);-webkit-filter:invert(1)" src="images/caster.png" alt="术师">
        </a>
      </div>
      <div class="col-3 col-md gx-2 text-center">
        <a href="#MEDIC">
          <img class="w-100" style="max-width:80px;filter:invert(1);-webkit-filter:invert(1)" src="images/medic.png" alt="医疗">
        </a>
      </div>
      <div class="col-3 col-md gx-2 text-center">
        <a href="#SUPPORT">
          <img class="w-100" style="max-width:80px;filter:invert(1);-webkit-filter:invert(1)" src="images/support.png" alt="辅助">
        </a>
      </div>
      <div class="col-3 col-md gx-2 text-center">
        <a href="#SPECIAL">
          <img class="w-100" style="max-width:80px;filter:invert(1);-webkit-filter:invert(1)" src="images/special.png" alt="特种">
        </a>
      </div>
    </div>
  </div>
</nav>
`;
const professionsTemplate = `
<div id="PIONEER"></div>
<div id="WARRIOR"></div>
<div id="TANK"></div>
<div id="SNIPER"></div>
<div id="CASTER"></div>
<div id="MEDIC"></div>
<div id="SUPPORT"></div>
<div id="SPECIAL"></div>
`;
const perCharacterTemplate = `
<div class="row mt-4 mb-4">
  <div class="col">
    <div class="card">
      <div class="card-header">
        %CHARACTER_NAME%
      </div>
      <div class="card-body">
        <div class="row character-main">
          <div class="col-12 col-lg-6 align-items-stretch d-flex">
            <div class="card w-100">
              <div class="card-body">
                <div class="row">
                  <div class="col-auto">
                    <img src="%CHARACTER_IMAGE%" class="img-thumbnail" alt="%CHARACTER_NAME%">
                  </div>
                  <div class="col">
                    <h5 class="card-title">%CHARACTER_NAME%</h5>
                    <h6 class="card-subtitle mb-2 text-muted">
                      <span style="display:inline-block">样本数: %CHARACTER_TOTAL%</span>
                      <span style="display:inline-block">(持有率: %CHARACTER_PERCENTAGE_OWNING%%)</span>
                    </h6>
                    <div class="progress">
                      <div class="progress-bar bg-primary" style="opacity:0.1;width:%CHARACTER_PERCENTAGE_HP_1%%"></div>
                      <div class="progress-bar bg-primary" style="opacity:0.55;width:%CHARACTER_PERCENTAGE_HP_2%%"></div>
                      <div class="progress-bar bg-primary" style="opacity:1;width:%CHARACTER_PERCENTAGE_HP_3%%"></div>
                    </div>
                    <div class="text-center d-flex" style="font-size:0.7em;overflow:auto">
                      <div class="mx-1" style="min-width:fit-content;width:%CHARACTER_PERCENTAGE_HP_1%%">
                        未精英
                        <br>
                        %CHARACTER_PERCENTAGE_LP_1%%
                      </div>
                      <div class="mx-1" style="min-width:fit-content;width:%CHARACTER_PERCENTAGE_HP_2%%">
                        精英一
                        <br>
                        %CHARACTER_PERCENTAGE_LP_2%%
                      </div>
                      <div class="mx-1" style="min-width:fit-content;width:%CHARACTER_PERCENTAGE_HP_3%%">
                        精英二
                        <br>
                        %CHARACTER_PERCENTAGE_LP_3%%
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
`;
const perSkillOrEquipmentTemplate = `
<div class="col-12 col-lg-6 align-items-stretch d-flex">
  <div class="card w-100">
    <div class="card-body">
      <div class="row">
        <div class="col-auto">
          <img src="%SKILL_OR_EQUIPMENT_IMAGE%" class="img-thumbnail" alt="%SKILL_OR_EQUIPMENT_NAME%">
        </div>
        <div class="col">
          <h5 class="card-title">%SKILL_OR_EQUIPMENT_NAME%</h5>
          <h6 class="card-subtitle mb-2 text-muted">
            <span style="display:inline-block">样本数: %SKILL_OR_EQUIPMENT_TOTAL%</span>
            <span style="display:inline-block">(不含未精英二)</span>
          </h6>
          <div class="progress">
            <div class="progress-bar bg-primary" style="opacity:0.1;width:%SKILL_OR_EQUIPMENT_PERCENTAGE_HP_0%%"></div>
            <div class="progress-bar bg-primary" style="opacity:0.4;width:%SKILL_OR_EQUIPMENT_PERCENTAGE_HP_1%%"></div>
            <div class="progress-bar bg-primary" style="opacity:0.7;width:%SKILL_OR_EQUIPMENT_PERCENTAGE_HP_2%%"></div>
            <div class="progress-bar bg-primary" style="opacity:1;width:%SKILL_OR_EQUIPMENT_PERCENTAGE_HP_3%%"></div>
          </div>
          <div class="text-center d-flex" style="font-size:0.7em;overflow:auto">
            <div class="mx-1" style="min-width:fit-content;width:%SKILL_OR_EQUIPMENT_PERCENTAGE_HP_0%%">
              %SELECTION_0%
              <br>
              %SKILL_OR_EQUIPMENT_PERCENTAGE_LP_0%%
            </div>
            <div class="mx-1" style="min-width:fit-content;width:%SKILL_OR_EQUIPMENT_PERCENTAGE_HP_1%%">
              %SELECTION_1%
              <br>
              %SKILL_OR_EQUIPMENT_PERCENTAGE_LP_1%%
            </div>
            <div class="mx-1" style="min-width:fit-content;width:%SKILL_OR_EQUIPMENT_PERCENTAGE_HP_2%%">
              %SELECTION_2%
              <br>
              %SKILL_OR_EQUIPMENT_PERCENTAGE_LP_2%%
            </div>
            <div class="mx-1" style="min-width:fit-content;width:%SKILL_OR_EQUIPMENT_PERCENTAGE_HP_3%%">
              %SELECTION_3%
              <br>
              %SKILL_OR_EQUIPMENT_PERCENTAGE_LP_3%%
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
`;

function materializeTemplate(template, replacements) {
  return $(template.replace(/%\w+%/g, (placeholder) => replacements[placeholder]));
}

function getTotal(stats, id) {
  if (!stats.stats[id]) {
    return 0;
  }
  return stats.stats[id].total;
}

function getPercentage(stats, id, selection, excludeSelection0 = false) {
  let total = getTotal(stats, id);
  if (total === 0) {
    return 0;
  }
  if (excludeSelection0) {
    total -= stats.stats[id].selections[0];
  }
  const count = stats.stats[id].selections[selection];
  return count / total * 100;
}

$(() => {
  $.get("data/base.json", (characters) => {
    $.get("data/stats.json", (stats) => {
      materializeTemplate(headerTemplate, {
        '%LAST_UPDATED%': new Date(stats.timestamp).toLocaleString()
      }).prependTo('body');
      materializeTemplate(professionsTemplate, {}).appendTo('main');
      for (const character of characters) {
        const characterEntry = materializeTemplate(perCharacterTemplate, {
          '%CHARACTER_NAME%': character.name,
          '%CHARACTER_IMAGE%': character.image,
          '%CHARACTER_TOTAL%': getTotal(stats, character.id),
          '%CHARACTER_PERCENTAGE_OWNING%': 100 - Math.round(getPercentage(stats, character.id, 0)),
          '%CHARACTER_PERCENTAGE_HP_1%': getPercentage(stats, character.id, 1, true),
          '%CHARACTER_PERCENTAGE_LP_1%': Math.round(getPercentage(stats, character.id, 1, true)),
          '%CHARACTER_PERCENTAGE_HP_2%': getPercentage(stats, character.id, 2, true),
          '%CHARACTER_PERCENTAGE_LP_2%': Math.round(getPercentage(stats, character.id, 2, true)),
          '%CHARACTER_PERCENTAGE_HP_3%': getPercentage(stats, character.id, 3, true),
          '%CHARACTER_PERCENTAGE_LP_3%': Math.round(getPercentage(stats, character.id, 3, true))
        });
        for (const skill of (character.skills || [])) {
          const skillEntry = materializeTemplate(perSkillOrEquipmentTemplate, {
            '%SKILL_OR_EQUIPMENT_NAME%': skill.name,
            '%SKILL_OR_EQUIPMENT_IMAGE%': skill.image,
            '%SKILL_OR_EQUIPMENT_TOTAL%': getTotal(stats, skill.id),
            '%SKILL_OR_EQUIPMENT_PERCENTAGE_HP_0%': getPercentage(stats, skill.id, 0),
            '%SKILL_OR_EQUIPMENT_PERCENTAGE_LP_0%': Math.round(getPercentage(stats, skill.id, 0)),
            '%SKILL_OR_EQUIPMENT_PERCENTAGE_HP_1%': getPercentage(stats, skill.id, 1),
            '%SKILL_OR_EQUIPMENT_PERCENTAGE_LP_1%': Math.round(getPercentage(stats, skill.id, 1)),
            '%SKILL_OR_EQUIPMENT_PERCENTAGE_HP_2%': getPercentage(stats, skill.id, 2),
            '%SKILL_OR_EQUIPMENT_PERCENTAGE_LP_2%': Math.round(getPercentage(stats, skill.id, 2)),
            '%SKILL_OR_EQUIPMENT_PERCENTAGE_HP_3%': getPercentage(stats, skill.id, 3),
            '%SKILL_OR_EQUIPMENT_PERCENTAGE_LP_3%': Math.round(getPercentage(stats, skill.id, 3)),
            '%SELECTION_0%': '未专精',
            '%SELECTION_1%': '专精一',
            '%SELECTION_2%': '专精二',
            '%SELECTION_3%': '专精三'
          });
          characterEntry.find('.character-main').append(skillEntry);
        }
        for (const equipment of (character.equipments || [])) {

          const skillEntry = materializeTemplate(perSkillOrEquipmentTemplate, {
            '%SKILL_OR_EQUIPMENT_NAME%': `${equipment.name} (${equipment.id.endsWith('1') ? 'X' : 'Y'})`,
            '%SKILL_OR_EQUIPMENT_IMAGE%': equipment.image,
            '%SKILL_OR_EQUIPMENT_TOTAL%': getTotal(stats, equipment.id),
            '%SKILL_OR_EQUIPMENT_PERCENTAGE_HP_0%': getPercentage(stats, equipment.id, 0),
            '%SKILL_OR_EQUIPMENT_PERCENTAGE_LP_0%': Math.round(getPercentage(stats, equipment.id, 0)),
            '%SKILL_OR_EQUIPMENT_PERCENTAGE_HP_1%': getPercentage(stats, equipment.id, 1),
            '%SKILL_OR_EQUIPMENT_PERCENTAGE_LP_1%': Math.round(getPercentage(stats, equipment.id, 1)),
            '%SKILL_OR_EQUIPMENT_PERCENTAGE_HP_2%': getPercentage(stats, equipment.id, 2),
            '%SKILL_OR_EQUIPMENT_PERCENTAGE_LP_2%': Math.round(getPercentage(stats, equipment.id, 2)),
            '%SKILL_OR_EQUIPMENT_PERCENTAGE_HP_3%': getPercentage(stats, equipment.id, 3),
            '%SKILL_OR_EQUIPMENT_PERCENTAGE_LP_3%': Math.round(getPercentage(stats, equipment.id, 3)),
            '%SELECTION_0%': '未解锁',
            '%SELECTION_1%': '等级一',
            '%SELECTION_2%': '等级二',
            '%SELECTION_3%': '等级三'
          });
          characterEntry.find('.character-main').append(skillEntry);
        }
        characterEntry.appendTo(`#${character.profession}`);
      }
      $("a[href^='#']").click((event) => {
        event.preventDefault();
        $("html, body").animate({
          scrollTop: $(event.currentTarget.hash).offset().top - $('nav').outerHeight()
        }, 'slow');
      });
      $('#spinner').hide();
    });
  });
});
