const taskTimer={
    dueDate:Date.parse($('.dueDateValue').text()),
    untilDueDate:Date.parse($('.dueDateValue').text())-new Date(),
    timer:null,
    reduceTime(){
        taskTimer.untilDueDate-=1000;
    },
    changeTimeDue(){
        $('.time-until-due-date').text(`days: ${Math.floor(taskTimer.untilDueDate/(1000*60*60*24))} hours: ${Math.floor(((taskTimer.untilDueDate/(1000))%(60*60*24))/(60*60))} minutes: ${Math.floor(((taskTimer.untilDueDate/(1000))%(60*60))/(60))}
        seconds: ${Math.floor(((taskTimer.untilDueDate/(1000))%(60)))}`)
    },
    timerHandler(){
        taskTimer.reduceTime();
        if(taskTimer.untilDueDate<=0){
            taskTimer.untilDueDate = 0;
            $('.time-until-due-date').text('PAST DUE')
            clearInterval(taskTimer.timer)

        }else{
            taskTimer.changeTimeDue()
        }
        ;
    },
    startTimer(){
        taskTimer.timer = setInterval(taskTimer.timerHandler,1000)
    }

}
taskTimer.startTimer();