import Utils from "../Utils.js"

export class Quest{
  constructor(data){
    new Utils().loadCss(import.meta.url);
    window.QUEST = this;
    this.items = data.quests;
    this.questEl = document.body.querySelector("#quests");
    this.questCompleteEl = document.body.querySelector("#quest-complete");
    this.init();
  }

  init(){
    this.questEl.innerHTML = this.items.map((quest) => this.renderQuest(quest)).join('');
  }

  renderQuest(quest){
    if(!quest){return;}
    const tile = window.data.tiles.find(x => x.id == quest.unlockId);
    const cat = window.data.cats.find(x => x.id == tile.catId);
    const img = window.IMG.raw(tile.img);
    return `
    <figure id="quest-${tile.id}" class="quest card--${cat.color} row">
        ${img}
        <div class="col quest-info">
          <span>${quest.info}</span>
          <progress value="0" max="${quest.requireCount}"></progress>
        </div>
    </figure>`;
  }

  updateQuestUI(quest){
    if(!this.items.length){return;}
    const el = document.querySelector('#quest-'+quest.unlockId);
    el.querySelector('progress').value = quest.progress;
  }

  placed(tileId){
    this.items.forEach(quest => {
      if(quest.requireId == tileId){
        quest.progress++; 
        if(quest.progress >= quest.requireCount){
          this.complete(quest);
        }
        this.updateQuestUI(quest);
      }
    });
  }

  complete(quest){
    const remove = this.items.findIndex(q => q.id == quest.id);
    this.items.splice(remove,1);
    this.init();

    const tile = window.data.tiles.find(x => x.id == quest.unlockId);
    this.questCompleteEl.innerHTML = window.UI.getCardHtml(tile);
    this.questCompleteEl.children[0].classList.remove('drag')
    this.questCompleteEl.addEventListener('click', ()=>{
      window.PLAYER.addCard(quest.unlockId);
      window.QUEST.questCompleteEl.style.display = 'none';
    });
    window.QUEST.questCompleteEl.style.display = 'flex';
  }
}