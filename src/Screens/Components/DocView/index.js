import React from "react"
import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table';
import { getDate } from "../BasicMethod/index";
import Grid from '@material-ui/core/Grid';

export const DocView = ({ attachedFile, documentName, dateAdded, added_by }) => {
    const returnFilename = (file_name) => {
        let name = file_name.split("&bucket=")[0].split("/Trackrecord/")[1]
        return name
    }
    const returnFiletype = (type) => {
        if (type == "csv") return 'Excel_40x40.svg'
        else if (type == "doc") return 'Word_40x40.svg'
        else if (type == "pdf") return 'pdf.svg'
        else return 'jpg.svg'
    }
    return (
        <Table>
            <Thead><Tr><Th>{documentName}</Th><Th className="dateAdd">{dateAdded}</Th>
                <Th>{added_by}</Th><Th></Th></Tr></Thead>
            <Tbody>
                {attachedFile?.length > 0 && attachedFile.map(attach => (
                    <Tr>
                        <Td className="docsTitle"><img src={require(`assets/virtual_images/${returnFiletype(attach.filetype)}`)} alt="" title="" />{returnFilename(attach.filename)}</Td>
                        <Td>{getDate(attach.created_on, "DD/MM/YYYY")}</Td>
                        <Td className="presImg"><img src={require('assets/virtual_images/dr1.jpg')} alt="" title="" />{attach.created_by}</Td>
                        {/* <Td className="presEditDot"><img src={require('assets/virtual_images/threeDots2.png')} alt="" title="" /></Td> */}
                        
                        <Td>
                            <Grid
                                item
                                xs={6}
                                md={6}
                                className="spcMgntRght7 presEditDot scndOptionIner"
                            >
                                <a className="openScndhrf">
                                    <img
                                        src={require("assets/images/three_dots_t.png")}
                                        alt=""
                                        title=""
                                        className="openScnd specialuty-more"
                                    />
                                    <ul>
                                        <li>
                                            <a>
                                                <img
                                                    src={require("assets/virtual_images/eye2.png")}
                                                    alt=""
                                                    title=""
                                                />
                                                View File
                                            </a>
                                        </li>
                                    </ul>
                                </a>
                            </Grid>
                        </Td>
                    </Tr>
                ))}
            </Tbody>
        </Table>

    )
}