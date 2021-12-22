import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css';
import Button from '@material-ui/core/Button';
import { getLanguage } from "translations/index";
class Index extends Component {
    render() {
        let translate = getLanguage(this.props.stateLanguageType);
        let { journal, GotoRoomManagement, MovePatient, Neurology, AdultsWard, BenitoNoboa, P_ukd832kd2, RoomsBeds, Room1, Room2, Room3, Room4, Room5, two, Move_patient_here } = translate;
        return (
            <Grid>
                <Grid className="roomMgnt">
                    <Grid container direction="row">
                        <Grid item xs={12} md={11}>
                            <Grid container direction="row" alignItems="center">
                                <Grid item xs={12} md={4} sm={4} className="roomMgntLft">
                                    <h1>{journal}</h1>
                                </Grid>
                                <Grid item xs={12} md={8} sm={8}>
                                    <Grid className="roomMgntRght">
                                        <span>
                                            <img src={require('assets/virtual_images/roomColor.svg')} alt="" title="" />
                                            {GotoRoomManagement}
                                        </span>
                                        <span>
                                            <img src={require('assets/virtual_images/movePatient.png')} alt="" title="" />
                                            {MovePatient}
                                        </span>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid container direction="row">
                    <Grid item xs={12} md={11}>
                        <Grid className="neuroRoom">
                            <ul>
                                <li>{Neurology}</li>
                                <li>{AdultsWard}</li>
                                <li className="neuroRoomActv">{RoomsBeds}</li>
                            </ul>
                        </Grid>
                        <Grid className="roomsList">
                            <Grid container direction="row" spacing={4}>
                                {/* start of first section */}
                                <Grid item xs={12} md={5}>
                                    <Grid className="drList">
                                        <Grid className="roomNum"><Button variant="contained">{Room1}</Button></Grid>
                                        <Grid className="drListMain drListMainOpct">
                                            <Grid className="drListLft"><img src={require('assets/virtual_images/bed2.png')} alt="" title="" />
                                                <span>{two}</span></Grid>
                                            <Grid className="drListRght">
                                                <Grid className="drRghtIner">
                                                    <Grid><img src={require('assets/virtual_images/dr1.jpg')} alt="" title="" /></Grid>
                                                    <Grid>
                                                        <Grid><label>{BenitoNoboa}</label></Grid>
                                                        <Grid><p>{P_ukd832kd2}</p></Grid>
                                                    </Grid>
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                        <Grid className="drListMain drListMainOpct">
                                            <Grid className="drListLft"><img src={require('assets/virtual_images/bedColor.png')} alt="" title="" />
                                                <span>{two}</span></Grid>
                                            <Grid className="drListRght">
                                                <Grid className="drRghtIner">
                                                    <Grid><img src={require('assets/virtual_images/dr1.jpg')} alt="" title="" /></Grid>
                                                    <Grid>
                                                        <Grid><label>{BenitoNoboa}</label></Grid>
                                                        <Grid><p>{P_ukd832kd2}</p></Grid>
                                                    </Grid>
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                        <Grid className="drListMain drListMainOpct">
                                            <Grid className="drListLft"><img src={require('assets/virtual_images/bed2.png')} alt="" title="" />
                                                <span>{two}</span></Grid>
                                            <Grid className="drListRght">
                                                <Grid className="drRghtIner">
                                                    <Grid><img src={require('assets/virtual_images/dr1.jpg')} alt="" title="" /></Grid>
                                                    <Grid>
                                                        <Grid><label>{BenitoNoboa}</label></Grid>
                                                        <Grid><p>{P_ukd832kd2}</p></Grid>
                                                    </Grid>
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                        <Grid className="drListMain">
                                            <Grid className="drListLft"><img src={require('assets/virtual_images/bed2.png')} alt="" title="" />
                                                <span>{two}</span></Grid>
                                            <Grid className="drListRght movBtnUpr">
                                                <Grid className="drRghtIner movHereBtn">
                                                    <Button variant="contained">{Move_patient_here}</Button>
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </Grid>
                                {/* end of first section */}
                                {/* start of second section  */}
                                <Grid item xs={12} md={5}>
                                    <Grid className="drList">
                                        <Grid className="roomNum"><Button variant="contained">{Room2}</Button></Grid>
                                        <Grid className="drListMain drListMainOpct">
                                            <Grid className="drListLft"><img src={require('assets/virtual_images/bed2.png')} alt="" title="" />
                                                <span>{two}</span></Grid>
                                            <Grid className="drListRght">
                                                <Grid className="drRghtIner">
                                                    <Grid><img src={require('assets/virtual_images/dr1.jpg')} alt="" title="" /></Grid>
                                                    <Grid>
                                                        <Grid><label>{BenitoNoboa}</label></Grid>
                                                        <Grid><p>{P_ukd832kd2}</p></Grid>
                                                    </Grid>
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                        <Grid className="drListMain drListMainOpct">
                                            <Grid className="drListLft"><img src={require('assets/virtual_images/bedColor.png')} alt="" title="" />
                                                <span>{two}</span></Grid>
                                            <Grid className="drListRght">
                                                <Grid className="drRghtIner">
                                                    <Grid><img src={require('assets/virtual_images/dr1.jpg')} alt="" title="" /></Grid>
                                                    <Grid>
                                                        <Grid><label>{BenitoNoboa}</label></Grid>
                                                        <Grid><p>{P_ukd832kd2}</p></Grid>
                                                    </Grid>
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                        <Grid className="drListMain drListMainOpct">
                                            <Grid className="drListLft"><img src={require('assets/virtual_images/bed2.png')} alt="" title="" />
                                                <span>{two}</span></Grid>
                                            <Grid className="drListRght">
                                                <Grid className="drRghtIner">
                                                    <Grid><img src={require('assets/virtual_images/dr1.jpg')} alt="" title="" /></Grid>
                                                    <Grid>
                                                        <Grid><label>{BenitoNoboa}</label></Grid>
                                                        <Grid><p>{P_ukd832kd2}</p></Grid>
                                                    </Grid>
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                        <Grid className="drListMain drListMainOpct">
                                            <Grid className="drListLft"><img src={require('assets/virtual_images/bed2.png')} alt="" title="" />
                                                <span>{two}</span></Grid>
                                            <Grid className="drListRght">
                                                <Grid className="drRghtIner">
                                                    <Grid><img src={require('assets/virtual_images/dr1.jpg')} alt="" title="" /></Grid>
                                                    <Grid>
                                                        <Grid><label>{BenitoNoboa}</label></Grid>
                                                        <Grid><p>{P_ukd832kd2}</p></Grid>
                                                    </Grid>
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </Grid>
                                {/* end of second section  */}
                                {/* start of third section */}
                                <Grid item xs={12} md={5}>
                                    <Grid className="drList">
                                        <Grid className="roomNum"><Button variant="contained">{Room3}</Button></Grid>
                                        <Grid className="drListMain">
                                            <Grid className="drListLft"><img src={require('assets/virtual_images/bed2.png')} alt="" title="" />
                                                <span>{two}</span></Grid>
                                            <Grid className="drListRght movBtnUpr">
                                                <Grid className="drRghtIner movHereBtn">
                                                    <Button variant="contained">{Move_patient_here}</Button>
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                        <Grid className="drListMain">
                                            <Grid className="drListLft"><img src={require('assets/virtual_images/bed2.png')} alt="" title="" />
                                                <span>{two}</span></Grid>
                                            <Grid className="drListRght movBtnUpr">
                                                <Grid className="drRghtIner movHereBtn">
                                                    <Button variant="contained">{Move_patient_here}</Button>
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                        <Grid className="drListMain">
                                            <Grid className="drListLft"><img src={require('assets/virtual_images/bed2.png')} alt="" title="" />
                                                <span>{two}</span></Grid>
                                            <Grid className="drListRght movBtnUpr">
                                                <Grid className="drRghtIner movHereBtn">
                                                    <Button variant="contained">{Move_patient_here}</Button>
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                        <Grid className="drListMain">
                                            <Grid className="drListLft"><img src={require('assets/virtual_images/bed2.png')} alt="" title="" />
                                                <span>{two}</span></Grid>
                                            <Grid className="drListRght movBtnUpr">
                                                <Grid className="drRghtIner movHereBtn">
                                                    <Button variant="contained">{Move_patient_here}</Button>
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </Grid>
                                {/* end of third section */}
                                {/* start of fourth section */}
                                <Grid item xs={12} md={5}>
                                    <Grid className="drList">
                                        <Grid className="roomNum"><Button variant="contained">{Room4}</Button></Grid>
                                        <Grid className="drListMain">
                                            <Grid className="drListLft"><img src={require('assets/virtual_images/bed2.png')} alt="" title="" />
                                                <span>{two}</span></Grid>
                                            <Grid className="drListRght movBtnUpr">
                                                <Grid className="drRghtIner movHereBtn">
                                                    <Button variant="contained">{Move_patient_here}</Button>
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                        <Grid className="drListMain">
                                            <Grid className="drListLft"><img src={require('assets/virtual_images/bed2.png')} alt="" title="" />
                                                <span>{two}</span></Grid>
                                            <Grid className="drListRght movBtnUpr">
                                                <Grid className="drRghtIner movHereBtn">
                                                    <Button variant="contained">{Move_patient_here}</Button>
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                        <Grid className="drListMain">
                                            <Grid className="drListLft"><img src={require('assets/virtual_images/bed2.png')} alt="" title="" />
                                                <span>{two}</span></Grid>
                                            <Grid className="drListRght movBtnUpr">
                                                <Grid className="drRghtIner movHereBtn">
                                                    <Button variant="contained">{Move_patient_here}</Button>
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                        <Grid className="drListMain">
                                            <Grid className="drListLft"><img src={require('assets/virtual_images/bed2.png')} alt="" title="" />
                                                <span>{two}</span></Grid>
                                            <Grid className="drListRght movBtnUpr">
                                                <Grid className="drRghtIner movHereBtn">
                                                    <Button variant="contained">{Move_patient_here}</Button>
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </Grid>
                                {/* end of fourth section */}
                                {/* start of five section */}
                                <Grid item xs={12} md={5}>
                                    <Grid className="drList">
                                        <Grid className="roomNum"><Button variant="contained">{Room5}</Button></Grid>
                                        <Grid className="drListMain">
                                            <Grid className="drListLft"><img src={require('assets/virtual_images/bed2.png')} alt="" title="" /><span>{two}</span></Grid>
                                            <Grid className="drListRght movBtnUpr">
                                                <Grid className="drRghtIner movHereBtn">
                                                    <Button variant="contained">{Move_patient_here}</Button>
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                        <Grid className="drListMain">
                                            <Grid className="drListLft"><img src={require('assets/virtual_images/bed2.png')} alt="" title="" /><span>{two}</span></Grid>
                                            <Grid className="drListRght movBtnUpr">
                                                <Grid className="drRghtIner movHereBtn">
                                                    <Button variant="contained">{Move_patient_here}</Button>
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                        <Grid className="drListMain">
                                            <Grid className="drListLft"><img src={require('assets/virtual_images/bed2.png')} alt="" title="" /><span>{two}</span></Grid>
                                            <Grid className="drListRght movBtnUpr">
                                                <Grid className="drRghtIner movHereBtn">
                                                    <Button variant="contained">{Move_patient_here}</Button>
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                        <Grid className="drListMain">
                                            <Grid className="drListLft"><img src={require('assets/virtual_images/bed2.png')} alt="" title="" /><span>{two}</span></Grid>
                                            <Grid className="drListRght movBtnUpr">
                                                <Grid className="drRghtIner movHereBtn">
                                                    <Button variant="contained">{Move_patient_here}</Button>
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </Grid>
                                {/* end of fourth section */}
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        );
    }
}
export default Index