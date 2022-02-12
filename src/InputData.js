let createUserInput = (user_input) => {
    return {
        "user_input": {
            "Age_geq_60": user_input.Age >= 60,
            "Age_in_25_to_40": user_input.Age >= 25 && user_input.Age < 40,
            "Age_in_40_to_59": user_input.Age >= 40 && user_input.Age < 60,
            "Age_lt_25": user_input.Age < 25,
            "EducationLevel": user_input.EducationLevel,
            "HistoryOfOverduePayments": user_input.HistoryOfOverduePayments,
            "Married": user_input.Married,
            "MaxBillAmountOverLast6Months": user_input.MaxBillAmountOverLast6Months,
            "MaxPaymentAmountOverLast6Months": user_input.MaxPaymentAmountOverLast6Months,
            "MonthsWithHighSpendingOverLast6Months": user_input.MonthsWithHighSpendingOverLast6Months,
            "MonthsWithLowSpendingOverLast6Months": user_input.MonthsWithLowSpendingOverLast6Months,
            "MonthsWithZeroBalanceOverLast6Months": user_input.MonthsWithZeroBalanceOverLast6Months,
            "MostRecentBillAmount": user_input.MostRecentBillAmount,
            "MostRecentPaymentAmount": user_input.MostRecentPaymentAmount,
            "Single": !user_input.Married,
            "TotalMonthsOverdue": user_input.TotalMonthsOverdue,
            "TotalOverdueCounts": user_input.TotalOverdueCounts,

            // boolean of actionable array: 0 means not actionable, and 1 means actionable
            "Actionable_bool": user_input.Actionable_bool.map(x => (x > 0) * 1),

            //
            "MaxBillAmountOverLast6MonthsLowerBound": user_input.MaxBillAmountOverLast6MonthsLowerBound,
            "MaxPaymentAmountOverLast6MonthsLowerBound": user_input.MaxPaymentAmountOverLast6MonthsLowerBound,
            "MonthsWithHighSpendingOverLast6MonthsLowerBound": user_input.MonthsWithHighSpendingOverLast6MonthsLowerBound,
            "MonthsWithLowSpendingOverLast6MonthsLowerBound": user_input.MonthsWithLowSpendingOverLast6MonthsLowerBound,
            "MonthsWithZeroBalanceOverLast6MonthsLowerBound": user_input.MonthsWithZeroBalanceOverLast6MonthsLowerBound,
            "MostRecentBillAmountLowerBound": user_input.MostRecentBillAmountLowerBound,
            "MostRecentPaymentAmountLowerBound": user_input.MostRecentPaymentAmountLowerBound,
            "TotalMonthsOverdueLowerBoundLowerBound": user_input.TotalMonthsOverdueLowerBound,
            "TotalOverdueCountsLowerBound": user_input.TotalOverdueCountsLowerBound,

            "MaxBillAmountOverLast6MonthsUpperBound": user_input.MaxBillAmountOverLast6MonthsUpperBound,
            "MaxPaymentAmountOverLast6MonthsUpperBound": user_input.MaxPaymentAmountOverLast6MonthsUpperBound,
            "MonthsWithHighSpendingOverLast6MonthsUpperBound": user_input.MonthsWithHighSpendingOverLast6MonthsUpperBound,
            "MonthsWithLowSpendingOverLast6MonthsUpperBound": user_input.MonthsWithLowSpendingOverLast6MonthsUpperBound,
            "MonthsWithZeroBalanceOverLast6MonthsUpperBound": user_input.MonthsWithZeroBalanceOverLast6MonthsUpperBound,
            "MostRecentBillAmountUpperBound": user_input.MostRecentBillAmountUpperBound,
            "MostRecentPaymentAmountUpperBound": user_input.MostRecentPaymentAmountUpperBound,
            "TotalMonthsOverdueUpperBound": user_input.TotalMonthsOverdueUpperBound,
            "TotalOverdueCountsUpperBound": user_input.TotalOverdueCountsUpperBound,
        }
    }
}

export default createUserInput;