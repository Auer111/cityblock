import Utils from "../Utils.js"

export class Quest{
  constructor(data){
    new Utils().loadCss(import.meta.url);
    window.QUEST = this;
    this.items = data.tiles.filter(t => !t.unlocked);
    this.questEl = document.body.querySelector("#quests");
    this.questCompleteEl = document.body.querySelector("#quest-complete");
    this.init();
  }

  init(){

    this.questEl.innerHTML = this.items.map((tile) => this.renderQuest(tile)).join('');
  }

  renderQuest(tile){
    if(!tile){return;}
    const cat = window.data.cats.find(x => x.id == tile.catId);
    const img = window.IMG.raw(tile.img);
    return `
    <figure id="quest-${tile.id}" class="quest card--${cat.color}">
      ${img}
        <div class="triangle"></div>
        <figcaption class="card__caption">
          <h3 class="quest__info">${tile.name}</h3>
          ${this.renderRequirements(tile.require)}
        </figcaption>
    </figure>`;
  }

  renderRequirements(require){
    let html = "";
    require.forEach(r => {
      const tile = window.data.tiles.find(x => x.id == r.id);
      html += `<div class="row"><progress class="progress-${r.id}" value="0" max="${r.count}"></progress><span>${window.IMG.raw(tile.img)}</span></div>`
    });
    return html;
  }

  updateQuestUI(lockedTile, require){
    if(!this.items.length){return;}
    const el = document.querySelector('#quest-'+lockedTile.id);
    if(el){
      el.querySelector(`.progress-${require.id}`).value = require.progress;
    }
    
  }

  placed(tileId){
    this.items.forEach(lockedTile => {
      lockedTile.require = lockedTile.require.filter(r => {
        if(r.id == tileId){
          r.progress++;
          this.updateQuestUI(lockedTile, r);
          if(r.progress >= r.count){return false;}
        }
        return true;
      });
      if(lockedTile.require.length === 0){
        this.unlock(lockedTile);
      }
    });
  }

  unlock(tile){
    const remove = this.items.findIndex(q => q.id == tile.id);
    this.items.splice(remove,1);

    this.questCompleteEl.innerHTML = window.UI.getCardHtml(tile);
    this.questCompleteEl.children[0].classList.remove('drag');
    this.questCompleteEl.addEventListener('click', ()=>{
      window.PLAYER.addCard(tile.id);
      window.QUEST.questCompleteEl.style.display = 'none';
      this.init();
    },{once: true});
    window.QUEST.questCompleteEl.style.display = 'flex';
  }
}