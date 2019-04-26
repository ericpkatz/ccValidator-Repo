function card_isValid(brand, number) {
    const number_arr = String(number).split("").map(c => Number(c));
    const first_numbers = number_arr[0] * 10 + number_arr[1];

    // Check for validity based on Brand
    // This can seriously be simplified
    switch (brand.toUpperCase()) {
        case 'AMEX':
	        if ((first_numbers === 34 || first_numbers === 37) && number_arr.length === 15) break;
        case 'MASTERCARD':
	        if ((first_numbers >= 51 && first_numbers <= 55) && number_arr.length === 16) break;
        case 'VISA':
	        if ((Math.floor(first_numbers / 10) === 4) && (number_arr.length === 16 || number_arr.length === 13)) break;
        default: return "Card is not valid.";
    }
    
    // Get luhn's number
    number_arr.reverse();
    let luhn = number_arr.reduce((acc, num, idx) => {
	if(idx % 2 === 0) {
	    return acc + num;
	}

	return acc + (Math.floor((num * 2 / 10)) + (num * 2 % 10));
    }, 0);

    if (luhn % 10 === 0) return "Card is valid."; // Success
    
    return "Card is not valid.";
}


// The last card number is intentionally not good.
const cards = [ 
    { card: 'AMEX',
      number: 378282246310005 },
    { card: 'AMEX',
      number: 371449635398431 },
    { card: 'AMEX',
      number: 378734493671000 },  
    { card: 'MasterCard',
      number: 5555555555554444 },
    { card: 'MasterCard',
      number: 5105105105105100 },
    { card: 'Visa',
      number: 4111111111111111 },
    { card: 'Visa',
      number: 4012888888881881 },
    { card: 'Visa',
      number: 4222222222222 },
    { card: 'Visa',
      number: 6176292929 }];
for (c of cards) {
    console.log(card_isValid(c.card, c.number));
}

