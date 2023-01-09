import { NFT_MINTING_CONTRACT_ADDRESS } from "../../constants";
export default async function handler(req, res) {
    try{
        const walletAddress=req.body
        const geturl = "https://testnets-api.opensea.io/api/v1/assets?owner="+walletAddress+"&asset_contract_address="+NFT_MINTING_CONTRACT_ADDRESS+"&order_direction=desc&offset=0&limit=20&include_orders=false"     
        fetch(geturl).then((nfts)=>nfts.json()).then((nfts)=>{
            if(nfts){
                res.status(200).send(nfts)
            }
        })
    }catch(err){
        res.status(400).send(err)
    }
}


