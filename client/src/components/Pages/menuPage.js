import React from 'react'
import axios from 'axios';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography';
import SwipeableViews from 'react-swipeable-views';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';


function TabContainer({ children }) {
    return <Typography component="div">{children}</Typography>;
  }

export default class MenuPage extends React.Component{
    constructor(){
        super();
        this.state ={
            items: null, //initial pizza state
            itemType: "",
            activeIndex: 0,
        }
    }

    async getPizzas () {
        console.log("Function is working")
            let itemType = "";
                if(this.state.activeIndex === 0){
                    itemType= "pizza"
                }else if(this.state.activeIndex === 1){
                    itemType='sides'
                }
                else if(this.state.activeIndex === 2){
                    itemType = 'beverage'
                }
          try {
            let res = await axios({
              method: 'post',
              url: "http://localhost:3001/api/pizzas",
              data: {
                    menuOption: itemType
              }
            });
            console.log(res?.data);
            this.setState({items: res?.data})
          } catch (e) {
            console.log(e.toString());
          }
        }
        
        componentDidMount(){
            this.getPizzas();
        }

        async componentDidUpdate(prevProps, prevState) {
            if (prevState.activeIndex != this.state.activeIndex) {
              this.getPizzas();
            }
          }

        handleChangeIndex(index) {
            this.setState({ activeIndex: index });
          }
        
          handleChange(event, value) {
            this.setState({ activeIndex: value });
          }

    render(){
        const {items} = this.state;
        return(
            <div>
                <h3 align='center'> Pizza Menu </h3>
                <AppBar position="static">
                    <Tabs centered value={this.state.activeIndex}
                    onChange={(e,value)=> this.handleChange(e,value)}
                    >
                    <Tab label="Veg" />
                    <Tab label="Sides"/>
                    <Tab label="Beverages"/>
                    </Tabs>
                </AppBar>
                <SwipeableViews 
                axis={'x'}
                index={this.state.activeIndex}
                onChangeIndex={index=>this.handleChangeIndex(index)}
                >
                    <TabContainer>
                            <Grid  className="mt-3 mb-3" container direction="row">
                                <Grid item md={2}/>
                                <Grid item md={8} xs={12} align='center'>
                                    <Grid item container spacing={4}>
                                            {items && items?.pizzas?.map((pizza, index)=>(
                                                <Grid item md={4} xs={12} key={index}>
                                                    <Card>
                                                        <CardHeader title={pizza.pizzaName} ></CardHeader>
                                                        <CardMedia> <img  src={pizza.imageUrl} height="200px"/></CardMedia>
                                                        <CardContent>{pizza.description}</CardContent>
                                                        <CardContent>Price: {pizza.price}</CardContent>
                                                    </Card>
                                                </Grid>
                                            ))}
                                    </Grid>
                                </Grid>
                                <Grid item md={2}/>
                            </Grid>
                    </TabContainer>
                    <TabContainer>
                    <Grid  className="mt-3 mb-3" container direction="row">
                                <Grid item md={2}/>
                                <Grid item md={8} xs={12} align='center'>
                                    <Grid item container spacing={2}>
                                            {items && items?.sides?.map((side, index)=>(
                                                <Grid item md={4} xs={12} key={index}>
                                                    <Card>
                                                        <CardHeader title={side.sideName} ></CardHeader>
                                                        <CardMedia> <img  src={side.imageUrl} height="200px"/></CardMedia>
                                                        <CardContent>{side.description}</CardContent>
                                                        <CardContent>Price: {side.price}</CardContent>
                                                    </Card>
                                                </Grid>
                                            ))}
                                    </Grid>
                                </Grid>
                                <Grid item md={2}/>
                            </Grid>
                    </TabContainer>
                    <TabContainer>
                    <Grid  className="mt-3 mb-3" container direction="row">
                                <Grid item md={2}/>
                                <Grid item md={8} xs={12} align='center'>
                                    <Grid item container spacing={2}>
                                            {items && items?.beverages?.map((beverage, index)=>(
                                                <Grid item md={4} xs={12} key={index}>
                                                    <Card>
                                                        <CardHeader title={beverage.beverageName} ></CardHeader>
                                                        <CardMedia> <img  src={beverage.imageUrl} height="200px"/></CardMedia>
                                                        <CardContent>{beverage.description}</CardContent>
                                                        <CardContent>Price: {beverage.price}</CardContent>
                                                    </Card>
                                                </Grid>
                                            ))}
                                    </Grid>
                                </Grid>
                                <Grid item md={2}/>
                            </Grid>
                    </TabContainer>
                </SwipeableViews>
            </div>
        );
    }
}