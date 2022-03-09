import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import {
    Button, TextField, FormControl, FormLabel,
    RadioGroup, FormControlLabel, Radio, Checkbox, Grid,
    Box, Container, Divider, Typography,
    InputLabel, Select, MenuItem
} from '@mui/material';
import createUserInput from './InputData.js';
import ActionLists from './ActionLists.js';

let ActionForm = () => {
    const { setValue, getValues, register, handleSubmit, formState: { errors } } = useForm();
    const [predicted, setPredicted] = useState(-1);
    const [actions, setActions] = useState([]);

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
        axios.post("https://recourse-api.herokuapp.com/predict", data)
            .then(res => res.data)
            .then((result) => {
                setPredicted(result.predicted);
                // If credit denied, show a list of actions to revert the decision
                if (!result.predicted) {
                    // Set recourse actions that can be taken
                    setActions(result.recourse_actions);
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

    const tableFieldStyle = { mx: 1, my: 0.5, minHeight: 120 };
    const tableFieldStyle2 = { mx: 1, my: 1.5, minHeight: 120 };

    const boundStyle = { '& .MuiTextField-root': { mx: 0.8, width: '8ch' }, }
    const centerized = { display: "flex", justifyContent: "center", alignItems: "center" }
    const tableWidthStyle = { float: "left", width: "60%" };
    const actionableWidthStyle = { float: "left", width: "20%" };
    const directionStyle = { float: "left", width: "20%" };

    setValue("Actionable_bool", [-1, -1, -1, -1, 1, 1, 1, 1, 1, 1, 1, 1, 1]);
    const directionList = ["MaxBillAmountOverLast6MonthsDirection", "MaxPaymentAmountOverLast6MonthsDirection",
    "MonthsWithHighSpendingOverLast6MonthsDirection", "MonthsWithLowSpendingOverLast6MonthsDirection",
    "MonthsWithZeroBalanceOverLast6MonthsDirection", "MostRecentBillAmountDirection",
    "MostRecentPaymentAmountDirection", "TotalMonthsOverdueDirection", "TotalOverdueCountsDirection"];
    directionList.map(x => setValue(x, "0"))

    return (
        <div style={centerized}>
            <Container maxWidth="xl" sx={{ mx: 15 }}>
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
                        sx={{ '& > :not(style) & .MuiTextField-root': { m: 1, width: '25ch' }, }}
                        noValidate
                    >
                        <br />
                    </Box>

                    <Grid >
                        <div style={{ float: "left", width: "55%" }}>
                            {/* 1. Age */}
                            <Box sx={tableFieldStyle}>
                                <div style={tableWidthStyle} >
                                    <FormControl ><p>Your Age: </p>
                                        <TextField id="age" variant="outlined" type="number" label="Age" defaultValue={21}
                                            {...register("Age", { required: true, max: 100, min: 0 })} />
                                    </FormControl>
                                </div>

                                <div style={actionableWidthStyle} >
                                    <Box sx={tableFieldStyle2}>
                                        <FormControlLabel control={<Checkbox onClick={() => {
                                            setValue("Actionable_bool.0",
                                                (-1) * getValues("Actionable_bool.0"))
                                        }} size="small" />} label="Actionable" />
                                    </Box>
                                </div>
                            </Box>


                            {/* 2. Marital */}
                            <Box sx={tableFieldStyle}>
                                <div style={tableWidthStyle} >
                                    <FormControl ><p>Marital Status: </p>
                                        <FormLabel id="Married"></FormLabel>
                                        <RadioGroup aria-labelledby="Married" defaultValue="1" row>
                                            <FormControlLabel value="1" {...register("Married", { required: true })} control={<Radio />} label="Single" />
                                            <FormControlLabel value="0" {...register("Married", { required: true })} control={<Radio />} label="Married" />
                                        </RadioGroup>
                                    </FormControl>
                                </div>

                                <div style={actionableWidthStyle} >
                                    <Box sx={tableFieldStyle2}>
                                        <FormControlLabel control={<Checkbox onClick={() => {
                                            setValue("Actionable_bool.1",
                                                (-1) * getValues("Actionable_bool.1"))
                                        }} size="small" />} label="Actionable" /></Box>
                                </div>
                            </Box>

                            {/* 3. education */}
                            <Box sx={tableFieldStyle}>
                                <div style={tableWidthStyle} >
                                    <FormControl><p>Education Level: </p>
                                        <FormLabel id="EducationLevel"></FormLabel>
                                        <RadioGroup aria-labelledby="EducationLevel" defaultValue="3" row>
                                            <FormControlLabel value="3" {...register("EducationLevel", { required: true })} control={<Radio />} label="High school" />
                                            <FormControlLabel value="2" {...register("EducationLevel", { required: true })} control={<Radio />} label="Undergraduate" />
                                            <FormControlLabel value="1" {...register("EducationLevel", { required: true })} control={<Radio />} label="Graduate" />
                                            <FormControlLabel value="0" {...register("EducationLevel", { required: true })} control={<Radio />} label="Other" />
                                        </RadioGroup>
                                    </FormControl>
                                </div>
                                <div style={actionableWidthStyle} >
                                    <Box sx={tableFieldStyle2}>
                                        <FormControlLabel control={<Checkbox onClick={() => {
                                            setValue("Actionable_bool.2",
                                                (-1) * getValues("Actionable_bool.2"))
                                        }} size="small" />} label="Actionable" /></Box>
                                </div>
                            </Box>

                            {/* 4. History over due */}
                            <Box sx={tableFieldStyle}>
                                <div style={tableWidthStyle}>
                                    <FormControl><p>Do you have any history of over due payments?</p>
                                        <FormLabel id="HistoryOfOverduePayments">
                                        </FormLabel>
                                        <RadioGroup aria-labelledby="HistoryOfOverduePayments" defaultValue="1" row>
                                            <FormControlLabel value="1" {...register("HistoryOfOverduePayments", { required: true })} control={<Radio />} label="Yes" />
                                            <FormControlLabel value="0" {...register("HistoryOfOverduePayments", { required: true })} control={<Radio />} label="No" />
                                        </RadioGroup>
                                    </FormControl>
                                </div>
                                <div style={actionableWidthStyle} >
                                    <Box sx={tableFieldStyle2}>
                                        <FormControlLabel control={<Checkbox onClick={() => {
                                            setValue("Actionable_bool.3",
                                                (-1) * getValues("Actionable_bool.3"))
                                        }} size="small" />} label="Actionable" /></Box>
                                </div>
                            </Box>

                            {/* 5. max bill amount */}
                            <Box sx={tableFieldStyle}>
                                <div style={tableWidthStyle}>
                                    <FormControl><p>Your maximum bill amount: </p>
                                        {/* <p>What is your maximum bill amount over the last 6 months?</p> */}
                                        <TextField id="MaxBillAmountOverLast6Months" variant="outlined" type="number" defaultValue={2500} {...register("MaxBillAmountOverLast6Months", { required: true, min: 0 })} />
                                    </FormControl>
                                </div>
                                <div style={actionableWidthStyle} >
                                    <Box sx={tableFieldStyle2}>
                                        <FormControlLabel control={<Checkbox defaultChecked onClick={() => {
                                            setValue("Actionable_bool.4",
                                                (-1) * getValues("Actionable_bool.4"))
                                        }} size="small" />} label="Actionable" />
                                        <Box component="form" sx={boundStyle}>
                                            <div>
                                                <TextField size="small" variant="standard" type="number" label="LB" defaultValue={0}
                                                    {...register("MaxBillAmountOverLast6MonthsLowerBound", { required: false, min: 0 })} />
                                                <TextField size="small" variant="standard" type="number" label="UB"
                                                    {...register("MaxBillAmountOverLast6MonthsUpperBound", { required: false, min: 0 })} />
                                            </div>
                                        </Box></Box>
                                </div>
                                <div style={directionStyle}>
                                    <FormControl variant="standard" sx={{minWidth: 90}}>
                                        <InputLabel>Direction</InputLabel>
                                        <Select defaultValue={0} {...register("MaxBillAmountOverLast6MonthsDirection")}>
                                            <MenuItem value="-1">Decrease</MenuItem>
                                            <MenuItem value="0">Any</MenuItem>
                                            <MenuItem value="1">Increase</MenuItem>
                                        </Select>
                                    </FormControl>
                                </div>
                            </Box>

                            {/* 6. max pay amount */}
                            <Box sx={tableFieldStyle}>
                                <div style={tableWidthStyle}>
                                    <FormControl><p>Your maximum payment amount: </p>
                                        <TextField id="MaxPaymentAmountOverLast6Months" variant="outlined" type="number" defaultValue={2500} {...register("MaxPaymentAmountOverLast6Months", { required: true, min: 0 })} />
                                    </FormControl>
                                </div>
                                <div style={actionableWidthStyle} >
                                    <Box sx={tableFieldStyle2}>
                                        <FormControlLabel control={<Checkbox defaultChecked onClick={() => {
                                            setValue("Actionable_bool.5",
                                                (-1) * getValues("Actionable_bool.5"))
                                        }} size="small" />} label="Actionable" />
                                        <Box component="form" sx={boundStyle}>
                                            <div>
                                                <TextField size="small" variant="standard" type="number" label="LB" defaultValue={0}
                                                    {...register("MaxPaymentAmountOverLast6MonthsLowerBound", { required: false, min: 0 })} />
                                                <TextField size="small" variant="standard" type="number" label="UB"
                                                    {...register("MaxPaymentAmountOverLast6MonthsUpperBound", { required: false, min: 0 })} />
                                            </div>
                                        </Box></Box>
                                </div>
                                <div style={directionStyle}>
                                    <FormControl variant="standard" sx={{minWidth: 90}}>
                                        <InputLabel>Direction</InputLabel>
                                        <Select defaultValue={0} {...register("MaxPaymentAmountOverLast6MonthsDirection")}>
                                            <MenuItem value="-1">Decrease</MenuItem>
                                            <MenuItem value="0">Any</MenuItem>
                                            <MenuItem value="1">Increase</MenuItem>
                                        </Select>
                                    </FormControl>
                                </div>
                            </Box>

                            {/* 7 MonthsWithLowSpendingOverLast6Months*/}
                            <Box sx={tableFieldStyle}>
                                <div style={tableWidthStyle}>
                                    <FormControl><p>How many months did you have high spending?</p>
                                        <FormLabel id="MonthsWithHighSpendingOverLast6Months">
                                        </FormLabel>
                                        <RadioGroup aria-labelledby="MonthsWithHighSpendingOverLast6Months" defaultValue="6" row>
                                            <FormControlLabel value="0" {...register("MonthsWithHighSpendingOverLast6Months", { required: true, max: 6, min: 0 })} control={<Radio />} label="0" />
                                            <FormControlLabel value="1" {...register("MonthsWithHighSpendingOverLast6Months", { required: true, max: 6, min: 0 })} control={<Radio />} label="1" />
                                            <FormControlLabel value="2" {...register("MonthsWithHighSpendingOverLast6Months", { required: true, max: 6, min: 0 })} control={<Radio />} label="2" />
                                            <FormControlLabel value="3" {...register("MonthsWithHighSpendingOverLast6Months", { required: true, max: 6, min: 0 })} control={<Radio />} label="3" />
                                            <FormControlLabel value="4" {...register("MonthsWithHighSpendingOverLast6Months", { required: true, max: 6, min: 0 })} control={<Radio />} label="4" />
                                            <FormControlLabel value="5" {...register("MonthsWithHighSpendingOverLast6Months", { required: true, max: 6, min: 0 })} control={<Radio />} label="5" />
                                            <FormControlLabel value="6" {...register("MonthsWithHighSpendingOverLast6Months", { required: true, max: 6, min: 0 })} control={<Radio />} label="6" />
                                        </RadioGroup>
                                    </FormControl>
                                </div>
                                <div style={actionableWidthStyle} >
                                    <Box sx={tableFieldStyle2}>
                                        <FormControlLabel control={<Checkbox defaultChecked onClick={() => {
                                            setValue("Actionable_bool.6",
                                                (-1) * getValues("Actionable_bool.6"))
                                        }} size="small" />} label="Actionable" />
                                        <Box component="form" sx={boundStyle}>
                                            <div>
                                                <TextField size="small" variant="standard" type="number" label="LB" defaultValue={0}
                                                    {...register("MonthsWithHighSpendingOverLast6MonthsLowerBound", { required: false, min: 0, max: 6 })} />
                                                <TextField size="small" variant="standard" type="number" label="UB" defaultValue={6}
                                                    {...register("MonthsWithHighSpendingOverLast6MonthsUpperBound", { required: false, min: 0, max: 6 })} />
                                            </div>
                                        </Box></Box>
                                </div>
                                <div style={directionStyle}>
                                    <FormControl variant="standard" sx={{minWidth: 90}}>
                                        <InputLabel>Direction</InputLabel>
                                        <Select defaultValue={0} {...register("MonthsWithHighSpendingOverLast6MonthsDirection")}>
                                            <MenuItem value="-1">Decrease</MenuItem>
                                            <MenuItem value="0">Any</MenuItem>
                                            <MenuItem value="1">Increase</MenuItem>
                                        </Select>
                                    </FormControl>
                                </div>
                            </Box>

                            {/* 8 MonthsWithLowSpendingOverLast6Months*/}
                            <Box sx={tableFieldStyle}>
                                <div style={tableWidthStyle}>
                                    <FormControl><p>How many months did you have low spending?</p>
                                        <FormLabel id="MonthsWithLowSpendingOverLast6Months">
                                        </FormLabel>
                                        <RadioGroup aria-labelledby="MonthsWithLowSpendingOverLast6Months" defaultValue="0" row>
                                            <FormControlLabel value="0" {...register("MonthsWithLowSpendingOverLast6Months", { required: true, max: 6, min: 0 })} control={<Radio />} label="0" />
                                            <FormControlLabel value="1" {...register("MonthsWithLowSpendingOverLast6Months", { required: true, max: 6, min: 0 })} control={<Radio />} label="1" />
                                            <FormControlLabel value="2" {...register("MonthsWithLowSpendingOverLast6Months", { required: true, max: 6, min: 0 })} control={<Radio />} label="2" />
                                            <FormControlLabel value="3" {...register("MonthsWithLowSpendingOverLast6Months", { required: true, max: 6, min: 0 })} control={<Radio />} label="3" />
                                            <FormControlLabel value="4" {...register("MonthsWithLowSpendingOverLast6Months", { required: true, max: 6, min: 0 })} control={<Radio />} label="4" />
                                            <FormControlLabel value="5" {...register("MonthsWithLowSpendingOverLast6Months", { required: true, max: 6, min: 0 })} control={<Radio />} label="5" />
                                            <FormControlLabel value="6" {...register("MonthsWithLowSpendingOverLast6Months", { required: true, max: 6, min: 0 })} control={<Radio />} label="6" />
                                        </RadioGroup>
                                    </FormControl>
                                </div>
                                <div style={actionableWidthStyle} >
                                    <Box sx={tableFieldStyle2}>
                                        <FormControlLabel control={<Checkbox defaultChecked onClick={() => {
                                            setValue("Actionable_bool.7",
                                                (-1) * getValues("Actionable_bool.7"))
                                        }} size="small" />} label="Actionable" /><Box component="form" sx={boundStyle}>
                                            <div>
                                                <TextField size="small" variant="standard" type="number" label="LB" defaultValue={0}
                                                    {...register("MonthsWithLowSpendingOverLast6MonthsLowerBound", { required: false, min: 0, max: 6 })} />
                                                <TextField size="small" variant="standard" type="number" label="UB" defaultValue={6}
                                                    {...register("MonthsWithLowSpendingOverLast6MonthsUpperBound", { required: false, min: 0, max: 6 })} />
                                            </div>
                                        </Box></Box>
                                </div>
                                <div style={directionStyle}>
                                    <FormControl variant="standard" sx={{minWidth: 90}}>
                                        <InputLabel>Direction</InputLabel>
                                        <Select defaultValue={0} {...register("MonthsWithLowSpendingOverLast6MonthsDirection")}>
                                            <MenuItem value="-1">Decrease</MenuItem>
                                            <MenuItem value="0">Any</MenuItem>
                                            <MenuItem value="1">Increase</MenuItem>
                                        </Select>
                                    </FormControl>
                                </div>
                            </Box>

                            {/* 9 MonthsWithZeroBalanceOverLast6Months*/}
                            <Box sx={tableFieldStyle}>
                                <div style={tableWidthStyle}>
                                    <FormControl><p>How many months did you have no money in your bank account?</p>
                                        <FormLabel id="MonthsWithZeroBalanceOverLast6Months">
                                        </FormLabel>
                                        <RadioGroup aria-labelledby="MonthsWithZeroBalanceOverLast6Months" defaultValue="0" row>
                                            <FormControlLabel value="0" {...register("MonthsWithZeroBalanceOverLast6Months", { required: true, max: 6, min: 0 })} control={<Radio />} label="0" />
                                            <FormControlLabel value="1" {...register("MonthsWithZeroBalanceOverLast6Months", { required: true, max: 6, min: 0 })} control={<Radio />} label="1" />
                                            <FormControlLabel value="2" {...register("MonthsWithZeroBalanceOverLast6Months", { required: true, max: 6, min: 0 })} control={<Radio />} label="2" />
                                            <FormControlLabel value="3" {...register("MonthsWithZeroBalanceOverLast6Months", { required: true, max: 6, min: 0 })} control={<Radio />} label="3" />
                                            <FormControlLabel value="4" {...register("MonthsWithZeroBalanceOverLast6Months", { required: true, max: 6, min: 0 })} control={<Radio />} label="4" />
                                            <FormControlLabel value="5" {...register("MonthsWithZeroBalanceOverLast6Months", { required: true, max: 6, min: 0 })} control={<Radio />} label="5" />
                                            <FormControlLabel value="6" {...register("MonthsWithZeroBalanceOverLast6Months", { required: true, max: 6, min: 0 })} control={<Radio />} label="6" />
                                        </RadioGroup>
                                    </FormControl>
                                </div>
                                <div style={actionableWidthStyle} >
                                    <Box sx={tableFieldStyle2}>
                                        <FormControlLabel control={<Checkbox defaultChecked onClick={() => {
                                            setValue("Actionable_bool.8",
                                                (-1) * getValues("Actionable_bool.8"))
                                        }} size="small" />} label="Actionable" /><Box component="form" sx={boundStyle}>
                                            <div>
                                                <TextField size="small" variant="standard" type="number" label="LB" defaultValue={0}
                                                    {...register("MonthsWithZeroBalanceOverLast6MonthsLowerBound", { required: false, min: 0, max: 6 })} />
                                                <TextField size="small" variant="standard" type="number" label="UB" defaultValue={6}
                                                    {...register("MonthsWithZeroBalanceOverLast6MonthsUpperBound", { required: false, min: 0, max: 6 })} />
                                            </div>
                                        </Box></Box>
                                </div>
                                <div style={directionStyle}>
                                    <FormControl variant="standard" sx={{minWidth: 90}}>
                                        <InputLabel>Direction</InputLabel>
                                        <Select defaultValue={0} {...register("MonthsWithZeroBalanceOverLast6MonthsDirection")}>
                                            <MenuItem value="-1">Decrease</MenuItem>
                                            <MenuItem value="0">Any</MenuItem>
                                            <MenuItem value="1">Increase</MenuItem>
                                        </Select>
                                    </FormControl>
                                </div>
                            </Box>

                            {/* 10. MostRecentBillAmount*/}
                            <Box sx={tableFieldStyle}>
                                <div style={tableWidthStyle}>
                                    <FormControl><p>Most recent bill amount: </p>
                                        <TextField id="MostRecentBillAmount" variant="outlined" type="number" defaultValue={1000} {...register("MostRecentBillAmount", { required: true, min: 0 })} />
                                    </FormControl>
                                </div>
                                <div style={actionableWidthStyle} >
                                    <Box sx={tableFieldStyle2}>
                                        <FormControlLabel control={<Checkbox defaultChecked onClick={() => {
                                            setValue("Actionable_bool.9",
                                                (-1) * getValues("Actionable_bool.9"))
                                        }} size="small" />} label="Actionable" /><Box component="form" sx={boundStyle}>
                                            <div>
                                                <TextField size="small" variant="standard" type="number" label="LB" defaultValue={0}
                                                    {...register("MostRecentBillAmountLowerBound", { required: false, min: 0 })} />
                                                <TextField size="small" variant="standard" type="number" label="UB"
                                                    {...register("MostRecentBillAmountUpperBound", { required: false, min: 0 })} />
                                            </div>
                                        </Box></Box>
                                </div>
                                <div style={directionStyle}>
                                    <FormControl variant="standard" sx={{minWidth: 90}}>
                                        <InputLabel>Direction</InputLabel>
                                        <Select defaultValue={0} {...register("MostRecentBillAmountDirection")}>
                                            <MenuItem value="-1">Decrease</MenuItem>
                                            <MenuItem value="0">Any</MenuItem>
                                            <MenuItem value="1">Increase</MenuItem>
                                        </Select>
                                    </FormControl>
                                </div>
                            </Box>

                            {/* 11. MostRecentPaymentAmount*/}
                            <Box sx={tableFieldStyle}>
                                <div style={tableWidthStyle}>
                                    <FormControl><p>Most recent payment amount: </p>
                                        <TextField id="MostRecentPaymentAmount" variant="outlined" type="number" defaultValue={1000} {...register("MostRecentPaymentAmount", { required: true, min: 0 })} />
                                    </FormControl>
                                </div>
                                <div style={actionableWidthStyle} >
                                    <Box sx={tableFieldStyle2}>
                                        <FormControlLabel control={<Checkbox defaultChecked onClick={() => {
                                            setValue("Actionable_bool.10",
                                                (-1) * getValues("Actionable_bool.10"))
                                        }} size="small" />} label="Actionable" /><Box component="form" sx={boundStyle}>
                                            <div>
                                                <TextField size="small" variant="standard" type="number" label="LB" defaultValue={0}
                                                    {...register("MostRecentPaymentAmountLowerBound", { required: false, min: 0 })} />
                                                <TextField size="small" variant="standard" type="number" label="UB"
                                                    {...register("MostRecentPaymentAmountUpperBound", { required: false, min: 0 })} />
                                            </div>
                                        </Box></Box>
                                </div>
                                <div style={directionStyle}>
                                    <FormControl variant="standard" sx={{minWidth: 90}}>
                                        <InputLabel>Direction</InputLabel>
                                        <Select defaultValue={0} {...register("MostRecentPaymentAmountDirection")}>
                                            <MenuItem value="-1">Decrease</MenuItem>
                                            <MenuItem value="0">Any</MenuItem>
                                            <MenuItem value="1">Increase</MenuItem>
                                        </Select>
                                    </FormControl>
                                </div>
                            </Box>

                            {/* 12. TotalMonthsOverdue*/}
                            <Box sx={tableFieldStyle}>
                                <div style={tableWidthStyle}>
                                    <FormControl><p>How many months did you have over dues at most?</p>
                                        <FormLabel id="TotalMonthsOverdue">
                                        </FormLabel>
                                        <RadioGroup aria-labelledby="TotalMonthsOverdue" defaultValue="0" row>
                                            <FormControlLabel value="0" {...register("TotalMonthsOverdue", { required: true, max: 6, min: 0 })} control={<Radio />} label="0" />
                                            <FormControlLabel value="1" {...register("TotalMonthsOverdue", { required: true, max: 6, min: 0 })} control={<Radio />} label="1" />
                                            <FormControlLabel value="2" {...register("TotalMonthsOverdue", { required: true, max: 6, min: 0 })} control={<Radio />} label="2" />
                                            <FormControlLabel value="3" {...register("TotalMonthsOverdue", { required: true, max: 6, min: 0 })} control={<Radio />} label="3" />
                                            <FormControlLabel value="4" {...register("TotalMonthsOverdue", { required: true, max: 6, min: 0 })} control={<Radio />} label="4" />
                                            <FormControlLabel value="5" {...register("TotalMonthsOverdue", { required: true, max: 6, min: 0 })} control={<Radio />} label="5" />
                                            <FormControlLabel value="6" {...register("TotalMonthsOverdue", { required: true, max: 6, min: 0 })} control={<Radio />} label="6" />
                                        </RadioGroup>
                                    </FormControl>
                                </div>
                                <div style={actionableWidthStyle} >
                                    <Box sx={tableFieldStyle2}>
                                        <FormControlLabel control={<Checkbox defaultChecked onClick={() => {
                                            setValue("Actionable_bool.11",
                                                (-1) * getValues("Actionable_bool.11"))
                                        }} size="small" />} label="Actionable" /><Box component="form" sx={boundStyle}>
                                            <div>
                                                <TextField size="small" variant="standard" type="number" label="LB" defaultValue={0}
                                                    {...register("TotalMonthsOverdueLowerBound", { required: false, min: 0, max: 6 })} />
                                                <TextField size="small" variant="standard" type="number" label="UB" defaultValue={6}
                                                    {...register("TotalMonthsOverdueUpperBound", { required: false, min: 0, max: 6 })} />
                                            </div>
                                        </Box></Box>
                                </div>
                                <div style={directionStyle}>
                                    <FormControl variant="standard" sx={{minWidth: 90}}>
                                        <InputLabel>Direction</InputLabel>
                                        <Select defaultValue={0} {...register("TotalMonthsOverdueDirection")}>
                                            <MenuItem value="-1">Decrease</MenuItem>
                                            <MenuItem value="0">Any</MenuItem>
                                            <MenuItem value="1">Increase</MenuItem>
                                        </Select>
                                    </FormControl>
                                </div>
                            </Box>

                            {/* 13. TotalOverdueCounts*/}
                            <Box sx={tableFieldStyle}>
                                <div style={tableWidthStyle}>
                                    <FormControl><p>How many times did you have over due?</p>
                                        <FormLabel id="TotalOverdueCounts">
                                        </FormLabel>
                                        <RadioGroup aria-labelledby="TotalOverdueCounts" defaultValue="6" row>
                                            <FormControlLabel value="0" {...register("TotalOverdueCounts", { required: true, max: 6, min: 0 })} control={<Radio />} label="0" />
                                            <FormControlLabel value="1" {...register("TotalOverdueCounts", { required: true, max: 6, min: 0 })} control={<Radio />} label="1" />
                                            <FormControlLabel value="2" {...register("TotalOverdueCounts", { required: true, max: 6, min: 0 })} control={<Radio />} label="2" />
                                            <FormControlLabel value="3" {...register("TotalOverdueCounts", { required: true, max: 6, min: 0 })} control={<Radio />} label="3" />
                                            <FormControlLabel value="4" {...register("TotalOverdueCounts", { required: true, max: 6, min: 0 })} control={<Radio />} label="4" />
                                            <FormControlLabel value="5" {...register("TotalOverdueCounts", { required: true, max: 6, min: 0 })} control={<Radio />} label="5" />
                                            <FormControlLabel value="6" {...register("TotalOverdueCounts", { required: true, max: 6, min: 0 })} control={<Radio />} label="6" />
                                        </RadioGroup>
                                    </FormControl>
                                </div>
                                <div style={actionableWidthStyle} >
                                    <Box sx={tableFieldStyle2}>
                                        <FormControlLabel control={<Checkbox defaultChecked onClick={() => {
                                            setValue("Actionable_bool.12",
                                                (-1) * getValues("Actionable_bool.12"))
                                        }} size="small" />} label="Actionable" /><Box component="form" sx={boundStyle}>
                                            <div>
                                                <TextField size="small" variant="standard" type="number" label="LB" defaultValue={0}
                                                    {...register("TotalOverdueCountsLowerBound", { required: false, min: 0, max: 6 })} />
                                                <TextField size="small" variant="standard" type="number" label="UB" defaultValue={6}
                                                    {...register("TotalOverdueCountsUpperBound", { required: false, min: 0, max: 6 })} />
                                            </div>
                                        </Box></Box>
                                </div>
                                <div style={directionStyle}>
                                    <FormControl variant="standard" sx={{minWidth: 90}}>
                                        <InputLabel>Direction</InputLabel>
                                        <Select defaultValue={0} {...register("TotalOverdueCountsDirection")}>
                                            <MenuItem value="-1">Decrease</MenuItem>
                                            <MenuItem value="0">Any</MenuItem>
                                            <MenuItem value="1">Increase</MenuItem>
                                        </Select>
                                    </FormControl>
                                </div>
                            </Box>
                        </div>

                        <div style={{ float: "left", width: "45%" }}>
                            <Box sx={{ my: 2, mx: 2 }}>
                                <Typography variant="h4">Credit: {(predicted === -1) ? "" : (predicted) ? "Accepted" : "Denied"}</Typography>
                                <ActionLists actions={actions} />
                                {/* <div id='button_result_table'></div> */}
                            </Box>
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