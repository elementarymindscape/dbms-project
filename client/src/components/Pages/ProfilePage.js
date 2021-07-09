    import React from 'react';
    import axios from 'axios';
    import AppBar from '@material-ui/core/AppBar';
    import Tabs from '@material-ui/core/Tabs';
    import Tab from '@material-ui/core/Tab';
    import Grid from '@material-ui/core/Grid';
    import SwipeableViews from 'react-swipeable-views';
    import { Typography } from '@material-ui/core';
    import jwtDecode from 'jwt-decode';
    import moment from 'moment';

    function TabContainer({ children }) {
        return <Typography component="div">{children}</Typography>;
    }

    export default class ProfilePage extends React.Component{
            constructor(props){
                super(props);
                this.state={
                    users: "",
                    userDetails: "",
                    profileView: "",
                    activeIndex: 0,
                }
            }
            async getUserDetails() {
                console.log("Function is working")
                console.log("INSIDE AXIOS- EMAIL",this.state.users.email)
                    let itemType = "";
                        if(this.state.activeIndex === 0){
                            itemType= "Profile"
                        }
                        else if(this.state.activeIndex === 1){
                            itemType = 'ContactHistory'
                        }
                try {
                    let res = await axios({
                    method: 'post',
                    url: "http://localhost:3001/api/profiledetails",
                    data: {
                            profileView: itemType,
                            email: this.state.users.email
                    }
                    });
                    console.log(res?.data);
                    this.setState({userDetails: res?.data})
                    console.log("HISTORY", this.state.contactHistory);
                } catch (e) {
                    console.log(e.toString());
                }
                }
                
                async componentDidMount(){
                    const jwt = localStorage.getItem("token");
                        const user = jwtDecode(jwt);
                        console.log("CURRENT USER", user)
                        this.setState({ users: user });
                        this.setState({emailId: user.email})
                    this.getUserDetails();
                }


                async componentDidUpdate(prevProps, prevState) {
                    if (prevState.activeIndex !== this.state.activeIndex) {
                    this.getUserDetails();
                    }
                }

            handleChangeIndex(index) {
                this.setState({ activeIndex: index });
            }
            
            handleChange(event, value) {
                this.setState({ activeIndex: value });
            }

        render(){
            const {users, userDetails} = this.state;
            return (
                <div>
                                <AppBar position="static">
                                <Tabs centered value={this.state.activeIndex}
                                    onChange={(e,value)=> this.handleChange(e,value)}
                                    >
                                    <Tab label="Profile" />
                                    <Tab label="Contact History"/>
                                    </Tabs>
                                </AppBar>
                                <SwipeableViews 
                                axis={"x"}
                                index={this.state.activeIndex}
                                onChangeIndex={index=>this.handleChangeIndex(index)}
                                >
                                    <TabContainer>
                                        <div class="container mt-5 " style={{minHeight: "70vh"}} >
                                            <div className="row d-flex justify-content-center">
                                                <div className="col-md-10 mt-5 pt-5">
                                                    <div className="row z-depth-3">
                                                        <div className="col-sm-4 bg-primary rounded-left">
                                                            <div className="card-block text-center text-white">
                                                                <i className="fas fa-user-tie fa-7x mt-5"></i>
                                                                    <h2 className="font-weight-bold mt-4">{users.name}</h2>
                                                            </div>    
                                                        </div>
                                                        <div className="col-sm-8 bg-info rounded-right">
                                                            <h3 className="mt-3 text-center">User Details</h3>
                                                            <hr className="badge-primary mt-0 w-100"></hr>
                                                            <div className="row">
                                                                <div className="col-sm-6">
                                                                    <p className="font-weight-bold" >Username</p>
                                                                    <h6>{users.username}</h6>
                                                                </div>
                                                                <div className="col-sm-6">
                                                                    <p className="font-weight-bold" >Full Name</p>
                                                                    <h6>{users.name}</h6>
                                                                </div>
                                                            </div>
                                                            <h4 className="mt-3"></h4>
                                                            <hr className="bg-success"></hr>
                                                            <div className="row">
                                                                <div className="col-sm-6">
                                                                    <p className="font-weight-bold">Email</p>
                                                                    <h6>{users.email}</h6>
                                                                </div>
                                                                <div className="col-sm-6">
                                                                    <p className="font-weight-bold" >Phone</p>
                                                                    <h6>{users.phoneNo}</h6>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </TabContainer>
                                    <TabContainer>
                                        <Grid container spacing={2}  className='mt-3' >
                                            <Grid item xs={2} />
                                                <Grid item xs={8}>
                                                    <h2 align='center' >These are the messages that we have received from the User</h2>
                                                    <h4 align='center'> Full Name:  {users.name}</h4>
                                                    <h4 align='center'>Email Address:  {users.email}</h4>
                                                    <table className="table table-hover border border-dark">
                                                    <thead className=" table-info" >
                                                        <tr align='center' >
                                                        <th className="border border-right border-dark" scope="col">Full Name</th>
                                                        <th className="border border-right border-dark" scope="col">Message</th>
                                                        <th align='center' scope="col">Sent At</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                    { userDetails && userDetails.contactDetails?.map((contact, index)=>(
                                                        <tr key={index} align='center' >
                                                            <td className="border border-right border-dark">{contact.fullName}</td>
                                                            <td className="border border-right border-dark">{contact.message}</td>
                                                            <td >{moment(contact.sentAt).format(
                                                            'Do MMMM YYYY | h:mm:ss A')}
                                                            </td>
                                                        </tr>
                                                    ))}
                                                    </tbody>
                                                    </table>
                                                </Grid>
                                            <Grid item xs={2} />
                                        </Grid>
                                    </TabContainer>
                                </SwipeableViews>
                </div>
            )
        }

    }


