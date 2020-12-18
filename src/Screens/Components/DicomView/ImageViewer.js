//Importing the React library
import React from 'react';
//Importing our component-folder that contains the three files
import DwvComponent from './DwvComponent';

function ImageViewer() {

    return (
        <div>
            <h4 className="Pwrdby1">Image View</h4>
            <DwvComponent />
        </div>
    )
}

export default ImageViewer;