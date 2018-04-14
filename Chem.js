//var numbers=['1','2','3','4','5','6','7','8','9','0'];
var atoms=['H','He','Li','Be','B','C','N','O','F','Ne','Na','Mg','Al','Si','P','S','Cl','Ar','K','Ca','Sc','Ti','V','Cr','Mn','Fe','Co','Ni','Cu','Zn','Ga','Ge','As','Se','Br','Kr','Rb','Sr','Y','Zr','Nb','Mo','Tc','Ru','Rh','Pd','Ag','Cd','In','Sn','Sb','Te','I','Xe','Cs','Ba','La','Ce','Pr','Nd','Pm','Sm','Eu','Gd','Tb','Dy','Ho','Er','Tm','Yb','Lu','Hf','Ta','W','Re','Os','Ir','Pt','Au','Hg','Tl','Pb','Bi','Po','At','Rn','Fr','Ra','Ac','Th','Pa','U','Np','Pu','Am','Cm','Bk','Cf','Es','Fm','Md','No','Lr','Rf','Db','Sg','Bh','Hs','Mt','Ds','Rg','Cn','Nh','Fl','Mc','Lv','Ts','Og'];
var weights=[1.008,4.002,6.941,9.012,10.814,12.011,14.007,15.999,18.998,20.179,22.989,24.305,26.981,28.085,30.973,32.060,35.450,39.948,39.098,40.078,44.955,47.867,50.941,51.996,54.938,55.845,58.933,58.693,63.546,65.380,69.723,72.630,74.921,78.971,79.904,83.798,85.468,87.620,88.905,91.224,92.906,95.950,98,101.070,102.906,106.420,107.868,112.414,114.818,118.710,121.760,127.600,126.90447,131.293,132.90545196,137.327,138.90547,140.116,140.90766,144.242,145,150.36,151.964,157.25,158.92535,162.500,164.93033,167.259,168.93422,173.045,174.9668,178.49,180.94788,183.84,186.207,190.23,192.217,195.084,196.966569,200.592,204.38,207.2,208.98040,209,210,222,223,226,227,232.0377,231.03588,238.02891,237,244,243,247,247,251,252,257,258,259,266,267,268,269,270,277,278,281,282,285,286,289,290,293,294,294];
var regex1=/[A-Z][^A-Z]*/g;


function molecularWeight(molecule){
	var tWeight=0;
	molecule.match(regex1).forEach(function(mPart){
		if (!(/\d+$/.test(mPart))){
			mPart+="1";
		}
		tWeight+=parseFloat(mPart.match(/\d+$/))*weights[atoms.indexOf(mPart.match(/[A-Z][a-z]*/)[0])];
		//console.log(parseInt(mPart.match(/\d+$/))*weights[atoms.indexOf(mPart.match(/[A-Z][a-z]*/)[0])]);
	});
	return tWeight;
}

function formulaRatio(equation){
	var molec=[];
	var weight=[];
	var ratio=[];
	equation.match(/[^+=]+/g).forEach(function(molecule){
		molec.push(molecule);
		//console.log(molecule);
		weight.push(molecularWeight(molecule.match(/^[\d]*(.*)/)[1]));
		//console.log(molecularWeight(molecule.match(/^[\d]*(.*)/)[1]));
		if(!(/^[\d]/.test(molecule))){
			molecule="1"+molecule;
		}
		ratio.push((parseInt(molecule.match(/^[\d]*/)))*molecularWeight(molecule.match(/^[\d]*(.*)/)[1]));
		//console.log(parseInt(molecule.match(/^[\d]*/))*molecularWeight(molecule.match(/^[\d]*(.*)/)[1]));
	});
	return [molec,weight,ratio];
}

function makeTable(BigArray){
	BigArray[0].forEach(function(molecule){
		var molecRow=document.getElementById("molec");
		var x=molecRow.insertCell(molecRow.length);
		x.innerHTML=molecule;
	});
	BigArray[1].forEach(function(molecule){
		var weightRow=document.getElementById("weight");
		var x=weightRow.insertCell(weightRow.length);
		x.innerHTML=molecule;
	});
	BigArray[2].forEach(function(molecule){
		var ratioRow=document.getElementById("ratio");
		var x=ratioRow.insertCell(ratioRow.length);
		x.innerHTML=molecule;
		var adjRow=document.getElementById("adjustable");
		x=adjRow.insertCell(adjRow.length);
		x.innerHTML="<input></input>";
	});
	
}

//console.log("C6H12O6".match(regex1))
//console.log(molecularWeight("C6H12O6"))
document.addEventListener("DOMContentLoaded", function() { 
	makeTable(formulaRatio("CH4+2O2=CO2+2H2O"));
});
