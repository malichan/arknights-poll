const headerTemplate = `
<nav class="navbar bg-dark sticky-top">
  <div class="container-fluid justify-content-center" style="max-width:1000px">
    <form class="row w-100" onsubmit="handleSubmit(event)">
      <div class="col-12 col-sm-6">
        <input class="form-control" type="text" placeholder="用户名(8-20位字母/数字)" pattern="[A-Za-z0-9]{8,20}" required id="userId">
      </div>
      <div class="col-12 col-sm-6">
        <div class="btn-group w-100">
          <button class="btn btn-danger data-access-button" type="submit" id="load">读取</button>
          <button class="btn btn-success data-access-button" type="submit" id="save">保存</button>
          <a href="result.html" target="_blank" class="btn btn-warning">调查结果</a>
          <a href="recommendation.html" target="_blank" class="btn btn-info">养成推荐</a>
        </div>
      </div>
    </form>
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
          <div class="col-6 col-sm-4 col-md-3 align-items-stretch d-flex">
            <div class="card w-100">
              <div class="card-body">
                <div class="row">
                  <div class="col-12 col-xl-6">
                    <img src="%CHARACTER_IMAGE%" class="img-thumbnail" alt="%CHARACTER_NAME%">
                  </div>
                  <div class="col-12 col-xl-6">
                    <h5 class="card-title">%CHARACTER_NAME%</h5>
                    <div class="form-check">
                      <input class="form-check-input" type="radio" name="%CHARACTER_ID%" value="0" id="%CHARACTER_ID%_0" data-bs-toggle="collapse" data-bs-target=".%CHARACTER_ID%.show">
                      <label class="form-check-label" for="%CHARACTER_ID%_0">
                        未持有
                      </label>
                    </div>
                    <div class="form-check">
                      <input class="form-check-input" type="radio" name="%CHARACTER_ID%" value="1" id="%CHARACTER_ID%_1" data-bs-toggle="collapse" data-bs-target=".%CHARACTER_ID%.show">
                      <label class="form-check-label" for="%CHARACTER_ID%_1">
                        未精英
                      </label>
                    </div>
                    <div class="form-check">
                      <input class="form-check-input" type="radio" name="%CHARACTER_ID%" value="2" id="%CHARACTER_ID%_2" data-bs-toggle="collapse" data-bs-target=".%CHARACTER_ID%.show">
                      <label class="form-check-label" for="%CHARACTER_ID%_2">
                        精英一
                      </label>
                    </div>
                    <div class="form-check">
                      <input class="form-check-input" type="radio" name="%CHARACTER_ID%" value="3" id="%CHARACTER_ID%_3" data-bs-toggle="collapse" data-bs-target=".%CHARACTER_ID%:not(.show)">
                      <label class="form-check-label" for="%CHARACTER_ID%_3">
                        精英二
                      </label>
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
<div class="col-6 col-sm-4 col-md-3 align-items-stretch d-flex">
  <div class="card w-100 collapse %CHARACTER_ID%">
    <div class="card-body">
      <div class="row">
        <div class="col-12 col-xl-6">
          <img src="%SKILL_OR_EQUIPMENT_IMAGE%" class="img-thumbnail" alt="%SKILL_OR_EQUIPMENT_NAME%">
        </div>
        <div class="col-12 col-xl-6">
          <h5 class="card-title">%SKILL_OR_EQUIPMENT_NAME%</h5>
          <div class="form-check">
            <input class="form-check-input default-checked" type="radio" name="%SKILL_OR_EQUIPMENT_ID%" value="0" id="%SKILL_OR_EQUIPMENT_ID%_0" checked>
            <label class="form-check-label" for="%SKILL_OR_EQUIPMENT_ID%_0">
              %SELECTION_0%
            </label>
          </div>
          <div class="form-check">
            <input class="form-check-input" type="radio" name="%SKILL_OR_EQUIPMENT_ID%" value="1" id="%SKILL_OR_EQUIPMENT_ID%_1">
            <label class="form-check-label" for="%SKILL_OR_EQUIPMENT_ID%_1">
              %SELECTION_1%
            </label>
          </div>
          <div class="form-check">
            <input class="form-check-input" type="radio" name="%SKILL_OR_EQUIPMENT_ID%" value="2" id="%SKILL_OR_EQUIPMENT_ID%_2">
            <label class="form-check-label" for="%SKILL_OR_EQUIPMENT_ID%_2">
              %SELECTION_2%
            </label>
          </div>
          <div class="form-check">
            <input class="form-check-input" type="radio" name="%SKILL_OR_EQUIPMENT_ID%" value="3" id="%SKILL_OR_EQUIPMENT_ID%_3">
            <label class="form-check-label" for="%SKILL_OR_EQUIPMENT_ID%_3">
              %SELECTION_3%
            </label>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
`;
const errorCodes = {
  400: "非法请求",
  404: "用户不存在",
  500: "服务器错误"
};

