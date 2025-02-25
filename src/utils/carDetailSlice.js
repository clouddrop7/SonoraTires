import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { initializeApp } from 'firebase/app';
import firebaseConfig from '../firebase.config';

const app = initializeApp(firebaseConfig);

export const fetchCarDetails = createAsyncThunk(
  'carDetails/fetchCarDetails',
  async ({ 
      make, 
      model: selectedModel, 
      year: selectedYear, 
      profile: selectedProfile,
      wheel: selectedWheel,
      tires
    } = {}, { rejectWithValue }) => {
    try {
      if (!make || Object.keys(make).length === 0) {
        const cachedMakes = localStorage.getItem('carMakes');
        if (cachedMakes) {
          return { makes: JSON.parse(cachedMakes) };
        }
        const carsMakeUrl = 'https://us-central1-sonoratiresinc.cloudfunctions.net/fetchCarMake';
        const response = await fetch(carsMakeUrl, {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
        });
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        const makeData = await response.json();
        if (!makeData.success) throw new Error('Failed to fetch make data');
        const makesArray = makeData.data.data.map(m => m.slug);
        localStorage.setItem('carMakes', JSON.stringify(makesArray));
        return { makes: makesArray };
      }

      if (make && !selectedModel) {
        const modelCacheKey = `models_${make}`;
        const cachedModels = localStorage.getItem(modelCacheKey);
        if (cachedModels) {
          return { models: JSON.parse(cachedModels) };
        }
        const carsModelUrl = `https://us-central1-sonoratiresinc.cloudfunctions.net/fetchCarModel?make=${make}`;
        const modelResponse = await fetch(carsModelUrl, {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
        });
        if (!modelResponse.ok) throw new Error(`HTTP error! status: ${modelResponse.status}`);
        const modelData = await modelResponse.json();
        if (!modelData.success) throw new Error('Failed to fetch model data');
        const modelsArray = modelData.data.data.map(m => m.slug);
        localStorage.setItem(modelCacheKey, JSON.stringify(modelsArray));
        return { models: modelsArray };
      }

      if (make && selectedModel && !selectedYear) {
        const yearCacheKey = `years_${make}_${selectedModel}`;
        const cachedYears = localStorage.getItem(yearCacheKey);
        if (cachedYears) {
          return { years: JSON.parse(cachedYears) };
        }
        const carsYearUrl = `https://us-central1-sonoratiresinc.cloudfunctions.net/fetchCarYear?make=${make}&model=${selectedModel}`;
        const yearResponse = await fetch(carsYearUrl, {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
        });
        if (!yearResponse.ok) throw new Error(`HTTP error! status: ${yearResponse.status}`);
        const yearData = await yearResponse.json();
        if (!yearData.success) throw new Error('Failed to fetch year data');
        const yearsArray = yearData.data.data.map(y => y.slug);
        localStorage.setItem(yearCacheKey, JSON.stringify(yearsArray));
        return { years: yearsArray };
      }

      if (make && selectedModel && selectedYear && !selectedProfile) {
        const profileCacheKey = `profiles_${make}_${selectedModel}_${selectedYear}`;
        const cachedProfiles = localStorage.getItem(profileCacheKey);
        if (cachedProfiles) {
          return { profiles: JSON.parse(cachedProfiles) };
        }
        const carsProfileUrl = `https://us-central1-sonoratiresinc.cloudfunctions.net/fetchCarProfile?make=${make}&model=${selectedModel}&year=${selectedYear}`;
        const profileResponse = await fetch(carsProfileUrl, {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
        });
        if (!profileResponse.ok) throw new Error(`HTTP error! status: ${profileResponse.status}`);
        const profileData = await profileResponse.json();
        if (!profileData.success) throw new Error('Failed to fetch profile data');
        const profilesArray = [];
        profileData.data.data.forEach(p => {
          const profile = {
            slug: p.slug,
            name: p.name,
            trim: p.trim,
            type: p.engine.type,
          };
          profilesArray.push(profile);
        });
        localStorage.setItem(profileCacheKey, JSON.stringify(profilesArray));
        return { profiles: profilesArray };
      }

      if (make && selectedModel && selectedProfile && selectedYear && !selectedWheel) {
        const wheelCacheKey = `wheels_${make}_${selectedModel}_${selectedYear}_${selectedProfile}`;
        const cachedWheels = localStorage.getItem(wheelCacheKey);
        if (cachedWheels) {
          return { wheels: JSON.parse(cachedWheels) };
        }
        const wheelUrl = `https://us-central1-sonoratiresinc.cloudfunctions.net/fetchCarOptions?make=${make}&model=${selectedModel}&profile=${selectedProfile}&year=${selectedYear}`;
        const wheelResponse = await fetch(wheelUrl, {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
        });
        if (!wheelResponse.ok) throw new Error(`HTTP error! status: ${wheelResponse.status}`);
        const wheelData = await wheelResponse.json();
        if (!wheelData.success) throw new Error('Failed to fetch wheel data');
        const wheelOptions = wheelData.data.data.map(profile => profile.wheels);
        const wheels = wheelOptions.flatMap(tireArray => 
          tireArray.map(tire => tire.front.tire).filter(size => size)
        );
        localStorage.setItem(wheelCacheKey, JSON.stringify(wheels));
        return { wheels };
      }

      if (selectedWheel && !tires) {
        const tireCacheKey = `tires_${selectedWheel}`;
        const cachedTires = localStorage.getItem(tireCacheKey);
        if (cachedTires) {
          return { tires: JSON.parse(cachedTires) };
        }
        const tireUrl = `https://us-central1-sonoratiresinc.cloudfunctions.net/fetchTires?tireSize=${selectedWheel}`;
        const tireResponse = await fetch(tireUrl, {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
        });
        if (!tireResponse.ok) throw new Error(`HTTP error! status: ${tireResponse.status}`);
        const tireData = await tireResponse.json();
        if (!tireData.success) throw new Error('Failed to fetch tire data');

        const tireObjects = tireData.data.data.map((tire) => {
          const { display, brand, season, thumbnail } = tire;
          return {
            name: display,
            brand: brand.display,
            season: season.display,
            thumbnail,
          };
        });

        localStorage.setItem(tireCacheKey, JSON.stringify(tireObjects));
        return { tires: tireObjects };
      }

      return {};
    } catch (error) {
      console.error('Error fetching car details:', error);
      return rejectWithValue(error.message);
    }
  }
);

