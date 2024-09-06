<script setup>
import {onMounted,} from 'vue'
import {Canvas, Rect, Circle, Ellipse, Path, Textbox, FabricImage,Gradient} from 'fabric'

let canvas = null
let reactOptions = {
  rect: null,
  currentSize: 100,
  maxSize: 200
}

function initRect() {
  reactOptions.rect = new Rect({
    left: 0,
    top: 0,
    width: reactOptions.currentSize,
    height: reactOptions.currentSize,
    fill: 'pink'
  })
  canvas.add(reactOptions.rect)
  animationRect()
}

function animationRect() {
  if (reactOptions.currentSize < reactOptions.maxSize) {
    reactOptions.currentSize += 1
    reactOptions.rect.set({width: reactOptions.currentSize, height: reactOptions.currentSize})
    canvas.renderAll()
    requestAnimationFrame(animationRect)
  }
}

let circleOptions = {
  circle: null,
  radius: 30,
  left: 430,
  top: 430,
  fill: 'pink'
}

function initCircle() {
  circleOptions.circle = new Circle({
    top: circleOptions.top,
    left: circleOptions.left,
    radius: circleOptions.radius,
    fill: circleOptions.fill,
    lockScalingX: true,
    lockScalingY: true,
    hasControls: false,
    selectable: true,
    hasBorders: false
  })
  canvas.add(circleOptions.circle)
}

let imgUrl = 'http://fabricjs.com/assets/jail_cell_bars.png';

//setOverlayImage 可以展示出来这个层级关系
function setBackground() {
  FabricImage.fromURL(imgUrl).then(e => {
    canvas.backgroundImage = e
    canvas.backgroundImage.set({
      scaleX: canvas.width / e.width,  // 缩放背景图以适应画布宽度
      scaleY: canvas.height / e.height, // 缩放背景图以适应画布高度
      originX: 'left',
      originY: 'top'
    });
    canvas.requestRenderAll();
  })
}

function initRectRadius() {
  const rect = new Rect({
    width: 30,
    height: 30,
    left: 20,
    top: 450,
    fill: 'pink',
    rx: 10,
    ry: 10,

  })
  canvas.add(rect)
}

// 椭圆
function initEllipse() {
  const ellipse = new Ellipse({
    left: 60,
    top: 450,
    rx: 30,
    ry: 10,
    fill: 'pink',
    hasControls: false
  })
  canvas.add(ellipse)
}

// 路径 drawerPath
function drawerPath() {
  const path = 'M 0 0 L 200 100 L 170 200 z'
  /**
   * M：可以理解为新的起始点x，y坐标
   * L：每个折点的x，y坐标
   * z：自动闭合（自动把结束点和起始点连接起来）
   * */
  const pathObject = new Path(path, {
    fill: 'pink',
    left: 60,
    top: 350,
    opacity: 0.5,
    stroke: 'red',
    strokeWidth: 5,
  })

  canvas.add(pathObject)
}

// text
function initText() {
  const text = new Textbox('Hello World', {
    fontSize: 20,
    fill: 'red',
    left: 60,
    top: 350
  })
  const ITextValue = new Textbox('这是一个最新的文件啊', {
    fontSize: 20,
    fill: 'red',
    left: 60,
    top: 350,
    editable: false,
    fontSize: 20,
    backgroundColor: 'green', // 背景色：绿色
    fill: 'orange', // 填充色：橙色
    stroke: '#f6416c', // 边框颜色：粉色
    strokeWidth: 3, // 边框粗细：3px
    strokeDashArray: [20, 5, 14], // 边框虚线规则：填充20px 空5px 填充14px 空20px 填充5px ……
    shadow: '10px 20px 6px rgba(10, 20, 30, 0.4)', // 投影：向右偏移10px，向下偏移20px，羽化6px，投影颜色及透明度
    transparentCorners: false, // 选中时，角是被填充了。true 空心；false 实心
    borderColor: '#16f1fc', // 选中时，边框颜色：天蓝
    borderScaleFactor: 5, // 选中时，边的粗细：5px
    borderDashArray: [20, 5, 10, 7], // 选中时，虚线边的规则
    cornerColor: "#a1de93", // 选中时，角的颜色是 青色
    cornerStrokeColor: 'pink', // 选中时，角的边框的颜色是 粉色
    cornerStyle: 'circle', // 选中时，叫的属性。默认rect 矩形；circle 圆形
    cornerSize: 20, // 选中时，角的大小为20
    cornerDashArray: [10, 2, 6], // 选中时，虚线角的规则
    selectionBackgroundColor: '#7f1300', // 选中时，选框的背景色：朱红
    padding: 40, // 选中时，选择框离元素的内边距：40px
    borderOpacityWhenMoving: 0.6, // 当对象活动和移动时，对象控制边界的不透明度
  })
ITextValue.on('changed',e =>{
  console.log(ITextValue.text,'22222222')
})
  canvas.add(text, ITextValue)
}
// 设置渐变
function setGradient() {
  let circle = new Circle({
    left:300,
    top:100,
    radius: 50,
    width: 100,
    height: 100,
  })
  let gradient = new Gradient({
    type: 'linear',
    gradientUnits: 'pixels',
    coords: { x1: 0, y1: 0, x2: 0, y2: circle.height },
    colorStops:[
      { offset: 0, color: 'red' },
      { offset: 0.2, color: 'orange' },
      { offset: 0.4, color: 'yellow' },
      { offset: 0.6, color: 'green' },
      { offset: 0.8, color: 'blue' },
      { offset: 1, color: 'purple' },
    ]
  })
  console.log(gradient,'gradient')
  circle.set('fill', gradient)
  canvas.add(circle)
}
onMounted(() => {
  canvas = new Canvas('canvas', {
    selection: false, // 能否被选中
    hoverCursor: 'pointer', // 鼠标悬停样式
    width: 800,
    height: 800,
  })
  setBackground()
  initRect()
  initCircle()
  initRectRadius()
  initEllipse()
  drawerPath()
  initText()
  setGradient()
})
</script>

<template>
  <div>
    <h1>基础入门</h1>
    <canvas id="canvas" width="400" height="400" class="border"></canvas>
  </div>
</template>

<style scoped>

</style>
