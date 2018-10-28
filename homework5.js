const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');

//useful functions

const colorArray = ['#4B0082', '##0000FF', '#00FF00', '#FFFF00', '#FFFF00', '#FF0000', '#9400D3'];
const deltaArray = [-1, 1];
const point = [];

const img = new Image(65, 65);
img.src = "https://static.giantbomb.com/uploads/scale_small/8/87790/2469740-blinky.png";

const img2 = new Image(50, 50);
img2.src = "https://upload.wikimedia.org/wikipedia/commons/thumb/4/49/Pacman.svg/2000px-Pacman.svg.png";

function rand(max, min) {
    return Math.floor(Math.random() * max) + min;
}
//Real Beggining of ex #1
function colorChanger(number){
    const color = colorArray[rand(7, 0)];
    if(color === point[number].color){
        colorChanger(number);
    }else{
        point[number].color = color;
    }
}

function createPoint(count, canvasHeight, canvasWidth){
    if(count === 0){
        return '';
    }

    point.push({
        x: rand(canvasWidth - 100, 0),
        y: rand(canvasHeight - 100, 0),
        height: 65,
        width: 65,
        xDelta: deltaArray[rand(7, 0)],
        yDelta: deltaArray[rand(7, 0)],
        color: colorArray[rand(7, 0)],
        speed: rand(7, 5)
    });

    createPoint(count - 1, canvasHeight, canvasWidth);
}

function pointDrawer(number){
    if(number === point.length){
        return '';
    }
    context.fillStyle = point[number].color;
    context.fillRect(point[number].x, point[number].y, point[number].width, point[number].height);
    pointDrawer(number + 1);
}   

createPoint(rand(100, 0), canvas.height, canvas.width);

//Delete 2 slash (/) signs below to run the exercise #1
//pointDrawer(0);

//Exercise #2

function drawer(number){
    if(number === point.length){
        return '';
    }
    context.fillStyle = point[number].color;
    context.fillRect(point[number].x, point[number].y, point[number].width, point[number].height);
    drawer(number + 1);
}


function updater(number){
    if(number === point.length){
        return '';
    }
    if(point[number].x >= canvas.width - 65){
        point[number].xDelta = -1;
        colorChanger(number);
    }else if(point[number].x <= 0){
        point[number].xDelta = 1;
        colorChanger(number);
    }

    if(point[number].y >= canvas.height - 65){
        point[number].yDelta = -1;
        colorChanger(number);
    }else if(point[number].y <= 0){
        point[number].yDelta = 1;
        colorChanger(number);
    }

    point[number].x += point[number].speed*point[number].xDelta;
    point[number].y += point[number].speed*point[number].yDelta;
    updater(number + 1);
}


function loop(){
    context.clearRect(0,0,canvas.width, canvas.height);
    drawer(0);
    updater(0);

    requestAnimationFrame(loop);
}


//Delete 2 slash (/) signs below to run excercise #2
//loop();

//Exercise 3

const pointArray = {
    hero: {
        score: 0,
        finalscore: 0,
        x: 0,
        y: 0,
        height: 50,
        width: 50,
        lost: false,
        right: false,
        left: false,
        up: false,
        down: false
    },
    badguys: []
};
//function that uses recursion to create bad guys in bad guys array
function createPoint2(count, canvasHeight, canvasWidth){
    if(count === 0){
        return '';
    }

    pointArray.badguys.push({
        x: rand(canvasWidth - 200, 100),
        y: rand(canvasHeight - 200, 100),
        height: 50,
        width: 50,
        xDelta: deltaArray[rand(2, 0)],
        yDelta: deltaArray[rand(2, 0)],
        speed: rand(3, 2)
    });

    createPoint2(count - 1, canvasHeight, canvasWidth);
}

createPoint2(3, canvas.height, canvas.width);
// the function below draws the objects in canvas
function drawer2(number){
    if(number === pointArray.badguys.length){
        return '';
    }
    ////drawing hero 
    context.drawImage(img2, pointArray.hero.x, pointArray.hero.y, pointArray.hero.width, pointArray.hero.height);

    ////drawing enemies
    context.drawImage(img, pointArray.badguys[number].x, pointArray.badguys[number].y, pointArray.badguys[number].width, pointArray.badguys[number].height);
    drawer2(number + 1);
}

