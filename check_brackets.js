const fs=require('fs');
const path='d:/Users/Tx/Desktop/Hostinger/src/pages/Admin.tsx';
const text=fs.readFileSync(path,'utf8');
const stack=[];
const pairs={')':'(', '}':'{', ']':'['};
for(let i=0;i<text.length;i++){
  const ch=text[i];
  if(ch==='"' || ch==="'" || ch==='`'){
    const quote=ch;
    i++;
    while(i<text.length){
      if(text[i]==='\\'){
        i+=2; continue;
      }
      if(text[i]===quote) break;
      i++;
    }
    continue;
  }
  if(ch==='/' && text[i+1]==='/'){
    i=text.indexOf('\n',i);
    if(i===-1) break;
    continue;
  }
  if(ch==='/' && text[i+1]==='*'){
    i=text.indexOf('*/',i+2);
    if(i===-1) break;
    i+=1;
    continue;
  }
  if('([{'.includes(ch)) stack.push({ch,i});
  if(')]}'.includes(ch)){
    const need=pairs[ch];
    const top=stack.pop();
    if(!top || top.ch!==need){
      console.log('mismatch', ch, 'at', i, 'top', top);
      process.exit(1);
    }
  }
}
console.log('stack len', stack.length);
if(stack.length) console.log('top',stack[stack.length-1]);
