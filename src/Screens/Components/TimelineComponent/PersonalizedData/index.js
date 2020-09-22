import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import Modal from '@material-ui/core/Modal';
import RLDD from 'react-list-drag-and-drop/lib/RLDD';

var data = [];

class PersonalizedData extends Component {
    constructor(props) {
        super(props)
        this.state = {
            openDash: this.props.openDash,
            personalised_card : this.props.personalised_card,
            added_card: [],
            not_added_card: [],
        };
    }

    //For close the pop up
    handleCloseDash = () => {
        this.props.handleCloseDash();
    }
    // For set the value for the new entry
    handleChangePersonalizedData = (value) => {
        this.props.onChange(value);
        this.props.handleCloseDash();
    }
    //on adding new data
    componentDidUpdate = (prevProps) => {
        if (prevProps.openDash !== this.props.openDash) {
            this.setState({ openDash: this.props.openDash })
        }
        if (prevProps.personalised_card !== this.props.personalised_card || prevProps.added_data !== this.props.added_data) {
            data = this.props.added_data;
            this.setState({ personalised_card: this.props.personalised_card },
              ()=> this.Filterate(this.props.added_data))
        }
    }

    //For Filter the Data
    Filterate=(added_data)=>{
        data = added_data;
        var Added=[], NotAdded = [];
        this.state.personalised_card &&  this.state.personalised_card.length>0 && this.state.personalised_card.map((item)=>{
            if(added_data.indexOf(item.value) === -1){ NotAdded.push(item) }
        })
        added_data && added_data.length>0 && added_data.map((item)=>{
            if(this.state.personalised_card.findIndex(x => x.value ===item) !== -1)
            {
                Added.push(this.state.personalised_card[this.state.personalised_card.findIndex(x => x.value ===item)])
            }
        })
        this.setState({added_card : Added, not_added_card : NotAdded })
    }

    //For remove the data
    Remove=(item)=>{
        const index = data.indexOf(item);
        if (index > -1) {
            data.splice(index, 1)
            this.props.SetPersonalized(data);
        }
    }

    //For add the data in to Listing
    Add = (item)=>{
        data.push(item)
        this.props.SetPersonalized(data);
    }

    //On Adding or moving Data
    handleRLDDChange = (newItems)=> {
        this.setState({ added_card: newItems });
        var NewData=[];
        newItems && newItems.length>0 && newItems.map((item)=>{
            NewData.push(item.value);
        });
        this.props.SetPersonalized(NewData) 
    }

    componentDidMount = () => {

    }
    
    render() {
        return (
            <Modal
                open={this.state.openDash}
                onClose={this.handleCloseDash}
                className="dashBoxModel">
                <Grid className="dashBoxCntnt">

                    <Grid className="dashCourse">
                        <Grid className="dashCloseBtn">
                            <a onClick={this.handleCloseDash}>
                                <img src={require('../../../../assets/images/closefancy.png')} alt="" title="" />
                            </a>
                        </Grid>
                        <Grid><label>Personalize dashboard</label></Grid>
                        <p>Personalize your dashboard by adding or removing cards. Drag to reorder.</p>
                    </Grid>
                    <Grid className="dragDash">
                        <RLDD
                            items={this.state.added_card}
                            itemRenderer={(item) => {
                                return (
                                <Grid container direction="row" alignItems="center" justify="center" className="dragDashMain">
                                    <Grid item xs={8} md={8} className="dragDashLft">
                                        <Grid><a><img onClick={()=>this.Remove(item.value)} src={require('../../../../assets/images/remove-2.svg')} alt="" title="" /> {item.label} </a></Grid>
                                    </Grid>
                                    <Grid item xs={4} md={4} className="dragDashRght">
                                        <a><img src={require('../../../../assets/images/drag.svg')} alt="" title="" /></a>
                                    </Grid>
                                </Grid>
                                );
                            }}
                            onChange={this.handleRLDDChange}
                        />
                    </Grid>
                    <Grid className="moreCards">
                        <h3>Add more cards</h3>

                        {this.state.not_added_card && this.state.not_added_card.length>0 && this.state.not_added_card.map((item)=>(
                            <Grid><a><img onClick={()=>this.Add(item.value)} src={require('../../../../assets/images/add.svg')} alt="" title="" />{item.label}</a></Grid>
                        ))}
                    </Grid>
                </Grid>
            </Modal>
        )
    }
}

export default PersonalizedData;


