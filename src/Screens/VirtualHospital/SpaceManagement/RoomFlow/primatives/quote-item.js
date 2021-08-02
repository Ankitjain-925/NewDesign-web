import React from "react";
import Grid from '@material-ui/core/Grid';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import Button from '@material-ui/core/Button';

const getBorderColor = (isDragging, authorColors) =>
    isDragging ? "#333" : "transparent";

export default class QuoteItem extends React.Component {


    render() {
        const { quote, isDragging, isGroupedOver, provided } = this.props;

        return (
            <div
                href={quote.author.url}
                isDragging={isDragging}
                isGroupedOver={isGroupedOver}                                                         
                colors={quote.author.colors}
                ref={provided.innerRef}
                {...provided.draggableProps}
                {...provided.dragHandleProps}                  
            >                                                                                                                  
                {this.props.view === 'vertical' ?
                    <Grid className="drListRght2">
                        <Grid className="flowInfo1">
                            {/* <Grid className="flowInfoInr">   */}
                            {/* <Grid className="flowInfoBtn RadiologyClr"><Button>Radiology</Button></Grid> */}
                            <Grid className="flowProfil">
                                <Grid><img src={require('assets/virtual_images/102.png')} alt="" title="" /></Grid>
                                <Grid className="flowProfilRght" >
                                    <label>{quote.name}</label>
                                    <p>{quote.profile_id}</p>
                                </Grid>
                            </Grid>
                            {/* </Grid> */}
                        </Grid>
                        {/* <Grid className="flowInfoInr2">
                  <Grid className="dtlCntUpr">
                      <Grid className="dtlCntLft">
                          <Grid className="dtlCount dtlCountRm">
                              <a><img src={require('assets/virtual_images/room.svg')} alt="" title="" />Room 1</a>
                              <a><img src={require('assets/virtual_images/bed2.png')} alt="" title="" />2</a>
                          </Grid>
                      </Grid>
                  </Grid>
                  <Grid className="dtlCntUpr dtlCntUprNw">
                      <Grid className="dtlCntLft">
                          <Grid className="dtlCount">
                              <a><img src={require('assets/virtual_images/rightIcon.png')} alt="" title="" />1/2</a>
                              <span><img src={require('assets/virtual_images/plusIcon.jpg')} alt="" title="" /></span>
                              <a><img src={require('assets/virtual_images/note1.png')} alt="" title="" />3</a>
                          </Grid>
                      </Grid>
                      <Grid className="dtlCntRght">
                          <a><img src={require('assets/virtual_images/101.png')} alt="" title="" /></a>
                          <a><img src={require('assets/virtual_images/102.png')} alt="" title="" /></a>
                          <a>+1</a>
                      </Grid>
                  </Grid>
              </Grid> */}
                    </Grid>
                    :
                    
                    <Grid className="cardioAreaUpr">
                        <Grid container direction="row" justify="center" alignItems="center">
                            <Grid item xs={12} md={7}>
                                <Grid container direction="row" alignItems="center" className="cardioAreaMob">
                                    <Grid item xs={12} md={3} lg={2} className="cardoLblMob">
                                        <Grid className="cardoLbl cardoPink"><a>Cardiology</a></Grid>
                                    </Grid>
                                    <Grid item xs={12} md={5} lg={4}>
                                        <Grid className="cardioArea">
                                            <Grid>
                                                <label>{quote.name}</label>
                                                <p>{quote.profile_id}</p>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                    <Grid item xs={12} md={3} lg={2} className="cardoLblWeb">
                                        <Grid className="cardoLbl cardoPink"><a>Cardiology</a></Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid item xs={12} md={5}>
                                <Grid className="cardioData">
                                    <Grid className="infoDoc">
                                        <a className="rghtHalf">
                                            {/* <img src={require('assets/virtual_images/rightIcon.png')} alt="" title="" />
                            <span>1/2</span> */}
                                        </a>
                                        <a className="addSec">
                                            <img src={require('assets/virtual_images/plusIcon.png')} alt="" title="" />
                                        </a>
                                        <a className="notePoint">
                                            <img src={require('assets/virtual_images/note.png')} alt="" title="" />
                                            <span>1</span>
                                        </a>
                                    </Grid>
                                    <Grid className="cardioList">
                                        <a><img src={require('assets/virtual_images/dr1.jpg')} alt="" title="" /></a>
                                        <a><img src={require('assets/virtual_images/dr1.jpg')} alt="" title="" /></a>
                                        <a className="cardioCount"><span>+1</span></a>
                                    </Grid>
                                    <Grid className="cardioDots">
                                        <a><img src={require('assets/virtual_images/threeDots2.png')} alt="" title="" /></a>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                }
            </div>
        );
    }
}