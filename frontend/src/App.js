import './App.css';
import { Typography, Stack, Chip, TextField, Card } from '@mui/material';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import logo from "./logotest.png"
import axios from 'axios';
import { useEffect, useState } from 'react';

function App() {

  const [tempStockList, setTempStockList] = useState([]);
  const [searchStock, setSearchStock] = useState("");
  const [stockInfo, setStockInfo] = useState({"test1":"hello", "test2": "hi"});
  // const apiUrl = "";

  useEffect(() => {
    const items = JSON.parse(localStorage.getItem('stockList'));
    if (items) {
      setTempStockList(items);
    }
  }, [])

  const handleSubmit = () => {
    var temp = [...tempStockList];
    temp.push(searchStock);
    setTempStockList(temp);
    localStorage.setItem('stockList', JSON.stringify(temp));

    // axios.get(apiUrl)
    //   .then((response) => {
    //     if(response.data)
    //     setStockInfo(response.data);
    //   })
    //   .catch((error) => {
    //     // Handle any errors here
    //     console.error('Error fetching data:', error);
    //   });
  }

  const handleDelete = (item) => {
    var temp = tempStockList.filter(x => x !== item);
    console.log(temp);
    setTempStockList(temp);
    localStorage.setItem('stockList', JSON.stringify(temp));
  }

  const handleClick = () => {
    console.info('You clicked the Chip.');
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} alt="Logo" width="400" />
        <p>
          Watch Your Stock Around The Clock
        </p>
        <Paper
          component="form"
          sx={{ p: '2px 20px', display: 'flex', alignItems: 'center', width: 600, height: 60  }}
        >
          <TextField
            sx={{ ml: 1, flex: 1 }}
            placeholder="Search Stocks"
            value={searchStock}
            variant="standard"
            onChange={(e) => setSearchStock(e.target.value)}
            InputProps={{
              disableUnderline: true,
              style: { fontSize: '25px' }}}
          />
          <IconButton type="button" sx={{ p: '10px' }}  aria-label="search" onClick={handleSubmit}>
            <SearchIcon fontSize = "large"/>
          </IconButton>
        </Paper>
        <Stack direction="row" spacing={1} margin="15px">
          {
            tempStockList.map((x) => {
              return (
                <Chip
                key={x}
                  label={x} color="primary"
                  onClick={handleClick}
                  onDelete={(e) => handleDelete(x)}
                />
              )
            })
          }
        </Stack>
        <Typography sx={{ mt: 3 }} align='center' color='black' variant="h6">The text below will display the API response in json format.</Typography>
        <Card>
          {
            JSON.stringify(stockInfo)
          }
        </Card>
      </header>
    </div>
  );
}

export default App;
