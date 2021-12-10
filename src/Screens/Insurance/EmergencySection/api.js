import axios from "axios";
import sitedata from "sitedata";
import { commonHeader } from "component/CommonHeader/index"

  //To get open Emergency Acccess
  export const getTrack = (current) => {
    var user_id = current.state.gettrackdatas.patient_id;
    var user_token = current.props.stateLoginValueAim.token;
    current.setState({ loaderImage: true });
    if (user_id === "") {
      current.setState({ error_msg: true, error_msg1: false, loaderImage: false });
    } else if (!current.state.terms_condition) {
      current.setState({ error_msg1: true, error_msg: false, loaderImage: false });
    } else {
      axios
        .post(
          sitedata.data.path + "/UserProfile/GetUserInfo/" + user_id,
          {
            current_info: {
              profile_id: current.props.stateLoginValueAim.user.profile_id,
              first_name: current.props.stateLoginValueAim.user.first_name,
              last_name: current.props.stateLoginValueAim.user.last_name,
              email: current.props.stateLoginValueAim.user.email,
              alies_id: current.props.stateLoginValueAim.user.alies_id,
            },
            lan: current.props.stateLanguageType,
          },
          commonHeader(user_token)
        )
        .then((response) => {
          if (response.data.hassuccessed === true) {
            current.setState({
              loaderImage: false,
              error_msg: false,
              error_msg1: false,
              terms_condition: false,
            });
            current.props.EmergencySet(response.data.user_id);
            current.handleClosePara();
          } else {
            current.setState({
              error_msg: true,
              error_msg1: false,
              loaderImage: false,
            });
          }
        });
    }
  };
