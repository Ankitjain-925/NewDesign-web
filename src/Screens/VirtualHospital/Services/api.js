import axios from "axios";
import sitedata from "sitedata";
import { commonHeader } from "component/CommonHeader/index";
import { getLanguage } from "translations/index";
import _ from 'lodash';

export const getSpecialty = (current) => {
  current.setState({ loaderImage: true });
  axios
    .get(
      sitedata.data.path + "/vh/AddSpecialty/" + current.props?.House?.value,
      commonHeader(current.props.stateLoginValueAim.token)
    )
    .then((responce) => {
      if (responce.data.hassuccessed && responce.data.data) {
        var newArray = responce.data?.data?.length > 0 && responce.data.data.map((item) => {
          return ({ label: item.specialty_name, value: item._id })
        })
        current.setState({ AllSpeciality: newArray });
      }
      current.setState({ loaderImage: false });
    });
};

// For getting the Service and implement Pagination
export const getAllServices = (current) => {
  current.setState({ loaderImage: true });
  axios
    .get(
      sitedata.data.path + "/vh/GetService/" + current.props?.House?.value,
      commonHeader(current.props.stateLoginValueAim.token)
    )
    .then((response) => {
      var totalPage = Math.ceil(response.data.data.length / 10);
      current.setState(
        {
          AllServices: response.data.data,
          loaderImage: false,
          totalPage: totalPage,
          currentPage: 1,
        },
        () => {
          current.setState({ loaderImage: false });
          if (totalPage > 1) {
            var pages = [];
            for (var i = 1; i <= current.state.totalPage; i++) {
              pages.push(i);
            }
            current.setState({
              services_data: current.state.AllServices.slice(0, 10),
              pages: pages,
            });
          } else {
            current.setState({ services_data: current.state.AllServices });
          }
        }
      );
    });
};


export const searchFilter = (e, current) => {
  current.setState({ SearchValue: e.target.value })
  let track1 = current.state.AllServices;
  let FilterFromSearch1 = track1 && track1.length > 0 && track1.filter((obj) => {
    return JSON.stringify(obj.title).toLowerCase().includes(e.target?.value?.toLowerCase());
  });
  current.setState({ services_data: FilterFromSearch1 })
}
//For adding the New Service and Update Service
export const handleSubmit = (current) => {
  let translate = getLanguage(current.props.stateLanguageType);
  let { Plz_enter_Service_Name, Plz_enter_a_valid_price, Something_went_wrong } = translate;
  current.setState({ errorMsg: '' })
  var data = current.state.updateTrack;
  if (!data.title || (data && data?.title && data?.title.length < 1)) {
    current.setState({ errorMsg: Plz_enter_Service_Name })
  }
  else if (!data.price || (data && data?.price && data?.price < 1)) {
    current.setState({ errorMsg: Plz_enter_a_valid_price })
  }
  else {
    if (current.state.updateTrack._id) {
      axios
        .put(
          sitedata.data.path + "/vh/AddService/" + current.state.updateTrack._id,
          data,
          commonHeader(current.props.stateLoginValueAim.token)
        )
        .then((responce) => {
          current.setState({
            updateTrack: {},
          });
          getAllServices(current);
          handleCloseServ(current);
        });
    } else {
      data.house_id = current.props?.House?.value;
      axios
        .post(sitedata.data.path + "/vh/AddService", data, commonHeader(current.props.stateLoginValueAim.token))
        .then((responce) => {
          getAllServices(current);
          handleCloseServ(current);
        })
        .catch(function (error) {
          console.log(error);
          current.setState({ errorMsg: Something_went_wrong })

        });
    }
  }
};

export const getSpecialtyData = (id, current) => {
  if (id) {
    current.setState({ speciality_id: id })
    if (id === 'general') {
      var filterData = current.state.AllServices?.length > 0 && current.state.AllServices.filter((data) => !data.specialty_id)
    }
    else {
      var filterData = current.state.AllServices?.length > 0 && current.state.AllServices.filter((data) => (data?.specialty_id && data?.specialty_id.includes(id)))
    }
  }
  else {
    current.setState({ speciality_id: false })
    var filterData = current.state.AllServices;
  }
  var totalPage = Math.ceil(filterData.length / 10);
  if (totalPage > 1) {
    var pages = [];
    for (var i = 1; i <= current.state.totalPage; i++) {
      pages.push(i);
    }
    current.setState({
      services_data: filterData.slice(0, 10),
      pages: pages,
    });
  } else {
    current.setState({ services_data: filterData });
  }
}

export const selectedID = (id, current) => {
  if (!id) return [];
  else {
    var data = current.state.AllSpeciality.length > 0 && current.state.AllSpeciality.filter((item) => id?.includes(item.value))
    if (data && data.length > 0) {
      return data;
    }
    return [];
  }
}

export const deleteClickService = (id, current) => {
  axios
    .delete(sitedata.data.path + "/vh/AddService/" + id, commonHeader(current.props.stateLoginValueAim.token))
    .then((response) => {
      getAllServices(current);
    })
    .catch((error) => { });
}

export const onChangePage = (pageNumber, current) => {
  current.setState({
    services_data: current.state.AllServices.slice(
      (pageNumber - 1) * 10,
      pageNumber * 10
    ),
    currentPage: pageNumber,
  });
};

//On Changing the specialty id 
export const onFieldChange = (e, current) => {
  const state = current.state.updateTrack;
  state['specialty_id'] = e?.length > 0 && e.map((data) => { return data.value });
  current.setState({ updateTrack: state });
}

//Modal Open
export const handleOpenServ = (current) => {
  if (current.state.speciality_id && current.state.speciality_id !== 'general') {
    current.setState({ openServ: true, updateTrack: { specialty_id: [current.state.speciality_id] } });
  }
  else {
    current.setState({ openServ: true, updateTrack: {} });
  }

};

//Modal Close
export const handleCloseServ = (current) => {
  current.setState({ openServ: false, updateTrack: {} });
};
export const updateEntryState1 = (e, current) => {
  const state = current.state.updateTrack;
  state[e.target.name] = e.target.value;
  current.setState({ updateTrack: state });
};

// Open Edit Model
export const EditService = (data, current) => {
  var deep = _.cloneDeep(data);
  current.setState({ updateTrack: deep, openServ: true });
};  



export const  getAmount = (current) => {
  current.setState({ loaderImage: true });
 axios
    .get(
      sitedata.data.path + "/vactive/GetAmount/" + current.props?.House?.value,
      commonHeader(current.props.stateLoginValueAim.token)
    )
    .then((responce) => {
      if (responce.data.hassuccessed && responce.data.data) {
      let data=responce.data.data
        current.setState({ sickamount1:{amount:data} });
      }
      current.setState({ loaderImage: false });
    });
};