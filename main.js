const express = require('express')
const app = express()
//const port = 5000
const port = process.env.PORT || 3000;
let axios = require('axios');
const bodyParser = require('body-parser');

// serve files from the public directory
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', async (req, res) => {//http://127.0.0.1:5000
    console.log('GET Started')
    res.sendFile(__dirname + '/public/index.html');
})
app.post('/result',async (req, res) =>{
    try{ 
        console.log('Request Captured-->',req.body);
        
        let response = await axios({
        method: 'POST',
        url: 'https://cs189.salesforce.com/services/oauth2/token?grant_type=password&client_id=3MVG904d7VkkD2aPQ30sHABE6QfRVEHUCclbUz9miMAdnaidBTE3qR0Gk80ORpwblXCSRt7TAuRDEV8eGGdOd&client_secret=357C2C8AF3F49994A3425BA9B6BF0815B86E42EA2CE7BFFEA0BF8F702434ACE3&username=sujan.guha@viatris.com&password=Welcome@14znGnjH3ItOghxZeKN5x5EQ1'
        });
         
        var accesstoken = 'Authorization Bearer '+response.data.access_token
        if(response.data.access_token != null)
        {
            let response1 = await axios({ 
                method: 'POST',
                url: 'https://cs189.salesforce.com/services/apexrest/myl_RestApiController/v1',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': accesstoken,
                },
                data: JSON.stringify(req.body)
                //data:'[{"attributes": {"type": "Contact"},"LastName": "restcon1","Phone": "1111111111","FirstName": "first1","Email":"first1@restcon1.com"},{"attributes": {"type": "Contact"},"LastName": "restcon2","Phone": "2222222222","FirstName": "first2","Email":"first2@restcon2.com"},{"attributes": {"type": "Contact"},"LastName": "restcon3","Phone": "3333333333","FirstName": "first3","Email":"first3@restcon3.com"}]',
            });
        }
  }
  catch(exception){
     console.log(exception)
  }
})
/*app.get('/cognizant', (req, res) => {//http://127.0.0.1:5000/cognizant
    res.send('Hello Nandish!')
    res.sendFile(__dirname + '/public/index.html');
  })*/
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
// basic node.js app
//basic javascript syntax
//127.0.0.1 - default hosted locally{127.0.0.1:3000}
