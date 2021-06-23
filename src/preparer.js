const data = require('./api.php.json')

const wind = d => d.CREATED.includes("2021-05-06")

    /**
     * meteo array wind 
     * speed index reference
     * *********************
     * wind speed   | index
     * 0 to 2       | 0
     * 2 to 4       | 1
     * 4 to 6       | 2
     * 6 to 8       | 3
     * 8 to 10      | 4
     * 10 to 12     | 5
     * 12 to 14     | 6
     * 14 to 16     | 7
     * 16 to 18     | 8    
     */ 

let meteo = {N:     [0,0,0,0,0,0,0,0,0], 
             NNE:   [0,0,0,0,0,0,0,0,0], 
             NE:    [0,0,0,0,0,0,0,0,0], 
             ENE:   [0,0,0,0,0,0,0,0,0], 
             E:     [0,0,0,0,0,0,0,0,0], 
             ESE:   [0,0,0,0,0,0,0,0,0], 
             SE:    [0,0,0,0,0,0,0,0,0], 
             SSE:   [0,0,0,0,0,0,0,0,0], 
             S:     [0,0,0,0,0,0,0,0,0],
             SSO:   [0,0,0,0,0,0,0,0,0],
             SO:    [0,0,0,0,0,0,0,0,0],
             OSO:   [0,0,0,0,0,0,0,0,0],
             O:     [0,0,0,0,0,0,0,0,0],   
             ONO:   [0,0,0,0,0,0,0,0,0],
             NO:    [0,0,0,0,0,0,0,0,0],
             NNO:   [0,0,0,0,0,0,0,0,0] 
               }


const resultats = data
    .filter(wind)
    .map(d => ({ direction: +d.WIND_DIRECTION, vitesse: +d.WIND_SPEED }))
    .sort((a, b) => a.direction < b.direction ? -1 : 1)


resultats.forEach(element => {

    if (element.direction >= 0 && element.direction <= 11.25) {
        meteo.N[sortBySpeed(element.vitesse)] += 1; 
    }
    if (element.direction >= 11.25 && element.direction <= 33.75) {
        meteo.NNE[sortBySpeed(element.vitesse)] += 1;
    }
    if (element.direction >= 33.75 && element.direction <= 56.25) {
        meteo.NE[sortBySpeed(element.vitesse)] += 1;
    }
    if (element.direction >= 56.25 && element.direction <= 78.75) {
        meteo.ENE[sortBySpeed(element.vitesse)] += 1;
    }
    if (element.direction >= 78.75 && element.direction <= 101.25) {
        meteo.E[sortBySpeed(element.vitesse)] += 1;
    }
    if (element.direction >= 101.25 && element.direction <= 123.75) {
        meteo.ESE[sortBySpeed(element.vitesse)] += 1;
    }
    if (element.direction >= 123.75 && element.direction <= 146.25) {
        meteo.SE[sortBySpeed(element.vitesse)] += 1;
    }
    if (element.direction >= 146.25 && element.direction <= 168.75) {
        meteo.SSE[sortBySpeed(element.vitesse)] += 1;
    }
    if (element.direction >= 168.75 && element.direction <= 191.25) {
        meteo.S[sortBySpeed(element.vitesse)] += 1;
    }
    if (element.direction >= 191.25 && element.direction <= 213.75) {
        meteo.SSO[sortBySpeed(element.vitesse)] += 1;
    }
    if (element.direction >= 213.75 && element.direction <= 236.25) {
        meteo.SO[sortBySpeed(element.vitesse)] += 1;
    }
    if (element.direction >= 236.25 && element.direction <= 258.75) {
        meteo.OSO[sortBySpeed(element.vitesse)] += 1;
    }
    if (element.direction >= 258.75 && element.direction <= 281.25) {
        meteo.O[sortBySpeed(element.vitesse)] += 1;
    }
    if (element.direction >= 281.25 && element.direction <= 303.75) {
        meteo.ONO[sortBySpeed(element.vitesse)] += 1;
    }
    if (element.direction >= 303.75 && element.direction <= 326.25) {
        meteo.NO[sortBySpeed(element.vitesse)] += 1;
    }
    if (element.direction >= 326.25 && element.direction <= 348.75) {
        meteo.NNO[sortBySpeed(element.vitesse)] += 1;
    }
    if (element.direction >= 348.75 && element.direction <= 360) {
        meteo.N[sortBySpeed(element.vitesse)] += 1;
    }

});



// console.log(JSON.stringify(resultats))
console.log(JSON.stringify(meteo));

function sortBySpeed(vitesse) {

    if(vitesse >= 0 && vitesse <=2){
        return 0;
    }
    if(vitesse > 2 && vitesse <= 4){
        return 1; 
    }
    if(vitesse > 4 && vitesse <= 6){
        return 2; 
    }
    if(vitesse > 6 && vitesse <= 8){
        return 3; 
    }
    if(vitesse > 8 && vitesse <= 10){
        return 4; 
    }
    if(vitesse > 10 && vitesse <= 12){
        return 5; 
    }
    if(vitesse > 12 && vitesse <= 14){
        return 6; 
    }
    if(vitesse > 14 && vitesse <= 16){
        return 7; 
    }
    if(vitesse > 16 && vitesse <= 18){
        return 8; 
    }
    
}