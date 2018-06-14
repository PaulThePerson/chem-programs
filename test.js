function invertMatrix(M){
  //I didnt make this code. I tried. As seen above. I failed. SO... you get this code
  //enjoy.
  //maybe I can try to make my own later.
  // source at http://blog.acipo.com/matrix-inversion-in-javascript/
  //just this function
  //i did the rest
  //just to be clear
  if(M.length !== M[0].length){return;}
  var i=0, ii=0, j=0, dim=M.length, e=0, t=0;
  var I = [], C = [];
  for(i=0; i<dim; i+=1){
    I[I.length]=[];
    C[C.length]=[];
    for(j=0; j<dim; j+=1){
      if(i==j){ I[i][j] = 1; }
      else{ I[i][j] = 0; }
      C[i][j] = M[i][j];
    }
  }
  for(i=0; i<dim; i+=1){
    e = C[i][i];
    if(e==0){
      for(ii=i+1; ii<dim; ii+=1){
        if(C[ii][i] != 0){
          for(j=0; j<dim; j++){
            e = C[i][j];
            C[i][j] = C[ii][j];
            C[ii][j] = e;
            e = I[i][j];
            I[i][j] = I[ii][j];
            I[ii][j] = e;
          }
          break;
        }
      }
      e = C[i][i];
      if(e==0){return}
    }
    for(j=0; j<dim; j++){
      C[i][j] = C[i][j]/e;
      I[i][j] = I[i][j]/e;
    }
    for(ii=0; ii<dim; ii++){
      if(ii==i){continue;}
      e = C[ii][i];
      for(j=0; j<dim; j++){
        C[ii][j] -= e*C[i][j];
        I[ii][j] -= e*I[i][j];
      }
    }
  }
    return I;
}

function fixReturn(thing){
  var sum=0;
  if(thing===null){
    return 0;
  }
  thing.forEach(function(thing2){
    console.log(thing2,thing);
    if(thing2===""){
      sum+=1;
    }
    else{
      sum+=parseInt(thing2);
    }
  })
  return sum;
}

function mEquation(equation){
  try{
    var elems=[];
    var molcs=equation.match(/[A-Z][^+=]*/gm);
    equation.match(/[A-Z][^+=]*/gm).forEach(function(molecule){
      console.log(molecule);
      molecule.match(/[A-Z][a-z]?/gm).forEach(function(element){
        if(elems.indexOf(element)<0){
          elems.push(element);
    }})})
    console.log(elems,molcs);
    var matrixP=[];
    elems.forEach(function(element){
      matrixP.push([]);
      molcs.forEach(function(molecule){
        console.log("molecule = " + molecule+", tested element = "+element);
        console.log("match = " + molecule.match(new RegExp("(?<="+element+")[0-9]*","gm")));
        matrixP[matrixP.length-1].push(fixReturn(molecule.match(new RegExp("(?<="+element+")[0-9]*","gm"))));
      })
    })
    console.log(matrixP);
    while(matrixP[0].length>matrixP.length){
      matrixP.push([]);
      for(var i=0; i<matrixP[0].length; i++){
        if(i===matrixP.length-1){
          matrixP[matrixP.length-1].push(1);
        }
        else{
          matrixP[matrixP.length-1].push(0);
        }
      }
    }
    var ratio=[];
    var matrix=invertMatrix(matrixP);
    for(var i=0;i<matrix.length;i++){
      ratio.push(matrix[i][matrix.length-1]);
    }
    console.log(ratio);
    var quitValue=3000;
    var multiplier=0;
    while(quitValue!==0){
      multiplier++;
      quitValue++;
      var bad=0;
      ratio.forEach(function(numb){
        if(!(Math.round(numb*1000*multiplier)%1000===0)){
          bad=1;
        }
      })
      if(bad===0){break;}
    }
    console.log(multiplier);
    answer="";
    for(var i=0;i<ratio.length;i++){
      ratio[i]=ratio[i]*multiplier;
      answer+=Math.abs(ratio[i])+molcs[i];
      if(ratio.length-1>i){
        if(ratio[i+1]*ratio[i]>0){
          answer+="+";
        }
        else{
          answer+="="
        }
      }
    }
    console.log(answer);
    return [answer,0];
  }
  catch(TypeError){
    return [equation,1];
  }
}
