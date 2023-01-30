[![Supported Foundry Versions](https://img.shields.io/endpoint?url=https://foundryshields.com/version?url=https://github.com/LeafWulf/weatherfx/releases/latest/download/module.json)](https://foundryvtt.com/packages/weatherfx) [![Forge Installs](https://img.shields.io/badge/dynamic/json?label=Forge%20Installs&query=package.installs&suffix=%25&url=https%3A%2F%2Fforge-vtt.com%2Fapi%2Fbazaar%2Fpackage%2Fweatherfx&colorB=4aa94a)](https://forge-vtt.com/bazaar#sort=updated&package=weatherfx)  
[![Foundry Hub Endorsements](https://img.shields.io/endpoint?logoColor=white&url=https%3A%2F%2Fwww.foundryvtt-hub.com%2Fwp-json%2Fhubapi%2Fv1%2Fpackage%2Fweatherfx%2Fshield%2Fendorsements)](https://www.foundryvtt-hub.com/package/weatherfx/)
[![Foundry Hub Comments](https://img.shields.io/endpoint?logoColor=white&url=https%3A%2F%2Fwww.foundryvtt-hub.com%2Fwp-json%2Fhubapi%2Fv1%2Fpackage%2Fweatherfx%2Fshield%2Fcomments)](https://www.foundryvtt-hub.com/package/weatherfx/)  
[![Latest Downloads](https://img.shields.io/github/downloads/LeafWulf/weatherfx/latest/module.zip?color=blue&label=latest%20downloads)](https://github.com/LeafWulf/weatherfx/releases/latest) [![Total Downloads](https://img.shields.io/github/downloads/LeafWulf/weatherfx/module.zip?color=blue&label=total%20downloads)](https://github.com/LeafWulf/weatherfx/releases)  
[![Discord](https://dcbadge.vercel.app/api/shield/219289132235489280?style=flat)](https://discordapp.com/users/219289132235489280) [![Ko-fi](https://img.shields.io/badge/Ko--fi-winterwulf-0374b5?logo=kofi)](https://ko-fi.com/winterwulf)

# Weather FX
This module automatic generate weather effects on canvas (in the current scene) using [FX Master](https://foundryvtt.com/packages/fxmaster) module API and [Weather Control](https://foundryvtt.com/packages/weather-control) weather generation messages.

Weather FX also provides weather conditions according to the current weather, based on the (now deprecated) Weather Effects 5e module.

## Functions
With the buttons added to the controls on the right side of the screen the GM can either remove or apply Weather FX.

![functions](./readme/functions.png)

***Toggle Weather Control window app***  
Control button to toggle Weather Control window application (also useful to use when the window disappears)

![toggleapp](./readme/toggleapp.png)

***Scene configuration***  
The GM is able to disable Weather FX in any scene. This is useful to prevent to add weather effects in very large scenes that may cause lag.

![sceneconfig](./readme/seceneconfig.png)

## Settings
**Weather Source**  
*Default: Weather Control*  
Now Weather FX also supports SmallWeather, you only have to select it in the module settings and save.  

**Automatic Apply**  
*Default: active*  
Self explainable, you can have Weather FX auto apply on, thus Weather effects will be applied to the current scene as soon as they are generated by Weather Control.

**D&D5e Weather Conditions**  
*Default: disabled*  
Have Weather FX to roll weather conditions to the chat. Currently only available for DnD5e.

**Enable Sound**  
*Default: active*  
Weather FX also play sounds if you have this option on. The defaults sounds come from the modules Ivan Duch's Music Packs and Michael Ghelfi Studios Audio Pack, although you can customize these in the settings bellow.

![settings](readme/new-feature.png)

## Dependencies
1. [FX Master](https://foundryvtt.com/packages/fxmaster)
2. [Weather Control](https://foundryvtt.com/packages/weather-control)

**Optional**
1. [Ivan Duch's Music Packs](https://foundryvtt.com/packages/ivan-duch-music-packs)
2. [Michael Ghelfi Studios Audio Pack](https://foundryvtt.com/packages/michaelghelfi)


## Known Issues
- Make sure to have Weather Control output to chat **ON**

## Feedback
If you have suggestions or want to report a problem, you can create an issue here: [Issues](../../issues)

## Changelog
You can read the changelog here: [CHANGELOG.md](/CHANGELOG.md)

## Special Thanks
`Peterson`, `roi007leaf`, `Zhell`, `MisterHims`, `Freeze` and `honeybadger`

## Donations
The module is totally free and will remain this way.  
I am unemployed, though. So every little help counts.

[![ko-fi](https://ko-fi.com/img/githubbutton_sm.svg)](https://ko-fi.com/winterwulf)

## Attributions
The Oxygen Team, KDE;, LGPL <https://www.gnu.org/copyleft/lgpl.html>, via Wikimedia Commons