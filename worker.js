
const TELEGRAM_BOT_TOKEN = BOT_TOKEN;
const TELEGRAM_CHAT_ID = CHAT_ID;
const HELIUS_API_KEY=API_KEY;
const HELIUS_RPC_URL = `https://mainnet.helius-rpc.com/?api-key=${HELIUS_API_KEY}`;

addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})

async function handleRequest(request) {
  if (request.method === 'POST') {
    const requestBody = await request.json();
    console.log('Received POST request with body:', requestBody);

    // Extract transaction description, timestamp, signature, and mint address
      const NFTdescription = requestBody[0].description;
      const NFTtimestamp = new Date(requestBody[0].timestamp * 1000).toLocaleString(); // Convert Unix timestamp to readable date-time
      const NFTsignature = `https://solscan.io/tx/${requestBody[0].signature}`
      const NFTmintAddress = requestBody[0].events.nft.nfts[0].mint;
      const NFTimageUrl = await getAssetImageUrl(NFTmintAddress);// Get NFT image URL
      // Construct the message
      const messageToSendNFT = 
      `----NEW UPDATE---\n`+
      `Description:\n${NFTdescription}\n` +
      `Mint Address:\n${NFTmintAddress}\n` +
      `Signature:\n${NFTsignature}\n` +
      `Timestamp:\n${NFTtimestamp}`;
      await sendToTelegramNFT(messageToSendNFT, NFTimageUrl); // Send to Telegram


    return new Response('Logged POST request body.', {status: 200});
  } else {
    return new Response('Method not allowed.', {status: 405});
  }
}

// This function is used to send NFT Updates to the bot
async function sendToTelegramNFT(message, imageUrl) {
  const telegramUrl = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendPhoto`;
  const response = await fetch(telegramUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      chat_id: TELEGRAM_CHAT_ID,
      photo: imageUrl,
      caption: message,
      parse_mode: "HTML"
    }),
  });
  const responseData = await response.json();

  if (!response.ok) {
    console.error('Failed to send photo to Telegram:', responseData);
  }
}



//This function is used to send Transfer Updates to the Bot
async function sendToTelegramTransfer(message) {
  const telegramUrl = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;
  const response = await fetch(telegramUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      chat_id: TELEGRAM_CHAT_ID,
      text: message, 
      parse_mode: "HTML"
    }),
  });
  const responseData = await response.json();

  if (!response.ok) {
    console.error('Failed to send message to Telegram:', responseData);
  }
}


//This function gets images associated to NFTs that are features in updates.
async function getAssetImageUrl(mintAddress) {
  const response = await fetch(HELIUS_RPC_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      jsonrpc: '2.0',
      id: 'my-id',
      method: 'getAsset',
      params: {
        id: mintAddress,
      },
    }),
  });
  const { result } = await response.json();
  return result.content.links.image;
}
