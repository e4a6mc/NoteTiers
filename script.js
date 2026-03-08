async function loadPlayers(){

  const url="players.json?v="+Date.now(); // локально
  // когда зальёшь на GitHub Pages, поменяешь на RAW ссылку

  const r=await fetch(url);
  const players=await r.json();

  const container=document.getElementById("players");
  players.sort((a,b)=>b.points-a.points);

  let html="";

  players.forEach((p,i)=>{

    const skin=`https://mc-heads.net/avatar/${p.name}`;

    const icons=p.modes.map(m=>{
      const tier=p.tiers?.[m] || "Unranked";

      return `
        <div class="iconBox">
            <img src="icons/${m}.png" alt="${m}">
            <span class="tooltip"><b>${m}</b><br>${tier}</span>
        </div>
      `;
    }).join("");

    let medal="";

    if(i===0) medal="🥇";
    else if(i===1) medal="🥈";
    else if(i===2) medal="🥉";
    else medal=`🏅 ${i+1}`;

    html+=`
      <div class="player">
        <div class="left">
          <div class="rank">${medal}</div>
          <img class="avatar" src="${skin}">
          <div class="name">${p.name}</div>
        </div>

        <div class="right">
          <div class="points">${p.points} pts</div>
          <div class="modes">${icons}</div>
        </div>
      </div>
    `;
  });

  container.style.opacity="0";

  setTimeout(()=>{
    container.innerHTML=html;
    container.style.opacity="1";
  },200);
}

loadPlayers();              // первый запуск

setInterval(loadPlayers,30000); // обновление раз в минуту
