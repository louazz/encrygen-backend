function xor(str1, str2) {
  return Array.from(str1).reduce((xored, c, idx) => xored + String.fromCharCode(c.charCodeAt(0) ^ str2.charCodeAt(idx)), '')
}
module.exports = {
  convert: function (input) {
  
    let  output = "";
    for (var i = 0; i < input.length; i++) {
        output += input[i].charCodeAt(0).toString(2) + " ";
    }
    return output
  },
 
/*
const generateKey= (ex)=>{
  let half= ex.length/2;
  ex=ex.substring(half, ex.length);
  let res="";
  for (var i=0; i<ex.length; i++){
   if(ex[i]=="0"){
    res= res+"1"
   }else if(ex[i]=="1"){
     res=res+"0"
   }else{
     res=res+" "
   }
  }
  return res
}*/
 
encr: async function (p,f,k){
  let half= p.length/2;
  let l0=p.substring(0, half);
  let r0=p.substring(half, p.length);
  x= await f(r0, k);
  l1=r0;
  let r1=xor(l0,x);
  r1 =  r1.toString(2);
  return l1+r1
},

f: async function (x, k){
  tmp= xor(x,k);
  return tmp.toString(2);
},
decr: async function (p,f,k){
  let half= p.length/2;
  let l1=p.substring(0, half);
  let r1=p.substring(half, p.length);
  r0=l1
  x=await f(r0,k)
  l0= xor(r1,x)
  l0 =  l0.toString(2);
  return l0+r0
},
test1: async function (){
  let plainText="619dcee028b2815bce4e6443";
  console.log("Key:"+convert("Louai"))
  let c= await encr(plainText,f,convert("Louai"));
  console.log("ciphertext:"+c)
  let t= await decr(c,f,convert("Louai"));
  console.log("plaintext:"+t)
}
//test1()
}