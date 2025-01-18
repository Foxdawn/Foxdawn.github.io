// 加载组件的函数
async function loadComponent(elementId, componentPath) {
    try {
        const response = await fetch(componentPath);
        const html = await response.text();
        document.getElementById(elementId).innerHTML = html;
        // 触发组件加载完成事件
        document.dispatchEvent(new CustomEvent('componentLoaded', { detail: elementId }));
    } catch (error) {
        console.error(`Error loading component ${componentPath}:`, error);
    }
}

// 当文档加载完成时加载所有组件
document.addEventListener('DOMContentLoaded', async function() {
    // 按顺序加载组件
    await loadComponent('header-placeholder', 'components/header.html');
    await loadComponent('search-placeholder', 'components/search.html');
    await loadComponent('footer-placeholder', 'components/footer.html');
    // 触发所有组件加载完成事件
    document.dispatchEvent(new Event('allComponentsLoaded'));
}); 