import { Form } from "react-bootstrap"; 
import { useContext} from "react";
import  { TireContext } from "../providers/TireProvider";
import "../styles/tireform/tireform.scss";
const CarSelectionForm = () => {

    const { 
        handleMakeChange,  
        handleModelChange,
        handleYearChange,
        handleProfileChange,
        handleWheelChange, 
        selectedMake, 
        selectedModel, 
        selectedProfile, 
        selectedWheel, 
        selectedYear, 
        make,
        models,
        years,
        profiles,
        wheels,
    } = useContext(TireContext);
    return (
        <>
         <Form className="tire-form" >
                                    <Form.Group className="car-info">
                                        <Form.Label htmlFor="make">Make</Form.Label>
                                        <Form.Select id="carMake" name="make" value={selectedMake} onChange={handleMakeChange} disabled={make.length === 0}>
                                            <option value="">Select Make</option>
                                            {make.map((m) => (
                                                <option key={m} value={m}>{m}</option>
                                            ))}
                                        </Form.Select>
                                    </Form.Group>
        
                                    <Form.Group className="car-info">
                                        <Form.Label htmlFor="model">Model</Form.Label>
                                        <Form.Select
                                            id="carModel"
                                            name="model"
                                            value={selectedModel}
                                            onChange={handleModelChange}
                                            disabled={!selectedMake || models.length === 0}
                                        >
                                            <option value="">Select Model</option>
                                            {Array.isArray(models) ? (
                                                models.map((m) => (
                                                    <option key={m} value={m}>{m}</option>
                                                ))
                                            ) : (
                                                <option value="">No models</option>
                                            )}
                                        </Form.Select>
                                    </Form.Group>
        
                                    <Form.Group className="car-info">
                                        <Form.Label htmlFor="year">Year</Form.Label>
                                        <Form.Select
                                            id="carYear"
                                            name="year"
                                            value={selectedYear}
                                            onChange={handleYearChange}
                                            disabled={!selectedModel || years.length === 0}
                                        >
                                            <option value="">Select Year</option>
                                            {Array.isArray(years) ? (
                                                years.map((y) => (
                                                    <option key={y} value={y}>{y}</option>
                                                ))
                                            ) : (
                                                <option value="">No years</option>
                                            )}
                                        </Form.Select>
                                    </Form.Group>
        
                                    <Form.Group className="car-info">
                                        <Form.Label htmlFor="profile">Car Profile</Form.Label>
                                        <Form.Select
                                            id="carProfile"
                                            name="profile"
                                            value={selectedProfile}
                                            onChange={handleProfileChange}
                                            disabled={!selectedYear || profiles.length === 0}
                                        >
                                            <option value="">Select Profile</option>
                                            {Array.isArray(profiles) ? (
                                                profiles.map((p) => (
                                                    <option key={p.slug} value={p.slug}>{`${p.name} ${p.trim} (${p.type})`}</option>
                                                ))
                                            ) : (
                                                <option value="">No profiles</option>
                                            )}
                                        </Form.Select>
                                    </Form.Group>
        
                                    <Form.Group className="car-info">
                                        <Form.Label htmlFor="wheel">Wheel Options</Form.Label>
                                        <Form.Select
                                            id="wheel"
                                            name="wheel"
                                            value={selectedWheel}
                                            onChange={handleWheelChange}
                                            disabled={!selectedProfile || wheels.length === 0}
                                        >
                                            <option value="">Select Wheel</option>
                                            {Array.isArray(wheels) ? (
                                                wheels.map((w) => (
                                                    <option key={w} value={w}>{w}</option>
                                                ))
                                            ) : (
                                                <option value="">No wheels</option>
                                            )}
                                        </Form.Select>
                                    </Form.Group>
                                </Form>
        </>
    );
};

export default CarSelectionForm;