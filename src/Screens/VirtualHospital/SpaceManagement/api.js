import axios from "axios";
import sitedata from "sitedata";
import { commonHeader } from "component/CommonHeader/index"
 //to save and edit the speciality
export const SaveSpeciality = (current) => {
  current.setState({ errorMsg: '' })
  var data = current.state.speciality;
  if (data && (!data.specialty_name || data.specialty_name.length < 1)) {
    current.setState({ errorMsg: 'Please enter Speciality name' })
  }
  else if (data && !data.color) {
    current.setState({ errorMsg: 'Please select color' })
  }
  else if (data && (!data.wards || data.wards.length < 1)) {
    current.setState({ errorMsg: "Please add atleast one ward" })
  }
  else {
    if (data._id) {
      current.setState({ loaderImage: true });
      axios
        .put(
          sitedata.data.path + "/vh/AddSpecialty/" + data._id,
          data,
          commonHeader(current.props.stateLoginValueAim.token)
        )
        .then((responce) => {
          if (responce.data.hassuccessed) {
            current.getSpeciality();
          }
          current.setState({
            ward: {},
            speciality: {},
            loaderImage: false,
            openSpecl: false,
          });
        });
    } else {
      current.setState({ loaderImage: true });
      data.house_id = current.props?.House?.value;
      axios
        .post(
          sitedata.data.path + "/vh/AddSpecialty",
          data,
          commonHeader(current.props.stateLoginValueAim.token)
        )
        .then((responce) => {
          if (responce.data.hassuccessed) {
            current.getSpeciality();
          }
          current.setState({
            ward: {},
            speciality: {},
            loaderImage: false,
            openSpecl: false,
          });
        });
    }
  }

};

//for getting all speciality
  export const getSpeciality = (current) => {
    current.setState({ loaderImage: true });
    axios
      .get(
        sitedata.data.path + "/vh/AddSpecialty/" + current.props?.House?.value,
        commonHeader(current.props.stateLoginValueAim.token)
      )
      .then((responce) => {
        if (responce.data.hassuccessed && responce.data.data) {
          current.props.Speciality(true, current.props?.House?.value, current.props.stateLoginValueAim.token);
          current.setState({
            specialityData: responce.data.data,
            specialityData2: responce.data.data
          });

        }
        current.setState({ loaderImage: false, openSpecl: false });
      });
  };

  
  //For deleting the speciality
  export const  deleteClick = (current) => {
    if (current.state.wardDel && current.state.roomDel && current.state.patDel && current.state.deleteId) {
      current.setState({ loaderImage: true });
      axios
        .delete(
          sitedata.data.path + "/vh/AddSpecialty/" + current.state.deleteId,
          commonHeader(current.props.stateLoginValueAim.token)
        )
        .then((responce) => {
          if (responce.data.hassuccessed) {
            current.setState({ deleteId: false });
            getSpeciality(current);
          }
          current.setState({ loaderImage: false, openWarn: false });
        });
      current.setState({ showError: false })
    }
    else {
      current.setState({ showError: true })
    }
  };

  export const bednumbers = (rooms) => {
    if (rooms && Array.isArray(rooms)) {
      return rooms.reduce((a, v) => (a = a + parseInt(v.no_of_bed)), 0);
    }
    return "";
  };

  export const selectedID = (id, current) => {
    if (!id) return []; 
    else{
      var data = current.state.AllSpeciality.length > 0 && current.state.AllSpeciality.filter((item) => id?.includes(item.value))
      if (data && data.length > 0) {
        return data;
      }
      return [];
    }
  }
//add the ward of the speciality
  export const  handleOpenRoom = (current) => { 
    current.setState({ errorMsg2: "" })
    let data = current.state.ward
    if ((data && !data.ward_name) || (data && data?.ward_name && data?.ward_name?.length < 1)) {
      current.setState({ errorMsg2: "Please enter ward name" })
    }
    else if ((data && !data.rooms)) {
      current.setState({ errorMsg2: "Please enter alteast one room" })
    }
    else {
      let length = data.rooms.length
      let check = data && data.rooms && data.rooms.map((data, index) => {

        if (data && !data.room_name) {
          // current.setState({ errorMsg2: "Please enter room name" })
          current.setState({ errorStatus: true })
          return true;
        }
        else if (data && (data.no_of_bed == false || data.no_of_bed < 1)) {
          current.setState({ errorStatus: true })
          return true;
        }
      }
      )
      if (!check.includes(true)) {
        var state = current.state.speciality;
        var ward = state["wards"] || [];
        if (current.state.isEditWrd) {
          ward[current.state.isEditWrd] = current.state.ward;
          current.setState({ isEditWrd: false });
        } else {
          ward.push(current.state.ward);
        }
        state["wards"] = ward;
        current.setState({ speciality: state, isEditWrd: false }, () => {
          current.setState({ openWard: false, ward: {} });
        });
      }
      else {
        current.setState({ errorMsg2: 'Please enter valid room name or number of beds' })
      }
    }
  };

  export const searchFilter = (e, current) => {
    current.setState({ SearchValue: e.target.value })
    let track1 = current.state.specialityData2;
    let FilterFromSearch1 = track1 && track1.length > 0 && track1.filter((obj) => {
      return JSON.stringify(obj.specialty_name).toLowerCase().includes(e.target?.value?.toLowerCase());
    });
    current.setState({ specialityData: FilterFromSearch1 })
  }

  //For change Institutes
  export const MoveInstitute = (current) => {
    current.props.houseSelect({ value: null });
    current.props.history.push('/virtualHospital/institutes')
  };

  export const onEditspec = (data, current) => {
    current.setState({ speciality: data, openSpecl: true });
  };


export const handleOpenWard = (current) => {
    current.setState({ openWard: true });
  };

  export const handleCloseWard = (current) => {
    current.setState({ openWard: false, isEditWrd: false });
  };

  // update the ward of the speciality
  export const editWard = (data, current) => {
    current.setState({ openWard: true, ward: data, isEditWrd: true });
  };

  //for update speciality name
  export const updateEntryState = (e, current) => {
    var state = current.state.speciality;
    state[e.target.name] = e.target.value;
    current.setState({ speciality: state });
  };

  //for update the speciality color
  export const updateEntryState1 = (name, value, current) => {
    var state = current.state.speciality;
    state[name] = value;
    current.setState({ speciality: state });
  };

  // for update the wards
  export const updateEntryState2 = (e, current) => {
    var state = current.state.ward;
    state[e.target.name] = e.target.value;
    current.setState({ ward: state });
  };

  export const handleOpenWarn = (id, current) => {
    current.setState({ openSpecl: false, openWarn: true, deleteId: id });
  }
  export const handleCloseWarn = (current) => {
    current.setState({ openWarn: false })
  }

  //remove Wards
  export const removeWard = (index, current) => {
    var state = current.state.speciality;
    var ward = state["wards"] || [];
    state["wards"].splice(index, 1);
    // state['wards'] = ward;
    current.setState({ speciality: state });
  };

  //for update the rooms in the wards                                                                                                    
  export const updateEntryState3 = (ward, current) => {
    var state = current.state.ward;
    state["rooms"] = ward;
    current.setState({ ward: state });
  };

  export const manageBeds = (data, selectedspec, selectedward, current) => {
    current.props.history.push({
      pathname: "/virtualHospital/room-flow",
      state: { data, selectedspec, selectedward },
    });
  };