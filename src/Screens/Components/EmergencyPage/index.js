import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import sitedata from "sitedata";
import Loader from "Screens/Components/Loader/index";
import { LoginReducerAim } from "Screens/Login/actions";
import { Settings } from "Screens/Login/setting";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { LanguageFetchReducer } from "Screens/actions";
import { OptionList } from "Screens/Login/metadataaction";
import { getLanguage } from "translations/index"
import { EmergencySet } from "Screens/Doctor/emergencyaction";
import { getSpec } from "Screens/Components/BasicMethod/index";
import OrganSection from "Screens/Patient/Profile/Components/orgnaDonar";
import ReactFlagsSelect from "react-flags-select";
import DoctorSection from "Screens/Patient/Profile/Components/mydoctors";
import {GetShowLabel } from "Screens/Components/GetMetaData/index.js";
import { getMetadata, allemergencyrecord, patientinfo, EditFamilyDoc, EditOrganDonar,
  updateFlags, updateEntryState1, contact_partnerState, getOrgans, updateFLAG, updateMOBILE, submitContact, GetLanguageMetadata } from "./api"
class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      diagnosisdata: [],
      mediacationdata: [],
      allergydata: [],
      family_doc: [],
      donar: {},
      contact_partner: {},
      loaderImage: false,
      number: "",
      tissue: [],
      editDonar: false,
      EditFamily: false,
      edit_contact: false,
      flag_emergency_number: "DE",
      phone: "",
      my_doc_image: "",
    };
  }

  componentDidMount() {
    getMetadata(this);
    allemergencyrecord(this);
    patientinfo(this);
  }

  componentDidUpdate = (prevProps) => {
    if (prevProps.stateLanguageType !== this.props.stateLanguageType) {
      GetLanguageMetadata(this);
    }
  };

  render() {
    let translate = getLanguage(this.props.stateLanguageType)
    let {
      another_patient_data,
      ur_emrgancy_access,
      country_code,
      Submit,
      patient_emrgancy_access,
      health_status,
      Medications,
      No,
      allergies,
      diagnosis,
      contact_other_info,
      family_doc,
      Contact,
      Register_Name,
      relation,
      phone,
      email,
      organ_donar_status,
      not_an_organ,
      emergency,
      telephone_nmbr,
    } = translate;
    return (
      <Grid container direction="row">
        {this.state.loaderImage && <Loader />}
        <Grid item xs={12} md={11}>
          {/* Health Status */}
          <Grid className="healthStatus">
            <Grid className="">
              <Grid container direction="row">
                <Grid item xs={11} md={11} className="emergency-head">
                  <Grid container direction="row">
                    <Grid item xs={6} md={6} >
                      {this.props.byUser === "patient" ? (
                        <h1>{ur_emrgancy_access}</h1>
                      ) : (
                        <h1>{patient_emrgancy_access}</h1>
                      )}
                    </Grid>
                    <Grid item xs={6} md={6}>
                      <Grid className="AddEntrynw">
                        {this.props.byUser === "patient" ? (
                          ""
                        ) : (
                          <a onClick={this.props.anotherPatient}>
                            {another_patient_data}
                          </a>
                        )}
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
            <h2>{health_status}</h2>
            <Grid container direction="row" spacing={3}>
              <Grid item xs={12} md={4}>
                <Grid className="medicalNotify">
                  <Grid className="medicalLabl">
                    <label>{Medications}</label>
                  </Grid>
                  <Grid className="medicalDesp">
                    {this.state.mediacationdata &&
                      this.state.mediacationdata.length > 0 ? (
                      this.state.mediacationdata.map((item, index) => (
                        <p>
                          <a>{item.substance}</a>
                        </p>
                      ))
                    ) : (
                      <p>
                        {No} {Medications}
                      </p>
                    )}
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12} md={4}>
                <Grid className="medicalNotify">
                  <Grid className="medicalLabl">
                    <label>{allergies}</label>
                  </Grid>
                  <Grid className="medicalDesp">
                    {this.state.allergydata &&
                      this.state.allergydata.length > 0 ? (
                      this.state.allergydata.map((item, index) => (
                        <p>
                          <a>{item.diagnosis}</a>
                        </p>
                      ))
                    ) : (
                      <p>
                        {No} {allergies}
                      </p>
                    )}
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12} md={4}>
                <Grid className="medicalNotify">
                  <Grid className="medicalLabl">
                    <label>{diagnosis}</label>
                  </Grid>
                  <Grid className="medicalDesp">
                    {this.state.diagnosisdata &&
                      this.state.diagnosisdata.length > 0 ? (
                      this.state.diagnosisdata.map((item, index) => (
                        <p>
                          <a>{item.diagnosis}</a>
                        </p>
                      ))
                    ) : (
                      <p>
                        {No} {diagnosis}
                      </p>
                    )}
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          {/* End of Health Status */}

          {/* Contacts & Other info */}
          <Grid className="otherInfo">
            <h2>{contact_other_info}</h2>
            <Grid container direction="row" spacing={3}>
              <Grid item xs={12} md={4}>
                <Grid className="docCntctMain">
                  <Grid className="docCntct">
                    <Grid container direction="row">
                      <Grid item xs={6} md={7} className="docCntctLft">
                        <label>{family_doc}</label>
                      </Grid>
                      <Grid item xs={6} md={5} className="docCntctRght">
                        {this.props.byUser === "patient" && (
                          <a
                            onClick={() => {
                              this.setState({ EditFamily: true });
                            }}
                          >
                            <img
                              src={require("assets/images/edit.svg")}
                              alt=""
                              title=""
                            />
                          </a>
                        )}
                      </Grid>
                    </Grid>
                  </Grid>
                  {!this.state.EditFamily ? (
                    this.state.family_doc &&
                      this.state.family_doc.length > 0 ? (
                      this.state.family_doc.map((item, index) => (
                        <div>
                          <Grid className="docInfo">
                            <Grid className="docInfoName">
                              <a>
                                <img
                                  src={this.state.my_doc_image}
                                  alt=""
                                  title=""
                                />
                                <span>
                                  {item.first_name && item.first_name}{" "}
                                  {item.last_name && item.last_name}
                                </span>
                              </a>
                            </Grid>
                            <Grid>
                              <a>
                                <img
                                  src={require("assets//images/phone.svg")}
                                  alt=""
                                  title=""
                                />
                                {item.mobile}
                              </a>
                            </Grid>
                            <Grid>
                              <a>
                                <img
                                  src={require("assets//images/email.svg")}
                                  alt=""
                                  title=""
                                />
                                {item.email}
                              </a>
                            </Grid>
                            {item.language && item.language.length > 0 && <Grid>
                              <a>
                                <img
                                  src={require("assets//images/language.svg")}
                                  alt=""
                                  title=""
                                />
                                {item.language && item.language.join(", ")}
                              </a>
                            </Grid>}
                          </Grid>
                          <Grid className="neuroDises">
                            <Grid className="neuroGen">
                              <Grid>
                                <label>
                                  {item.speciality &&
                                    getSpec(
                                      item.speciality,
                                      this.props.stateLanguageType
                                    )}
                                </label>
                              </Grid>
                              <p>
                                {item.subspeciality &&
                                  getSpec(
                                    item.subspeciality,
                                    this.props.stateLanguageType
                                  )}
                              </p>
                            </Grid>
                          </Grid>
                        </div>
                      ))
                    ) : (
                      <p>
                        {No} {family_doc}
                      </p>
                    )
                  ) : (
                    <DoctorSection
                      className="paddingSides"
                      EditFamilyDoc={()=>EditFamilyDoc(this)}
                      comesFrom="emergency"
                    />
                  )}
                </Grid>
              </Grid>
              <Grid item xs={12} md={4}>
                <Grid className="docCntctMain">
                  <Grid className="docCntct">
                    <Grid container direction="row">
                      <Grid item xs={6} md={7} className="docCntctLft">
                        <label>{emergency} {Contact}</label>
                      </Grid>
                      <Grid item xs={6} md={5} className="docCntctRght">
                        {this.props.byUser === "patient" && (
                          <a onClick={() => this.setState({ edit_contact: true })}>
                            <img src={require("assets/images/edit.svg")} alt="" title="" />
                          </a>
                        )}
                      </Grid>
                    </Grid>
                  </Grid>
                  {this.state.contact_partner && !this.state.edit_contact && (
                    <div>
                      <Grid className="jlyMorr">
                        <Grid>
                          <label>
                            {this.state.contact_partner.name &&
                              this.state.contact_partner.name}
                          </label>
                        </Grid>
                        <p>
                          {this.state.contact_partner.relation &&
                            this.state.contact_partner.relation}
                        </p>
                      </Grid>
                      <Grid className="docInfo docInfoBrdr">
                        <Grid>
                          {this.state.contact_partner.number && (
                            <a>
                              <img
                                src={require("assets//images/phone.svg")}
                                alt=""
                                title=""
                              />{" "}
                              {this.state.contact_partner.number}
                            </a>
                          )}
                        </Grid>
                        <Grid>
                          {this.state.contact_partner.email && (
                            <a>
                              <img
                                src={require("assets//images/email.svg")}
                                alt=""
                                title=""
                              />{" "}
                              {this.state.contact_partner.email}
                            </a>
                          )}
                        </Grid>
                      </Grid>
                    </div>
                  )}
                  {!this.state.contact_partner && !this.state.edit_contact && (
                    <p>
                      {No} {family_doc}
                    </p>
                  )}
                  {this.state.edit_contact && (
                    <Grid className="emrgncyFrm">
                      <Grid className="emrgncyFrmInpt">
                        <Grid>
                          <label>{Register_Name}</label>
                        </Grid>
                        <Grid>
                          <input
                            type="text"
                            name="name"
                            value={this.state.contact_partner.name}
                            onChange={(e)=>contact_partnerState(e, this)}
                          />
                        </Grid>
                      </Grid>
                      <Grid className="emrgncyFrmInpt">
                        <Grid>
                          <label>{relation}</label>
                        </Grid>
                        <Grid>
                          <input
                            name="relation"
                            value={this.state.contact_partner.relation}
                            onChange={(e)=>contact_partnerState(e, this)}
                          />
                        </Grid>
                      </Grid>
                      <Grid className="emrgncyFrmInpt">
                        <Grid>
                          <label>{telephone_nmbr}</label>
                        </Grid>
                        <Grid>
                          {updateFLAG(this.state.contact_partner.number) &&
                            updateFLAG(
                              this.state.contact_partner.number
                            ) !== "" && (
                              <ReactFlagsSelect
                                searchable={true}
                                placeholder={country_code}
                                onSelect={(e) => {
                                  updateFlags(e, "number", this);
                                }}
                                name="flag_phone"
                                showSelectedLabel={false}
                                defaultCountry={updateFLAG(
                                  this.state.contact_partner.number
                                )}
                              />
                            )}
                          <input
                            type="text"
                            className="Mobile_extra Emergency_number"
                            placeholder={phone}
                            onChange={(e)=>updateEntryState1(e, this)}
                            value={
                              this.state.contact_partner.number &&
                              updateMOBILE(
                                this.state.contact_partner.number
                              )
                            }
                          />
                        </Grid>
                      </Grid>
                      <Grid className="emrgncyFrmInpt">
                        <Grid>
                          <label>{email}</label>
                        </Grid>
                        <Grid>
                          <input
                            name="email"
                            value={this.state.contact_partner.email}
                            onChange={(e)=>contact_partnerState(e, this)}
                          />
                        </Grid>
                      </Grid>
                      <Grid className="emrgncyFrmSub">
                        <input
                          type="submit"
                          value={Submit}
                          onClick={() => submitContact(this)}
                        />
                      </Grid>
                    </Grid>
                  )}
                </Grid>
              </Grid>

              <Grid item xs={12} md={4}>
                <Grid className="docCntctMain">
                  <Grid className="docCntct">
                    <Grid container direction="row">
                      <Grid item xs={6} md={7} className="docCntctLft">
                        <label>{organ_donar_status}</label>
                      </Grid>
                      <Grid item xs={6} md={5} className="docCntctRght">
                        {this.props.byUser === "patient" && (
                          <a
                            onClick={() => {
                              this.setState({ editDonar: true });
                            }}
                          >
                            <img
                              src={require("assets//images/edit.svg")}
                              alt=""
                              title=""
                            />
                          </a>
                        )}
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid className="jlyMorr">
                    {!this.state.editDonar ? (
                      this.state.donar &&
                        this.state.donar.status &&
                        this.state.donar.status.label_en !== "Nothing" ? (
                        <div>
                          <Grid>
                            <label>
                              {GetShowLabel(
                                this.state.donar.status,
                                this.props.stateLanguageType
                              )}
                            </label>
                          </Grid>
                          {this.state.donar.options &&
                            this.state.donar.options !== "" && (
                              <span>
                                {typeof this.state.donar.options ===
                                  "object" ? (
                                  <Grid className="docInfo">
                                    <Grid className="docInfoName">
                                      <a>
                                        <img
                                          src={require("assets/images/person1.jpg")}
                                          alt=""
                                          title=""
                                        />
                                        <span>
                                          {this.state.donar.options
                                            .first_name &&
                                            this.state.donar.options
                                              .first_name}{" "}
                                          {this.state.donar.options.last_name &&
                                            this.state.donar.options.last_name}
                                        </span>
                                      </a>
                                    </Grid>
                                    <Grid>
                                      {this.state.donar.options.phone && (
                                        <a>
                                          <img
                                            src={require("assets/images/phone.svg")}
                                            alt=""
                                            title=""
                                          />{" "}
                                          {this.state.donar.options.phone}
                                        </a>
                                      )}
                                    </Grid>
                                    <Grid>
                                      <a>
                                        <img
                                          src={require("assets/images/language.svg")}
                                          alt=""
                                          title=""
                                        />
                                        {this.state.donar.options.city &&
                                          this.state.donar.options.city}
                                        ,{" "}
                                        {this.state.donar.options.address &&
                                          this.state.donar.options.address}
                                        ,{" "}
                                        {this.state.donar.options.postal_code &&
                                          this.state.donar.options.postal_code}
                                      </a>
                                    </Grid>
                                    {/* <Grid><a><img src={require('assets//images/language.svg')} alt="" title="" />{item.language && item.language.join(', ')}</a></Grid> */}
                                  </Grid>
                                ) : (
                                  this.state.donar.options && (
                                    <p>
                                      {" "}
                                      {getOrgans(
                                        this.state.donar.options,this
                                      )}{" "}
                                    </p>
                                  )
                                )}
                              </span>
                            )}
                          {this.state.donar.remarks && (
                            <p>{this.state.donar.remarks}</p>
                          )}
                        </div>
                      ) : (
                        <Grid>
                          <label>{not_an_organ}</label>
                        </Grid>
                      )
                    ) : (
                      <OrganSection
                        EditOrganDonar={()=>EditOrganDonar(this)}
                        tissue={this.state.tissue && this.state.tissue}
                        comesFrom="emergency"
                      />
                    )}
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          {/* End of Contacts & Other info */}
        </Grid>
      </Grid>
    );
  }
}
const mapStateToProps = (state) => {
  const {
    stateLoginValueAim,
    loadingaIndicatoranswerdetail,
  } = state.LoginReducerAim;
  const { stateLanguageType } = state.LanguageReducer;
  const { settings } = state.Settings;
  const { metadata } = state.OptionList;
  // const { Doctorsetget } = state.Doctorset;
  // const { catfil } = state.filterate;
  const { Emergencysetget } = state.EmergencySet;
  return {
    stateLanguageType,
    stateLoginValueAim,
    loadingaIndicatoranswerdetail,
    settings,
    Emergencysetget,
    metadata,
    //   Doctorsetget,
    //   catfil
  };
};
export default withRouter(
  connect(mapStateToProps, {
    EmergencySet,
    LoginReducerAim,
    LanguageFetchReducer,
    Settings,
    OptionList
  })(Index)
);
