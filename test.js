import Izzati from './index.js'

const i = new Izzati('http://localhost:5020/')
i.send({text: {hello: 'me'}}).then(out => {
    console.log(out)
}).catch(err => {
    console.log(err)
})
