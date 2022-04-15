// import {useState,useEffect} from "react"
// import 'bootstrap/dist/css/bootstrap.min.css';
// import { request } from 'graphql-request'
// import useSWR from 'swr'

// const App = () =>{


//   let [nft,setNft] = useState([])

  
    
//     const {trendingdata, error} = useSWR(
//       `query TrendingCollections {
//           contracts(orderBy: SALES, orderDirection: DESC) {
//              edges {
//                node {
//             address
//             ... on ERC721Contract {
//               name
//               stats {
//                 totalSales
//                 average
//                 ceiling
//                 floor
//                 volume
//               }
//               symbol
//             }
//           }
//         }
//       }
//     }`,
//     url => fetchWithToken('https://graphql.icy.tools/graphql','7c11c4510bb54b4db9e70800b44ed02d')
//   )

//   console.log("trending collection : ",trendingdata)

//   const loadTrending = async() =>{

//     let response = await fetch('https://graphql.icy.tools/graphql',{
//       method : 'POST',
//       headers : {
//         'Access-Control-Allow-Origin':'*',
//         "x-api-key" : "7c11c4510bb54b4db9e70800b44ed02d",
//           "Content-Type" : "application/json"
//       },
//       body : JSON.stringify({
//         query : 
//         `query TrendingCollections {
//           contracts(orderBy: SALES, orderDirection: DESC) {
//             edges {
//               node {
//                 address
//                 ... on ERC721Contract {
//                   name
//                   stats {
//                     totalSales
//                     average
//                     ceiling
//                     floor
//                     volume
//                   }
//                   symbol
//                 }
//               }
//             }
//           }
//         }`
//       })
//   })

//     let data = await response.json()
//     setNft(data.data.contracts.edges)
//     console.log("the data is : ",data)
//   }
//     useEffect(() =>{
//       loadTrending()
//     },[])
//     console.log("nft : ",nft)
//     // return(
//     //   <p>Trending Page</p>
//     // )
//   return(
    
//   <div className="container">
//   <div className="row text-center">
//     {
//       nft.map(curr =>{
//         return(
//           <div className="card" style={{width: "22rem"}} key = {`${curr.node.name}`}>
// 		          {/* <img className="card-img-top" src="..." alt="Card image cap"/> */}
// 		          <div className="card-body">
// 		          <h5 className="card-title">{curr.node.name}</h5>
//               <p className="card-title">{curr.node.symbol}</p>
// 		          <p className="card-text"></p>
// 		      </div>
// 	      </div>
//         )
//       })
//     }
//     </div>
//     </div>
//   )
// }

// App.getInitialProps = async() =>{

//     let response = await fetch('https://graphql.icy.tools/graphql',{
//         method : 'POST',
//         headers : {
//           "x-api-key" : "7c11c4510bb54b4db9e70800b44ed02d",
//             "Content-Type" : "application/json"
//         },
//         body : JSON.stringify({
//           query : 
//           `query TrendingCollections {
//             contracts(orderBy: SALES, orderDirection: DESC) {
//               edges {
//                 node {
//                   address
//                   ... on ERC721Contract {
//                     name
//                     stats {
//                       totalSales
//                       average
//                       ceiling
//                       floor
//                       volume
//                     }
//                     symbol
//                   }
//                 }
//               }
//             }
//           }`
//         })
//     })

//     const {data} = await response.json()
//     console.log(data)
//     return {data : data}
// }
// export default App;
import {useState,useEffect} from "react"
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () =>{


  let [nft,setNft] = useState([])


  useEffect(() =>{
    fetch('../api/trending/')
    .then(res => res.json())
    .then(data => setNft(data.data.contracts.edges)    )
  },[])

  const loadTrending = async() =>{

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
    setNft(data.data.contracts.edges)
    console.log("the data is : ",data)
  }

    // useEffect(() =>{
    //   loadTrending()
    // },[])
    console.log("nft : ",nft)
    // return(
    //   <p>Trending Page</p>
    // )
  return(
    
  <div className="container">
  <div className="row text-center">
    {
      nft.map(curr =>{
        return(
          <div className="card" style={{width: "22rem"}} key = {`${curr.node.name}`}>
		          {/* <img className="card-img-top" src="..." alt="Card image cap"/> */}
		          <div className="card-body">
		          <h5 className="card-title">{curr.node.name}</h5>
              <p className="card-title">{curr.node.symbol}</p>
		          <p className="card-text"></p>
		      </div>
	      </div>
        )
      })
    }
    </div>
    </div>
  )
}
export default App;
