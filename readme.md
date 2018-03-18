Twitch-Picks-CSGO
-----------------


This is an application for csgo streamers. It hooks up twitch chat to the buy menu at the start of every round. This lets twitch spam weapon names into chat and whatever weapon twitch picks will be automatically purchased. Hopefully this helps chat feel more involved and everyone have a good time.


Remote Console
--------------

This works by having a python daemon connect to the csgo binary via telnet. A remote console can be opened up and then connected to via telnet.

https://developer.valvesoftware.com/wiki/Command_Line_Options#Linux_command_options_in_Left_4_Dead_.282.29


```
-netconport 2121
```
