import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

class Index extends Component {
    render() {
        return (
             <Grid className="MenuWeb">
                 <Grid className="webLogo">
                     <a href=""><img src={require('assets/virtual_images/logo_new.png')} alt="" title="" /></a>
                 </Grid>
                 <Grid className="menuItems">
                     <ul>
                         <li><a href="" className="menuActv"><img src={require('assets/virtual_images/barMenu.png')} alt="" title="" /></a></li>
                         <li><a href=""><img src={require('assets/virtual_images/calender.png')} alt="" title="" /></a></li>
                         <li><a href=""><img src={require('assets/virtual_images/rightpng.png')} alt="" title="" /></a></li>
                         <li><a href=""><img src={require('assets/virtual_images/bed.png')} alt="" title="" /></a></li>
                         <li>
                             <a className="moreMenu"><img src={require('assets/virtual_images/nav-more.svg')} alt="" title="" /></a>
                         </li>
                         <li>
                             <a className="profilMenu" href="">
                                 <img src={require('assets/virtual_images/nav-my-profile.svg')} alt="" title="" />
                             </a>
                         </li>
                     </ul>
                 </Grid>
             </Grid>
       );
    }
}
export default Index