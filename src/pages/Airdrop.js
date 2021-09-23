import React from 'react'  
import Button from '@material-ui/core/Button'; 
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert'; 
import Typography from '@material-ui/core/Typography'; 
import Image from './components/images/image.png';  
import web3 from '../eth/web3' 
import Airdrop from '../eth/Contract'
 
import Alert from  '@material-ui/lab/Alert'; 

export default class Exchange extends React.Component{ 
    
    state = {
        account: null,    
        alertSeverity: 'info',
        alertText: '',  

        status: false,
        statusMessage: '',
        pendingTransaciton: false,

        claimMessage: '',
        claimStatus: false
        
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
                    console.log('Airdrop:', Airdrop)
                    if(Airdrop.contract && Airdrop.address){
                        const callback = await Airdrop.contract.methods.checkStatus(account).call()
                        console.log('Status:', callback)
                        if(callback){
                            let status = callback['0']
                            let amount_wei = callback['1']
                            let amount = web3.utils.fromWei(amount_wei.toString(), 'ether')
                            let message = ''
                            if(status){
                                message = `Available reward: ${amount} CRD` 
                            }else{
                                message = `    No rewards available`
                            }
                            this.setState({statusMessage: message, status, claimMessage: '', claimStatus: false})
                            this.removeMessage()
                        }
                    } 
                }
            }
        }catch(e){
            this.setState({alertSeverity: 'error', alertText: 'There was an issue, please try again!'})
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
            <div> 
                <AppBar position="static" color="inherit"> 
                    <Toolbar> 
                    <img src={Image} alt="logo"  />
                        <Typography variant="h6" noWrap style={{ flexGrow: 1, marginLeft: 10}}>
                            CryptalDash Airdrop
                        </Typography>
                        
                        <Button    
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

                <div style={{marginTop: "15%", marginLeft: "35%"}}>
                    
                    <div>
                        <Button 
                            variant="outlined" 
                            color="primary" 
                            style={{ width: 200, marginLeft: 50}}
                            disabled={this.state.status === false || this.state.pendingTransaciton === true}
                            onClick={this.claimReward}
                        >
                            Claim reward
                        </Button>
                    </div>

                    <div> 
                        <Button 
                            variant="outlined" 
                            color="primary" 
                            style={{marginTop: 30, width: 200, marginLeft: 50}}  
                            onClick={this.checkStatus}
                            disabled={this.state.pendingTransaciton === true}
                        >
                            Check status
                        </Button>  
                    
                        {this.state.statusMessage.length > 0 && ( 
                            <Alert style={{marginTop:80, width: 300}} severity={ this.state.status === true ? "success" : "info" } color={ this.state.status === true ? "success" : "info" }>
                                {this.state.statusMessage}
                            </Alert> 
                        )} 


                        {this.state.claimMessage.length > 0 && ( 
                            <Alert style={{marginTop:80, width: 300}} severity={ this.state.claimStatus === true ? "success" : "error" } color={ this.state.claimStatus === true ? "success" : "error" }>
                                {this.state.claimMessage}
                            </Alert> 
                        )} 
                    </div>
                   
                     
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
            
            </div>
            
        )
    } 
}