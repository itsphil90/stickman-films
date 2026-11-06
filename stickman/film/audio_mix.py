import json, os, sys
sys.path.insert(0, os.environ["STICKMAN_SCRIPTS"])
from audio_kit import Mix

info = json.load(open("film.json"))
m = Mix(info["dur"], seed=42)

m.room_bed([(0, 0.8), (info["dur"], 0.8)])
m.rain_bed([(0, 0.4), (info["dur"], 0.4)])
m.music(mood="tense", gain=0.3)

for t in info["plants"].get("stranger", []):
    m.step(t, surface="wood", g=0.2)

for e in info["events"]:
    t, k = e["t"], e["k"]
    if k == 'door': m.door_open(t)
    elif k == 'doorstop': m.door_stop(t)

m.write("audio.wav")
