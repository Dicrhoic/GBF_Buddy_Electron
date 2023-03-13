class BattleDetails
{
    constructor(id, difficulty, time, element, revive, reviveTime, type, desc)
    {   
        this.id = id;
        this.difficulty = difficulty;
        this.time = time;
        this.element = element;
        this.revive = revive;
        this.reviveTime = reviveTime;
        this.type = type;
        this.desc = desc;
    }
}
class Setups
{
      constructor(id, BattleDetails, party, weapons, summons)
      {
        this.id = id;
        this.BattleDetails = BattleDetails;
        this.party = party;
        this.weapons = weapons;
        this.summons = summons;
      }
}

const party = new Map([
    ["apples", 500],
]);

const summonSetup = new Map([
    ["apples", 500],
]);

const weaponGrid = new Map([
    ["apples", 500],
]);

const GWBattleLogs = new Map([
    ["apples", 500],
]);

const GWLogTable = new Map([
    ["apples", 500],
]);



var gwDB;

function CreateParty()
{

}

function ExtractDetails()
{   
    GWBattleLogs.clear();
    let index = 0;
    let sqlite3 = require('sqlite3');
    gwDB = new sqlite3.Database('./databases/gwDB.db', (err) => {
        if (err) {
            console.error(err.message);
        }
        console.log('Connected to guildwar database.');
    });
    gwDB.serialize(() => {
        gwDB.each(`SELECT * 
				 FROM SetupDetails`, (err, row) => {
            if (err) {
                console.error(err.message);
            }
            let data = new BattleDetails(row.Id, row.Difficulty, row.Time, row.Element, row.Revive, 
                row.ReviveTime, row.Type, row.Description);
            GWBattleLogs.set(index, data);
            index++;
            console.log(GWBattleLogs.size);
        });
    });
    gwDB.close();
}



function CreateNavBarGW()
{   
    if(activated == "Y")
    {
        CloseGachaForm();
    }
    var a1 = document.createElement('a');
    a1.href = "javascript:void(0)";
    a1.innerHTML = "&times";
	a1.onclick = closeNav();
    a1.setAttribute("class", "closebtn");
    var a2 = document.createElement('a');
    a2.href = "javascript:void(0)";
    a2.innerHTML = "Load Guild War Batte Logs"
    a2.setAttribute("onclick", "CreateGWTable()");
    var bar = document.getElementById('menuVertNavBar');
    var parent = document.getElementById('GachaLog');
    parent.setAttribute("setting", "gw");
    bar.replaceChildren(a1, a2);
    openNavBar();

}

function CreateGWTable() 
{   
    console.log("Called CreateTable");
    var section = document.getElementById('log');
    var table = document.createElement("table");
    var thd = document.createElement("thead");
    var mainTR = document.createElement('tr');
    var th1 = document.createElement('th');
    var th2 = document.createElement('th');
    var th3 = document.createElement('th');
    var th4 = document.createElement('th');
    var th6 = document.createElement('th');
    th1.innerHTML = "Difficulty";
    th2.innerHTML = "Time";
    th3.innerHTML = "Element"; 
    th4.innerHTML = "Revive";
    th6.innerHTML = "Type";
    mainTR.appendChild(th1);
    mainTR.appendChild(th2);
    mainTR.appendChild(th3);
    mainTR.appendChild(th4);
    mainTR.appendChild(th6);
    thd.appendChild(mainTR);
    table.appendChild(thd);
    var body = document.createElement('tbody');
    for (const itr of GWBattleLogs.keys())
    {  
        console.log("Itr:\t" + itr);
        const data = GWBattleLogs.get(itr);
        console.log(data);
        var tTr = document.createElement("tr");   
        table.appendChild(tTr);
        const tr = document.createElement("tr");
        const h1 = document.createElement("td");
        const a = document.createElement("a");
        a.innerHTML = data.difficulty;
        const h2 = document.createElement("td");
        h2.innerHTML = data.element;
        const h3 = document.createElement("td");
        h3.innerHTML = data.time;
        h1.appendChild(a);
        tr.appendChild(h1);
        tr.appendChild(h2);
        tr.appendChild(h3);
        body.appendChild(tr);
        dataTable.set(itr, table);
        console.log("Table size:" + dataTable.size);
    }
    table.appendChild(body);
    section.appendChild(table);
}

function LoadDetails()
{
    ExtractDetails();
    CreateNavBarGW();
}