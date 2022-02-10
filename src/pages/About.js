import { Container, Box, Typography } from '@mui/material';

let About = () => {
    return <h1 className="App">
      <header className="App-header">
        <Typography variant="h2">About Us</Typography>
        <br />
      </header>

      <Container>
        <Box sx={{ my: 3, mx: 2 }}>
            <Typography variant="body1">
                In American society today there is a constant encouraged reliance on credit, 
                despite it not being available to everyone as a legal right. Currently, there 
                are countless evaluation methods of an individual’s “creditworthiness” in practice. 
                In an effort to regulate the selection criteria of different financial institutions, 
                the Equal Credit Opportunity Act (ECOA) requires that applicants denied a loan are entitled to an Adverse Action notice, 
                a statement from the creditor explaining the reason for the denial. However, 
                these adverse action notices are frequently unactionable and ineffective in 
                providing feedback to give an individual recourse, which is the ability to 
                act up on a reason for denial to raise one’s odds of getting accepted for a loan. 
            </Typography>
            <br></br>
            <Typography variant="body1">
                In our project, we will be exploring whether it is possible to create an 
                interactive interface to personalize adverse action notices in alignment 
                with personal preferences for individuals to gain recourse. We will use 
                different methods and techniques (recourse package, SHAP, LIME) to examine 
                and compare the different adverse action notices that they create. By using 
                these different techniques we will be able to find the most informative and 
                helpful way for individuals to gain recourse by judging the actionability and 
                specificity of the Adverse Action Notices that are created. To create a useful 
                medium for these adverse action notices, we will be creating an interactive 
                web interface where users can be shown an action set and specify certain 
                variables and cells manually. Their adverse action notice will then adjust 
                to take into account the user’s preferences and what is most actionable to them. 
            </Typography>
            <br></br>
            <Typography variant="h4" align="center">Our Team</Typography>
            <br />
            <Typography variant="body1">
                We are talented amazing group of researchers.
            </Typography>
        </Box>
      </Container>
    </h1>
  }

export default About;