function initializeHomeSearch() {
    const searchInput = document.getElementById('searchInput');
    const searchButton = document.getElementById('searchButton');
    
    if (!searchInput || !searchButton) {
        return false;
    }
    
    // 搜索功能
    function performSearch() {
        const searchTerm = searchInput.value.toLowerCase().trim();
        if (searchTerm) {
            // 将搜索词作为参数传递给文章页面
            window.location.href = `articles.html?search=${encodeURIComponent(searchTerm)}`;
        }
    }
    
    searchButton.addEventListener('click', performSearch);
    searchInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            performSearch();
        }
    });
    
    return true;
}

// 初始化下拉按钮功能
function initializeToggleButton() {
    const toggleButton = document.querySelector('.toggle-button');
    if (toggleButton) {
        toggleButton.addEventListener('click', function() {
            document.body.classList.toggle('collapsed');
        });
    }
}

// 获取每日一言
async function fetchDailyQuote() {
    try {
        const response = await fetch('https://api.t1qq.com/api/tool/daytry?key=glsc8l6icBsJfDiBsgfUTEuQxa&time=random');
        const data = await response.json();
        
        if (data.code === 200) {
            const quoteContent = document.querySelector('.quote-content');
            const quoteNote = document.querySelector('.quote-note');
            
            if (quoteContent && quoteNote) {
                quoteContent.textContent = data.data.content;
                quoteNote.textContent = data.data.note;
            }
        }
    } catch (error) {
        console.error('获取每日一言失败:', error);
    }
}

// 监听组件加载完成事件
document.addEventListener('allComponentsLoaded', function() {
    // 尝试初始化搜索功能
    if (!initializeHomeSearch()) {
        console.error('Search components not found after loading');
    }
    // 初始化下拉按钮
    initializeToggleButton();
    // 获取每日一言
    fetchDailyQuote();
}); 