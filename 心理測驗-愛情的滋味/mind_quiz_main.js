$(function(){
    //儲存目前作答到第幾題
    var currentQuiz = null;
    var currentImg = null;
    //當按鈕按下後，要做的事情
    $("#startButton").on("click",function(){
        if(currentQuiz == null){
            //設定目前作答從第0題開始
            currentQuiz = 0;
            $("#image").attr("src", questions[0].image);
            $("#question").text(questions[0].question);//顯示題目
            $("#options").empty();//將選項區清空(可以試著先不寫)
            questions[0].answers.forEach(function(element,index,array){//將選項逐個加入
                $("#options").append(`<input name='options' type='radio' value='${index}'><label>
                ${element[0]}</label><br><br>`);
            });
            $("#startButton").attr("value","下一題");//將按鈕上的文字換成Next
        }
        else{
            currentImg = currentImg + 1;
            // 更新圖片的來源為目前問題的圖片
            $("#image").attr("src", questions[currentImg].image);
            $.each($(":radio"),function(i,val){
                if(val.checked){
                    //如果還沒開始作答就從這裡開始
                    //是否已走到最後要產生結果(A~D)
                    if(isNaN(questions[currentQuiz].answers[i][1])){
                        //通往最終結果
                        $("#image").attr("src", questions[0].image);
                        var finalResult = questions[currentQuiz].answers[i][1];
                        $("#question").text(finalAnswers[finalResult][0]);//顯示最終結果的標題
                        $("#options").empty();//將選項區域清空
                        $("#options").append(`${finalAnswers[finalResult][1]}<br><br>`);//顯示最終結果內容
                        currentQuiz = null;
                        $("#startButton").attr("value","重新開始");
                    }
                    else{
                        currentQuiz = questions[currentQuiz].answers[i][1]-1;//指定下一題，原始資料從1開始，所以要-1
                        //顯示新的題目
                        $("#question").text(questions[currentQuiz].question);
                        $("#options").empty();
                        questions[currentQuiz].answers.forEach(function(element,index,array){
                            $("#options").append(`<input name = 'options' type = 'radio' value = '${index}'><label>
                            ${element[0]}</label><br><br>`);
                        });
                    }
                    return false;//跳離迴圈的方式
                }
            });
        }
    });
});
