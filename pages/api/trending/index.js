export default async function getdata(req,res){

    try {
        let response = await fetch('https://graphql.icy.tools/graphql',{
      method : 'POST',
      headers : {
        "access-control-allow-credentials": true,
	      'Access-Control-Allow-Origin':'https://newnight.vercel.app',
        "x-api-key" : "7c11c4510bb54b4db9e70800b44ed02d",
          "Content-Type" : "application/json"
      },
      mode : 'cors',
      body : JSON.stringify({
        query : 
        `query TrendingCollections {
          contracts(orderBy: SALES, orderDirection: DESC) {
            edges {
              node {
                address
                ... on ERC721Contract {
                  name
                  stats {
                    totalSales
                    average
                    ceiling
                    floor
                    volume
                  }
                  symbol
                }
              }
            }
          }
        }`
      })
  })

  
    let data = await response.json()

     res.status(201).json(data)
    }catch(error){
        console.log(error)
        return res.status(error.status || 500).end(error.message)
    }

}