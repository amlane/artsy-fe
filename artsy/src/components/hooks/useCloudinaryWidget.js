export function useCloudinaryWidget(yourState, yourSetterFn, keyValue) {
  function checkUploadResult(result) {
    const replaceState = { ...yourState };
    replaceState[keyValue] = result.info.secure_url;

    if (result.event === "success") {
      yourSetterFn(replaceState);
    }
  }

  function uploadWidget() {
    window.cloudinary.openUploadWidget(
      {
        cloud_name: process.env.REACT_APP_CLOUD_NAME,
        upload_preset: process.env.REACT_APP_UPLOAD_PRESET
      },
      function(error, result) {
        checkUploadResult(result);
      }
    );
  }

  return [uploadWidget];
}
