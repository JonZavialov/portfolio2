async function getNftsFormatted(){
    let nftData = await getNftData()
    let formattedNfts = await formatData(nftData)
    let bodyContent = `
    <div id='wallet'>
        <p>Wallet:</p>
        <p id='ethDomain' onclick='copyToClipboard("sonytv.eth"); alert("Address Copied!")'>sonytv.eth</p>
        <p id='ethAddress' onclick='copyToClipboard("0x5df54525f8f34b49622a15a9d65e4e0c9ed6a5c9"); alert("Address Copied!")'>0x5df5...a5c9</p>
    </div>
    `
    for (let i = 0; i < formattedNfts.length; i++){
        bodyContent += formattedNfts[i]
    }
    return bodyContent
}

async function makeGetRequest(url){    
    var xmlHttp = new XMLHttpRequest()
    xmlHttp.open( "GET", url, false ) // false for synchronous request
    xmlHttp.send()
    return JSON.parse(xmlHttp.response)
}

async function getCollectionStats(slug){
    let url = `https://api.opensea.io/api/v1/collection/${slug}/stats`
    let collectionObject = await makeGetRequest(url)
    let floorPrice = collectionObject.stats.floor_price
    let assets = collectionObject.stats.total_supply
    return [floorPrice,assets]
}

async function getNftData(){
    let nftList = []
    let nftObject = await makeGetRequest(`https://api.opensea.io/api/v1/assets?owner=0x5df54525F8F34b49622A15a9D65e4e0C9ED6A5C9&order_direction=desc&offset=0`)
    for(let i = 0; i < nftObject.assets.length; i++){
        let collectionSlug = nftObject.assets[i].collection.slug
        let stats = await getCollectionStats(collectionSlug)
        
        let collectionFloorPrice = stats[0]
        let collectionTotalAssets = stats[1]
        let collectionName = nftObject.assets[i].collection.name
        let name = nftObject.assets[i].name
        let image = nftObject.assets[i].image_url

        nftList.push({
            collection: {
                floorPrice: collectionFloorPrice,
                assets: collectionTotalAssets,
                name: collectionName
            },
            name: name,
            image: image
        })
    }
    return nftList
}

async function formatData(data){
    let nftList = []
    for(let i = 0; i < data.length; i++){
        let margin = "10px"
        if(i == data.length - 1){
            //last nftItem has no bottom margin
            margin = "0px"
        }

        let nft = data[i]
        let nftContent = `
        <div id='nftItem' style='margin-bottom: ${margin}'>
            <img src='${nft.image}' alt='${nft.name} image'/>
            <h3>${nft.name}</h3>
            <h5>${nft.collection.name}</h5>
            <p>${nft.collection.assets} total assets</p>
            <p>${nft.collection.floorPrice} ETH floor price</p>
        </div>
        `
        nftList.push(nftContent)
    }
    return nftList
}