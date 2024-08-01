/**
 * Formats the given price as a currency string in USD.
 * 
 * @param price - The price to be formatted.
 * @returns The formatted price as a currency string.
 */
export const formatPrice = (price : number)=>{
    return new Intl.NumberFormat("en-US",{
        style : "currency" , 
        currency : "USD" ,
    }).format(price)
}