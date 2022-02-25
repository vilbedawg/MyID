export const shortenAddress = (address) => {
    if(address !== null) {
       return `${address.slice(0, 5)}...${address.slice(address.length - 4)}`
    }
    return address;
 } 