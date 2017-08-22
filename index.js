import RNFetchBlob from 'react-native-fetch-blob'
import { PermissionsAndroid, Platform } from 'react-native'

async function requestPermission() {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
      {
        'title': 'App Permission',
        'message': 'This app needs access to your files ' +
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
        'message': 'This app needs access to your files ' +
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
        return 'data:image/jpeg;base64,' + base64
    }

    prefixPath(path) {
        return Platform.OS === 'android' ? 'file://' + path  : '' + path
    }

    send(body) {
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
        if ('response' in body) {
            if ('base64' in body.response) {

            } else {
                body.response.base64 = true
            }
        } else {
            body.response = {base64: true}
        }
        if (body.response.base64 === true) {

            return new Promise( (resolve, reject) => {
                RNFetchBlob.fetch('POST', this.url, {
                    'Content-Type' : 'multipart/form-data',
                }, b).then((resp) => {
                    if (resp.respInfo.headers['Content-Type'] === 'application/json') {
                        resolve({text: resp.json()})
                    } else {
                        resolve({base64: resp.base64()})
                    }
                }).catch((err) => {
                    reject({err: err})
                })
            })
        } else {
            return new Promise( (resolve, reject) => {
                RNFetchBlob.config({fileCache: true}).fetch('POST', this.url, {
                    'Content-Type' : 'multipart/form-data',
                }, b).then((resp) => {
                    if (resp.respInfo.headers['Content-Type'] === 'application/json') {
                        resolve({text: resp.json()})
                    } else {
                        resolve({path: resp.path()})
                    }
                }).catch((err) => {
                    reject({err: err})
                })
            })
        }
    }
}

export default Izzati;
