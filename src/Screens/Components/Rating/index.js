
import React, { Component } from 'react';
import  ReactStars from "react-rating-stars-component";

class Index extends Component {
    constructor(props) {
       super(props);
        this.state = {
           
        };
    }

    render() {
        const { selectedOption } = this.state;
        return (
            <ReactStars
                count={5}
                onChange={this.props.ratingChange}
                size={this.props.size}
                isHalf={true}
                value={this.props.rating}
                emptyIcon={<i className="far fa-star"></i>}
                halfIcon={<i className="fa fa-star-half-alt"></i>}
                fullIcon={<i className="fa fa-star"></i>}
                activeColor="#ffd700"
            /> 
        );
    }
}
export default Index
