String.prototype.toString = function (len) {
  var str = this.valueOf();
  if (len > str.length){
    for(var i=str.length;i<len;i++){
      str = '0'.concat(str);
    }
  }
  return str;
};

function Binsum(str1, str2){
  var result = bin2dec(str1) + bin2dec(str2);
  return (result+'').toString(16);
}

function nand(str1, str2){
  var result = parseInt(str1,2) & parseInt(str2,2);
  return dec2bin(~result);
};

function bin2dec(num){
  var digits = num.slice(1).split('').reverse();

  if(num.charAt(0) === '1'){
    for(var i=0;i<digits.length;i++){
      if(digits[i] === '1'){
        digits[i] = '0';
      } else {
        digits[i] = '1';
      }
    }
  }

  var result = digits.reduce(function(x,y,i){
    return (y === '1') ? x + Math.pow(2,i) : x;
  },0);


  if(num.charAt(0) === '1'){
    result += 1;
    result *= -1;
  }

  return result;
};

function dec2bin(num){
  return (num >>> 0).toString(2).slice(-16);
}
