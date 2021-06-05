const letsPlay = ()=>{
    const startGame = document.querySelector('.start');
    const resetGame = document.querySelector('.stop');
    var time = document.querySelector('.clock');
    var moves = document.querySelector('.moves');
    
    const random_puzzle = ()=>{
        startGame.disabled = false;
        clearInterval(interval);
        time.innerHTML='2:00';
    //Set of colours to be used
    var colors1 = ['red','red','red','red','blue','blue','blue','blue','yellow','yellow','yellow','yellow','green','green','green','green','brown','brown','brown','brown','orange','orange','orange','orange'];
    
    //goal generator
    
    var k = 1;
    while(k<=3){
        var l =1;
        while(l<=3){
        //random number which chooses the color from the colors1
        let n = Math.floor(Math.random()*colors1.length);
        
        const y = document.querySelector(`.s${k}${l}`);
        //applying the background of individual tile
        y.style.background = colors1[n];
        
        //In general, splice(index,number of elements to be removed,addelement1,addelement2..)
        colors1.splice(n,1); 
        l++;
        }
        k++;
    }
    //puzzle generator
    var colors2 = ['red','red','red','red','blue','blue','blue','blue','yellow','yellow','yellow','yellow','green','green','green','green','brown','brown','brown','brown','orange','orange','orange','orange'];
    
    var j = 1;
    while(j<=5){
        var i = 1;
        while(i<=5){
        let n = Math.floor(Math.random()*colors2.length);
        const x = document.querySelector(`.t${j}${i}`);
        x.style.background = colors2[n];
        x.style.cursor = 'auto';
        colors2.splice(n,1);
        i++;
        }
        j++;
        }
    }
    const newGame = document.querySelector('.newGame');
    newGame.addEventListener('click',random_puzzle);
    //setInterval(repeats a function in fixed time) and assign it to a variable,
    // to stop it(clearInterval).
    //timer
    resetGame.addEventListener('click',()=>{
        moves.textContent = 0;
        time.innerHTML='2:00';
        clearInterval(interval);

        //working on the cursor
        let t = document.querySelectorAll('.t');
        let i;
        for(i=0;i<t.length-1;i++){
            t[i].style.cursor = 'auto';
            t[i].style.pointerEvents = 'none';
        }

    });
    startGame.addEventListener('click',function(){
        moves.textContent = 0;
        clearInterval(interval);
        time.innerHTML='2:00';

        let transTile = document.querySelector('.ttr');
        unlock(transTile.style.gridArea);
        
        timeLeft();
        });
    // timeLeft function to decrease the time
    var interval;
    const timeLeft = ()=>{
        var m_s = time.innerHTML;
        var timer = m_s.split(':');
        var m = timer[0];
        var s = timer[1];
        interval = setInterval(function(){
            
            if (m>0 && s==0){
                m -=1;
                s = 59;
            }
            if(m==0 && s==0){
                clearInterval(interval);

            }
            time.innerHTML = m+':'+s;
            s -=1;
        },1000
        )
    }
    
    // tile movement
    var activeTiles = {
        A1:['A2','B1'],
        A2:['A1','B2','A3'],
        A3:['A2','A4','B3'],
        A4:['A3','B4','A5'],
        A5:['A4','B5'],
        B1:['A1','B2','C1'],
        B2:['A2','B1','B3','C2'],
        B3:['A3','B2','C3','B4'],
        B4:['B5','B3','A4','C4'],
        B5:['A5','B4','C5'],
        C1:['C2','B1','D1'],
        C2:['C1','B2','D2','C3'],
        C3:['C2','C4','B3','D3'],
        C4:['C3','C5','B4','D4'],
        C5:['C4','B5','D5'],
        D1:['D2','C1','E1'],
        D2:['D1','C2','E2','D3'],
        D3:['D2','D4','C3','E3'],
        D4:['D3','D5','E4','C4'],
        D5:['D4','E5','C5'],
        E1:['E2','D1'],
        E2:['D2','E1','E3'],
        E3:['E4','E2','D3'],
        E4:['E5','E3','D4'],
        E5:['D5','E4']
    }
    const ts = Array.from(document.querySelectorAll('.t'));
    const ttr = document.querySelector('.ttr');

    const unlock = (k)=>{
        check;
        ts.map(tile=>{
            const y = tile.style.gridArea;
            
            if(activeTiles[k.slice(0,2)].includes(y.slice(0,2))==false){
            
                tile.style.pointerEvents = 'none';
                tile.style.cursor = 'auto';
                
        }else{
            tile.style.pointerEvents = 'auto';
            tile.style.cursor = 'pointer';
        }
            });
    }
        
        
        
        ts.map(t =>
            t.addEventListener('click',()=>{
                
                const tileArea = t.style.gridArea;
                const transTileArea = ttr.style.gridArea;
                //shifting position
                t.style.gridArea = transTileArea;
                ttr.style.gridArea= tileArea;
                unlock(ttr.style.gridArea);
                

                //score increment
                var moves = document.querySelector('.moves');
                clicks = moves.textContent;
                moves.textContent = parseInt(clicks)+1;
            })
        );
        
            //recheck this
    //tiles check
            const check =()=>{
                let t = document.querySelectorAll('.t');
                
                let t22;
                let t23;
                let t24;
                let t32;
                let t33;
                let t34;
                let t42;
                let t43;
                let t44;

                let i;
                for(i=0;i<t.length();i++){
                    if(t[i].style.gridArea == 'B2'){
                        t22 = t[i];
                    }else if(t[i].style.gridArea =='B3'){
                        t23 = t[i];
                    }else if(t[i].style.gridArea =='B4'){
                        t24 = t[i];
                    }else if(t[i].style.gridArea =='C2'){
                        t32 = t[i];
                    }else if(t[i].style.gridArea =='C3'){
                        t33 = t[i];
                    }else if(t[i].style.gridArea =='C4'){
                        t34 = t[i];
                    }else if(t[i].style.gridArea =='D2'){
                        t42 = t[i];
                    }else if(t[i].style.gridArea =='D3'){
                        t43 = t[i];
                    }else if(t[i].style.gridArea =='D4'){
                        t44 = t[i];
                    }
                }
                const s11 = document.querySelector('.s11');
                const s12 = document.querySelector('.s12');
                const s13 = document.querySelector('.s13');
                const s21 = document.querySelector('.s21');
                const s22 = document.querySelector('.s22');
                const s23 = document.querySelector('.s23');
                const s31 = document.querySelector('.s31');
                const s32 = document.querySelector('.s32');
                const s33 = document.querySelector('.s33');
                
                if(t22.style.background == s11.style.background &&
                    t23.style.background == s12.style.background &&
                    t24.style.background == s13.style.background &&
                    t32.style.background == s21.style.background &&
                    t33.style.background == s22.style.background &&
                    t34.style.background == s23.style.background &&
                    t42.style.background == s31.style.background &&
                    t43.style.background == s32.style.background &&
                    t44.style.background == s33.style.background
                    ){  
                        clearInterval(interval);
                        let t = document.querySelectorAll('.t');
                        t.style.pointerEvents ="none";
                        t.style.cursor = 'auto';
                        return true;

                    }else{
                        return false;
                    }
            }
    }

    letsPlay();