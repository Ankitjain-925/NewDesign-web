<Grid className="topLeftSpc taskViewMob">
<Grid container direction="row">
    <Grid item xs={12} md={6}>
        <AppBar position="static" className="taskTabs">
            <Tabs value={tabvalue} onChange={this.handleChangeTab}>
                <Tab label="My Tasks" className="taskTabsIner" />
                <Tab label="All Tasks" className="taskTabsIner" />
                <Tab label="Tasks overview" className="taskTabsIner taskTabsMob" />
            </Tabs>
        </AppBar>
    </Grid>
    <Grid item xs={12} md={6}>
        <Grid className="addTaskBtn">
            <Button onClick={this.handleOpenRvw}>+ Add Task</Button>
        </Grid>
    </Grid>
    {/* Model setup */}
    <Modal 
    className={
        this.props.settings &&
        this.props.settings.setting &&
        this.props.settings.setting.mode &&
        this.props.settings.setting.mode === "dark"
          ? "darkTheme"
          : ""
      }
    open={this.state.openRvw} onClose={this.handleCloseRvw}>
        <Grid className="rvewFiles">
            <Grid className="rvewFilesinner">
                <Grid container direction="row">
                    <Grid item xs={12} md={12}>
                        <Grid className="rvwCadio">
                            <Button>Cardiology</Button><h3>Review patient files</h3><p>07/02/2021, 9:03 AM</p>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid container direction="row">
                    <Grid item xs={12} md={12}>
                        <Grid className="asignUpr">
                            <Grid className="asignLft">


                                <Assigned
                                    totalurl={new_data}
                                />




                                {/* <Grid><label>Assigned to</label></Grid>
                                <Grid>
                                    <a><img src={require('assets/virtual_images/dr1.jpg')} alt="" title="" /></a>
                                    <a><img src={require('assets/virtual_images/dr2.jpg')} alt="" title="" /></a>
                                    <a>+1</a>
                                </Grid> */}
                            </Grid>
                            {/* <Grid className="asignRghtUpr">
                                <Grid><label>Patient</label></Grid>
                                <Grid className="asignRght">
                                    <Grid><a><img src={require('assets/virtual_images/dr1.jpg')} alt="" title="" /></a></Grid>
                                    <Grid><span>Benito Noboa</span><p>P_ukd832kd2</p></Grid>
                                </Grid>
                            </Grid> */}

                            < FlowPatientView
                                label="Patient"
                                url='https://images.unsplash.com/photo-1541963463532-d68292c34b19?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8Mnx8fGVufDB8fHx8&w=1000&q=80'
                                first_name="Benito"
                                last_name="Noboa"
                                profile_id="P_ukd832kd2"
                            />
                        </Grid>
                    </Grid>
                </Grid>
                <Grid className="makeCmpt">
                    <Grid container direction="row" alignItems="center">
                        <Grid item xs={12} sm={6} md={6}>
                            <Grid className="markDone">
                                <Grid><img src={require('assets/virtual_images/rightTick.png')} alt="" title="" /></Grid>
                                <label>Mark as done</label>
                            </Grid>
                        </Grid>
                        <Grid item xs={12} sm={6} md={6}>
                            <Grid className="addDue">
                                <Grid><label>Due on</label></Grid>
                                <Grid><Button className="addDueDate">09/02/2021</Button><Button>Add time</Button></Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid className="multiDescp">
                    <Grid container direction="row" alignItems="center">
                        <Grid item xs={12} sm={12} md={12}>
                            <Grid><label>Description</label>
                                <p>Multiple lesions again suggest chronic demyelination. Mild atrophy greatest in the frontal region
                                    may be associated with multiple sclerosis. Findings appear stable when compared with the prior study.
                                    There is no abnormal enhancement.</p>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid className="assignSecUpr">
                    <Grid container direction="row" alignItems="center">
                        <Grid item xs={12} sm={12} md={12}>
                            <Grid className="assignSec">
                                <Grid>
                                    <img src={require('assets/virtual_images/assign-to.svg')} alt="" title="" />
                                    <label onClick={this.handleOpenAssign}>+ Assign to</label>
                                </Grid>

                                <Grid>
                                    <AssignedToData
                                        openEntry={this.state.openEntry}
                                        handleCloseAssign={this.handleCloseAssign}
                                        handleOpenAssign={this.handleOpenAssign}
                                        onChange={(e) => this.updateEntryState(e)}
                                        value={this.state.value}
                                    />
                                </Grid>
                                <Grid>
                                    <img src={require('assets/virtual_images/assign-to.svg')} alt="" title="" />
                                    <label>Duplicate</label>
                                </Grid>
                                <Grid>
                                    <img src={require('assets/virtual_images/assign-to.svg')} alt="" title="" />
                                    <label>Archive</label>
                                </Grid>
                                <Grid>
                                    <img src={require('assets/virtual_images/assign-to.svg')} alt="" title="" />
                                    <label>Delete</label>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid className="assignSecUpr">
                    <Grid container direction="row" alignItems="center">
                        <Grid item xs={12} sm={12} md={12}>
                            <Grid className="attchFile">
                                <Grid><label>Attachments</label></Grid>
                                <Grid className="browseHere">
                                    <a><img src={require('assets/virtual_images/upload-file.svg')} alt="" title="" />
                                        <span>Browse</span> or drag here
                                    </a>
                                </Grid>
                                <p>Supported file types: .jpg, .png, .pdf</p>
                            </Grid>
                            <Grid className="updateDoc">
                                <Grid><label>Uploaded</label></Grid>
                                <Grid className="updateInfo">
                                    <Grid className="updateImg"><img src={require('assets/virtual_images/james.jpg')} alt="" title="" /></Grid>
                                    <p>IMG_23_6_2020_09_18.jpg</p>
                                    <a className="updateRmv"><img src={require('assets/virtual_images/remove-1.svg')} alt="" title="" /></a>
                                </Grid>
                                <Grid className="updateInfo">
                                    <Grid className="updateImg"><img src={require('assets/virtual_images/pdfimg.png')} alt="" title="" /></Grid>
                                    <p>IMG_23_6_2020_09_18.jpg</p>
                                    <a className="updateRmv"><img src={require('assets/virtual_images/remove-1.svg')} alt="" title="" /></a>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>



                <Grid className="cmntUpr">
                    <Grid container direction="row" alignItems="center">
                        <Grid item xs={12} sm={12} md={12}>
                            <Grid className="cmntIner">
                                <Grid><label>Comments</label></Grid>

                                {this.state.comments_data?.length > 0 && this.state.comments_data.map((data) => (
                                    <>
                                        < CommentsView
                                            label={data.comment_by}
                                            text={data.text}
                                            url={data.url}
                                        />
                                    </>
                                ))}

                                {/* <Grid className="cmntMsgs">
                                    <Grid><img src={require('assets/virtual_images/dr1.jpg')} alt="" title="" /></Grid>
                                    <Grid>
                                        <Grid><label>Mark Anderson M.D.</label><span>7 Feb at 12:38</span></Grid>
                                        <Grid className="cmntMsgsCntnt"><p>I’m leaving a short comment right here</p></Grid>
                                        <Grid><Button>Edit</Button><Button>Delete</Button></Grid>
                                    </Grid>
                                </Grid> */}
                            </Grid>
                            {/* <Grid className="cmntIner cmntInerBrdr">
                                <Grid className="cmntMsgs">
                                    <Grid><img src={require('assets/virtual_images/dr2.jpg')} alt="" title="" /></Grid>
                                    <Grid>
                                        <Grid><label>Gregory House M.D.</label><span>7 Feb at 12:38</span></Grid>
                                        <Grid className="cmntMsgsCntnt"><p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                                            Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a
                                            galley of type and scrambled it to make a type specimen book.</p></Grid>
                                    </Grid>
                                </Grid>
                            </Grid> */}
                            <Grid className="addComit">
                                <textarea
                                    onChange={(e) => this.updateCommemtState(e)}
                                    value={this.state.text}>
                                </textarea>

                                <Button onClick={(e) => this.handleComment(e)}>Add Comment</Button>
                            </Grid>
                            <Grid className="saveTask">
                                <Button>Save Task & Close</Button>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    </Modal>
    {/* End of Model setup */}
</Grid>
</Grid>