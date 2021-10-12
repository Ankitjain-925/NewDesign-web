export const commonHeader = (user_token) => {
    let Header = {
        headers: {
            token: user_token,
            Accept: "application/json",
            "Content-Type": "application/json",
            // authorization: 
        }
    }
    return Header
}

export const commonNoTokentHeader = () => {
    let Header = {
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            // authorization:
            // authorization: "Aimedis23"
        }
    }
    return Header
}

export const commonCometHeader = () => {
    let Header = {
        headers: {
            'appId': process.env.REACT_APP_APPID,
            'apiKey': process.env.REACT_APP_APIKEY,
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    }
    return Header
}

export const commonCometDelHeader = () => {
    let Header = { 
    'appId': process.env.REACT_APP_APPID,
    'apiKey': process.env.REACT_APP_APIDELKEY, 
    'Content-Type': 'application/json'
  }
  return Header
}