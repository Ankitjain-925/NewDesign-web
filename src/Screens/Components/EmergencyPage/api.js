import axios from "axios";
import sitedata from "sitedata";
import { commonHeader } from "component/CommonHeader/index"
import { GetLanguageDropdown, GetShowLabel1 } from "Screens/Components/GetMetaData/index.js";
const path = sitedata.data.path + "/emergency_record";
//Here is get all Emergency data
export const allemergencyrecord = (current) => {
    if (current.props.byUser === "patient") {
        var user_id = current.props.stateLoginValueAim.user._id;
    } else {
        var user_id = current.props.Emergencysetget.p_id;
    }
    var user_token = current.props.stateLoginValueAim.token;
    current.setState({ loaderImage: true });
    axios
        .get(path + "/" + user_id, commonHeader(user_token))
        .then((response) => {
            current.setState(
                {
                    diagnosisdata: response.data.diagnosisdata,
                    mediacationdata: response.data.medicationdata,
                    allergydata: response.data.allergydata,
                    family_doc: response.data.doctor,
                    loaderImage: false,
                    donar: response.data.donardata,
                    contact_partner: response.data.contact_partner,
                    my_doc_image: "",
                },
                () => {
                    var state1 = current.state.contact_partner;
                    state1["relation"] =
                        current.state.personalinfo &&
                        current.state.personalinfo.emergency_relation;
                    current.setState({ contact_partner: state1 });
                    if (
                        current.state.contact_partner.number &&
                        current.state.contact_partner.number !== ""
                    ) {
                        let fen = current.state.contact_partner.number.split("-");
                        if (fen && fen.length > 0) {
                            current.setState({ flag_emergency_number: fen[0] });
                        }
                    }
                    if (
                        current.state.family_doc &&
                        current.state.family_doc.length > 0 &&
                        current.state.family_doc[0] &&
                        current.state.family_doc[0].image
                    ) {
                        if (current.state.family_doc[0].image) {
                            var find1 = current.state.family_doc[0].image.split(".com/")[1];
                            axios
                                .get(sitedata.data.path + "/aws/sign_s3?find=" + find1)
                                .then((response2) => {
                                    if (response2.data.hassuccessed) {
                                        current.setState({ my_doc_image: response2.data.data });
                                    }
                                });
                        }
                    }
                }
            );
        });
}

export const GetLanguageMetadata = (current) => {
    var Alltissues = GetLanguageDropdown(
        current.state.allMetadata &&
        current.state.allMetadata.tissue &&
        current.state.allMetadata.tissue.length > 0 &&
        current.state.allMetadata.tissue,
        current.props.stateLanguageType
    );
    current.setState({
        tissue: Alltissues,
    });
};

//Submit on submit Emergency contact
export const submitContact = (current) => {
    current.setState({ loaderImage: true });
    if (
        current.state.flag_emergency_number &&
        current.state.flag_emergency_number === "" &&
        current.state.flag_emergency_number === "undefined"
    ) {
        current.setState({ flag_emergency_number: "DE" });
    }
    const user_token = current.props.stateLoginValueAim.token;
    axios
        .put(
            sitedata.data.path + "/UserProfile/Users/update",
            {
                emergency_contact_name: current.state.contact_partner.name,
                emergency_relation: current.state.contact_partner.relation,
                emergency_email: current.state.contact_partner.email,
                emergency_number: current.state.contact_partner.number,
            },
            commonHeader(user_token)
        )
        .then((responce) => {
            if (responce.data.hassuccessed) {
                current.setState({ edit_contact: false, loaderImage: false });
                allemergencyrecord(current);
                patientinfo(current);
            }
        });
};

//For update the number
export const updateMOBILE = (str) => {
    if (!str || str === "undefined" || str === null || str === "") {
        return str;
    } else {
        var mob = str && str.split("-");
        return mob.pop();
    }
};
//for Update the flag
export const updateFLAG = (str) => {
    var mob = str && str.split("-");
    if (mob && mob.length > 0) {
        if (mob[0] && mob[0].length == 2) {
            return mob[0];
        } else {
            return "DE";
        }
    }
};

//Get current User Information
export const patientinfo = (current) => {
    console.log('cueent',current)
    if (current.props.byUser === "patient") {
        var user_id = current.props.stateLoginValueAim.user._id;
    } else {
        var user_id = current.props.Emergencysetget.p_id;
    }
    axios
        .get(sitedata.data.path + "/UserProfile/Users/" + user_id, commonHeader(current.props.stateLoginValueAim.token))
        .then((response) => {
            current.setState({ personalinfo: response.data.data, loaderImage: false });
        });
}

export const getOrgans = (optionData, current) => {
    var rhesus = [];
    optionData = optionData.split(",");
    rhesus = optionData.map((item) => {
        return GetShowLabel1(
            current.state.tissue,

            item,
            current.props.stateLanguageType,
            true,
            "organ"
        );
    });
    return rhesus.join(", ");
};

//Update contact State
export const contact_partnerState = (e, current) => {
    let state = current.state.contact_partner;
    state[e.target.name] = e.target.value;
    current.setState({ contact_partner: state });
};

export const updateEntryState1 = (e, current) => {
    const state = current.state.contact_partner;
    state["number"] = current.state.flag_emergency_number + "-" + e.target.value;
    current.setState({ phone: e.target.value });
    current.setState({ contact_partner: state });
};

//For update the flags
export const updateFlags = (e, name, current) => {
    const state = current.state.contact_partner;
    state["number"] = e + "-" + current.state.phone;
    current.setState({ flag_emergency_number: e });
    current.setState({ contact_partner: state });
};
  //For getting the dropdowns from the database
export const  getMetadata =(current)=>{ 
    current.setState({ allMetadata: current.props.metadata },
    () => {
        GetLanguageMetadata(current);
    })
}

//On remove the oegen donor edit mode
export const EditOrganDonar = (current) => {
current.setState({ editDonar: false });
allemergencyrecord(current);
};

//On remove the Family Doctor edit mode
export const EditFamilyDoc = (current) => {
current.setState({ EditFamily: false });
allemergencyrecord(current);
};
