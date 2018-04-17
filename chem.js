var atoms = ['H','He','Li','Be','B','C','N','O','F','Ne','Na','Mg','Al','Si','P','S','Cl','Ar','K','Ca','Sc','Ti','V','Cr','Mn','Fe','Co','Ni','Cu','Zn','Ga','Ge','As','Se','Br','Kr','Rb','Sr','Y','Zr','Nb','Mo','Tc','Ru','Rh','Pd','Ag','Cd','In','Sn','Sb','Te','I','Xe','Cs','Ba','La','Ce','Pr','Nd','Pm','Sm','Eu','Gd','Tb','Dy','Ho','Er','Tm','Yb','Lu','Hf','Ta','W','Re','Os','Ir','Pt','Au','Hg','Tl','Pb','Bi','Po','At','Rn','Fr','Ra','Ac','Th','Pa','U','Np','Pu','Am','Cm','Bk','Cf','Es','Fm','Md','No','Lr','Rf','Db','Sg','Bh','Hs','Mt','Ds','Rg','Cn','Nh','Fl','Mc','Lv','Ts','Og'];
var weights = [1.008,4.002,6.941,9.012,10.814,12.011,14.007,15.999,18.998,20.179,22.989,24.305,26.981,28.085,30.973,32.060,35.450,39.948,39.098,40.078,44.955,47.867,50.941,51.996,54.938,55.845,58.933,58.693,63.546,65.380,69.723,72.630,74.921,78.971,79.904,83.798,85.468,87.620,88.905,91.224,92.906,95.950,98,101.070,102.906,106.420,107.868,112.414,114.818,118.710,121.760,127.600,126.90447,131.293,132.90545196,137.327,138.90547,140.116,140.90766,144.242,145,150.36,151.964,157.25,158.92535,162.500,164.93033,167.259,168.93422,173.045,174.9668,178.49,180.94788,183.84,186.207,190.23,192.217,195.084,196.966569,200.592,204.38,207.2,208.98040,209,210,222,223,226,227,232.0377,231.03588,238.02891,237,244,243,247,247,251,252,257,258,259,266,267,268,269,270,277,278,281,282,285,286,289,290,293,294,294];
var regex1 = /[A-Z][^A-Z]*/g;
var last = "CH4+2O2=CO2+2H2O";


function molecularWeight(molecule) {
	var tWeight = 0;
	try {
		molecule.match(regex1).forEach( function(mPart) {
			if (!(/\d+$/.test(mPart))) {
				mPart += "1";
			}
			tWeight += parseFloat(mPart.match(/\d+$/)) * weights[atoms.indexOf(mPart.match(/[A-Z][a-z]*/)[0])];
		});
	} catch (TypeError) {
		console.log("TypeError");
	}
	return tWeight;
}

function formulaRatio(equation) {
	var molec = [];
	var weight = [];
	var ratio = [];
	var totalBS = "+";
	var signOrder=[];
	equation.match(/[\+\=]/g).forEach(function(sign){
		totalBS+=sign;
	});
	console.log(totalBS)
	try {
		equation.match(/[^+=]+/g).forEach( function(molecule) {
			molec.push(molecule);
			weight.push(molecularWeight(molecule.match(/^[\d]*(.*)/)[1]));
			if(!(/^[\d]/.test(molecule))){
				molecule = "1" + molecule;
			}
			ratio.push((parseInt(molecule.match(/^[\d]*/)))*molecularWeight(molecule.match(/^[\d]*(.*)/)[1]));
		});
	} catch (TypeError) {
		console.log("TypeError");
	}
	return [molec,weight,ratio];
}

function solveRatio(ratio, known, knownIn){
	ratioNew=[];
	var x=known/ratio[knownIn];
	for (var i=0; i<ratio.length; i++){
		ratioNew.push(ratio[i]*x);
	}
	return ratioNew;
}

function makeTable(matrix){
	var thing = document.getElementById("box");
	while (thing.children.length > 1) {
		thing.removeChild(thing.lastChild);
	}
	for (var i = 0; i < matrix[0].length; i++) {
		var box = document.createElement("div");

		var a = document.createElement("p");
		a.innerHTML = '\\(' + matrix[0][i].replace(/\D+/g, '\\text{$&}').replace(/\D(\d+)/g, '}_{$1}') + '\\)';
		a.classList.add("white");
		box.appendChild(a);

		var b = document.createElement("p");
		b.innerHTML = matrix[1][i];
		box.appendChild(b);

		var c = document.createElement("p");
		c.innerHTML = matrix[2][i];
		box.appendChild(c);

		var d = document.createElement("input");
		box.appendChild(d);

		thing.appendChild(box);
	}
	MathJax.Hub.Queue(["Typeset",MathJax.Hub]);
}

makeTable(formulaRatio(last));

function thing() {
	var value = document.getElementById("in").value;
	if (value !== last) {
		last = value;
		makeTable(formulaRatio(document.getElementById("in").value));
	}
}
