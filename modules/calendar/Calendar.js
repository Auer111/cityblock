import Utils from "/modules/Utils.js"

export class Calendar
{
    constructor() {
        new Utils().loadCss(import.meta.url);
        this.createExtensions();
        this.renderStart = new Date();
        this.renderEnd = new Date();
        this.renderDate = true;
        this.render();
    }

    render(){
        let calEl = this.newEl('calendar');
        for(let y = this.renderStart.getFullYear(); y <= this.renderEnd.getFullYear(); y++ ){
            calEl.appendChild(this.renderYear(y));
        }
        document.body.appendChild(calEl);
    }

    renderYear(year){
        let yearEl = this.newEl(null, 'year');
        for(let m = 0 ; m < 12; m++){
            let monthEl = this.newEl(null, 'month');
            let headerEl = this.renderMonthHeader(year, m);
            let allWeeksEls = this.renderMonth(year, m);
            
            monthEl.appendChild(headerEl);
            monthEl.appendChild(allWeeksEls);
            
            yearEl.appendChild(monthEl);
        }
        return yearEl;
    }

    renderMonthHeader(year, month){
        let header = this.newEl(null, 'month-header');
        header.innerText = new Date(year, month, 1).getNameOfMonth();
        return header;
    }

    renderMonth(year, month){

        let monthStart = new Date(year,month , 1).getFirstRenderDayOfMonth();
        let monthEnd = new Date(year,month, 1).getLastRenderDayOfMonth();

        let current = monthStart;

        let weeksWrapperEl = this.newEl(null, 'weeks-wrapper');
        let weekEl = this.newEl(null, 'week');
        while(current <= monthEnd)
        {
            this.renderDate = current.getMonth() === month;
            weekEl = current.getDay() === 0 ? this.newEl(null, 'week') : weekEl;
            weekEl.appendChild(this.renderDay(current.getDate()));

            if(current.getDay() === 6){
                weeksWrapperEl.appendChild(weekEl);
            }
            current = current.addDays(1);
        }
        return weeksWrapperEl;
    }

    renderDay(day){
        let dayEl = this.newEl(null, 'day');
        dayEl.appendChild(this.renderContent(day));
        return dayEl;
    }

    renderContent(day){
        let contentEl = this.newEl(null, 'content');

        if(this.renderDate){
            contentEl.innerText = day;
        }else{
            contentEl.style.opacity = "50%";
        }
        
        return contentEl;
    }

    newEl(id, classes){
        let el = document.createElement('div');
        if(!this.isNullOrUndefined(id)){
            el.id = id;
        }
        if(!this.isNullOrUndefined(classes)){
            el.classList = classes;
        }
        return el;
    };

    createExtensions(){
        Date.prototype.addDays = function(days) {
            var date = new Date(this.valueOf());
            date.setDate(date.getDate() + days);
            return date;
        }
        Date.prototype.getFirstRenderDayOfMonth = function() {
            var current = new Date(this.getFullYear(), this.getMonth(), 1);
            while(current.getDay() !== 0 ){
                current = current.addDays(-1);
            }
            return current;
        }
        Date.prototype.getLastRenderDayOfMonth = function() {
            var current = new Date(this.getFullYear(), this.getMonth() + 1, 0);
            while(current.getDay() !== 6 ){
                current = current.addDays(1);
            }
            return current;
        }
        Date.prototype.getNameOfMonth = function() {
            var date = new Date(this.valueOf());
            return date.toLocaleString('default', { month: 'long' });
        }
    }
    isNullOrUndefined(that){
        if(typeof that === "undefined" || that === null){
            return true;
        }
    }
}

export default Calendar;
