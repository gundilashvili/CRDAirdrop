
import React, {Component } from 'react' 
import Button from '@material-ui/core/Button';  
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';   

export default class CookiePolicy extends Component{
    
    render(){
        return (
            <div  > 
                <DialogContent> 
                     
                          
                </DialogContent> 
                <br/>
                 
                <DialogActions>   
                    <Button 
                        variant="outlined" 
                        color="primary" 
                        style={{
                            marginTop: 30, 
                            width: 225, 
                            marginLeft: "2%",
                                borderRadius: "5em", 
                                borderColor: "#800af5" ,
                                color:  "#800af5" ,
                        }}  
                        onClick={this.props.close}  
                     >Accept
                     </Button>
                   
                </DialogActions>
            </div>
        )
    }
}