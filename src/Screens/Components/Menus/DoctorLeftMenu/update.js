import sitedata from 'sitedata';
import axios from 'axios';
import { commonHeader } from 'component/CommonHeader/index';

export const handleChange = (current, e) => {
  const state = current.state.CheckCurrent;
  state[e.target.name] = e.target.value == 'true' ? true : false;
  //   localStorage.setItem('CheckCurrent', JSON.stringify(state));
  current.setState({ CheckCurrent: state });
  availableUpdate();
};

export const availableUpdate = (current) => {
  current.setState({ loaderImage: true });
  //   var data = JSON.parse(localStorage.getItem('CheckCurrent'));
  var data = current.state.CheckCurrent;
  console.log('normal', data);
  const user_token = current.props.stateLoginValueAim.token;
  axios
    .put(
      sitedata.data.path + '/UserProfile/Users/update',
      {
        data,
      },
      commonHeader(user_token)
    )
    .then((responce) => {
      current.getavailableUpdate();
      current.setState({ loaderImage: false });
    })
    .catch((error) => {
      current.setState({ loaderImage: false });
    });
};
