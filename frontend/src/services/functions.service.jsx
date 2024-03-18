import apiService from "./api.service";

const fetchChargingPoint = async (chargingPointId) => {
  apiService.get(`/chargingpoint/${chargingPointId}`);
};

const fetchStations = async () => {
  apiService.get(`/station`);
};

const returnAdmin = async () => {
  try {
    await apiService.get(`/users/isadmin`);
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
};

const getUserInfos = async () => {
  try {
    const data = await apiService.get(`/users/me`);
    return { preloadedUserData: data };
  } catch (error) {
    return null;
  }
};

const getCarInfos = async (carId) => {
  try {
    const data = await apiService.get(`/vehicle/${carId}`);
    return { preloadedCarData: data };
  } catch (error) {
    return null;
  }
};

const getCounts = async () => {
  const userCount = await apiService.get(`/users/count`);
  const vehicleCount = await apiService.get(`/vehicle/count`);
  const cpCount = await apiService.get(`/chargingpoint/count`);
  return { ...userCount, ...vehicleCount, ...cpCount };
};

export default {
  fetchChargingPoint,
  fetchStations,
  returnAdmin,
  getUserInfos,
  getCarInfos,
  getCounts,
};
