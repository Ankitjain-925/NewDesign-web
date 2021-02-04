import axios from "axios";
import sitedata from "sitedata";
export default class index {
  constructor(user_token, user_id, logOutClick) {
    this.logOutClick = logOutClick;
    axios
      .get(sitedata.data.path + "/UserProfile/existorblock/" + user_id, {
        headers: {
          token: user_token,
          Accept: "application/json",
          "Content-Type": "application/json",
        }, 
      })
      .then((response) => {
        if (response.data.hassuccessed) {
          console.log('I am running')
        } else {
          this.logOutClick();
        }
      }).catch((err)=>{
        this.logOutClick();
      });
  }
}
