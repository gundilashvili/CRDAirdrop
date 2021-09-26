import React from 'react'  
import Button from '@material-ui/core/Button'; 
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert'; 
import Typography from '@material-ui/core/Typography';   
import { Grid } from "@material-ui/core";    
import Logo from '../assets/images/logo.jpeg';  
import BoxCRD from '../assets/images/box_crd.png';  
import BoxEmpty from '../assets/images/box_empty.png';  
import Background from '../assets/images/background.png';  
import TwitterLogo from '../assets/images/akar-icons_twitter-fill.svg'
import MediumLogo from '../assets/images/Vector-2.svg'
import YoutubeLogo from '../assets/images/akar-icons_youtube-fill.svg'
import LinkedinLogo from '../assets/images/Group.svg'
import BitcloutLogo from '../assets/images/bitclout.svg'
import TelegramLogo from '../assets/images/Vector-1.svg'
import RedditLogo from '../assets/images/Reddit.png' 
import DiscordLogo from '../assets/images/Discord.png' 

import CookiePolicy from './components/CookiePolicy';
import Airdrop from '../eth/Contract'
import web3 from '../eth/web3' 

export default class Exchange extends React.Component{ 
    
    state = {
        account: null,    
        alertSeverity: 'info',
        alertText: '',  

        status: false,
        statusMessage: '',
        pendingTransaciton: false,
        pendingStatus: false,
        claimMessage: '',
        claimStatus: false,
        cookiePopupIsOpen: true
    } 

    async componentDidMount() { 
        if(web3){
            const accounts = await web3.eth.getAccounts() 
            this.setState({account: accounts[0]})
        } 
    }

  
    getAccount = async () => {
        if(web3){
            const accounts = await web3.eth.getAccounts() 
            this.setState({account: accounts[0]})
        } 
    }


    removeMessage = () => {
        setTimeout(() => {
            this.setState({statusMessage: '', claimMessage: ''})
        }, 4000)
    }


    handleClosePopup = () => {
        this.setState({cookiePopupIsOpen: false})
    }



    connectWallet = async () => {
        if(web3){
            await window.ethereum.enable()
            this.getAccount()
        }else{
            this.setState({alertSeverity: 'error', alertText: "Non-Ethereum browser detected. You should consider trying MetaMask!"})
        }
    }


    
    checkStatus = async () => { 
        try{
            if(!this.state.account){ 
                this.connectWallet()
            }else{
                const accounts = await web3.eth.getAccounts() 
                const account = accounts[0]
                
                if(account){
                    this.setState({pendingStatus: true})
                    if(Airdrop.contract && Airdrop.address){
                        const callback = await Airdrop.contract.methods.checkStatus(account).call()
                        
                        if(callback){
                            let status = callback['0']
                            let amount_wei = callback['1']
                            let amount = web3.utils.fromWei(amount_wei.toString(), 'ether')
                            let message = ''
                            if(status){
                                message = `Available reward: ${amount} CRD` 
                            }else{
                                message = ` Reward not available`
                            }
                            this.setState({statusMessage: message, status, claimMessage: '', claimStatus: false, pendingStatus: false})
                            this.removeMessage()
                        }
                    } 
                }  
            }
        }catch(e){
            this.setState({alertSeverity: 'error', alertText: 'There was an issue, please try again!'  , pendingStatus: false})
            console.log(e)
        } 
    }


    



    claimReward = async () => {
        try{
            if(!this.state.account){ 
                this.connectWallet()
            }else{
                const accounts = await web3.eth.getAccounts() 
                const account = accounts[0] 
                this.setState({pendingTransaciton: true})
                
                if(account){ 
                    if(Airdrop.contract && Airdrop.address){
                        const callback = await Airdrop.contract.methods.claimReward().send({from : account})
                        if(callback){
                            this.setState({
                                claimMessage: 'Successfully claimed!', 
                                claimStatus: true,
                                status: false,
                                statusMessage: '',
                                pendingTransaciton: false,
                            
                            })
                            this.removeMessage()
                        }else{
                            this.setState({
                                claimMessage: 'There was an issue, Please check the reward status!', 
                                claimStatus: false, 
                                status: false,
                                statusMessage: '',
                                pendingTransaciton: false
                            })
                            this.removeMessage()
                        }
                    } 
                }
            }
        }catch(e){
            this.setState({
                alertSeverity: 'error', 
                alertText: 'There was an issue, please try again!', 
                status: false,
                statusMessage: '',
                pendingTransaciton: false
            })
            console.log(e)
        } 
    }


