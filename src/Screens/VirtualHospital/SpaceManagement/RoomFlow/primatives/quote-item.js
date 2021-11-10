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
                    <Grid className="drListRght2">
                        <Grid className="flowInfo1">
                            <Grid className="flowProfil">
                                <Grid><img className="imgProfile"  src={require('assets/virtual_images/102.png')} alt="" title="" /></Grid>
                                <Grid className="flowProfilRght" >
                                    <label>{quote.name}</label>
                                    <p>{quote.profile_id}</p>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
            </div>
        );
    }
}