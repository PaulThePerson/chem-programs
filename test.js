function invertMatrix(matrix){
  var M=JSON.parse(JSON.stringify(matrix));
  M.forEach(function(row){
    if(row.length!==M.length){
      return "error1";
    }
  })
  var L=M.length;
  var I=[]
  for(var row=0;row<L;row++){
    I.push([]);
    for(var column=0;column<L;column++){
      I[row].push(0);
    }
    I[row][row]=1;
  }
  console.log(JSON.parse(JSON.stringify(I)),JSON.parse(JSON.stringify(M)));
  for(var column=0;column<L;column++){
   if(M[column][column]===0){
     for(var downColumn=column;downColumn<L;downColumn++){
       if(M[downColumn][column]!==0){
          var S=JSON.parse(JSON.stringify(M[column]));
          M[column]=JSON.parse(JSON.stringify(M[downColumn]));
          M[downColumn]=JSON.parse(JSON.stringify(S));
          S=JSON.parse(JSON.stringify(I[column]));
          I[column]=JSON.parse(JSON.stringify(I[downColumn]));
          I[downColumn]=JSON.parse(JSON.stringify(S));
          break;
        }
      }
      if(M[column][column]===0){
         return "error2";
       }
     }
     for(var row=0; row<L;row++){
      if(row===column){
        continue;
      }
      var F=M[row][column]/M[column][column];
      for(var itteration=0; itteration<L; itteration++){
        M[row][itteration]=M[row][itteration]-F*M[column][itteration];
        I[row][itteration]=I[row][itteration]-F*I[column][itteration];
      }
    }
  }
  for(var row=0; row<L; row++){
    var F=M[row][row];
    for(var column=0; column<L; column++){
      M[row][column]=M[row][column]/F;
      I[row][column]=I[row][column]/F;
    }
  }
  return I;
}
