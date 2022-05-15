/*
These arrays are indexed to the number that each element represents
*/
const ones = ['', 'one ', 'two ', 'three ', 'four ', 'five ', 'six ', 'seven ', 'eight ', 'nine '];
const teen = ['ten ', 'eleven ', 'twelve ', 'thirteen ', 'fourteen ', 'fifteen ', 'sixteen ', 'seventeen ', 'eighteen ', 'nineteen '];
const tens = ['twenty', 'thirty', 'forty', 'fifty', 'sixty', 'seventy', 'eighty', 'ninety'];
const high = ['hundred ', 'thousand ', 'million ', 'billion '];
// Helper function - a simple logger
const log = data => console.log(data);

/*
This function takes 2 numbers and matches the first parameter to the index of the 
tens or teen array. The second parameter matches to the index of the ones array. 
A word number between 1 and 99 is returned. 
*/
const tensOnes = (t, o) => +t == 0 ? ones[+o] : +t == 1 ? teen[+o] : +t > 1 && +o == 0 ? tens[+t - 2] : tens[+t - 2] + '-' + ones[+o];

// function takes a number and returns a string number with 2 decimals
const fltN = float => [...parseFloat(float).toFixed(2)];

/* 
This function takes an array created by moneyToEng() function and returns a word
version of the given number. A switch() with 10 cases (9,999,999,999 is max) is 
used to call tensOnes() function. Before the string is returned, there are a few
fixes to make it grammatically correct.
*/
const stepper = array => {
  const D = array[0];
  const C = array[1];
  let size = D.length;
  let word;
  switch (size) {
    case 0:
      word = C;
      break;
    case 1:
      word = tensOnes(0, D[0]) + 'ringgit ' + C;
      break;
    case 2:
      word = tensOnes(D[1], D[0]) + 'ringgit ' + C;
      break;
    case 3:
      word = tensOnes(0, D[2]) + high[0] + tensOnes(D[1], D[0]) + 'ringgit ' + C;
      break;
    case 4:
      word = tensOnes(0, D[3]) + high[1] + tensOnes(0, D[2]) + high[0] + tensOnes(D[1], D[0]) + 'ringgit ' + C;
      break;
    case 5:
      word = tensOnes(D[4], D[3]) + high[1] + tensOnes(0, D[2]) + high[0] + tensOnes(D[1], D[0]) + 'ringgit ' + C;
      break;
    case 6:
      word = tensOnes(0, D[5]) + high[0] + tensOnes(D[4], D[3]) + high[1] + tensOnes(0, D[2]) + high[0] + tensOnes(D[1], D[0]) + 'ringgit ' + C;
      break;
    case 7:
      word = tensOnes(0, D[6]) + high[2] + tensOnes(0, D[5]) + high[0] + tensOnes(D[4], D[3]) + high[1] + tensOnes(0, D[2]) + high[0] + tensOnes(D[1], D[0]) + 'ringgit ' + C;
      break;
    case 8:
      word = tensOnes(D[7], D[6]) + high[2] + tensOnes(0, D[5]) + high[0] + tensOnes(D[4], D[3]) + high[1] + tensOnes(0, D[2]) + high[0] + tensOnes(D[1], D[0]) + 'ringgit ' + C;
      break;
    case 9:
      word = tensOnes(0, D[8]) + high[0] + tensOnes(D[7], D[6]) + high[2] + tensOnes(0, D[5]) + high[0] + tensOnes(D[4], D[3]) + high[1] + tensOnes(0, D[2]) + high[0] + tensOnes(D[1], D[0]) + 'ringgit ' + C;
      break;
    case 10:
      word = tensOnes(0, D[9]) + high[3] + tensOnes(0, D[8]) + high[0] + tensOnes(D[7], D[6]) + high[2] + tensOnes(0, D[5]) + high[0] + tensOnes(D[4], D[3]) + high[1] + tensOnes(0, D[2]) + high[0] + tensOnes(D[1], D[0]) + 'ringgit ' + C;
      break;
    default:
      break;
  }
  word = word.trim();
  word = word == 'one ringgit' ? 'one dollar' : word == 'ringgit and one cent' ? 'one cent' : word == 'one ringgit and one cent' ? 'one dollar and one cent' : word == 'and undefined-undefinedcents' ? '' : word;
  word = word.replace(/(thousand|million)\s(hundred)/g, '$1').replace(/(million)\s(thousand)/g, '$1').replace(/(tycents)/g, 'ty cents').replace(/(tyringgit)/g, 'ty ringgit');
  return word;
};

/*
This takes a number and returns a string of words that represent the given 
number as money. It prepares the input for further processing by the stepper() 
function.
*/
const moneyToEng = number => {
  let R = fltN(number);
  let dec, c, cents;
  dec = R.splice(-3, 3);
  c = tensOnes(dec[1], dec[2]);
  cents = c == 'one ' ? 'and one cent' : c == '' ? '' : `and ${c}cents`;
  onlys = cents + ' only';
  return stepper([R.reverse(), cents]).toUpperCase();
};

