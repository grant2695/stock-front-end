import logo from './logo.svg';
import './App.css';
import {useState,useEffect} from 'react'


function App() {

  const [searchSymbol, setSearchSymbol] = useState('');
  const [stockName, setStockName] = useState();
  const [stockPrice, setStockPrice] = useState();

  const [buyValue, setBuyValue] = useState('');
  const API_HOST = 'http://localhost:3001/api'
  const INVENTORY_API_URL = `${API_HOST}/portfolio`;
  const [data, setData] = useState([]);



  const updateSearchSymbol = async (ev) => {
    setSearchSymbol(ev.currentTarget.value)
  };

  const searchStock = async () => {
    console.log('This is where we make an API call to the backend to fetch the price and other information about the stock')
    console.log('Once the information comes back from the backend API, display it on the UI')
    console.log('the user typed in this symbol', searchSymbol)
    let res = await fetch(`http://localhost:3001/api/search/${searchSymbol}`)
    // let res = await fetch(`https://calm-meadow-20175.herokuapp.com/api/search/${searchSymbol}`)
    res = await res.json()
    setStockName(searchSymbol)
    setStockPrice(res)
    setSearchSymbol('')
    console.log('res returned back from the backend API is', res)
  };

  const buyStock = async () => {
    let res = await fetch('http://localhost:3001/api/portfolio', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: JSON.stringify({buyValue, stockName, stockPrice})

    })

  };

  const fetchInventory = () => {

    fetch(`${INVENTORY_API_URL}`)
        .then(res => res.json())
        .then(json => setData(json));
  }
  useEffect(() => {
    fetchInventory();
  }, []);


  return (
      <div>


        <div className={'grid grid-cols-12'}>

          <div className={'col-span-12 bg-gray-200 h-16 p-3  border-black mb-10'}>
            <h1 className={'text-4xl font-semibold text-center'}>Stock Trader</h1>
          </div>

          <div className={'col-span-6  p-3 border-r-4'}>

            <div className={'gap-10'}>
              <input type="search"
                     className={'w-1/2 border p-1 border-gray-400 rounded-full'}
                     value={searchSymbol}
                     onChange={updateSearchSymbol}
                     placeholder={'Search...'}/>

              <button onClick={searchStock} className={' m-3 px-4 py-1 bg-blue-600 text-white font-semibold text-md rounded '}>Search</button>
            </div>


            {stockName && <div className={' mt-8 ml-2 gap-24 justify-start'}>
              <h1 className={'text-3xl'}>{stockName}</h1>
              <h2 className={'text-sm'}>${stockPrice}</h2>

              <input type="text"  value={buyValue} onChange={(event) => setBuyValue(event.currentTarget.value)} className={'w-1/2 p-2 border p-1 border-gray-400 rounded-full'}/>


              <button onClick={buyStock} className={' m-3 px-4 py-1 bg-blue-600 text-white font-semibold text-md rounded'}>Buy</button>

            </div>}



          </div>

          <div className={'col-span-5 justify-end '}>
           <table>
             <thead >
             <tr>
               <th>Stock</th>
               <th>Quantity</th>
               <th>Price</th>
             </tr>
             </thead>

             {
               data.map((item) => (
                   <tr key={item.id}>
                     <td>{item.symbol}</td>
                     <td>{item.quantity}</td>
                     <td>{item.price}</td>

                   </tr>
               ))
             }
           </table>

          </div>

        </div>


      </div>
  );
}

export default App;
