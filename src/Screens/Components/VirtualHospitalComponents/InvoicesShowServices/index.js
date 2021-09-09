import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import Button from '@material-ui/core/Button';
import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table';

class Index extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            // label: this.props.label,
            // name: this.props.name,
        }
    }

    render() {
        return (
            <>
                <Grid className="srvcTable">
                    <h3>Services</h3>
                    <Table>
                        <Thead>
                            <Tr>
                                <Th>Service</Th><Th>Qty</Th><Th>Price</Th><Th></Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            <Tr>
                                <Td>
                                    <label>X-ray</label>
                                    <p>This can be a short description of this service.</p>
                                </Td>
                                <Td>1</Td>
                                <Td>200,00 €</Td>
                                <Td className="xRay-edit">
                                    <Button><img src={require('assets/virtual_images/pencil-1.svg')} alt="" title="" /></Button>
                                    <Button><img src={require('assets/virtual_images/bin.svg')} alt="" title="" /></Button>
                                </Td>
                            </Tr>
                            <Tr>
                                <Td>
                                    <label>CT Scan</label>
                                    <p>This can be a short description of this service.</p>
                                </Td>
                                <Td>15</Td>
                                <Td>200,00 €</Td>
                                <Td className="xRay-edit">
                                    <Button><img src={require('assets/virtual_images/pencil-1.svg')} alt="" title="" /></Button>
                                    <Button><img src={require('assets/virtual_images/bin.svg')} alt="" title="" /></Button>
                                </Td>
                            </Tr>
                            <Tr>
                                <Td>
                                    <label>X-ray</label>
                                    <p>This can be a short description of this service.</p>
                                </Td>
                                <Td>20</Td>
                                <Td>200,00 €</Td>
                                <Td className="xRay-edit">
                                    <Button><img src={require('assets/virtual_images/pencil-1.svg')} alt="" title="" /></Button>
                                    <Button><img src={require('assets/virtual_images/bin.svg')} alt="" title="" /></Button>
                                </Td>
                            </Tr>
                            <Tr>
                                <Td>
                                    <label>CT Scan</label>
                                    <p>This can be a short description of this service.</p>
                                </Td>
                                <Td>15</Td>
                                <Td>200,00 €</Td>
                                <Td className="xRay-edit">
                                    <Button><img src={require('assets/virtual_images/pencil-1.svg')} alt="" title="" /></Button>
                                    <Button><img src={require('assets/virtual_images/bin.svg')} alt="" title="" /></Button>
                                </Td>
                            </Tr>
                            <Tr>
                                <Td>
                                    <label>X-ray</label>
                                    <p>This can be a short description of this service.</p>
                                </Td>
                                <Td>20</Td>
                                <Td>200,00 €</Td>
                                <Td className="xRay-edit">
                                    <Button><img src={require('assets/virtual_images/pencil-1.svg')} alt="" title="" /></Button>
                                    <Button><img src={require('assets/virtual_images/bin.svg')} alt="" title="" /></Button>
                                </Td>
                            </Tr>
                        </Tbody>
                    </Table>
                </Grid>

            </>
        );
    }
}

export default Index;