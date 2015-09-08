/* global myTimer */
var letters = "ABCDEFGHI";
var digits = "123456789";
var qv = "tttmmmbbb";
var qh = "lllcccrrr";
var puzzle = "008160090010004006726000000800951003507208901100476008000000562600300010050047800";
var squares = {};
var unitlist = {};
var units = {};
var peers = {};
var valueResults =[];
Array.prototype.contains = function(v){
    return this.indexOf(v) >= 0;
}
String.prototype.contains = function(v){
    return this.indexOf(v) >= 0;
}
//create all the squares and unitlists
for(var i=0;i < letters.length;i++){
    for(var j=0;j< digits.length;j++){
        var row = letters[i];
        var col = digits[j];
        var name = row+col;
        squares[name] = true;
        unitlist[row] = (unitlist[row] || []).concat([name]);
        unitlist[col] = (unitlist[col] || []).concat([name]);
        unitlist[qv[i]+qh[j]] = (unitlist[qv[i]+qh[j]] || []).concat([name]);
    }
}

for (var s in squares){
    units[s] = [];
    for(var key in unitlist){
        if(unitlist[key].indexOf(s) >= 0){
            units[s].push(unitlist[key]);
        }
    }
}

for(var s in squares){
    peers[s] = [];
    units[s].forEach(function(unit){
        unit.forEach(function(p){
            if(p !==s && peers[s].indexOf(p)===-1){
                peers[s].push(p);
            }
        });
    });
}

//function myTimer(){
    
//}

function assign(values, s, d){
    var otherVals = values[s].replace(d,'');
    
    for (var i=0; i < otherVals.length;i++){
        if(!eliminate(values,s,otherVals[i])){
            //setTimeout(function(){eliminate(values,peer,values[s])},100);
            return false; //contradiction encountered.
        }
        
    }
    
    return values;
    
}

function parseGrid(grid){
    var values = {};
    
    for(var s in squares){
        values[s] = digits;
    }
    
    var gridVals = {};
    Object.keys(squares).forEach(function(s,i){
        gridVals[s] = grid[i];
    });
    
    for(var s in gridVals){
        if(digits.contains(gridVals[s])){
            if(!assign(values,s,gridVals[s])){
                return false;
            }
        }
    }  
    return values;
}


function eliminate(values,s,d){
  valueResults.push(JSON.parse(JSON.stringify(values)));
  
  /*Square has a given value and this function eliminates 
  the value from its peers*/
//values=possibilities for each seperate peer
//s= position of square on grid
//d= number that we will eliminate
//Eliminate the value d in the square s from values
// no flippin IF stmt for now
    if(!values[s].contains(d)){
        
        return values;}
    values[s]=values[s].replace(d,'');

//check the reduced values of the square
//if the length is equal to 1 we can assign that value to the sqaure
    if(values[s].length===1){
        //elminate from peers
        peers[s].forEach(function(peer){
            //setTimeout(function(){eliminate(values,peer,values[s])},100);
            eliminate(values,peer,values[s]);
        });
        //setTimeout(function(){myTimer()},8500);
    }  
    return values;
}
function draw(values){
    for(var key in values){
        document.getElementById(key).innerHTML = values[key]; 
    }
}
var x= parseGrid(puzzle);
//var myVar=setTimeout((draw(x),10);
//setTimeout(function(){draw(x)},1000);
valueResults.push(x);
var myTimer;
valueResults.forEach(function(r) { 
    myTimer=setInterval(function(){draw(r)},1000)
 

//draw(valueResults);   
}, this); 
//clearInterval(myTimer); 
draw(x); 
/*
valueResults.forEach(function(r) {myTimer});
var myTimer=setInterval(function(){draw(r)},1000);
clearInterval(myTimer);
*/

    


