async function getNftsFornatted(){
    let nftData = await getNftData()
    let formattedNfts = formatData(nftData)
    return formattedNfts
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
        let stats = getCollectionStats(collectionSlug)
        
        let collectionFloorPrice = stats[0]
        let collectionTotalAssets = stats[1]
        let collectionName = nftObject.assets[i].collection.name
        let name = nftObject.assets[i].name
        let image = nftObject.assets[i].image_original_url

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
    for(let i = 0; i < data.length; i++){
        //format data from every nft object to readable html and return list of html strings
    }
}