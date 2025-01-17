// 文章列表
const posts = []; // 清空文章列表

document.addEventListener('DOMContentLoaded', function() {
    const articlesSection = document.getElementById('articles');
    
    if (posts.length === 0) {
        articlesSection.innerHTML = `
            <div class="no-posts">
                <p>暂时还没有文章，敬请期待！</p>
            </div>
        `;
        return;
    }
    
    // 渲染文章列表
    posts.forEach(post => {
        const article = document.createElement('article');
        article.className = 'blog-post';
        article.innerHTML = `
            <h2><a href="#" data-filename="${post.filename}">${post.title}</a></h2>
            <div class="post-meta">
                <span class="date">${post.date}</span>
                <span class="tags">${post.tags.map(tag => `<span class="tag">${tag}</span>`).join(' ')}</span>
            </div>
        `;
        articlesSection.appendChild(article);
        
        // 添加点击事件
        const link = article.querySelector('a');
        link.addEventListener('click', async (e) => {
            e.preventDefault();
            const response = await fetch(`posts/${post.filename}`);
            const content = await response.text();
            article.querySelector('.post-meta').insertAdjacentHTML('afterend', 
                `<div class="post-content"><pre>${content}</pre></div>`);
        });
    });
}); 