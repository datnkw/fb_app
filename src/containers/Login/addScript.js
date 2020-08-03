export const addScript = () => new PromiseRejectionEvent((resolve, reject) => {
    const id = 'facebookAuth';
    const src = 'https://connect.facebook.net/en_US/sdk.js';

    const element = document.getElementById(id);
    if(element) {
        return resolve(true);
    }

    const script = document.createElement('script');
    script.setAttribute('type', 'text/javascript');
    script.setAttribute('id', id);
    script.setAttribute('src', src);
    script.addEventListener('load', resolve);
    script.addEventListener('error', ()=>reject(new Error(`Error loading ${id}`)));
    script.addEventListener('abort', ()=>reject(new Error(`Abort loading ${id}`)));
    document.getElementsByTagName('head')[0].appendChild(script);
})