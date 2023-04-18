(function () {
    const items = [
      '🍔',
      '🍱',
      '🍝',
      '🥘',
      '🥗',
    ];
    const doors = document.querySelectorAll('.door');
    document.querySelector('#spinner').addEventListener('click', spin);
    document.querySelector('#reseter').addEventListener('click', init);
  
    function init(firstInit = true, groups = 1, duration = 1) {
      for (const door of doors) {
        if (firstInit) {
          door.dataset.spinned = '0';
        } else if (door.dataset.spinned === '1') {
          return;
        }
  
        const boxes = door.querySelector('.boxes');
        const boxesClone = boxes.cloneNode(false);
        const pool = ['❓'];
  
        if (!firstInit) {
          const arr = [];
          for (let n = 0; n < (groups > 0 ? groups : 1); n++) {
            arr.push(...items);
          }
          pool.push(...shuffle(arr));
  
          boxesClone.addEventListener(
            'transitionstart',
            function () {
              door.dataset.spinned = '1';
              this.querySelectorAll('.box').forEach((box) => {
                box.style.filter = 'blur(1px)';
              });
            },
            { once: true }
          );
  
          boxesClone.addEventListener(
            'transitionend',
            function () {
              this.querySelectorAll('.box').forEach((box, index) => {
                box.style.filter = 'blur(0)';
                if (index > 0) this.removeChild(box);
              });
            },
            { once: true }
          );
        }
  
        for (let i = pool.length - 1; i >= 0; i--) {
          const box = document.createElement('div');
          box.classList.add('box');
          box.style.width = door.clientWidth + 'px';
          box.style.height = door.clientHeight + 'px';
          box.textContent = pool[i];
          boxesClone.appendChild(box);
        }
        boxesClone.style.transitionDuration = `${duration > 0 ? duration : 1}s`;
        boxesClone.style.transform = `translateY(-${door.clientHeight * (pool.length - 1)}px)`;
        door.replaceChild(boxesClone, boxes);
      }
    }
  
    async function spin() {
      init(false, 1, 2);
  
      for (const door of doors) {
        const boxes = door.querySelector('.boxes');
        const duration = parseInt(boxes.style.transitionDuration);
        boxes.style.transform = 'translateY(0)';
        await new Promise((resolve) => setTimeout(resolve, duration * 100));
      }
  
      var boxValues = [];
      for (const door of doors) {
        const boxes = door.querySelector('.boxes');
        const boxText = boxes.querySelector('.box').textContent;
        boxValues.push(boxText);
      }
      console.log(boxValues);
      var counts = {};
      boxValues.forEach(function (value) {
        if (counts[value]) {
          counts[value]++;
        } else {
          counts[value] = 1;
        }
      });
  
      var maxCount = 0;
      var maxCountValue = '';
      for (var value in counts) {
        if (counts.hasOwnProperty(value)) {
          if (counts[value] > maxCount) {
            maxCount = counts[value];
            maxCountValue = value;
          }
        }
      }
      
      function sleep(time)
    {
    return(new Promise(function(resolve, reject) {
        setTimeout(function() { resolve(); }, time);
    }));
    }
      // 檢查最後三個圖案是否相同，如果是則顯示提示並加
      // 檢查最後三個圖案是否相同，如果是則顯示提示並加入額外的條件判斷

      if (boxValues[0] === boxValues[1] && boxValues[1] === boxValues[2]) {
          document.getElementById('result').textContent = `今天晚餐是...${maxCountValue}`;
          // 加入額外的條件判斷
          if (maxCountValue === '🍔') {
            // 如果中獎圖案是🍔，執行特定的操作
            console.log('中獎圖案是🍔，執行特定的操作');
          } else if (maxCountValue === '🍱') {
            // 如果中獎圖案是🍱，執行特定的操作
            console.log('中獎圖案是🍱，執行特定的操作');
          } else {
            // 如果中獎圖案是其他，執行預設的操作
            console.log('中獎圖案是其他，執行預設的操作');
          }
        } 
        else {
            function sleep(time) {
                return new Promise(resolve => setTimeout(resolve, time));
            }
            async function delay() {
                await sleep(2000);
                document.getElementById('result').textContent = `今天晚餐是...${boxValues[1]}`;
            }
            delay();
            
        }
      }
    
      function shuffle(array) {
        let currentIndex = array.length;
        let temporaryValue;
        let randomIndex;
    
        // While there remain elements to shuffle...
        while (currentIndex !== 0) {
          // Pick a remaining element...
          randomIndex = Math.floor(Math.random() * currentIndex);
          currentIndex--;
    
          // And swap it with the current element.
          temporaryValue = array[currentIndex];
          array[currentIndex] = array[randomIndex];
          array[randomIndex] = temporaryValue;
        }
    
        return array;
      }
    
      init();
    })();
    