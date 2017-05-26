export function startServiceWorker() {
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('/ServiceWorker.js').then((registration: any) => {
        console.log('ServiceWorker registration successful with scope: ', registration.scope);
      }).catch((error: string) => {
        console.log('ServiceWorker registration failed: ', error);
      });
    });
  }
}
