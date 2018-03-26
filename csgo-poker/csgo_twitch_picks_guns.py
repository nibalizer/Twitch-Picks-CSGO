import sys
import telnetlib
from time import sleep
import yaml
import requests
import random

config = yaml.safe_load(open('config.yaml'))
available_weapons = config['available_weapons']
HOST = config['host']
PORT = config['port']
welcome = "CSGO Remote Console Online"
endl = "\n"


# Runs commands on the csgo console
# Sleeps after for rate limiting but does not block
def run(command):
    print "running: ", command
    tn.write("echo Remote Command: " + command + endl)
    tn.write(command + endl)
    sleep(1.0)


def choose_weapon():
    r = requests.get(url='http://twitch-chat:3000/words')
    weapons = r.json()
    if len(weapons) == 0:
        return "buy " + random.choice(available_weapons)
    words = []
    # shamelessly stolen from:
    # https://www.saltycrane.com/blog/2007/09/how-to-sort-python-dictionary-by-keys/
    for key, value in sorted(weapons.iteritems(), key=lambda (k,v): (v,k)):
        print "%s: %s" % (key, value)
        words.append(key)

    result = "{0}".format(words[-1])
    return result

def reinitialize():
    r = requests.delete(url='http://twitch-chat:3000/reinitialize')
    if r.status == 200:
        print "Votes reinitialized"
    else:
        print "Failed to reinitialize votes"


# Initialize csgo telnet connection
tn = telnetlib.Telnet(HOST, PORT)
tn.write("echo " + welcome + endl)
tn.read_until("Online")
print("Successfully Connected")

# Loop, waiting for signal that round has restarted
# Example: 0:  Reinitialized 4 predictable entities
# Note: only seems to happen when I die, not when I live
while True:
    tn.read_until("Reinitialized ")
    print "Round start"
    sleep(1.0)
    weapon = choose_weapon()
    run("buy " + weapon)
    reinitialize()
