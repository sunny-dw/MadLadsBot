
# MadLads NFT Collection Bot

## Overview 

This bot monitors and notifies about listings of NFTs from the MadLads collection. It uses Cloudflare as the backend and Helius as the RPC provider.

## Bot Link
@madladssalesalerts

## Setup
- Clone the repository
- Set up a Cloudflare Worker
- Configure environment variables:
    - TELEGRAM_BOT_TOKEN
    - TELEGRAM_CHANNEL_ID
    - HELIUS_API_KEY

- Setup web hook on hellius
- Deploy the worker to Cloudflare

## Usage

Once deployed, the bot will automatically start monitoring for new MadLads NFT listings and post notifications to the specified Telegram channel.


