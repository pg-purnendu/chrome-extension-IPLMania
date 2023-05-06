let iplData = [];
let length = 0;
let currentindex = 0;

function main(){
    //getMatchData();
    showdata();
}

async function getMatchData() {

    return await fetch("https://api.cricapi.com/v1/currentMatches?apikey=bef4b6e4-0fbb-4e11-9410-6e16e2ca5ab1&offset=0")
        .then(data => data.json())
        .then(data => {
            if (data.status != "success")
            {
                document.getElementById("main").innerHTML = `<h2>No matches found today !</h2>`;
                return;
            }

            const matcheList = data.data;

            if(matcheList == null || matcheList == undefined || Object.keys(matcheList).length == 0)
            {
                document.getElementById("main").innerHTML = `<h2>No matches found today !</h2>`;
                return;
            }

            iplData = matcheList.filter(match => match.series_id == "c75f8952-74d4-416f-b7b4-7da4b4e3ae6e");
            return;
        }
    )
    .catch(e => console.log(e));
}

async function showdata(){
    await getMatchData();
    length = iplData.length;    

    if(length == 0)
    {
        document.getElementById("main").innerHTML = `<h2>No matches found today !</h2>`;
        return;
    }
    else
    {
        let relevantData = iplData[currentindex];
        show(relevantData);
    }
}

function toggle(type){
    switch(type)
    {
        case 1:
            if(currentindex == 0) return;
            else
            {
                currentindex--;
                showdata();
            }
        break;

        case 2:
            if(currentindex == length-1) return;
            else
            {
                currentindex++;
                showdata();
            }
        break;
    }
}

function show(relevantData){
    document.getElementById("team1logo").innerHTML = `<img src="${relevantData.teamInfo[0].img}">`;
    document.getElementById("team2logo").innerHTML = `<img src="${relevantData.teamInfo[1].img}">`;
    
    document.getElementById("team1").innerHTML = relevantData.teamInfo[0].shortname;
    document.getElementById("team2").innerHTML = relevantData.teamInfo[1].shortname;

    document.getElementById("matchstatus").innerHTML = relevantData.status;
    document.getElementById("venue").innerHTML = relevantData.venue;

    let t1name = relevantData.teamInfo[0].name + ' Inning 1';
    let t2name = relevantData.teamInfo[1].name + ' Inning 1';

    if(relevantData.score.length > 0)
    {
        let t1 = relevantData.score.filter(obj => obj.inning == t1name);
        let t2 = relevantData.score.filter(obj => obj.inning == t2name);

        if(t1.length > 0)
            document.getElementById("team1score").innerHTML = `<h2>${t1[0].r} / ${t1[0].w} </h2> (${t1[0].o})`;
        else
            document.getElementById("team1score").innerHTML = 'Yet to bat';

        if(t2.length > 0)
            document.getElementById("team2score").innerHTML = `<h2>${t2[0].r} / ${t2[0].w} </h2> (${t2[0].o})`;
        else
            document.getElementById("team2score").innerHTML = 'Yet to bat';
    }
}

main();






