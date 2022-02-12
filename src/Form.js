import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import {
    Button, TextField, FormControl, FormLabel,
    RadioGroup, FormControlLabel, Radio, Checkbox, Grid,
    Box, Container, Divider, Typography
} from '@mui/material';
import createUserInput from './InputData.js';

let ActionForm = () => {
    const { setValue, getValues, register, handleSubmit, formState: { errors } } = useForm();
    const [predicted, setPredicted] = useState(-1);

    let clearAll = () => {
        for (let i = 0; i < document.getElementsByTagName("input").length; i++) {
            document.getElementsByTagName("input")[i].value = null;
            document.getElementsByTagName("input")[i].removeAttribute("checked");
        }
    }

    // Handle POST request to the API when form is submitted
    const onSubmit = (user_input) => {
        console.log(user_input);
        const axios = require('axios');
        const data = createUserInput(user_input)
        console.log(data)
        axios.post("https://recourse-api.herokuapp.com/predict", data)
            .then(res => res.data)
            .then((result) => {
                setPredicted(result.predicted);
                // If credit denied, show a list of actions to revert the decision
                if (!result.predicted) {
                    const warning_text = "<p>Here are the things you can do to get accepted.</p>";
                    document.getElementById('button_result_table').innerHTML = warning_text + result.recourse_actions;
                } else {
                    document.getElementById('button_result_table').innerHTML = "";
                }
            })
            .catch(function (error) {
                // handle error
                console.log(error);
            })
            .then(function () {
                // always executed
            });
    };


    useEffect(() => { }, [])

    const tableFieldStyle = { mx: 1, my: 0.5, height: 100 };
    const boundStyle = { '& .MuiTextField-root': { mx: 1.2, width: '8ch' }, }

    setValue("Actionable_bool", [-1, -1, -1, -1, 1, 1, 1, 1, 1, 1, 1, 1, 1]);

    return (
        <div>
            <Container maxWidth="xl" sx={{ mx: 10 }}>
                <center>
                    <Box sx={{ my: 4, mx: 4 }}>
                        <Typography variant="h4">Credit Approval Prediction</Typography><br />
                        <Typography variant="body1">
                            Fill in the form below to see if you will be denied for credit or not. If you are denied,
                            a list of actions that are required to get accepted will be shown below.
                        </Typography>
                    </Box></center>
                <Divider variant="middle" />

                <form onSubmit={handleSubmit(onSubmit)}>
                    <Box
                        component="form"
                        sx={{
                            '& > :not(style) & .MuiTextField-root': { m: 1, width: '25ch' },
                        }}
                        noValidate
                    >
                        <br />
                    </Box>

                    <Grid >
                        <div style={{ float: "left", width: "35%" }}>

                            {/* 1. Age */}
                            <Box sx={tableFieldStyle}><FormControl ><p>Your Age: </p>
                                <TextField variant="outlined" type="number" label="Age" defaultValue={21}
                                    {...register("Age", { required: true, max: 100, min: 0 })} />
                            </FormControl> </Box>

                            {/* 2. Marital */}
                            <Box sx={tableFieldStyle}><FormControl ><p>Marital Status: </p>
                                <FormLabel id="marriage-radio-button"></FormLabel>
                                <RadioGroup aria-labelledby="marriage-radio-button" defaultValue="1" row>
                                    <FormControlLabel value="1" {...register("Married", { required: true })} control={<Radio />} label="Single" />
                                    <FormControlLabel value="0" {...register("Married", { required: true })} control={<Radio />} label="Married" />
                                </RadioGroup>
                            </FormControl></Box>

                            {/* 3. education */}
                            <Box sx={tableFieldStyle}><FormControl ><p>Education Level: </p>
                                <FormLabel id="education-radio-button"></FormLabel>
                                <RadioGroup aria-labelledby="education-radio-button" defaultValue="3" row>
                                    <FormControlLabel value="3" {...register("EducationLevel", { required: true })} control={<Radio />} label="high school" />
                                    <FormControlLabel value="2" {...register("EducationLevel", { required: true })} control={<Radio />} label="university" />
                                    <FormControlLabel value="1" {...register("EducationLevel", { required: true })} control={<Radio />} label="graduate school" />
                                    <FormControlLabel value="0" {...register("EducationLevel", { required: true })} control={<Radio />} label="others" />
                                </RadioGroup>
                            </FormControl></Box>

                            {/* 4. History over due */}
                            <Box sx={tableFieldStyle}> <FormControl><p>Do you have any history of over due payments?</p>
                                <FormLabel id="historyoverdue-radio-button">
                                </FormLabel>
                                <RadioGroup aria-labelledby="historyoverdue-radio-button" defaultValue="1" row>
                                    <FormControlLabel value="1" {...register("HistoryOfOverduePayments", { required: true })} control={<Radio />} label="Yes" />
                                    <FormControlLabel value="0" {...register("HistoryOfOverduePayments", { required: true })} control={<Radio />} label="No" />

                                </RadioGroup>
                            </FormControl></Box>

                            {/* 5. max bill amount */}
                            <Box sx={tableFieldStyle}> <FormControl><p>Your maximum bill amount: </p>
                                {/* <p>What is your maximum bill amount over the last 6 months?</p> */}
                                <TextField variant="outlined" type="number" defaultValue={2500} {...register("MaxBillAmountOverLast6Months", { required: true, min: 0 })} />
                            </FormControl></Box>

                            {/* 6. max pay amount */}
                            <Box sx={tableFieldStyle}> <FormControl><p>Your maximum payment amount: </p>
                                <TextField variant="outlined" type="number" defaultValue={2500} {...register("MaxPaymentAmountOverLast6Months", { required: true, min: 0 })} />
                            </FormControl></Box>

                            {/* 7 MonthsWithLowSpendingOverLast6Months*/}
                            <Box sx={tableFieldStyle}> <FormControl><p>How many months did you have high spending?</p>
                                <FormLabel id="q7MonthsWithHighSpendingOverLast6Months">
                                </FormLabel>
                                <RadioGroup aria-labelledby="q7MonthsWithHighSpendingOverLast6Months" defaultValue="6" row>
                                    <FormControlLabel value="0" {...register("MonthsWithHighSpendingOverLast6Months", {required: true, max: 6, min: 0})} control={<Radio />} label="0" />
                                    <FormControlLabel value="1" {...register("MonthsWithHighSpendingOverLast6Months", {required: true, max: 6, min: 0})} control={<Radio />} label="1" />
                                    <FormControlLabel value="2" {...register("MonthsWithHighSpendingOverLast6Months", {required: true, max: 6, min: 0})} control={<Radio />} label="2" />
                                    <FormControlLabel value="3" {...register("MonthsWithHighSpendingOverLast6Months", {required: true, max: 6, min: 0})} control={<Radio />} label="3" />
                                    <FormControlLabel value="4" {...register("MonthsWithHighSpendingOverLast6Months", {required: true, max: 6, min: 0})} control={<Radio />} label="4" />
                                    <FormControlLabel value="5" {...register("MonthsWithHighSpendingOverLast6Months", {required: true, max: 6, min: 0})} control={<Radio />} label="5" />
                                    <FormControlLabel value="6" {...register("MonthsWithHighSpendingOverLast6Months", {required: true, max: 6, min: 0})} control={<Radio />} label="6" />
                                </RadioGroup>
                            </FormControl></Box>

                            {/* 8 MonthsWithLowSpendingOverLast6Months*/}
                            <Box sx={tableFieldStyle}> <FormControl><p>How many months did you have low spending?</p>
                                <FormLabel id="q8MonthsWithLowSpendingOverLast6Months">
                                </FormLabel>
                                <RadioGroup aria-labelledby="q8MonthsWithLowSpendingOverLast6Months" defaultValue="0" row>
                                    <FormControlLabel value="0" {...register("MonthsWithLowSpendingOverLast6Months", {required: true, max: 6, min: 0})} control={<Radio />} label="0" />
                                    <FormControlLabel value="1" {...register("MonthsWithLowSpendingOverLast6Months", {required: true, max: 6, min: 0})} control={<Radio />} label="1" />
                                    <FormControlLabel value="2" {...register("MonthsWithLowSpendingOverLast6Months", {required: true, max: 6, min: 0})} control={<Radio />} label="2" />
                                    <FormControlLabel value="3" {...register("MonthsWithLowSpendingOverLast6Months", {required: true, max: 6, min: 0})} control={<Radio />} label="3" />
                                    <FormControlLabel value="4" {...register("MonthsWithLowSpendingOverLast6Months", {required: true, max: 6, min: 0})} control={<Radio />} label="4" />
                                    <FormControlLabel value="5" {...register("MonthsWithLowSpendingOverLast6Months", {required: true, max: 6, min: 0})} control={<Radio />} label="5" />
                                    <FormControlLabel value="6" {...register("MonthsWithLowSpendingOverLast6Months", {required: true, max: 6, min: 0})} control={<Radio />} label="6" />
                                </RadioGroup>
                            </FormControl></Box>

                            {/* 9 MonthsWithZeroBalanceOverLast6Months*/}
                            <Box sx={tableFieldStyle}> <FormControl><p>How many months did you have no money in your bank account?</p>
                                <FormLabel id="q9MonthsWithZeroBalanceOverLast6Months">
                                </FormLabel>
                                <RadioGroup aria-labelledby="q9MonthsWithZeroBalanceOverLast6Months" defaultValue="0" row>
                                    <FormControlLabel value="0" {...register("MonthsWithZeroBalanceOverLast6Months", {required: true, max: 6, min: 0})} control={<Radio />} label="0" />
                                    <FormControlLabel value="1" {...register("MonthsWithZeroBalanceOverLast6Months", {required: true, max: 6, min: 0})} control={<Radio />} label="1" />
                                    <FormControlLabel value="2" {...register("MonthsWithZeroBalanceOverLast6Months", {required: true, max: 6, min: 0})} control={<Radio />} label="2" />
                                    <FormControlLabel value="3" {...register("MonthsWithZeroBalanceOverLast6Months", {required: true, max: 6, min: 0})} control={<Radio />} label="3" />
                                    <FormControlLabel value="4" {...register("MonthsWithZeroBalanceOverLast6Months", {required: true, max: 6, min: 0})} control={<Radio />} label="4" />
                                    <FormControlLabel value="5" {...register("MonthsWithZeroBalanceOverLast6Months", {required: true, max: 6, min: 0})} control={<Radio />} label="5" />
                                    <FormControlLabel value="6" {...register("MonthsWithZeroBalanceOverLast6Months", {required: true, max: 6, min: 0})} control={<Radio />} label="6" />
                                </RadioGroup>
                            </FormControl></Box>

                            {/* 10. MostRecentBillAmount*/}
                            <Box sx={tableFieldStyle}> <FormControl><p>Most recent bill amount: </p>
                                <TextField variant="outlined" type="number" defaultValue={1000} {...register("MostRecentBillAmount", { required: true, min: 0 })} />
                            </FormControl></Box>

                            {/* 11. MostRecentPaymentAmount*/}
                            <Box sx={tableFieldStyle}> <FormControl><p>Most recent payment amount: </p>
                                <TextField variant="outlined" type="number" defaultValue={1000} {...register("MostRecentPaymentAmount", { required: true, min: 0 })} />
                            </FormControl></Box>

                            {/* 12. TotalMonthsOverdue*/}
                            <Box sx={tableFieldStyle}> <FormControl><p>How many months did you have over dues at most?</p>
                                <FormLabel id="q12TotalMonthsOverdue">
                                </FormLabel>
                                <RadioGroup aria-labelledby="q12TotalMonthsOverdue" defaultValue="0" row>
                                    <FormControlLabel value="0" {...register("TotalMonthsOverdue", {required: true, max: 6, min: 0})} control={<Radio />} label="0" />
                                    <FormControlLabel value="1" {...register("TotalMonthsOverdue", {required: true, max: 6, min: 0})} control={<Radio />} label="1" />
                                    <FormControlLabel value="2" {...register("TotalMonthsOverdue", {required: true, max: 6, min: 0})} control={<Radio />} label="2" />
                                    <FormControlLabel value="3" {...register("TotalMonthsOverdue", {required: true, max: 6, min: 0})} control={<Radio />} label="3" />
                                    <FormControlLabel value="4" {...register("TotalMonthsOverdue", {required: true, max: 6, min: 0})} control={<Radio />} label="4" />
                                    <FormControlLabel value="5" {...register("TotalMonthsOverdue", {required: true, max: 6, min: 0})} control={<Radio />} label="5" />
                                    <FormControlLabel value="6" {...register("TotalMonthsOverdue", {required: true, max: 6, min: 0})} control={<Radio />} label="6" />
                                </RadioGroup>
                            </FormControl></Box>

                            {/* 13. TotalOverdueCounts*/}
                            <Box sx={tableFieldStyle}> <FormControl><p>How many times did you have over due?</p>
                                <FormLabel id="q13TotalOverdueCounts">
                                </FormLabel>
                                <RadioGroup aria-labelledby="q13TotalOverdueCounts" defaultValue="6" row>
                                    <FormControlLabel value="0" {...register("TotalOverdueCounts", {required: true, max: 6, min: 0})} control={<Radio />} label="0" />
                                    <FormControlLabel value="1" {...register("TotalOverdueCounts", {required: true, max: 6, min: 0})} control={<Radio />} label="1" />
                                    <FormControlLabel value="2" {...register("TotalOverdueCounts", {required: true, max: 6, min: 0})} control={<Radio />} label="2" />
                                    <FormControlLabel value="3" {...register("TotalOverdueCounts", {required: true, max: 6, min: 0})} control={<Radio />} label="3" />
                                    <FormControlLabel value="4" {...register("TotalOverdueCounts", {required: true, max: 6, min: 0})} control={<Radio />} label="4" />
                                    <FormControlLabel value="5" {...register("TotalOverdueCounts", {required: true, max: 6, min: 0})} control={<Radio />} label="5" />
                                    <FormControlLabel value="6" {...register("TotalOverdueCounts", {required: true, max: 6, min: 0})} control={<Radio />} label="6" />
                                </RadioGroup>
                            </FormControl></Box>
                        </div>


                        <div style={{ float: "left", width: "20%" }}>
                            {/* need this line below for some style adjustment */}
                            <Box sx={{ my: 2 }}></Box>

                            <Box sx={tableFieldStyle}>
                                <FormControlLabel control={<Checkbox onClick={() => {
                                    setValue("Actionable_bool.0",
                                        (-1) * getValues("Actionable_bool.0"))
                                }} size="small" />} label="Actionable" />

                            </Box>

                            <Box sx={tableFieldStyle}>
                                <FormControlLabel control={<Checkbox onClick={() => {
                                    setValue("Actionable_bool.1",
                                        (-1) * getValues("Actionable_bool.1"))
                                }} size="small" />} label="Actionable" /></Box>
                            <Box sx={tableFieldStyle}>
                                <FormControlLabel control={<Checkbox onClick={() => {
                                    setValue("Actionable_bool.2",
                                        (-1) * getValues("Actionable_bool.2"))
                                }} size="small" />} label="Actionable" /></Box>
                            <Box sx={tableFieldStyle}>
                                <FormControlLabel control={<Checkbox onClick={() => {
                                    setValue("Actionable_bool.3",
                                        (-1) * getValues("Actionable_bool.3"))
                                }} size="small" />} label="Actionable" /></Box>
                            <Box sx={tableFieldStyle}>
                                <FormControlLabel control={<Checkbox defaultChecked onClick={() => {
                                    setValue("Actionable_bool.4",
                                        (-1) * getValues("Actionable_bool.4"))
                                }} size="small" />} label="Actionable" />
                                <Box component="form" sx={boundStyle}>
                                    <div>
                                        <TextField size="small" variant="standard" type="number" label="LB" defaultValue={0}
                                            {...register("MaxBillAmountOverLast6MonthsLowerBound", {required: false, min: 0})} />
                                        <TextField size="small" variant="standard" type="number" label="UB"
                                            {...register("MaxBillAmountOverLast6MonthsUpperBound", {required: false, min: 0})} />
                                    </div>
                                </Box></Box>
                            <Box sx={tableFieldStyle}>
                                <FormControlLabel control={<Checkbox defaultChecked onClick={() => {
                                    setValue("Actionable_bool.5",
                                        (-1) * getValues("Actionable_bool.5"))
                                }} size="small" />} label="Actionable" />
                                <Box component="form" sx={boundStyle}>
                                    <div>
                                        <TextField size="small" variant="standard" type="number" label="LB" defaultValue={0}
                                            {...register("MaxPaymentAmountOverLast6MonthsLowerBound", {required: false, min: 0})} />
                                        <TextField size="small" variant="standard" type="number" label="UB"
                                            {...register("MaxPaymentAmountOverLast6MonthsUpperBound", {required: false, min: 0})} />
                                    </div>
                                </Box></Box>
                            <Box sx={tableFieldStyle}>
                                <FormControlLabel control={<Checkbox defaultChecked onClick={() => {
                                    setValue("Actionable_bool.6",
                                        (-1) * getValues("Actionable_bool.6"))
                                }} size="small" />} label="Actionable" />
                                <Box component="form" sx={boundStyle}>
                                    <div>
                                        <TextField size="small" variant="standard" type="number" label="LB" defaultValue={0}
                                            {...register("MonthsWithHighSpendingOverLast6MonthsLowerBound", {required: false, min: 0, max: 6})} />
                                        <TextField size="small" variant="standard" type="number" label="UB" defaultValue={6}
                                            {...register("MonthsWithHighSpendingOverLast6MonthsUpperBound", {required: false, min: 0, max: 6})} />
                                    </div>
                                </Box></Box>
                            <Box sx={tableFieldStyle}>
                                <FormControlLabel control={<Checkbox defaultChecked onClick={() => {
                                    setValue("Actionable_bool.7",
                                        (-1) * getValues("Actionable_bool.7"))
                                }} size="small" />} label="Actionable" /><Box component="form" sx={boundStyle}>
                                    <div>
                                        <TextField size="small" variant="standard" type="number" label="LB" defaultValue={0}
                                            {...register("MonthsWithLowSpendingOverLast6MonthsLowerBound", {required: false, min: 0, max: 6})} />
                                        <TextField size="small" variant="standard" type="number" label="UB" defaultValue={6}
                                            {...register("MonthsWithLowSpendingOverLast6MonthsUpperBound", {required: false, min: 0, max: 6})} />
                                    </div>
                                </Box></Box>
                            <Box sx={tableFieldStyle}>
                                <FormControlLabel control={<Checkbox defaultChecked onClick={() => {
                                    setValue("Actionable_bool.8",
                                        (-1) * getValues("Actionable_bool.8"))
                                }} size="small" />} label="Actionable" /><Box component="form" sx={boundStyle}>
                                    <div>
                                        <TextField size="small" variant="standard" type="number" label="LB" defaultValue={0}
                                            {...register("MonthsWithZeroBalanceOverLast6MonthsLowerBound", {required: false, min: 0, max: 6})} />
                                        <TextField size="small" variant="standard" type="number" label="UB" defaultValue={6}
                                            {...register("MonthsWithZeroBalanceOverLast6MonthsUpperBound", {required: false, min: 0, max: 6})} />
                                    </div>
                                </Box></Box>
                            <Box sx={tableFieldStyle}>
                                <FormControlLabel control={<Checkbox defaultChecked onClick={() => {
                                    setValue("Actionable_bool.9",
                                        (-1) * getValues("Actionable_bool.9"))
                                }} size="small" />} label="Actionable" /><Box component="form" sx={boundStyle}>
                                    <div>
                                        <TextField size="small" variant="standard" type="number" label="LB"  defaultValue={0}
                                            {...register("MostRecentBillAmountLowerBound", {required: false, min: 0})} />
                                        <TextField size="small" variant="standard" type="number" label="UB"
                                            {...register("MostRecentBillAmountUpperBound", {required: false, min: 0})} />
                                    </div>
                                </Box></Box>
                            <Box sx={tableFieldStyle}>
                                <FormControlLabel control={<Checkbox defaultChecked onClick={() => {
                                    setValue("Actionable_bool.10",
                                        (-1) * getValues("Actionable_bool.10"))
                                }} size="small" />} label="Actionable" /><Box component="form" sx={boundStyle}>
                                    <div>
                                        <TextField size="small" variant="standard" type="number" label="LB" defaultValue={0}
                                            {...register("MostRecentPaymentAmountLowerBound", {required: false, min: 0})} />
                                        <TextField size="small" variant="standard" type="number" label="UB"
                                            {...register("MostRecentPaymentAmountUpperBound", {required: false, min: 0})} />
                                    </div>
                                </Box></Box>
                            <Box sx={tableFieldStyle}>
                                <FormControlLabel control={<Checkbox defaultChecked onClick={() => {
                                    setValue("Actionable_bool.11",
                                        (-1) * getValues("Actionable_bool.11"))
                                }} size="small" />} label="Actionable" /><Box component="form" sx={boundStyle}>
                                    <div>
                                        <TextField size="small" variant="standard" type="number" label="LB" defaultValue={0}
                                            {...register("TotalMonthsOverdueLowerBound", {required: false, min: 0, max: 6})} />
                                        <TextField size="small" variant="standard" type="number" label="UB" defaultValue={6}
                                            {...register("TotalMonthsOverdueUpperBound", {required: false, min: 0, max: 6})} />
                                    </div>
                                </Box></Box>
                            <Box sx={tableFieldStyle}>
                                <FormControlLabel control={<Checkbox defaultChecked onClick={() => {
                                    setValue("Actionable_bool.12",
                                        (-1) * getValues("Actionable_bool.12"))
                                }} size="small" />} label="Actionable" /><Box component="form" sx={boundStyle}>
                                    <div>
                                        <TextField size="small" variant="standard" type="number" label="LB" defaultValue={0}
                                            {...register("TotalOverdueCountsLowerBound", {required: false, min: 0, max: 6})} />
                                        <TextField size="small" variant="standard" type="number" label="UB" defaultValue={6}
                                            {...register("TotalOverdueCountsUpperBound", {required: false, min: 0, max: 6})} />
                                    </div>
                                </Box></Box>
                        </div>

                        <div style={{ float: "left", width: "auto" }}>

                            <Typography variant="h4">Credit: {(predicted === -1) ? "" : (predicted) ? "Accepted" : "Denied"}</Typography>
                            <div id='button_result_table'></div>
                        </div>
                    </Grid>

                    <Grid container justifyContent="center">
                        <Divider variant="middle" />
                        <Button variant="outlined" onClick={() => { clearAll() }}>Clear All</Button>
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        <Button variant="contained" type="submit">Submit</Button>
                    </Grid>
                    <br />
                </form>



            </Container>

        </div >
    );
}

export default ActionForm;