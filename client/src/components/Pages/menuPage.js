import React from 'react'
import axios from 'axios';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import SwipeableViews from 'react-swipeable-views';


function TabContainer({ children }) {
    return <Typography component="div">{children}</Typography>;
  }

export default class MenuPage extends React.Component{
    constructor(){
        super();
        this.state ={
            pizzas: null, //initial pizza state
            activeIndex: 0,
        }
    }

    async getPizzas () {
        console.log("Function is working")
          try {
            let res = await axios({
              method: 'post',
              url: "http://localhost:3001/api/pizzas",
              data: {

              }
            });
            console.log( 'LOGIN RESPONSE' ,res.data);
            console.log("ID", res?.data?.pizzas )
            this.setState({pizzas: res?.data?.pizzas})
            console.log("Pizzasssssssssssss", this.state.pizzas)
          } catch (e) {
            console.log(e.toString());
          }
        }
        
        componentDidMount(){
            this.getPizzas();
        }

        handleChangeIndex(index) {
            this.setState({ activeIndex: index });
          }
        
          handleChange(event, value) {
            this.setState({ activeIndex: value });
          }

    render(){
        return(
            <div>
                <h3 align='center'> Pizza Menu </h3>
                <AppBar position="static">
                    <Tabs centered value={this.state.activeIndex}
                    onChange={(e,value)=> this.handleChange(e,value)}
                    >
                    <Tab label="Veg" />
                    <Tab label="Non-Veg" />
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
                        
                    </TabContainer>
                    <TabContainer>
                        <h1>Non-Veg</h1>
                    </TabContainer>
                    <TabContainer>
                        <h1>Sides</h1>
                    </TabContainer>
                    <TabContainer>
                        <h1>Beverages</h1>
                    </TabContainer>
                </SwipeableViews>
            </div>
        );
    }
}