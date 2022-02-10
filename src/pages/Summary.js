import { Container, Box, Typography } from '@mui/material';

let Summary = () => {
    return (
        <Container>
            <Box sx={{ my: 3, mx: 2 }}>
            <Typography variant="h2" align="center">Actionable Recourse</Typography>
            <br />
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
            with personal preferences for individuals to gain recourse. 
            </Typography>
            </Box>
        </Container>
    )
  }

export default Summary;