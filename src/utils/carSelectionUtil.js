import { useDispatch, useSelector } from "react-redux";
import {
  fetchCarDetails, setMake, setModel, setYear, setProfile, setWheel,
  setMakesFromCache, setModelsFromCache, setYearsFromCache,
  setProfilesFromCache, setWheelsFromCache, setTiresFromCache
} from "../utils/carDetailSlice";

const useCarSelection = () => {
  const dispatch = useDispatch();
  const { make, models, years, profiles, wheels, tires, selectedMake, selectedModel, selectedYear, selectedProfile, selectedWheel, loading, error } =
  useSelector((state) => state.carDetails);
  const handleMakeChange = (e) => { 
    const newMake = e.target.value;
    dispatch(setMake(newMake));
    const modelCacheKey = `models_${newMake}`;
    const cachedModels = localStorage.getItem(modelCacheKey);
    if (!cachedModels) {
      dispatch(fetchCarDetails({ make: newMake }));
    } else {
      dispatch(setModelsFromCache(JSON.parse(cachedModels)));
    }
  };

  const handleModelChange = (e) => {
    const newModel = e.target.value;
    dispatch(setModel(newModel));
    const yearCacheKey = `years_${selectedMake}_${newModel}`;
    const cachedYears = localStorage.getItem(yearCacheKey);
    if (!cachedYears) {
      dispatch(fetchCarDetails({ make: selectedMake, model: newModel }));
    } else {
      dispatch(setYearsFromCache(JSON.parse(cachedYears)));
    }
  };

  const handleYearChange = (e) => {
    const newYear = e.target.value;
    dispatch(setYear(newYear));
    const profileCacheKey = `profiles_${selectedMake}_${selectedModel}_${newYear}`;
    const cachedProfiles = localStorage.getItem(profileCacheKey);
    if (!cachedProfiles) {
      dispatch(fetchCarDetails({ make: selectedMake, model: selectedModel, year: newYear }));
    } else {
      dispatch(setProfilesFromCache(JSON.parse(cachedProfiles)));
    }
  };

  const handleProfileChange = (e) => {
    const newProfileSlug = e.target.value;
    dispatch(setProfile(newProfileSlug));
    const wheelCacheKey = `wheels_${selectedMake}_${selectedModel}_${selectedYear}_${newProfileSlug}`;
    const cachedWheels = localStorage.getItem(wheelCacheKey);
    if (!cachedWheels) {
      dispatch(fetchCarDetails({ make: selectedMake, model: selectedModel, year: selectedYear, profile: newProfileSlug }));
    } else {
      dispatch(setWheelsFromCache(JSON.parse(cachedWheels)));
    }
  };

  const handleWheelChange = (e) => {
    const newWheel = e.target.value;
    dispatch(setWheel(newWheel));
    const tireCacheKey = `tires_${newWheel}`;
    const cachedTires = localStorage.getItem(tireCacheKey);
    if (!cachedTires) {
      dispatch(fetchCarDetails({ make: selectedMake, model: selectedModel, year: selectedYear, profile: selectedProfile, wheel: newWheel }));
    } else {
      dispatch(setTiresFromCache(JSON.parse(cachedTires)));
    }
  };

  const handleBackToForm = () => {
    dispatch(setWheel(""));
  };

  return {
    make, models, years, profiles, wheels, tires, selectedMake, selectedModel, selectedYear, selectedProfile, selectedWheel, loading, error,
    handleMakeChange, handleModelChange, handleYearChange, handleProfileChange, handleWheelChange, handleBackToForm, fetchCarDetails, setMakesFromCache
  };
};

export default useCarSelection;