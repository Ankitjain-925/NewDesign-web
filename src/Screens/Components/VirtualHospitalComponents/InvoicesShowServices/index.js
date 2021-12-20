import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import Button from '@material-ui/core/Button';
import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table';
import {
    getLanguage
} from "translations/index"

class Index extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            // label: this.props.label,
            // name: this.props.name,   }
        }
    }
    render() {
        let translate = getLanguage(this.props.stateLanguageType)
        let { Services, Xray, CTScan, srvc, qty, Price, ShotDescriptionOfThisService, one, twentyThousandEuro, fifteen, twenty } = translate;
        return (
            <>
                <Grid className="srvcTable">
                    <h3>{Services}</h3>
                    <Table>
                        <Thead>
                            <Tr>
                                <Th>{srvc}</Th><Th>{qty}</Th><Th>{Price}</Th><Th></Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            <Tr>
                                <Td>
                                    <label>{Xray}</label>
                                    <p>{ShotDescriptionOfThisService}</p>
                                </Td>
                                <Td>{one}</Td>
                                <Td>{twentyThousandEuro}</Td>
                                <Td className="xRay-edit">
                                    <Button><img src={require('assets/virtual_images/pencil-1.svg')} alt="" title="" /></Button>
                                    <Button><img src={require('assets/virtual_images/bin.svg')} alt="" title="" /></Button>
                                </Td>
                            </Tr>
                            <Tr>
                                <Td>
                                    <label>{CTScan}</label>
                                    <p>{ShotDescriptionOfThisService}</p>
                                </Td>
                                <Td>{fifteen}</Td>
                                <Td>{twentyThousandEuro}</Td>
                                <Td className="xRay-edit">
                                    <Button><img src={require('assets/virtual_images/pencil-1.svg')} alt="" title="" /></Button>
                                    <Button><img src={require('assets/virtual_images/bin.svg')} alt="" title="" /></Button>
                                </Td>
                            </Tr>
                            <Tr>
                                <Td>
                                    <label>{Xray}</label>
                                    <p>{ShotDescriptionOfThisService}</p>
                                </Td>
                                <Td>{twenty}</Td>
                                <Td>{twentyThousandEuro}</Td>
                                <Td className="xRay-edit">
                                    <Button><img src={require('assets/virtual_images/pencil-1.svg')} alt="" title="" /></Button>
                                    <Button><img src={require('assets/virtual_images/bin.svg')} alt="" title="" /></Button>
                                </Td>
                            </Tr>
                            <Tr>
                                <Td>
                                    <label>{CTScan}</label>
                                    <p>{ShotDescriptionOfThisService}</p>
                                </Td>
                                <Td>{fifteen}</Td>
                                <Td>{twentyThousandEuro}</Td>
                                <Td className="xRay-edit">
                                    <Button><img src={require('assets/virtual_images/pencil-1.svg')} alt="" title="" /></Button>
                                    <Button><img src={require('assets/virtual_images/bin.svg')} alt="" title="" /></Button>
                                </Td>
                            </Tr>
                            <Tr>
                                <Td>
                                    <label>{Xray}</label>
                                    <p>{ShotDescriptionOfThisService}</p>
                                </Td>
                                <Td>{twenty}</Td>
                                <Td>{twentyThousandEuro}</Td>
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