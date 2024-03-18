import apiService from "./api.service";

const fetchChargingPoint = async (chargingPointId) => {
  return await apiService.get(`/chargingpoint/${chargingPointId}`);
};

const fetchStations = async () => {
  return await apiService.get(`/station`);
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

const getUserInfos = async (userId) => {
  return await apiService.get(`/users/${userId}`);
};

const getMyInfos = async () => {
  return await apiService.get(`/users/me`);
};

const getCarInfos = async (carId) => {
  return await apiService.get(`/vehicle/${carId}`);
};

const getMyCars = async () => {
  return await apiService.get(`/vehicle/me`);
};

const getCounts = async () => {
  const userCount = await apiService.get(`/users/count`);
  const vehicleCount = await apiService.get(`/vehicle/count`);
  const cpCount = await apiService.get(`/chargingpoint/count`);
  return { ...userCount, ...vehicleCount, ...cpCount };
};

const fetchCars = async () => {
  return await apiService.get(`/vehicle`);
};

const fetchPlugTypes = async () => {
  return await apiService.get(`/plugtypes`);
};

export default {
  fetchChargingPoint,
  fetchStations,
  returnAdmin,
  getUserInfos,
  getMyInfos,
  getCarInfos,
  getMyCars,
  getCounts,
  fetchCars,
  fetchPlugTypes,
};
