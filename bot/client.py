#!/usr/bin/python
# -*- coding: utf-8 -*-
"""
client.py
Discord Client

https://discord.com/api/oauth2/authorize?client_id=946811996710506546&permissions=335544320&scope=bot
"""
import os
import re
import discord
from discord.ext import commands, tasks
from dotenv import load_dotenv

# load envvars
load_dotenv()
DISCORD_TOKEN = os.getenv("DISCORD_TOKEN")
DISCORD_GUILD = os.getenv("DISCORD_GUILD")

# init bot
help_command = commands.DefaultHelpCommand(no_category="Commands")
bot = commands.Bot(
    command_prefix='-',
    description="https://github.com/stypr/nanahira-fanbox-bot",
    help_command=help_command)

@tasks.loop(hours=24)
async def check_for_update():
    """
    """
    # send messages to fanbox
    fanbox_channel = discord.utils.get(
        bot.get_all_channels(),
        name="fanbox"
    )

@bot.event
async def on_ready():
    """
    Logged in check
    """
    print("Logged in!")

if __name__ == "__main__":
    print("Logging in..")
    bot.run(DISCORD_TOKEN)

"""
db
    hash
        id, date, hash, last_title, last_exerpt
    user
        id, discord_username, confirm_date, check_date, check_hash
    log
        id, discord_username, check_hash, result
"""