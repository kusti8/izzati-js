import RNFetchBlob from 'react-native-fetch-blob'
import { PermissionsAndroid } from 'react-native'

async function requestPermission() {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
      {
        'title': 'App Permission',
        'message': 'Cool Photo App needs access to your files ' +
                   'to interact with them.'
      }
    )
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      console.log("Permission granted")
    } else {
      console.log("Permission denied")
    }
  } catch (err) {
    console.warn(err)
  }

  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
      {
        'title': 'App Permission',
        'message': 'Cool Photo App needs access to your files ' +
                   'to interact with them.'
      }
    )
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      console.log("Permission granted")
    } else {
      console.log("Permission denied")
    }
  } catch (err) {
    console.warn(err)
  }
}

class Izzati {
    constructor(url) {
        this.url = url;
        requestPermission();
    }

    prefixJpg(base64) {

    }

    post(body, callback) {
        let b = []
        if (body.text === undefined) {
            if (body.file.base64 === undefined) {
                b.push({name: 'file', filename: body.file.filename, data: RNFetchBlob.wrap(body.file.uri)})
            } else {
                b.push({name: 'file', filename: body.file.filename, data: body.file.base64})
            }
        } else if (body.file === undefined) {
            for (let key in body.text) {
                b.push({name: key, data: body.text[key]})
            }
        } else {
            if (body.file.base64 === undefined) {
                b.push({name: 'file', filename: body.file.filename, data: RNFetchBlob.wrap(body.file.uri)})
            } else {
                b.push({name: 'file', filename: body.file.filename, data: body.file.base64})
            }
            for (let key in body.text) {
                b.push({name: key, data: body.text[key]})
            }
        }
        if (body.response.base64 === true) {
            RNFetchBlob.fetch('POST', this.url, {
                'Content-Type' : 'multipart/form-data',
            }, b).then((resp) => {
                if (resp.respInfo.headers['Content-Type'] === 'application/json') {
                    callback({text: resp.json()})
                } else {
                    console.log(resp.base64())
                    callback({base64: resp.base64()})
                }
            }).catch((err) => {
                callback({err: err})
            })
        } else {
            RNFetchBlob.config({fileCache: true, appendExt: 'jpg'}).fetch('POST', this.url, {
                'Content-Type' : 'multipart/form-data',
            }, b).then((resp) => {
                console.log(resp)
                if (resp.respInfo.headers['Content-Type'] === 'application/json') {
                    callback({text: resp.json()})
                } else {
                    console.log(resp.path())
                    callback({path: resp.path()})
                }
            }).catch((err) => {
                callback({err: err})
            })
        }
    }

    send(data, callback) {
        this.post(data, callback)
    }
}

export default Izzati;
