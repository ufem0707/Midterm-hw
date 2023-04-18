$(function(){
    $("#courseTable").append("<tr><th>場次</th><th>時間</th><th>主題</th></tr>");

    // 日期輸入框
    $("body").prepend("<input type='date' id='startDateInput'>");
    $("#startDateInput").val();
    
    let topicCount= topic.length;
    let millisecsPerDay = 24*60*60*1000;

    $("#startDateInput").change(function() {
        let startDate = new Date($("#startDateInput").val());
        
        $("#courseTable tr:not(:first)").remove(); // 移除原本的課表
        for(var x=0; x < topicCount; x++){
            let rowColor = (x % 2 === 0) ? "mistyrose" : "lavender"; 
            let currentDate = new Date(startDate.getTime() + 7*x*millisecsPerDay);
            if (currentDate.getMonth() === 3 && currentDate.getDate() === 3) { 
                rowColor = "lightgrey"; 
            }
            if (currentDate.getMonth() === 3 && currentDate.getDate() === 4) { 
                rowColor = "lightgrey"; 
            }
            if (currentDate.getMonth() === 3 && currentDate.getDate() === 5) { 
                rowColor = "lightgrey"; 
            }
            if (currentDate.getMonth() === 5 && currentDate.getDate() === 22) { 
                rowColor = "lightgrey"; 
            }
            if (currentDate.getMonth() === 5 && currentDate.getDate() === 23) { 
                rowColor = "lightgrey"; 
            }
            if (currentDate.getMonth() === 8 && currentDate.getDate() === 29) { 
                rowColor = "lightgrey"; 
            }
            if (currentDate.getMonth() === 9 && currentDate.getDate() === 9) { 
                rowColor = "lightgrey"; 
            }
            if (currentDate.getMonth() === 9 && currentDate.getDate() === 10) { 
                rowColor = "lightgrey"; 
            }
            
            $("#courseTable").append(
                `<tr style='background-color:${rowColor}'>`+
                `<td>${x+1}</td>`+
                `<td>${(new Date(startDate.getTime() + 7*x*millisecsPerDay)).toLocaleDateString(undefined, {month: 'numeric', day: 'numeric'})}</td>`+
                `<td>${topic[x]}</td>`+
                "</tr>");
        }
    });

    // 初始化日期 = 今天的日期
    let currentDate = new Date();
    let formattedCurrentDate = currentDate.toISOString().substr(0, 10);
    $("#startDateInput").val(formattedCurrentDate);
    $("#startDateInput").trigger("change"); 

});