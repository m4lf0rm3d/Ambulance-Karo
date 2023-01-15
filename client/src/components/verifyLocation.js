const verifyLocation = async()=>{
    return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            resolve([position.coords.latitude, position.coords.longitude]);
          },
          (error) => {
            reject(false);
          }
        );
    });
}
export default verifyLocation;