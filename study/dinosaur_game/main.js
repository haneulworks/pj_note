var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');

canvas.width = window.innerWidth - 100;
canvas.height = window.innerHeight - 100;

var img2 = new Image();
img2.src = 'dinosaur.png';

var dino = { //등장 캐릭터의 속성 object에 정리
    x : 10, //공룡 등장 좌표
    y : 200, //공룡 등장 좌표
    width : 50, //공룡 폭과 높이
    height : 50, //공룡 폭과 높이
    draw(){
        ctx.fillStyle = 'green';
        //ctx.fillRect(this.x, this.y, this.width, this.height);
        ctx.drawImage(img2, this.x, this.y)
    }
}

var img1 = new Image();
img1.src = 'cactus.png'

class Cactus { //장애물 object에 정리
    constructor(){
        this.x = 500;
        this.y = 200;
        this.width = 50;
        this.height = 50;
    }
    draw(){
        ctx.fillStyle = 'red';
        //ctx.fillRect(this.x, this.y, this.width, this.height);
        ctx.drawImage(img1, this.x, this.y)
    }
}

var timer = 0;
var cactus여러개 = [];
var 점프timer = 0;
var animation;

function 프레임마다실행할거(){ //1초에 60번 코드 실행하기
    animation = requestAnimationFrame(프레임마다실행할거);
    timer++;

    ctx.clearRect(0,0, canvas.width, canvas.height);

    if (timer % 160 === 0){ //120프레임마다 장애물소환해서 array에 보관
        var cactus = new Cactus();
        cactus여러개.push(cactus);
    }

    cactus여러개.forEach((a, i, o)=>{
        //x좌표가 0미만이면 제거
        if (a.x < 0){
            o.splice(i, 1)
        }
        a.x-=2;//장애물속도 //기본a.x--; //숫자로 속도조절 a.x-=2;

        충돌하냐(dino, a);//충돌체크는 여기서 해야함 //주인공과 장애물이 충돌하는지 안하는지를 계속 실시간체크

        a.draw();
    })

    if(점프중 == true){//위로점프
        dino.y-=3; //기본 dino.y--; //숫자로 속도조절 dino.y-=3
        점프timer++;
    }
    if(점프중 == false){//점프후 아래로 하강
        if(dino.y < 200){
            dino.y+=3; //기본 dino.y++; 숫자로 속도조절 dino.y+=3
        }
    }
    if(점프timer > 60){ //60프레임 지나면 dino.Y--점프 그만
        점프중 = false;
        점프timer = 0; //점프 여러번
    }
    
    dino.draw()
}

프레임마다실행할거();

//충돌확인
function 충돌하냐(dino, cactus){
    var x축차이 = cactus.x - (dino.x + dino.width);
    var y축차이 = cactus.y - (dino.y + dino.height); 
    if (x축차이 < 0 && y축차이 < 0){
        ctx.clearRect(0,0, canvas.width, canvas.height);
        cancelAnimationFrame(animation)
    }
}





var 점프중 = false;
document.addEventListener('keydown', function(e){
    if(e.code === 'Space'){
        점프중 = true;
    }
})