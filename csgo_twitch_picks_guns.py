import sys
import telnetlib
from time import sleep
import yaml

config = yaml.safe_load(open('config.yaml'))
weapons = config['available_weapons']
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


# Initialize csgo telnet connection
tn = telnetlib.Telnet(HOST, PORT)
tn.write("echo " + welcome + endl)
tn.read_until("Online")
print("Successfully Connected")

# Loop, waiting for signal that round has restarted
# Example: 0:  Reinitialized 4 predictable entities
while True:
    tn.read_until("Reinitialized ")
    print "Round start"
    sleep(1.0)
    run("buy ak47")