function materializeTemplate(template, replacements) {
  return $(template.replace(/%\w+%/g, (placeholder) => replacements[placeholder]));
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
    showModal("读取成功！", message);
  }
  event.preventDefault();
  const userId = $('#userId').val();
  $('.data-access-button').prop('disabled', true);
  if (event.submitter.id === "load") {
    $.ajax({
      type: 'GET',
      url: `users/${userId}`,
      dataType: 'json'
    }).done((response) => {
      $("input:radio:not(.default-checked)").prop('checked', false);
      $(".collapse").removeClass('show');
      const selections = response.selections;
      for (const name in selections) {
        $(`#${name}_${selections[name]}`).prop('checked', true).trigger('click');
      }
      localStorage.setItem('userId', userId);
      showModalForLoadSuccess(selections);
    }).fail((response) => {
      showModal("读取失败！", `<b>错误信息:</b><br>${errorCodes[response.status] || "未知错误"}`);
    }).always(() => {
      $('.data-access-button').prop('disabled', false);
    });
  } else {
    const request = {};
    for (const entry of $("input:radio:visible").serializeArray()) {
      request[entry.name] = parseInt(entry.value);
    }
    $.ajax({
      type: 'PUT',
      url: `users/${userId}`,
      contentType: "application/json",
      data: JSON.stringify(request)
    }).done((response) => {
      localStorage.setItem('userId', userId);
      showModal("保存成功！", "<b>非常感谢您提供数据！</b>");
    }).fail((response) => {
      showModal("保存失败！", `<b>错误信息:</b><br>${errorCodes[response.status] || "未知错误"}`);
    }).always(() => {
      $('.data-access-button').prop('disabled', false);
    });
  }
}

$(() => {
  $.get("data/base.json", (characters) => {
    window.characters = characters;
    materializeTemplate(headerTemplate, {}).prependTo('body');
    materializeTemplate(professionsTemplate, {}).appendTo('main');
    for (const character of characters) {
      const characterEntry = materializeTemplate(perCharacterTemplate, {
        '%CHARACTER_ID%': character.id,
        '%CHARACTER_NAME%': character.name,
        '%CHARACTER_IMAGE%': character.image
      });
      for (const skill of (character.skills || [])) {
        const skillEntry = materializeTemplate(perSkillOrEquipmentTemplate, {
          '%CHARACTER_ID%': character.id,
          '%SKILL_OR_EQUIPMENT_ID%': skill.id,
          '%SKILL_OR_EQUIPMENT_NAME%': skill.name,
          '%SKILL_OR_EQUIPMENT_IMAGE%': skill.image,
          '%SELECTION_0%': '未专精',
          '%SELECTION_1%': '专精一',
          '%SELECTION_2%': '专精二',
          '%SELECTION_3%': '专精三'
        });
        characterEntry.find('.character-main').append(skillEntry);
      }
      for (const equipment of (character.equipments || [])) {
        const equipmentEntry = materializeTemplate(perSkillOrEquipmentTemplate, {
          '%CHARACTER_ID%': character.id,
          '%SKILL_OR_EQUIPMENT_ID%': equipment.id,
          '%SKILL_OR_EQUIPMENT_NAME%': `${equipment.name} (${equipment.id.endsWith('1') ? 'X' : 'Y'})`,
          '%SKILL_OR_EQUIPMENT_IMAGE%': equipment.image,
          '%SELECTION_0%': '未解锁',
          '%SELECTION_1%': '等级一',
          '%SELECTION_2%': '等级二',
          '%SELECTION_3%': '等级三'
        });
        characterEntry.find('.character-main').append(equipmentEntry);
      }
      characterEntry.appendTo(`#${character.profession}`);
    }
    $("a[href^='#']").click((event) => {
      event.preventDefault();
      $("html, body").animate({
        scrollTop: $(event.currentTarget.hash).offset().top - $('nav').outerHeight()
      }, 'slow');
    });
    const userId = localStorage.getItem('userId');
    if (userId !== null) {
      $('#userId').val(userId);
      $('#load').trigger('click');
    }
    $('#spinner').hide();
  });
});
