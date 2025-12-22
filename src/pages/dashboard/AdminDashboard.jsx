import React, { useState, useEffect } from 'react';

const PhilippineAddressPicker = () => {
  // Data States
  const [regions, setRegions] = useState([]);
  const [provinces, setProvinces] = useState([]);
  const [cities, setCities] = useState([]);
  const [barangays, setBarangays] = useState([]);

  // Selection States
  const [selectedRegion, setSelectedRegion] = useState('');
  const [selectedProvince, setSelectedProvince] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const [selectedBarangay, setSelectedBarangay] = useState('');

  const API_BASE_URL = 'http://localhost:3000';

  // 1. Load Regions on Mount
  useEffect(() => {
    fetch(`${API_BASE_URL}/regions`)
      .then(res => res.json())
      .then(data => setRegions(data))
      .catch(err => console.error("Error loading regions:", err));
  }, []);

  // 2. Load Provinces when Region changes
  useEffect(() => {
    if (selectedRegion) {
      fetch(`${API_BASE_URL}/provinces/${selectedRegion}`)
        .then(res => res.json())
        .then(data => {
          setProvinces(data);
          setCities([]); // Reset children
          setBarangays([]);
        });
    }
  }, [selectedRegion]);

  // 3. Load Cities when Province changes
  useEffect(() => {
    if (selectedProvince) {
      fetch(`${API_BASE_URL}/cities/${selectedProvince}`)
        .then(res => res.json())
        .then(data => {
          setCities(data);
          setBarangays([]); // Reset children
        });
    }
  }, [selectedProvince]);

  // 4. Load Barangays when City changes
  useEffect(() => {
    if (selectedCity) {
      fetch(`${API_BASE_URL}/barangays/${selectedCity}`)
        .then(res => res.json())
        .then(data => setBarangays(data));
    }
  }, [selectedCity]);

  return (
    <div style={{ padding: '20px', maxWidth: '400px', display: 'flex', flexDirection: 'column', gap: '15px' }}>
      <h3>Philippine Address Picker (PSGC 2025)</h3>

      {/* Region Select */}
      <label>Region</label>
      <select value={selectedRegion} onChange={(e) => setSelectedRegion(e.target.value)}>
        <option value="">Select Region</option>
        {regions.map(r => <option key={r.id} value={r.id}>{r.name}</option>)}
      </select>

      {/* Province Select */}
      <label>Province</label>
      <select 
        value={selectedProvince} 
        onChange={(e) => setSelectedProvince(e.target.value)}
        disabled={!provinces.length}
      >
        <option value="">Select Province</option>
        {provinces.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
      </select>

      {/* City / Municipality Select */}
      <label>City / Municipality</label>
      <select 
        value={selectedCity} 
        onChange={(e) => setSelectedCity(e.target.value)}
        disabled={!cities.length}
      >
        <option value="">Select City/Mun</option>
        {cities.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
      </select>

      {/* Barangay Select */}
      <label>Barangay</label>
      <select 
        value={selectedBarangay} 
        onChange={(e) => setSelectedBarangay(e.target.value)}
        disabled={!barangays.length}
      >
        <option value="">Select Barangay</option>
        {barangays.map(b => <option key={b.id} value={b.id}>{b.name}</option>)}
      </select>

      <div style={{ marginTop: '20px', fontSize: '12px', color: '#666' }}>
        <strong>Selected PSGC ID:</strong> {selectedBarangay || selectedCity || selectedProvince || selectedRegion || 'None'}
      </div>
    </div>
  );
};

export default PhilippineAddressPicker;