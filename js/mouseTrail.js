function createMouseTrail() {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    
    // 设置canvas样式
    canvas.style.position = 'fixed';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.pointerEvents = 'none';
    canvas.style.zIndex = '99999';
    
    // 添加到页面
    document.body.appendChild(canvas);
    
    // 粒子数组
    let particles = [];
    let lastX = 0;
    let lastY = 0;
    let autoAngle = 0;
    
    // 调整canvas大小
    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    
    // 创建粒子类
    class Particle {
        constructor(x, y) {
            this.x = x;
            this.y = y;
            this.size = Math.random() * 3 + 2;
            this.speedX = Math.random() * 2 - 1;
            this.speedY = Math.random() * 2 - 1;
            this.color = `hsla(${Math.random() * 360}, 100%, 70%, 0.8)`;
            this.life = 1;
        }
        
        update() {
            this.x += this.speedX;
            this.y += this.speedY;
            this.life -= 0.02;
            
            if (this.size > 0.3) this.size -= 0.1;
        }
        
        draw() {
            ctx.fillStyle = this.color;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
        }
    }
    
    // 处理鼠标移动
    function handleMouseMove(e) {
        lastX = e.clientX;
        lastY = e.clientY;
        
        for (let i = 0; i < 3; i++) {
            particles.push(new Particle(lastX, lastY));
        }
    }
    
    // 自动生成粒子
    function generateAutoParticles() {
        // 在鼠标最后位置周围生成粒子
        const radius = 5; // 小范围半径
        autoAngle += 0.1; // 控制运动速度
        
        const offsetX = Math.cos(autoAngle) * radius;
        const offsetY = Math.sin(autoAngle) * radius;
        
        for (let i = 0; i < 2; i++) {
            particles.push(new Particle(lastX + offsetX, lastY + offsetY));
        }
    }
    
    // 动画循环
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // 自动生成粒子
        generateAutoParticles();
        
        for (let i = particles.length - 1; i >= 0; i--) {
            particles[i].update();
            particles[i].draw();
            
            if (particles[i].life <= 0) {
                particles.splice(i, 1);
            }
        }
        
        requestAnimationFrame(animate);
    }
    
    // 初始化
    window.addEventListener('resize', resizeCanvas);
    window.addEventListener('mousemove', handleMouseMove);
    
    resizeCanvas();
    animate();
}

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', createMouseTrail); 