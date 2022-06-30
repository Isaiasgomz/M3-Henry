var http = require('http');
var fs   = require('fs');

var beatles=[{
  name: "John Lennon",
  birthdate: "09/10/1940",
  profilePic:"https://blogs.correiobraziliense.com.br/trilhasonora/wp-content/uploads/sites/39/2020/10/CBNFOT081020100047-550x549.jpg"
},
{
  name: "Paul McCartney",
  birthdate: "18/06/1942",
  profilePic:"http://gazettereview.com/wp-content/uploads/2016/06/paul-mccartney.jpg"
},
{
  name: "George Harrison",
  birthdate: "25/02/1946",
  profilePic:"https://canaldosbeatles.files.wordpress.com/2012/02/george-george-harrison-8321345-438-600.jpg"
},
{
  name: "Richard Starkey",
  birthdate: "07/08/1940",
  profilePic:"http://cp91279.biography.com/BIO_Bio-Shorts_0_Ringo-Starr_SF_HD_768x432-16x9.jpg"
}
]

http.createServer((req, res) =>{
  if(req.url === '/api'){
    res.writeHead(200, {'Content-type':'application/json'})
    res.end(JSON.stringify(beatles))
  }



  if(req.url.substring(0,5) === '/api/' && req.url.length > 5){

    let beatle = req.url.split('/').pop()
    let foundBeatle = beatles.find(b => beatle === encodeURI(b.name))

    if(foundBeatle){
      res.writeHead(200,{'Content-type':'application/json'})
      res.end(JSON.stringify(foundBeatle))
    }else{
      res.writeHead(200,{'Consten-type':'text-plain'})
      res.end('Lo sentimos el Beatle no se encontro')
    }

  }

  if(req.url === '/'){
    res.writeHead(200,{'Content-type':'text/html'})
    let file = fs.readFileSync(`${__dirname}/index.html`) 
    res.end(file)
  }

  let beatle = req.url.split('/').pop()
  let search = beatles.find((b) => beatle  === encodeURI(b.name))
  if(search){
    res.writeHead(200,{'Content-type':'text/html'})
    let file = fs.readFileSync(`${__dirname}/beatle.html`,'utf-8')
    file = file.replace(/{names}/g, search.name)
    file = file.replace('{profilePic}',search.profilePic)
    file = file.replace('{birthdate}', search.birthdate)
    res.end(file)

  }else{
    res.writeHead(404,{'Content-type':'text/plain'})
    res.end('Lo sentimos no se encontro el beatle')
  }
  
  

}).listen(3000, '127.0.0.1')