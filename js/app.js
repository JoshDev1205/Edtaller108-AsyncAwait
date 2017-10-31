const privateKey = '1ea6f7959eee407c124d2f0990e6c80bd2345f91',
      publicKey = '2aa9a44bdbf051146e655de41eace354',
      content = document.querySelector('main'),
      ts = Date.now(),
      hash = md5(ts+privateKey+publicKey),
      URL = `http://gateway.marvel.com/v1/public/characters?ts=${ts}&apikey=${publicKey}&hash=${hash}`


  const getConnection = async () => {
  const response = await fetch(URL)
  const json = await response.json()
  if (response.status !== 200) {
    throw Error('Datos Erroneos para la Peticion')
  } else {
    json.data.results.forEach(e => {
      drawHero(e)
     })
  }
}

const drawHero = e => {
  const hero = `
  <div class="hero ed-item l-1-3">
    <h3>${e.name}</h3>
    <div class="hero-img">
      <img class="thumbnail" src="${e.thumbnail.path}/portrait_uncanny.${e.thumbnail.extension}">
      <p class="description">${e.description}</p>
    </div>
  </div>
  `
  content.insertAdjacentHTML('beforeEnd', hero)

}

try {
  getConnection()
} catch (error) {
  console.log(`El error es: ${error}`)
}
