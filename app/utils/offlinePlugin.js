import * as OfflinePluginRuntime from 'offline-plugin/runtime';

export const offlinePluginInstall = () => {
  if (process.env.NODE_ENV === 'production') {
    OfflinePluginRuntime.install({
      onUpdating: () => {},
      onUpdateReady: () => {
        // Update is applied here
        OfflinePluginRuntime.applyUpdate();
      },
      onUpdated: () => {
        // Force reload happens here
        window.location.reload();
      },
      onUpdateFailed: () => {},
    });
  }
};
