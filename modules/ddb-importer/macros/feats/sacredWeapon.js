const lastArg = args[args.length - 1];
const tokenOrActor = await fromUuid(lastArg.actorUuid);
const targetActor = tokenOrActor.actor ? tokenOrActor.actor : tokenOrActor;
const DAEItem = lastArg.efData.flags.dae.itemData;

function valueLimit(val, min, max) {
  return val < min ? min : val > max ? max : val;
}

/**
 * Select for weapon and apply bonus based on spell level
 */
if (args[0] === "on") {
  const weapons = targetActor.items.filter((i) => i.type === "weapon");
  let weapon_content = "";

  //Filter for weapons
  weapons.forEach((weapon) => {
    weapon_content += `<label class="radio-label">
  <input type="radio" name="weapon" value="${weapon.id}">
  <img src="${weapon.img}" style="border:0px; width: 50px; height:50px;">
  ${weapon.name}
</label>`;
  });

  let content = `
    <style>
    .sacredWeapon .form-group {
        display: flex;
        flex-wrap: wrap;
        width: 100%;
        align-items: flex-start;
      }

      .sacredWeapon .radio-label {
        display: flex;
        flex-direction: column;
        align-items: center;
        text-align: center;
        justify-items: center;
        flex: 1 0 25%;
        line-height: normal;
      }

      .sacredWeapon .radio-label input {
        display: none;
      }

      .sacredWeapon img {
        border: 0px;
        width: 50px;
        height: 50px;
        flex: 0 0 50px;
        cursor: pointer;
      }

      /* CHECKED STYLES */
      .sacredWeapon [type=radio]:checked + img {
        outline: 2px solid #f00;
      }
    </style>
    <form class="sacredWeapon">
      <div class="form-group" id="weapons">
          ${weapon_content}
      </div>
    </form>
`;

  new Dialog({
    content,
    buttons: {
      ok: {
        label: `Ok`,
        callback: (html) => {
          const itemId = $("input[type='radio'][name='weapon']:checked").val();
          const weaponItem = targetActor.items.get(itemId);
          let copyItem = duplicate(weaponItem);
          const bonus = args[1];
          DAE.setFlag(targetActor, "sacredWeapon", {
            bonus: weaponItem.system.attackBonus,
            name: weaponItem.name,
            weapon: itemId,
            mgc: weaponItem.system.properties.mgc,
          });
          if (copyItem.system.attackBonus === "") copyItem.system.attackBonus = "0";
          copyItem.system.attackBonus = `${parseInt(copyItem.system.attackBonus) + bonus}`;
          copyItem.system.properties.mgc = true;
          copyItem.name = `Sacred ${weaponItem.name}`;
          targetActor.updateEmbeddedDocuments("Item", [copyItem]);
        },
      },
      cancel: {
        label: `Cancel`,
      },
    },
  }).render(true);
}

//Revert weapon and unset flag.
if (args[0] === "off") {
  const { bonus, name, weapon, mgc } = DAE.getFlag(targetActor, "sacredWeapon");
  const weaponItem = targetActor.items.get(weapon);
  let copyItem = duplicate(weaponItem);
  copyItem.system.attackBonus = bonus;
  copyItem.system.properties.mgc = mgc;
  copyItem.name = name;
  targetActor.updateEmbeddedDocuments("Item", [copyItem]);
  DAE.unsetFlag(targetActor, "sacredWeapon");
}
