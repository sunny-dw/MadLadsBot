const fs = require("fs")
const WEB_HOOK_ID = ""
const {HEL_API_KEY} = require("./constants.js")

const url = `https://api.helius.xyz/v0/webhooks/${WEB_HOOK_ID}?api-key=${HEL_API_KEY}`

const editWebhook = async () => {
  try {
    // Read the JSON file
    const addresses = JSON.parse(fs.readFileSync('addresses.json', 'utf8'));

    const response = await fetch(
      url,
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          webhookURL: "https://mad.lokeshsw2.workers.dev",
          transactionTypes: ["NFT_LISTING","NFT_SALE"],
          accountAddresses: addresses,  // Use the addresses from the file
          webhookType: "enhanced"
        }),
      }
    );
    const data = await response.json();
    console.log({ data });
  } catch (e) {
    console.error("error", e);
  }
};

editWebhook()
