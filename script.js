var praveZraneJidlo = "";
var jizSezranaJidla = [];

var hrac1Zvire = "";
var hrac2Zvire = "";
var hrac1Skore = 0;
var hrac2Skore = 0;

function zkontrolujHeslo() {
    var heslo = document.getElementById("heslo").value;
    if(heslo == "cert"){
        document.getElementById("prihlasovani").style.display = "none";
        document.getElementById("zabezpeceno").style.display = "block";
    }
}    

function zmenPozadi() {
    var pozadi = document.getElementById("pozadi").value;
    if(pozadi == "auto"){
        document.body.style.backgroundRepeat = "no-repeat";
        document.body.style.backgroundSize = "cover";
        document.body.style.backgroundImage = "url(auto.jpg)";
    }else if(pozadi == "cert"){
        document.body.style.backgroundRepeat = "no-repeat";
        document.body.style.backgroundSize = "cover";
        document.body.style.backgroundImage = "url(auto.jpg)";
    }else{
        document.body.style.backgroundImage = "none";
        document.body.style.backgroundColor = pozadi;
    }
   
}

function nastavJidlo() {
    if(document.getElementById("jidlo").value != "") {
        switch(document.getElementById("jidlo").value.toLowerCase()){
            case "medříka":
                alert("Čertovi nechutná Medřík!");
                break;
            case "med":
                alert("Čertovi nechutná med ten je pro medvědy a medvěd pro Čerta!");
                break;
            case "učitele":
                alert("ty zrovna nemusí!");
                break;
            case "čerta":
                alert("Čert nežere čerty to by byl kanibal a to není!");
                break;
                case "ovoce":
                    alert("Čert sežral ovoce ale bylo by lepší maso.");
                    break;
                    case "zeleninu":
                        alert("Čert sežral zeleninu ale bylo by lepší maso.");
                    break;
                    case "licenci":
                        alert("Licenci vlastní společnost Jakub. Studio Čert. Desing by: Jakub");
                    break;
                    case "licence":
                        alert("Licenci vlastní společnost Jakub. Studio Čert. Desing by: Jakub");
                        break;
                        break;
                    case "hovno":
                        alert("To si přehnal! jseš normální?");
                        break;

            default:
                if(praveZraneJidlo != "") {
                    jizSezranaJidla.push(praveZraneJidlo);
                    document.getElementById("historie").innerHTML = "Už sežral " + jizSezranaJidla.join(", ") + ". ";
                
                    if(jizSezranaJidla.length == 3){
                        document.getElementById("varovani").innerHTML = "Asi bude zvracet. ";
                    } else if(jizSezranaJidla.length > 3){
                        certeZvracej(5000);
                    }
                }

                praveZraneJidlo = document.getElementById("jidlo").value;
                document.getElementById("informace").innerHTML = "Čert žere " + praveZraneJidlo + ". ";

                switch(praveZraneJidlo.toLowerCase()){
                    case "asistentku":
                        certeZvracej(10000);
                        break;
                    case "halinu":
                        certeZvracej(15000);
                        break;
                    case "alici":
                        certeZvracej(20000);
                        break;
                        case "olinu":
                        certeZvracej(13000);
                        break;
                        case "párky":
                        certeZvracej(5000);
                        break;
                        case "toner":
                        certeZvracej(10000);
                        break;
                    case "tiskárnu":
                        certeZvracej(15000);
                        break;
                    case "papír":
                        certeZvracej(20000);
                        break;
                        case "hnůj":
                        certeZvracej(15000);
                        break;
                        case "zkažené maso":
                        certeZvracej(10000);
                        break;
                }
        }

    }
}

function certeZvracej(pocetMilisekund) {
    document.getElementById("varovani").innerHTML = "Pozvracel se. ";
    document.getElementById("tlacitkoZer").disabled = true;
    setTimeout(vyprazdniCerta, pocetMilisekund);
}

function vyprazdniCerta() {
    praveZraneJidlo = "";
    jizSezranaJidla = [];
    document.getElementById("informace").innerHTML = "Čert už má zase hlad. <br><img src='certhlad.jpg' width='240'>";
    document.getElementById("historie").innerHTML = "";
    document.getElementById("varovani").innerHTML = "";
    document.getElementById("tlacitkoZer").disabled = false;
}

