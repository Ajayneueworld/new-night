export default async(req,res) => {

    const {method,
        query : {address}
    } = req
    console.log("The query is : ",address)
            try{
                let response = await fetch('https://graphql.icy.tools/graphql',{

                    method : 'POST',
                    headers : {
                      'Access-Control-Allow-Origin':'*',
                      "x-api-key" : "7c11c4510bb54b4db9e70800b44ed02d",
                        "Content-Type" : "application/json"
                    },

                    mode : 'cors',
                    body : JSON.stringify({
                      query : 
                      `query MEVTokens {
                        wallet(address: "${address}") {
                          tokens {
                            edges {
                              node {
                                tokenId
                                contract {
                                  ... on ERC721Contract {
                                    symbol
                                    name
                                  }
                                }
                              }
                            }
                          }
                        }
                      }
                      `
                    })
                })

                    let data = await response.json()
                     res.status(201).json(data)
            }
            catch(error){
                console.log(error)
                return res.status(error.status || 500).end(error.message)
            }
}