export function formatCurrency(number: number) {
    const isNegative = number < 0;

    const absoluteNumber = Math.abs(number);
    
    // Format the number as currency
    const formattedNumber = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    }).format(absoluteNumber);
    
    return isNegative ? `-${formattedNumber}` : formattedNumber;
}