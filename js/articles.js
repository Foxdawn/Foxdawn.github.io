// 文章列表
const posts = [
    {
        title: '博客使用指南',
        date: '2024-03-21',
        filename: '2024-03-21-user-guide.md',
        tags: ['指南', '使用说明']
    }
];

function initializeArticlesPage() {
    const articlesSection = document.getElementById('articles');
    const searchInput = document.getElementById('searchInput');
    const searchButton = document.getElementById('searchButton');
    
    if (!searchInput || !searchButton || !articlesSection) {
        return false;
    }
    
    // 从 URL 获取搜索参数
    const urlParams = new URLSearchParams(window.location.search);
    const searchTerm = urlParams.get('search');
    
    if (searchTerm) {
        searchInput.value = searchTerm;
        performSearch();
    } else {
        displayPosts(posts);
    }
    
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
                <p>没有找到相关文章</p>
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
        
        const filteredPosts = posts.filter(post => 
            post.title.toLowerCase().includes(searchTerm) ||
            post.tags.some(tag => tag.toLowerCase().includes(searchTerm))
        );
        
        displayPosts(filteredPosts);
        
        // 更新 URL，但不刷新页面
        const newUrl = searchTerm 
            ? `${window.location.pathname}?search=${encodeURIComponent(searchTerm)}`
            : window.location.pathname;
        window.history.pushState({}, '', newUrl);
    }
    
    return true;
}

// 监听组件加载完成事件
document.addEventListener('allComponentsLoaded', function() {
    // 尝试初始化文章页面
    if (!initializeArticlesPage()) {
        console.error('Article page components not found after loading');
    }
}); 