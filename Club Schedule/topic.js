let topic = ["新生迎新","大社烤","期初成發","社團聚餐","期末成發"];

let startDate= new Date();


function setMonthAndDay(startMonth, startDay){
    //一次設定好月份與日期
    startDate.setMonth(startMonth-1,startDay);
    startDate.setHours(0);
    startDate.setMinutes(0);
    startDate.setSeconds(0);
}

setMonthAndDay(2,21);
