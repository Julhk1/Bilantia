(function () {
    var stored = localStorage.getItem('bt_theme');
    if (stored === 'light') document.documentElement.classList.add('theme-light');
})();

function toggleTheme() {
    document.documentElement.classList.toggle('theme-light');
    var isLight = document.documentElement.classList.contains('theme-light');
    localStorage.setItem('bt_theme', isLight ? 'light' : 'dark');
    var btn = document.getElementById('theme-toggle-btn');
    if (btn) btn.innerHTML = isLight ? '🌙 Mode sombre' : '☀️ Mode clair';
}

function initThemeToggleLabel() {
    var btn = document.getElementById('theme-toggle-btn');
    if (!btn) return;
    var isLight = document.documentElement.classList.contains('theme-light');
    btn.innerHTML = isLight ? '🌙 Mode sombre' : '☀️ Mode clair';
}