function zkontrolujTeplotu() {
    fetch('https://api.openweathermap.org/data/2.5/weather?units=metric&lat=49.7444444&lon=16.6238889&appid=e31d3441d060f09297aada23cb4dbd8d')
    .then(response => response.json())
    .then(json => {
    var teplotaVBorsove = json.main.temp;
    var certuvPocit = "je Čertovi akorát";
    if (teplotaVBorsove>30){
        certuvPocit = "se Čert usmažil"
    } else if (teplotaVBorsove<5){
        certuvPocit = "Z Čerta je rampouch"
    } else if(teplotaVBorsove<12){
        certuvPocit = "je Čertovi zima";
    } else if (teplotaVBorsove>18){
        certuvPocit = "je Čertovi teplo";
    }
    document.getElementById("teplota").innerHTML = "V Boršově je " + parseInt(teplotaVBorsove) + " stupňů, takže " + certuvPocit + ". ";
    })
}

function hraj(hrac, zvire){
    switch(hrac){
        case 1:
            hrac1Zvire = zvire;
            break;
        case 2:
            hrac2Zvire = zvire;
            break;
    }

    zablokujTlacitka(hrac);
    
    if (hrac1Zvire != "" && hrac2Zvire != ""){
        var vysledek = zjistiVysledek();
        var text = "";
        text += "Hráč 1 vybral <b>" + zjistiDruhyPad(hrac1Zvire) + "</b> a Hráč 2 vybral <b>" + zjistiDruhyPad(hrac2Zvire) + "</b>. ";
        switch(vysledek){
            case 0:
                text += "Nikdo nikoho nesežral, takže ";
                text += "je to <b>remíza</b>. ";
                break;
            case 1:
                hrac1Skore += 1;
                text += hrac1Zvire + " sežral " + zjistiDruhyPad(hrac2Zvire) + ", takže ";
                text += "<b>vyhrál Hráč 1</b>. ";
                break;
            case 2:
                hrac2Skore += 1;
                text += hrac2Zvire + " sežral " + zjistiDruhyPad(hrac1Zvire) + ", takže ";
                text += "<b>vyhrál Hráč 2</b>. ";
                break;
        }

        text += "Aktuální skóre je: <b>" + hrac1Skore + " : " + hrac2Skore +"</b>. ";
        document.getElementById("vysledek").innerHTML = text;
        odblokujTlacitka();
        hrac1Zvire = "";
        hrac2Zvire = "";
    }
}

function zjistiDruhyPad(zvire){
    switch(zvire){
        case "Čert":
            return "Čerta";
        case "Medvěd":
            return "Medvěda";
        case "Had":
            return "Hada";
    }
}

function zablokujTlacitka(hrac){
    switch(hrac){
        case 1:
            document.getElementById("1a").disabled = true;
            document.getElementById("1b").disabled = true;
            document.getElementById("1c").disabled = true;
            break;
        case 2:
            document.getElementById("2a").disabled = true;
            document.getElementById("2b").disabled = true;
            document.getElementById("2c").disabled = true;
            break;
        
    }
}

function odblokujTlacitka(){
    document.getElementById("1a").disabled = false;
    document.getElementById("1b").disabled = false;
    document.getElementById("1c").disabled = false;
    document.getElementById("2a").disabled = false;
    document.getElementById("2b").disabled = false;
    document.getElementById("2c").disabled = false;
}

function zjistiVysledek(){
    switch(hrac1Zvire){
        case "Čert":
            switch(hrac2Zvire){
                case "Čert":
                    return 0;
                case "Medvěd":
                    return 1;
                case "Had":
                    return 2;
            }
        case "Medvěd":
            switch(hrac2Zvire){
                case "Čert":
                    return 2;
                case "Medvěd":
                    return 0;
                case "Had":
                    return 1;
            }
        case "Had":
            switch(hrac2Zvire){
                case "Čert":
                    return 1;
                case "Medvěd":
                    return 2;
                case "Had":
                    return 0;
            }
    }
}