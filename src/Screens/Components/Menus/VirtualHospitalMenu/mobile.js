import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { stack as Menu } from "react-burger-menu";

class Index extends Component {
    render() {
        return (
            <Grid className="MenuMob">
                <Grid container direction="row" alignItems="center">
                    <Grid item xs={6} md={6} sm={6} className="MenuMobLeft">
                        <a href="/">
                            <img src={require('assets/virtual_images/navigation-drawer.svg')} alt="" title="" className="MenuImg" />
                        </a>
                        <Menu className="addCstmMenu">
                            <Grid className="menuItems">
                                <ul>
                                    <li><a className="menuActv" href="/"><img src={require('assets/virtual_images/barMenu.png')} alt="" title="" /></a></li>
                                    <li><a href="/"><img src={require('assets/virtual_images/calender.png')} alt="" title="" /></a></li>
                                    <li><a href="/"><img src={require('assets/virtual_images/rightpng.png')} alt="" title="" /></a></li>
                                    <li><a href="/"><img src={require('assets/virtual_images/bed.png')} alt="" title="" /></a></li>
                                    <li><a className="moreMenu"><img src={require('assets/virtual_images/nav-more.svg')} alt="" title="" /></a></li>
                                    <li><a className="profilMenu" href="/"><img src={require('assets/virtual_images/nav-my-profile.svg')} alt="" title="" /></a></li>
                                </ul>
                            </Grid>
                        </Menu>
                    </Grid>
                    <Grid item xs={6} md={6} sm={6} className="MenuMobRght">
                        <a href="/"><img src={require('assets/virtual_images/logo_new.png')} alt="" title="" /></a>
                    </Grid>
                </Grid>
            </Grid>
        );
    }
}
export default Index