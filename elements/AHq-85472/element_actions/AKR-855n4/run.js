function(instance, properties, context) {

const sdk = new ThirdwebSDK.ThirdwebSDK(ethers.getDefaultProvider(properties.default_provider));

const run = async () => {

  const contract = sdk.getEdition(properties.nft_contract_address)
  
  const tokenId = properties.token_id;

  try {

    const tx = await contract.get(tokenId)
    console.log (tx);
    const txString = JSON.stringify(tx);
    instance.publishState('1155_nft_metadata', txString);
    instance.triggerEvent('1155_nft_metadata_available');
  
  } catch (error) {
    console.log(error);
    const errorcode = JSON.stringify(error.reason);
    instance.publishState('1155_metadata_fetch_error', error);
    instance.triggerEvent('1155_metadata_fetch_error');
  }

}

run()
    
}