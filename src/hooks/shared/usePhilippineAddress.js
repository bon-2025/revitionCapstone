import { useEffect, useState } from "react";

const API_BASE_URL = "http://localhost:3000";

export const usePhilippineAddress = () => {
  // Data
  const [regions, setRegions] = useState([]);
  const [provinces, setProvinces] = useState([]);
  const [cities, setCities] = useState([]);
  const [barangays, setBarangays] = useState([]);

  // Selected values
  const [regionId, setRegionId] = useState("");
  const [provinceId, setProvinceId] = useState("");
  const [cityId, setCityId] = useState("");
  const [barangayId, setBarangayId] = useState("");

  // Load regions
  useEffect(() => {
    fetch(`${API_BASE_URL}/regions`)
      .then(res => res.json())
      .then(setRegions)
      .catch(console.error);
  }, []);

  // Load provinces
  useEffect(() => {
    if (!regionId) return;
    fetch(`${API_BASE_URL}/provinces/${regionId}`)
      .then(res => res.json())
      .then(data => {
        setProvinces(data);
        setCities([]);
        setBarangays([]);
        setProvinceId("");
        setCityId("");
        setBarangayId("");
      });
  }, [regionId]);

  // Load cities
  useEffect(() => {
    if (!provinceId) return;
    fetch(`${API_BASE_URL}/cities/${provinceId}`)
      .then(res => res.json())
      .then(data => {
        setCities(data);
        setBarangays([]);
        setCityId("");
        setBarangayId("");
      });
  }, [provinceId]);

  // Load barangays
  useEffect(() => {
    if (!cityId) return;
    fetch(`${API_BASE_URL}/barangays/${cityId}`)
      .then(res => res.json())
      .then(setBarangays);
  }, [cityId]);

  // Convert API data → select options
  const mapToOptions = (list) =>
    list.map(item => ({
      label: item.name,
      value: item.id,
    }));

  return {
    // select options
    regionOptions: mapToOptions(regions),
    provinceOptions: mapToOptions(provinces),
    cityOptions: mapToOptions(cities),
    barangayOptions: mapToOptions(barangays),

    // selected values
    regionId,
    provinceId,
    cityId,
    barangayId,

    // setters (for form onChange)
    setRegionId,
    setProvinceId,
    setCityId,
    setBarangayId,
  };
};
