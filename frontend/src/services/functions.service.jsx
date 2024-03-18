import { DateTime } from "luxon";
import apiService from "./api.service";

const getUsers = async () => {
  return await apiService.get(`/users`);
};

const getUser = async (userId) => {
  return await apiService.get(`/users/${userId}`);
};

const getMyUser = async () => {
  return await apiService.get(`/users/me`);
};

const getCars = async () => {
  return await apiService.get(`/vehicle`);
};

const getCar = async (carId) => {
  return await apiService.get(`/vehicle/${carId}`);
};

const getMyCars = async () => {
  return await apiService.get(`/vehicle/me`);
};

const getPlugTypes = async () => {
  return await apiService.get(`/plugtypes`);
};

const getMyReservations = async () => {
  const data = await apiService.get(`/reservation/me`);
  const filtered = data
    .map((r) => ({
      ...r,
      datetime: DateTime.fromSQL(r.datetime),
    }))
    .filter((r) => r.is_cancelled === 0);
  return filtered;
};

const getStations = async () => {
  return await apiService.get(`/station`);
};

const getChargingPoint = async (chargingPointId) => {
  return await apiService.get(`/chargingpoint/${chargingPointId}`);
};

const getCounts = async () => {
  const userCount = await apiService.get(`/users/count`);
  const vehicleCount = await apiService.get(`/vehicle/count`);
  const cpCount = await apiService.get(`/chargingpoint/count`);
  return { ...userCount, ...vehicleCount, ...cpCount };
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

export default {
  getUsers,
  getUser,
  getMyUser,
  getCars,
  getCar,
  getMyCars,
  getPlugTypes,
  getMyReservations,
  getStations,
  getChargingPoint,
  getCounts,
  returnAdmin,
};
