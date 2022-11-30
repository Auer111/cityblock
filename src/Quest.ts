export class Quest
{
    //tiles
    cardsEl : HTMLElement;
    questCompleteEl : HTMLElement;
  constructor(){
    //this.items = window.CAMPAIGN.level.locked.map(tid => data.tiles.find(t => t.id === tid));
    this.cardsEl = document.getElementById("cards");
    this.questCompleteEl = document.body.querySelector("#quest-complete");
    //this.init();
  }

//   renderQuest(tile){
//     if(!tile){return;}
//     const cat = this.data.cats.find(x => x.id == tile.catId);
//     const img = window.IMG.raw(tile.img);
    
//   }

//   renderRequirements(require){
//     let html = "";
//     require.forEach(r => {
//       const tile = this.data.tiles.find(x => x.id == r.id);
//       html += `<div class="row"><progress class="progress-${r.id}" value="0" max="${r.count}"></progress><span>${window.IMG.raw(tile.img)}</span></div>`
//     });
//     return html;
//   }

//   updateQuestUI(lockedTile, require){
//     if(!this.items.length){return;}
//     const el = document.querySelector('#quest-'+lockedTile.id);
//     if(el){
//       //el.querySelector(`.progress-${require.id}`).value = require.progress;
//     }
    
//   }

//   placed(tileId){
//     this.items.forEach(lockedTile => {
//       lockedTile.require = lockedTile.require.filter(r => {
//         if(r.id == tileId){
//           r.progress++;
//           this.updateQuestUI(lockedTile, r);
//           if(r.progress >= r.count){return false;}
//         }
//         return true;
//       });
//       if(lockedTile.require.length === 0){
//         this.unlock(lockedTile);
//       }
//     });

//     if(window.CAMPAIGN.level.objective == tileId){
//       this.levelComplete = true;
//     }
//   }

//   unlock(tile){
//     const remove = this.items.findIndex(q => q.id == tile.id);
//     this.items.splice(remove,1);
//     window.PLAYER.addCard(tile.id);
//     this.init();
//   }
}

export default Quest;