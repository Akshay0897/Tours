/* const hof = (a,b) => (c,d) => {console.log(a,b,c,d)}

const closure = (a) => { 
  let b=10;
  return (by) => { 
    console.log(b)
    return a+by+b++ } ; 
  }

const inc = closure(5);

console.log(inc(10));
inc(20);

const partial = (a,b,c) => a*b*c;
const callme = (a) =>  partial.bind(null,a)
const part = callme(20)
console.log(part(30,40)) */

const compose = (f,g,i) => (data) => { console.log(i);
     return f(g(data)) 
}


const mul3 = (data) => { console.log('mul'); return data*3 }
const pos = (data) => { console.log('pos called'); return Math.abs(data); }
const print = (data) => console.log('data',data);

const fns = (...fn) => fn.reduce(compose);

fns(print,pos,mul3)(50)

/* const arr = [10,30,40,50];

arr.reduce((acc,curr,i,arr) => { console.log(acc, curr); 
  console.log(i);
  return acc + curr 
}) */

//const run = compose(mul3,pos)(-50)

//console.log(run);