    render(){ 
        function Alert(props) {
            return <MuiAlert  elevation={6} variant="filled" {...props} />;
        }  
        return (
            <div style={{backgroundImage: `${Background}`}}> 
                <AppBar position="sticky" color="inherit"> 
                    <Toolbar> 
                    <img style={{width: 300}}src={Logo} alt="logo" href="/"  />
                        <Typography variant="h6" noWrap style={{ flexGrow: 1, marginLeft: 10}}>
                           
                        </Typography>
                        
                        <Button    
                            style={{  borderRadius: "5em", borderColor: "#800af5", color: "#800af5"}}
                            color="primary" 
                            variant="outlined" 
                            onClick={async() => {
                                if(!this.state.account){ 
                                   this.connectWallet()
                                }
                            }}
                            >{this.state.account ? this.state.account.slice(0,6) +'....' +this.state.account.slice(-4) : 'Connect to a wallet'}
                        </Button>  
                    </Toolbar> 
                </AppBar> 


                <div style={{marginTop: "8%", marginLeft: "20%"}}> 
                    <Grid container spacing={4} >
                        <Grid item lg={6}  sm={6}  xl={6}  xs={12}  > 
                            <Typography variant="h5" noWrap style={{ flexGrow: 1, marginLeft: 10 }}>
                                Registration is closed
                            </Typography>
                            <div style={{  marginLeft: "11%",  marginTop: "5%" }}>
                                 <img  src={BoxCRD} alt="logo" /> 
                            </div>

                            <div style={{marginTop: "5%"}}>
                                <Typography variant="h6" noWrap style={{ flexGrow: 1, marginLeft: 10, marginLeft: "4%"}}>
                                    CRD Socials Airdrop 
                                </Typography>
                            </div>

                            <div style={{marginTop: "5%"}}>
                                <Typography variant="h6" noWrap style={{ fontSize:18, flexGrow: 1, marginLeft: 10, marginLeft: "6%"}}>
                                    VALUE: 3000 CRD 
                                </Typography>
                            </div>


                            <div style={{marginTop: "5%"}}> 
                                <Button 
                                    variant="outlined" 
                                    color="primary" 
                                    style={{ 
                                        width: 225, 
                                        marginLeft: "2%", 
                                        borderRadius: "5em", 
                                        borderColor: (this.state.status === false || this.state.pendingTransaciton === true) ? "": "#800af5", 
                                        color: (this.state.status === false || this.state.pendingTransaciton === true) ? "": "#800af5"
                                    }}
                                    disabled={this.state.status === false || this.state.pendingTransaciton === true}
                                    onClick={this.claimReward}
                                >
                                    Claim
                                </Button> 
                                <div>
                                    <Button 
                                        variant="outlined" 
                                        color="primary" 
                                        style={{
                                            marginTop: 30, 
                                            width: 225, 
                                            marginLeft: "2%",
                                             borderRadius: "5em", 
                                             borderColor: this.state.pendingStatus === false ?  "#800af5" : "", 
                                             color: this.state.pendingStatus === false ?  "#800af5" : "", 
                                        }}  
                                        onClick={this.checkStatus}
                                        disabled={this.state.pendingTransaciton === true || this.state.pendingStatus === true}
                                    >
                                         {this.state.pendingStatus === true? "Checking reward...": "Check Reward "}
                                    </Button>   
                                    {this.state.statusMessage.length > 0 && ( 
                                        <Alert style={{marginTop:40, width: 250}} severity={ this.state.status === true ? "success" : "info" } color={ this.state.status === true ? "success" : "info" }>
                                            {this.state.statusMessage}
                                        </Alert> 
                                    )}  
                                </div>
                            </div> 
                        </Grid>




                        <Grid item lg={6}  sm={6}  xl={6}  xs={12}  > 
                        <div>
                            <Typography variant="h5" noWrap style={{ flexGrow: 1, marginLeft: 10}}>
                                Upcoming airdrops  
                            </Typography>
                        </div>
                      

                        <div style={{  marginLeft: "10%",  marginTop: "5%" }}>
                            <img  src={BoxEmpty} alt="logo" /> 
                        </div>

                        <div style={{marginTop: "5%"}}>
                            <Typography variant="h6" noWrap style={{ flexGrow: 1, marginLeft: 10}}>
                                KYC Airdrop Coming soon 
                            </Typography>
                        </div>
                        
                        <div style={{marginTop: "13%"}}>
                            <Button 
                                variant="outlined" 
                                color="primary" 
                                style={{ 
                                    width: 225, 
                                    marginLeft: "2%", 
                                    borderRadius: "5em" 
                                }}
                                disabled={true} 
                            >
                                Register
                            </Button> 
                        </div>
                                
                        </Grid>
                    </Grid>
                </div>
 
                
                <Snackbar 
                    anchorOrigin={{ vertical: 'top', horizontal: 'right'  }}
                    open={this.state.alertText.length > 0} 
                    autoHideDuration={8000}  
                    onClose={() => this.setState({alertText: ''}) } 
                >
                    <Alert severity={this.state.alertSeverity}  style={{marginTop: 70,  width: 400}}>
                        {this.state.alertText}
                    </Alert>
                </Snackbar>

                 




                <div className="footer">
                    <div style={{  textAlign:"center"}}> 
                        <a  style={{color: "black"}}href="https://etherscan.io/address/0x72bd28a344924baf2d0eecda9df49d8ece6dd728#code" target="_blank" >Smart Contract: &nbsp;&nbsp; 0x72bd28a344924baf2d0eecda9df49d8ece6dd728</a>
                    </div>
                    <hr style={{marginTop:30}}/>
                    <footer>
                   
                        <div className="social">
                            <a href="https://twitter.com/CRDNetwork" target="_blank">  
                                <img 
                                    src={TwitterLogo} 
                                    style={{
                                        marginBottom: 8,
                                        width: "25px",
                                        height: "25px",
                                        maxWidth: "100%",
                                        verticalAlign: "middle",
                                        display: "inline-block"
                                    }}
                                />  
                            </a>
                            <a href="https://medium.com/crd-network" target="_blank">  
                                <img 
                                    src={MediumLogo} 
                                    style={{
                                        marginBottom: 8,
                                        width: "25px",
                                        height: "25px",
                                        maxWidth: "100%",
                                        verticalAlign: "middle",
                                        display: "inline-block"
                                    }}
                                />  
                            </a>
                            <a href="https://www.youtube.com/channel/UCfFK9U_9HRW1GMu9nouZzPA" target="_blank">  
                                <img 
                                    src={YoutubeLogo} 
                                    style={{
                                        marginBottom: 8,
                                        width: "25px",
                                        height: "25px",
                                        maxWidth: "100%",
                                        verticalAlign: "middle",
                                        display: "inline-block"
                                    }}
                                />  
                            </a>
                      
                            <a href="https://www.linkedin.com/company/crdnetwork/" target="_blank">  
                                <img 
                                    src={LinkedinLogo} 
                                    style={{
                                        marginBottom: 8,
                                        width: "25px",
                                        height: "25px",
                                        maxWidth: "100%",
                                        verticalAlign: "middle",
                                        display: "inline-block"
                                    }}
                                />  
                            </a>
                            <a href="https://bitclout.com/u/CRD?feedTab=Global" target="_blank">  
                                <img 
                                    src={BitcloutLogo} 
                                    style={{
                                        marginBottom: 8,
                                        width: "25px",
                                        height: "25px",
                                        maxWidth: "100%",
                                        verticalAlign: "middle",
                                        display: "inline-block"
                                    }}
                                />  
                            </a>
                            <a href="https://t.me/CRD_official_EN" target="_blank">  
                                <img 
                                    src={TelegramLogo} 
                                    style={{
                                        marginBottom: 8,
                                        width: "25px",
                                        height: "25px",
                                        maxWidth: "100%",
                                        verticalAlign: "middle",
                                        display: "inline-block"
                                    }}
                                />  
                            </a>
                            <a href="https://www.reddit.com/r/CRD_Network/" target="_blank">  
                                <img 
                                    src={RedditLogo} 
                                    style={{
                                        marginBottom: 8,
                                        width: "25px",
                                        height: "25px",
                                        maxWidth: "100%",
                                        verticalAlign: "middle",
                                        display: "inline-block"
                                    }}
                                />  
                            </a>
                  
                            <a href="https://discord.com/invite/ZNHm9u3s" target="_blank">  
                                <img 
                                    src={DiscordLogo} 
                                    style={{
                                        marginBottom: 8,
                                        width: "25px",
                                        height: "25px",
                                        maxWidth: "100%",
                                        verticalAlign: "middle",
                                        display: "inline-block"
                                    }}
                                />  
                            </a>
 

                        </div>
                        <ul className="list-inline">
                            <li className="list-inline-item"><a href="https://www.crdtoken.org/terms-of-use">Terms of use</a></li>
                            <li className="list-inline-item"><a href="https://www.crdtoken.org/cookie-policy">Cookies</a></li>
                            <li className="list-inline-item"><a href="https://www.crdtoken.org/privacy-policy">Privacy</a></li> 
                        </ul> 
                    </footer>
                </div>
                  
                <CookiePolicy
                    close={this.handleClosePopup} 
                    isOpen={this.state.cookiePopupIsOpen}
                />  
            </div> 
        )
    } 
}