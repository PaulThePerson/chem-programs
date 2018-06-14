function invertMatrix(matrix){
  var M=JSON.parse(JSON.stringify(matrix));
  M.forEach(function(row){
    if(row.length!==M.length){
      return "error1";
    }
  })
  var L=M.length;
  var I=[]
  for(var i=0;i<L;i++){
    I.push([]);
    for(var ii=0;ii<L;ii++){
      I[i].push(0);
    }
    I[i][i]=1
  }
  for(var i=0;i<L;i++){
    if(M[i][i]===0){
      for(var ii=i;ii<L;ii++){
        if(M[ii][i]!==0){
          var S=JSON.parse(JSON.stringify(M[i]));
          M[i]=JSON.parse(JSON.stringify(M[ii]));
          M[ii]=JSON.parse(JSON.stringify(S));
          S=JSON.parse(JSON.stringify(I[i]));
          I[i]=JSON.parse(JSON.stringify(I[ii]));
          I[ii]=JSON.parse(JSON.stringify(S));
          break;
        }
      }
      if(M[i][i]===0){
        return "error2";
      }
    }
    for(var ii=0; ii<L;ii++){
      if(ii===i){
        continue;
      }
      var F=M[ii][i]=M[i][i];
      for(var iii=0; iii<L; iii++){
        M[ii][iii]=M[ii][iii]-F*M[i][iii];
        I[ii][iii]=I[ii][iii]-F*I[i][iii];
      }
    }
  }
  return I;
}
