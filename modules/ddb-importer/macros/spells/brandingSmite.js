try {
  if (!["mwak", "rwak"].includes(args[0].item.system.actionType)) return {};
  if (args[0].hitTargetUuids.length === 0) return {}; // did not hit anyone
  for (let tokenUuid of args[0].hitTargetUuids) {
    const target = await fromUuid(tokenUuid);
    const targetActor = target.actor;
    if (!targetActor) continue;
    // remove the invisible condition
    const effect = targetActor?.effects.find((ef) => ef.label === game.i18n.localize("midi-qol.invisible"));
    if (effect)
      await MidiQOL.socket().executeAsGM("removeEffects", { actorUuid: targetActor.uuid, effects: [effect.id] });
    // create the dim light effect on the target
    let bsEffect = new ActiveEffect({
      label: "Branding Smite",
      icon: "icons/magic/fire/dagger-rune-enchant-flame-strong-purple.webp",
      changes: [
        {
          value: 5,
          mode: CONST.ACTIVE_EFFECT_MODES.UPGRADE,
          priority: 20,
          key: "ATL.dimLight",
        },
      ],
      duration: { seconds: 60 },
    });
    // 60 seconds is wrong - should look for the branding smite effect and use the remaining duration - but hey

    await MidiQOL.socket().executeAsGM("createEffects", {
      actorUuid: targetActor.uuid,
      effects: [bsEffect.toObject()],
    });
  }
  Hooks.once("midi-qol.RollComplete", (workflow) => {
    console.log("Deleting concentration");
    const effect = MidiQOL.getConcentrationEffect(actor);
    if (effect) effect.delete();
    return true;
  });
  const spellLevel = actor.flags["midi-qol"].brandingSmite.level;
  return { damageRoll: `${spellLevel}d6[radiant]`, flavor: "Branding Smite" };
} catch (err) {
  console.error(`${args[0].itemData.name} - Branding Smite`, err);
}
