import * as React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import { styled } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton'; 
import Typography from '@material-ui/core/Typography';
import CRDPointLogo from '../../assets/images/crd-point.svg';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

const BootstrapDialogTitle = (props) => {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
         
        </IconButton>
      ) : null}
    </DialogTitle>
  );
};

BootstrapDialogTitle.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func.isRequired,
};

export default function CustomizedDialogs() {
  const [open, setOpen] = React.useState(!JSON.parse(localStorage.getItem('crdtoken_cookies')));

 
  const handleClose = () => { 
    localStorage.setItem('crdtoken_cookies', JSON.stringify(true))  
    setOpen(false)
  }


  return (
    <div>
        <BootstrapDialog 
            aria-labelledby="customized-dialog-title"
            open={open}
            style={{width: "800"}}
        >
            <BootstrapDialogTitle
                id="customized-dialog-title"
                onClose={handleClose}
            >
            Cookie Policy
            </BootstrapDialogTitle>
            <DialogContent dividers>
                <div style ={{ inlineSize: "100%", overflowWrap: "break-word"}}>
                    <Typography  style={{  fontSize:14 }}>
                        Our Website uses cookies to distinguish you from other users of our Website.
                        This helps us to provide you with a good experience when you browse our Website and also allows us to improve our sites. 
                        Cookies are small text files with information, which are stored by the server of a website on the terminal device 
                        (computer, mobile phone, etc.) of a visitor/user while navigating it.
                        The website shall retrieve this information on each visit in order to provide relevant services. A typical example of such information is the user’s preferences on a website, as stated by the choices made on it (e.g. selecting certain buttons, searches etc.). Cookies can be installed by the provider of the website visited by the user (first party cookies) or by others through the provider of the website (third party cookies).
                    </Typography>
                    <br/> 
                    <Typography  style={{  fontSize:14 }}>
                        We use the following Cookies:
                        </Typography>
                        <br/>
                        <Typography  style={{  fontSize:14 }}>
                            <img src={CRDPointLogo}/> Strictly necessary cookies. These are cookies that are required for the operation of our websites. They include, for example, cookies that enable you to log into secure areas of our websites, use a shopping cart or make use of e-commerce payment processing Services.
    
                        </Typography>
                        <br/>
                        <Typography  style={{  fontSize:14 }}>
                        <img src={CRDPointLogo}/> Analytical/performance cookies. They allow us to recognize and count the number of visitors and to see how visitors move around our Website when they are using it. This helps us to improve the way our Website works, for example, by ensuring that users are finding what they are looking for easily.
                        </Typography>
                        <br/>
                        <Typography  style={{  fontSize:14 }}>
                        <img src={CRDPointLogo}/> Functionality cookies. These cookies are used to recognize you when you return to our Website. They enable us to personalize our content for you, greet you by name, and remember your preferences (for example, your choice of language or region).
                        </Typography>
                        <br/>
                        <Typography  style={{  fontSize:14 }}>
                        <img src={CRDPointLogo}/> Targeting cookies. These cookies record your visit to our websites, the pages you have visited, and the links you have followed.
                        </Typography>
                        <br/>
                        <Typography  style={{  fontSize:14 }}>
                        We use the cookies necessary to maintain the connection of users to our online services and to store user/visitors’ choices with regard to optional cookies (“Strictly Necessary”). With the consent of visitors/users we will use additional optional cookies for audience measurement and analysis in order to improve the performance and content of the Website.
                        </Typography>
                        <br/>
                        <Typography  style={{  fontSize:14 }}>
                        In addition, visitors/users may share Website content on Facebook social media after giving their consent. During sharing, Facebook installs its own cookies on the visitor/user’s terminal device called third party cookies. CRD Network is not related to the installation and use of these cookies, nor does collect relevant data. CRD Network only stores the user’s choice to enable the content sharing option. Information on each category of cookies is then provided and the visitor/user is able to manage his/her preferences regarding their use.
                        </Typography>
                        <br/>
                        <Typography  style={{  fontSize:14 }}>
                        The additional optional cookies are by default deactivated and are activated only with positive action of the visitor/user. However, if you use your browser settings to block all cookies (including essential cookies), you may not be able to access all or parts of our sites.
                        </Typography>
                        <br/>
                        <Typography  style={{  fontSize:18, color:  "#800af5"}}>
                            EXAMPLES ON HOW WE MIGHT USE YOUR COOKIES
                        </Typography>
                        <br/>
                        <Typography  style={{  fontSize:14 }}>
                            The following are some examples of information that we collect and how we may use it:
                        </Typography>
                        <br/>
                        <Typography  style={{  fontSize:14 }}>
                        <img src={CRDPointLogo}/> We may collect and store details of how you use our Website and Services. Except in limited instances to ensure the quality of our Services over the Internet, such information will not be associated with your IP address.
                        </Typography>
                        <br/>
                        <Typography  style={{  fontSize:14 }}>
                        <img src={CRDPointLogo}/> We may collect information such as your language, inferred zip code or area code, unique device identifier, referrer URL, location, and time zone so that we can better understand customer behavior and improve our Services.
                        </Typography>
                        <br/>
                        <Typography  style={{  fontSize:14 }}>
                        <img src={CRDPointLogo}/> We may collect information regarding customer activities on our websites and platforms, which is used to understand which parts of our Website and Services are of most interest. This data is aggregated and thus is considered non-personal information for the purposes of this Cookie Policy and our Privacy Policy.
                        </Typography>
                        <br/>
                        <Typography  style={{  fontSize:18, color:  "#800af5" }}>
                            LENGTH TIME OF THE COOKIES
                        </Typography> 
                        <br/>
                        <Typography  style={{  fontSize:14 }}>
                        The length of time a cookie will stay on your browsing device depends on whether it is a "persistent" or "session" cookie. Session cookies will only stay on your device until you close your browser. Persistent cookies stay on your browsing device until they expire or are deleted.
                        </Typography> 
                        <br/>
                        <Typography  style={{ fontSize:18, color:  "#800af5"  }}>
                        OTHER SIMILAR TECHNOLOGIES USED
                        </Typography> 
                        <br/>
                        <Typography  style={{  fontSize:14 }}>
                        In addition to cookies, we may use other similar technologies, like web beacons to track users of our Website and Services. Web beacons, or "clear gifs," are tiny graphics with a unique identifier, similar in function to cookies. They are used to track the online movements of web users.
                        </Typography> 
                        <br/>
                        <Typography  style={{  fontSize:14 }}>
                        In contrast to cookies, which are stored on a user's computer hard drive or device, clear gifs are embedded invisibly on webpages and are about the size of the period at the end of this sentence. We and our third-party service provider employ web beacons for the reasons stated above (under "Cookies"), but primarily to help us better manage content on our Services by informing us which content is effective.
                        </Typography> 
                        <br/>
                        <Typography  style={{  fontSize:14 }}>
                        We may also use so-called "Flash Cookies" (also known as "Local Shared Objects'' or "LSOs") to collect and store information about your use of our Services, fraud prevention, and for other site operations.
                        </Typography> 
                        <br/>
                        <Typography  style={{  fontSize:18, color:  "#800af5"}}>
                        CHANGES TO THIS COOKIE POLICY
                        </Typography> 
                        <br/>
                        <Typography  style={{  fontSize:14 }}>
                        CRD Network reserves the right to, and might from time to time, make changes to this Cookie Policy. If this policy changes, the revised policy will be posted on our home page. Please check this policy on the site frequently. With your consent on the use of Cookies primarily, you also accept future changes in this policy, except where further steps are required by applicable law. It is your responsibility to review the Cookie Policy periodically. This policy was last updated on the date set out at the end of the policy.
                        </Typography> 
                        <br/>
                        <Typography  style={{ fontSize:18, color:  "#800af5" }}>
                        CONTACT US
                        </Typography> 
                        <br/>
                        <Typography  style={{  fontSize:14 }}>
                        You can contact our privacy team with any questions or concerns at the address below.
                        </Typography> 
                        <br/>
                        <Typography  style={{  fontSize:14 }}>
                        Please contact our privacy team with any questions or concerns regarding this Privacy Policy to info@crdtoken.org.
                        </Typography> 
                        <br/>
                        <Typography  style={{  fontSize:14 }}>
                        Last updated: 03-05-2021
                        </Typography> 
                        <br/>
                        <Typography  style={{  fontSize:14 }}>
                            
                        </Typography> 
                        <br/>
                        <Typography  style={{  fontSize:14 }}>
                            
                        </Typography> 
                        <br/>
                        <Typography  style={{  fontSize:14 }}>
                            
                        </Typography> 
                        <br/>
                        <Typography  style={{  fontSize:14 }}>
                            
                        </Typography>  
                    </div>
            
            </DialogContent>
            <DialogActions>
                <Button 
                    variant="outlined" 
                    color="primary" 
                    style={{ 
                        width: 200, 
                        marginLeft: "2%",
                            borderRadius: "5em", 
                            borderColor: "#800af5" ,
                            color:  "#800af5" ,
                    }}  
                    onClick={handleClose}  
                >Accept
                </Button>
            </DialogActions>
        </BootstrapDialog>

        </div>
  ) 
}
