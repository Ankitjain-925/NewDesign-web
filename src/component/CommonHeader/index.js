export const commonHeader = (user_token) => {
    let Header = {
        headers: {
            token: user_token,
            Accept: "application/json",
            "Content-Type": "application/json",
        }
    }
    return Header
}