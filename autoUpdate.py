
import http
import json
import os
import urllib.request


def qqbot(msg):
    conn = http.client.HTTPSConnection("mc.mesord.com", 8098)
    payload = json.dumps({
    "token": "ADMIN_TOKEN@FEXLI_2022",
    "msg": "【Action】" + msg,
    "uid": 913468406,
    "toImg": False
    })
    headers = {
    'Content-Type': 'application/json'
    }
    conn.request("POST", "/api/send_msg_auto", payload, headers)
    res = conn.getresponse()
    data = res.read()
    print(data.decode("utf-8"))



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
    qqbot("前端数据stage_table item_table 更新成功 commit hash: " + latestCommitHash)
else:
    print("Already the latest version")




print(latestCommitHash)