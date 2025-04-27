/**
 * Hitokoto Quote Functionality
 * Fetches random quotes from hitokoto.cn API
 */

document.addEventListener('DOMContentLoaded', function() {
    // Check if hitokoto is enabled in config
    if (!profileConfig.hitokoto || !profileConfig.hitokoto.enable) {
        document.getElementById('hitokoto-container').style.display = 'none';
        return;
    }
    
    // Elements
    const hitokotoText = document.getElementById('hitokoto-text');
    const hitokotoSource = document.getElementById('hitokoto-source');
    const refreshButton = document.getElementById('refresh-hitokoto');
    
    // Configure API parameters from config
    const apiParams = profileConfig.hitokoto.params || {};
    
    // Fetch a new hitokoto quote
    function fetchHitokoto() {
        // Show loading state
        hitokotoText.textContent = '加载中...';
        hitokotoSource.textContent = 'hitokoto.cn';
        
        // Add spinning animation to refresh button
        refreshButton.classList.add('refreshing');
        
        // Build URL with parameters
        let url = 'https://v1.hitokoto.cn/';
        const params = new URLSearchParams();
        
        // Add parameters from config
        if (apiParams.c) params.append('c', apiParams.c);
        if (apiParams.min_length) params.append('min_length', apiParams.min_length);
        if (apiParams.max_length) params.append('max_length', apiParams.max_length);
        
        // Append parameters to URL if any exist
        if (params.toString()) {
            url += '?' + params.toString();
        }
        
        // Fetch from API
        fetch(url)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                // Update the quote text
                hitokotoText.textContent = data.hitokoto;
                
                // Update the source
                let source = '';
                if (data.from_who && data.from_who !== 'null') {
                    source += data.from_who;
                }
                if (data.from && data.from !== 'null') {
                    if (source) source += '，';
                    source += '《' + data.from + '》';
                }
                
                hitokotoSource.textContent = source || 'hitokoto.cn';
            })
            .catch(error => {
                console.error('Error fetching hitokoto:', error);
                hitokotoText.textContent = '获取一言失败，请稍后再试';
            })
            .finally(() => {
                // Remove spinning animation
                refreshButton.classList.remove('refreshing');
            });
    }
    
    // Add click event to refresh button
    refreshButton.addEventListener('click', fetchHitokoto);
    
    // Initial fetch
    fetchHitokoto();
});
