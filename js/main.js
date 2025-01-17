// 文章列表
const posts = [
    {
        title: '博客使用指南',
        date: '2024-03-21',
        filename: '2024-03-21-user-guide.md',
        tags: ['指南', '使用说明']
    }
];

document.addEventListener('DOMContentLoaded', function() {
    const articlesSection = document.getElementById('articles');
    const searchInput = document.getElementById('searchInput');
    const searchButton = document.getElementById('searchButton');
    
    // 显示初始文章列表
    displayPosts(posts);
    
    // 搜索功能
    searchButton.addEventListener('click', performSearch);
    searchInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            performSearch();
        }
    });
    
    function showNoPostsMessage() {
        articlesSection.innerHTML = `
            <div class="no-posts">
                <p>暂时还没有文章，敬请期待！</p>
            </div>
        `;
    }
    
    function displayPosts(postsToShow) {
        if (postsToShow.length === 0) {
            showNoPostsMessage();
            return;
        }
        
        articlesSection.innerHTML = '';
        postsToShow.forEach(post => {
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
    }
    
    function performSearch() {
        const searchTerm = searchInput.value.toLowerCase().trim();
        
        if (!searchTerm) {
            displayPosts(posts); // 显示所有文章
            return;
        }
        
        const filteredPosts = posts.filter(post => 
            post.title.toLowerCase().includes(searchTerm) ||
            post.tags.some(tag => tag.toLowerCase().includes(searchTerm))
        );
        
        displayPosts(filteredPosts);
    }
}); 