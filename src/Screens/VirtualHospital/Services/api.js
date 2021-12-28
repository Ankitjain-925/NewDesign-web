import axios from "axios";
import sitedata from "sitedata";
import { commonHeader } from "component/CommonHeader/index"

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


//For adding the New Service and Update Service
export const handleSubmit = (current) => {
  current.setState({ errorMsg: '' })
  var data = current.state.updateTrack;
  if (!data.title || (data && data?.title && data?.title.length < 1)) {
    current.setState({ errorMsg: "Please enter Service Name" })
  }
  else if (!data.price || (data && data?.price && data?.price < 1)) {
    current.setState({ errorMsg: "Please enter a valid price" })
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
          current.setState({ errorMsg: "Somthing went wrong, Please try again" })

        });
    }
  }
};

export const getSpecialtyData = (id, current) => {
  if (id) {
    current.setState({ specialty_id: id })
    if (id === 'general') {
      var filterData = current.state.AllServices?.length > 0 && current.state.AllServices.filter((data) => !data.specialty_id)
    }
    else {
      var filterData = current.state.AllServices?.length > 0 && current.state.AllServices.filter((data) => (data?.specialty_id && data?.specialty_id.includes(id)))

    }
  }
  else {
    current.setState({ specialty_id: false })
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
  current.setState({ openServ: true, updateTrack: {} });
};

//Modal Close
export const handleCloseServ = (current) => {
  current.setState({ openServ: false });
};
export const updateEntryState1 = (e, current) => {
  const state = current.state.updateTrack;
  state[e.target.name] = e.target.value;
  current.setState({ updateTrack: state });
};

// Open Edit Model
export const EditService = (data, current) => {
  current.setState({ updateTrack: data, openServ: true });
};


