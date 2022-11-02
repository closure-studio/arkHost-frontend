
import json
import os
import urllib.request


# check gameDataHash is exist?
if not os.path.exists("gameDataHash"):
    with open("gameDataHash", "w") as f:
        f.write("")

file = open("gameDataHash", "r")
# read the commit hash
commitHash = file.readline()

# get the latest commit hash from https://api.github.com/repos/Kengxxiao/ArknightsGameData/git/refs/heads/master
r = urllib.request.urlopen('https://api.github.com/repos/Kengxxiao/ArknightsGameData/git/refs/heads/master')
# convert to json
latestCommitHash = json.loads(r.read().decode('utf-8'))["object"]["sha"]

if commitHash != latestCommitHash:
    pass
    # download the latest game data
    # https://raw.githubusercontent.com/Kengxxiao/ArknightsGameData/master/zh_CN/gamedata/excel/stage_table.json
    # https://raw.githubusercontent.com/Kengxxiao/ArknightsGameData/master/zh_CN/gamedata/excel/item_table.json

    r = urllib.request.urlopen("https://raw.githubusercontent.com/Kengxxiao/ArknightsGameData/master/zh_CN/gamedata/excel/stage_table.json")
    # save the stage_table.json
    with open("stage_table.json", "wb") as f:
        f.write(r.read())
    r = urllib.request.urlopen("https://raw.githubusercontent.com/Kengxxiao/ArknightsGameData/master/zh_CN/gamedata/excel/item_table.json")
    with open("item_table.json", "wb") as f:
        f.write(r.read())
    # write the latest commit hash to gameDataHash
    with open("gameDataHash", "w") as f:
        f.write(latestCommitHash)
        
    # run the command 'node exec.js' to update the data
    os.system("node exec.js")
        
        
    # remove the old stage_table.json and item_table.json
    os.remove("stage_table.json")
    os.remove("item_table.json")
        
else:
    print("Already the latest version")




print(latestCommitHash)