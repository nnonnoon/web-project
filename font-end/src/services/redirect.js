export const subDomain = '';

export const redirectTo = (path) => {
    localStorage.setItem('last-page', window.location.pathname);
    window.location = `${subDomain}${path}`
}