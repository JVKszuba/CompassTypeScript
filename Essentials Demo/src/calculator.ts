/**
 * `InvestmentData` represents the input data for an investment calculation.
 *
 * @property initAmount - Initial investment amount.
 * @property annualContribution - Amount contributed annually.
 * @property expectedReturn - Expected annual return rate (e.g., 0.08 for 8%).
 * @property duration - Investment duration in years.
 */

type InvestmentData = {
    initAmount: number;
    annualContribution: number;
    expectedReturn: number;
    duration: number;
}

/**
 * `InvestmentResultData` represents the result of the investment for a specific year.
 *
 * @property year - Label for the year.
 * @property totalAmount - Total amount accumulated by year-end.
 * @property totalInterestEarned - Interest earned up to that year.
 * @property totalContribution - Sum of all contributions made so far.
 */

type InvestmentResultData = {
    year: string;
    totalAmount: number;
    totalInterestEarned: number;
    totalContribution: number;
}

/**
 * Result of the investment calculation.
 * Can be either an array of yearly results or an error message.
 */

type CalculateResults = InvestmentResultData[] | string

/**
 * `calculateInvestment` function calculates the yearly results of an investment based on input parameters.
 *
 * @param data - Investment parameters.
 * @returns Array of results per year or an error message string.
 */

function calculateInvestment(data: InvestmentData): CalculateResults {

    const {initAmount, annualContribution, expectedReturn, duration} = data;

    if (initAmount < 0) {return 'Error: initial investment amount must be at least zero';}
    if (duration <= 0) {return 'Error: invalid amount of yeas provided';}
    if (expectedReturn < 0) {return 'Error: expected return must be at least zero';}

    let totalAmount = initAmount;
    let totalContribution = 0;
    let totalInterestEarned = 0;

    const annualResult: InvestmentResultData[] = []

    for (let i = 0; i < duration; i++) {

        totalAmount *= (1 + expectedReturn);
        totalInterestEarned = totalAmount - (totalContribution + initAmount);
        totalContribution += annualContribution;
        totalAmount += annualContribution;

        annualResult.push({
            year: `Year ${i + 1}`,
            totalAmount,
            totalInterestEarned,
            totalContribution
        })
    }

    return annualResult;
}

/**
 * `printResults` function prints the investment results to the console.
 *
 * @param results - Results from the investment calculation.
 */

function printResults(results: CalculateResults): void {

    if (typeof  results === 'string') return console.log(results);

    for (const yearEndResult of results) {

        console.log(yearEndResult.year);
        console.log(`Total: ${yearEndResult.totalAmount.toFixed(2)}`);
        console.log(`Total Contributions: ${yearEndResult.totalContribution.toFixed(2)}`);
        console.log(`Total Interest Earned: ${yearEndResult.totalInterestEarned.toFixed(2)}`);
        console.log('-'.repeat(30))
    }
}

/**
 * Example usage:
 */

const investmentData: InvestmentData = {
    initAmount: 5000,
    annualContribution: 500,
    expectedReturn: 0.08,
    duration: 10
}

const result = calculateInvestment(investmentData);

printResults(result)