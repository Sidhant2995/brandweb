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
        url: 'https://viatrissfidemea.my.salesforce.com/services/oauth2/token?grant_type=password&client_id=3MVG9lsAlIP.W_V9otvIK.bMmeat46zqSHqFoJpgYGnmAlLyDz8JRJhghRA3q3yTa2yll_JqfdYyKXNyM1YJ8&client_secret=09AC17BDB0BBA2B4626DE5D8C830EF2E9B78CC37D03DC2CFEB313EE4B52952AA&username=sidhant.jain2@cognizant.com.viatrisprod&password=Prod@20210yIvSNvWSph4ciI4Qct3jZOs'
        });
         
        var accesstoken = 'Authorization Bearer '+response.data.access_token
        if(response.data.access_token != null)
        {
            let response1 = await axios({ 
                method: 'POST',
                url: 'https://viatrissfidemea.my.salesforce.com/services/apexrest/myl_RestApiController/v1',
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