const carDetailsSlice = createSlice({
  name: 'carDetails',
  initialState: {
    make: [],
    models: [],
    years: [],
    profiles: [],
    wheels: [],
    tires: [],
    selectedMake: '',
    selectedModel: '',
    selectedYear: '',
    selectedProfile: '',
    selectedWheel: '',
    loading: false,
    error: null
  },
  reducers: {
    setMake: (state, action) => { 
      state.selectedMake = action.payload; 
      state.models = []; 
      state.years = [];
      state.profiles = [];
      state.wheels = [];
      state.tires = [];
      state.selectedModel = '';
      state.selectedYear = '';
      state.selectedProfile = '';
      state.selectedWheel = '';
    },
    setModel: (state, action) => { 
      state.selectedModel = action.payload; 
      state.years = []; // Reset dependent states
      state.profiles = [];
      state.wheels = [];
      state.tires = [];
      state.selectedYear = '';
      state.selectedProfile = '';
      state.selectedWheel = '';
    },
    setYear: (state, action) => { 
      state.selectedYear = action.payload; 
      state.profiles = []; // Reset dependent states
      state.wheels = [];
      state.tires = [];
      state.selectedProfile = '';
      state.selectedWheel = '';
    },
    setProfile: (state, action) => { 
      state.selectedProfile = action.payload; 
      state.wheels = []; // Reset dependent states
      state.tires = [];
      state.selectedWheel = '';
    },
    setWheel: (state, action) => { 
      state.selectedWheel = action.payload; 
      state.tires = []; // Reset dependent state
    },
    setMakesFromCache: (state, action) => { state.make = action.payload; },
    setModelsFromCache: (state, action) => { state.models = action.payload; },
    setYearsFromCache: (state, action) => { state.years = action.payload; },
    setProfilesFromCache: (state, action) => { state.profiles = action.payload; },
    setWheelsFromCache: (state, action) => { state.wheels = action.payload; },
    setTiresFromCache: (state, action) => { state.tires = action.payload; },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCarDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCarDetails.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload.makes) state.make = action.payload.makes;
        if (action.payload.models) state.models = action.payload.models;
        if (action.payload.years) state.years = action.payload.years;
        if (action.payload.profiles) state.profiles = action.payload.profiles;
        if (action.payload.wheels) state.wheels = action.payload.wheels;
        if (action.payload.tires) state.tires = action.payload.tires;
        state.error = null;
      })
      .addCase(fetchCarDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { setMake, setModel, setYear, setProfile, setWheel, setMakesFromCache, setModelsFromCache, setYearsFromCache, setProfilesFromCache, setWheelsFromCache, setTiresFromCache } = carDetailsSlice.actions;
export const carReducer = carDetailsSlice.reducer;