// function below moves the bad guys in the canvase only
function updater2(number){
    if(number === pointArray.badguys.length){
        return '';
    }
    if(pointArray.badguys[number].x >= canvas.width - 50){
        pointArray.badguys[number].xDelta = -1;
    }else if(pointArray.badguys[number].x <= 0){
        pointArray.badguys[number].xDelta = 1;
    }

    if(pointArray.badguys[number].y >= canvas.height - 50){
        pointArray.badguys[number].yDelta = -1;
    }else if(pointArray.badguys[number].y <= 0){
        pointArray.badguys[number].yDelta = 1;
    }
//the shit below changes the coordinates of the bad guys, thus they move, recursion is used for all the bad guys to move
    pointArray.badguys[number].x += pointArray.badguys[number].speed*pointArray.badguys[number].xDelta;
    pointArray.badguys[number].y += pointArray.badguys[number].speed*pointArray.badguys[number].yDelta;
    updater2(number + 1);
}

function heroChecker(){
    //Checking if the hero is out of the canvas
    if(pointArray.hero.x > canvas.width - pointArray.hero.width){
        pointArray.hero.x = 0;
    }else if(pointArray.hero.x < 0){
        pointArray.hero.x = canvas.width - pointArray.hero.width;
    }

    if(pointArray.hero.y > canvas.height - pointArray.hero.height){
        pointArray.hero.y = 0;
    }else if(pointArray.hero.y < 0){
        pointArray.hero.y = canvas.height - pointArray.hero.height;
    }

    //Checking hero's collision with bad guys
    function collisionChecker(number){
        if(number === pointArray.badguys.length){
            return '';
        }
        if(pointArray.hero.x + pointArray.hero.width - pointArray.badguys[number].speed >= pointArray.badguys[number].x && pointArray.hero.x <= pointArray.badguys[number].x + pointArray.badguys[number].width - pointArray.badguys[number].speed){
            if(pointArray.hero.y + pointArray.hero.height - pointArray.badguys[number].speed >= pointArray.badguys[number].y && pointArray.hero.y <= pointArray.badguys[number].y + pointArray.badguys[number].height - pointArray.badguys[number].speed){
                if(pointArray.hero.lost === false) {
                    alert('Game Over, You score is ' + pointArray.hero.finalscore);
                    pointArray.hero.lost = true;
                }
            }
        }
        collisionChecker(number + 1);
    }
    collisionChecker(0);
// function below sets the controls for the pacman to move
    function checker(){
        if(pointArray.hero.up === true){
            pointArray.hero.y -= 5;
        }
        if(pointArray.hero.down === true){
            pointArray.hero.y += 5;
        }
        if(pointArray.hero.right === true){
            pointArray.hero.x += 5;
        }
        if(pointArray.hero.left === true){
            pointArray.hero.x -= 5;
        }
    }
    checker();
//every time score reaches 300 another bad gouy is being created, after which the score is going back to zero, and this shit repeats again
    function scoreChecker(){
        if(pointArray.hero.score === 300){
            createPoint2(1, canvas.height, canvas.width);
            pointArray.hero.finalscore += 1;
            pointArray.hero.score = 0;
        }
    }

    scoreChecker();
}


//this finction creates the animation, it deletes the img and creates in another point, as a loop
function loop2(){
    if(pointArray.hero.lost === false) {
        context.clearRect(0, 0, canvas.width, canvas.height);
        drawer2(0);
        updater2(0);
        heroChecker();
        pointArray.hero.score ++;

        requestAnimationFrame(loop2);
    }
}


//Delete 2 slash (/) signs below to run exercise #3
//loop2();

const leftKey = 65;
const upKey = 87;
const rightKey = 68;
const downKey = 83;

document.addEventListener('keydown', function(event) {
    if(event.keyCode === upKey) {
        pointArray.hero.up = true;
    }else if(event.keyCode === downKey) {
        pointArray.hero.down = true;
    }else if(event.keyCode === rightKey) {
        pointArray.hero.right = true;
    }else if(event.keyCode === leftKey) {
        pointArray.hero.left = true;
    }
}, false);

document.addEventListener('keyup', function(event) {
    if(event.keyCode === upKey) {
        pointArray.hero.up = false;
    }else if(event.keyCode === downKey) {
        pointArray.hero.down = false;
    }else if(event.keyCode === rightKey) {
        pointArray.hero.right = false;
    }else if(event.keyCode === leftKey) {
        pointArray.hero.left = false;
    }
}, false);

