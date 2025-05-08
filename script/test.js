function getTimeString(time){
    let hour=parseInt (time/3600);
    let remindSc= time%3600;
    let minute= parseInt (remindSc/60);
    let second= remindSc%60;
    return `${hour} hour ${minute} minute ${second} second ago`;
}
console.log(getTimeString(43266));