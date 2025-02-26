import React, { useState, useEffect } from "react";
import { Offcanvas, Button, Form, Container, Card, ListGroup } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Formik } from "formik";
import * as Yup from "yup";
import { getFunctions } from 'firebase/functions';
import {
    fetchCarDetails,
    setMake,
    setModel,
    setYear,
    setProfile,
    setWheel,
    setMakesFromCache,
    setModelsFromCache,
    setYearsFromCache,
    setProfilesFromCache,
    setWheelsFromCache,
    setTiresFromCache,
} from "../utils/carDetailSlice";
import SuccessModal from "./SuccessModal";
import "../styles/tireform/tireform.scss";

const ServiceModal = ({ show, toggleForm }) => {
    const functions = getFunctions();
    const dispatch = useDispatch();
    const [placement, setPlacement] = useState("end");
    const [view, setView] = useState("form");
    const [selectedTire, setSelectedTire] = useState(null);
    const [tireQuantity, setTireQuantity] = useState(1);
    const [price, setPrice] = useState(120.0);
    const [fee, setFee] = useState(19.96);
    const [taxRate] = useState(0.0885);
    const [balancePrice, setBalancePrice] = useState(17.99);
    const [rebuild, setRebuild] = useState(8.99);
    const [subtotal, setSubtotal] = useState(0);
    const [total, setTotal] = useState(0);
    const { make, models, years, profiles, wheels, tires, selectedMake, selectedModel, selectedYear, selectedProfile, selectedWheel, loading, error } =
        useSelector((state) => state.carDetails);
    const [date, setDate] = useState({
        month: "",
        day: "",
        year: "",
        time: "",
    });
    const [customerPurchase, setCustomerPurchase] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        carMake: '',
        carModel: '',
        carProfile: '',
        carYear: '',
        wheelSize: '',
        tireSelection: '',
        tireQuantity: '',
        total: '',
        date: '',
        apptDate: '',
    });
    const [showModal, setShowModal] = useState(false);

    const getCurrentDate = () => {
        const today = new Date();
        const year = today.getFullYear();
        const month = String(today.getMonth() + 1).padStart(2, "0");
        const day = String(today.getDate()).padStart(2, "0");
        return `${year}-${month}-${day}`;
    };

    const getCurrentTime = () => {
        const today = new Date();
        const hours = String(today.getHours()).padStart(2, "0");
        const minutes = String(today.getMinutes()).padStart(2, "0");
        return `${hours}:${minutes}`;
    };

    useEffect(() => {
        const newSubtotal = price * tireQuantity + fee + balancePrice + rebuild;
        setSubtotal(newSubtotal);
        const taxAmount = newSubtotal * taxRate;
        setTotal(newSubtotal + taxAmount);
    }, [tireQuantity, price, fee, balancePrice, rebuild, taxRate]);

    useEffect(() => {
        const handleResize = () => {
            setPlacement(window.innerWidth < 992 ? "start" : "end");
        };
        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    useEffect(() => {
        const cachedMakes = localStorage.getItem("carMakes");
        if (show && make.length === 0 && !cachedMakes) {
            dispatch(fetchCarDetails());
        } else if (show && make.length === 0 && cachedMakes) {
            dispatch(setMakesFromCache(JSON.parse(cachedMakes)));
        }
    }, [dispatch, show, make.length]);

    useEffect(() => {
        if (tires.length > 0 && view === "form") {
            setView("tires");
        }
    }, [tires, view]);

    const handleSubmit = (e) => {
        e.preventDefault();
    };

    const handleDate = (e) => {
        setDate({ ...date, [e.target.name]: e.target.value });
    };

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
        setView("form");
        setSelectedTire(null);
    };

    const handleScheduleInstall = (tire) => {
        setSelectedTire(tire);
        setView("install");
    };

    const formatTime = (time) => {
        if (!time) return "Not set";
        const [hours, minutes] = time.split(":");
        const hourNum = parseInt(hours, 10);
        const period = hourNum >= 12 ? "PM" : "AM";
        const adjustedHour = hourNum % 12 || 12;
        return `${adjustedHour}:${minutes} ${period}`;
    };

    const validationSchema = Yup.object({
        firstName: Yup.string()
            .min(2, "First name must be at least 2 characters")
            .max(50, "First name must be 50 characters or less")
            .required("First name is required"),
        lastName: Yup.string()
            .min(2, "Last name must be at least 2 characters")
            .max(50, "Last name must be 50 characters or less")
            .required("Last name is required"),
        email: Yup.string().email("Invalid email address").required("Email is required"),
        phone: Yup.string()
            .matches(/^\d{10}$/, "Phone number must be exactly 10 digits")
            .required("Phone number is required"),
        time: Yup.string()
            .required("Time is required")
            .test("is-between-9am-5pm", "Installation time must be between 9 AM and 5 PM", (value) => {
                if (!value) return false;
                const [hours, minutes] = value.split(":").map(Number);
                const timeInMinutes = hours * 60 + minutes;
                const minTime = 9 * 60;
                const maxTime = 17 * 60;
                return timeInMinutes >= minTime && timeInMinutes <= maxTime;
            }),
    });

    const handlePurchase = async (values, { setSubmitting }) => {
        const currentDate = new Date();
        const apptDate = date.year && date.month && date.day && date.time 
            ? `${date.year}-${date.month.padStart(2, '0')}-${date.day.padStart(2, '0')}T${date.time}:00`
            : currentDate.toISOString();
        const profileName = profiles.find(p => p.slug === selectedProfile)?.name || 'Unknown';

        const purchaseData = {
            firstName: values.firstName || '',
            lastName: values.lastName || '',
            email: values.email || '',
            phone: values.phone || '',
            carMake: selectedMake || 'Unknown',
            carModel: selectedModel || 'Unknown',
            carProfile: profileName, 
            carYear: selectedYear || 'Unknown',
            wheelSize: selectedWheel || 'Unknown',
            tireSelection: selectedTire ? selectedTire.name : 'None',
            tireQuantity: tireQuantity || 1,
            total: total ? total.toFixed(2) : '0.00',
            date: new Date().toISOString(),
            apptDate: apptDate,
        };

        setCustomerPurchase(purchaseData);

        try {
            const response = await fetch('https://us-central1-sonoratiresinc.cloudfunctions.net/postCustomerPurchase', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(purchaseData)
            });

            const result = await response.json();

            if (!response.ok) {
                throw new Error(result.message || 'Submission failed');
            }

            setShowModal(true); 
        } catch (error) {
            console.error('Error submitting purchase:', error);
            alert(error.message);
        } finally {
            setSubmitting(false);
        }
    };

    const handleModalClose = () => {
        setShowModal(false);
        setView("form");
        toggleForm();
    };

    const sortedTires = [...tires].sort((a, b) => a.brand.localeCompare(b.brand));

    return (
        <>
            <Offcanvas className="service-slider" show={show} placement={placement}>
                <Offcanvas.Header onClick={view !== "form" ? handleBackToForm : toggleForm} closeButton>
                    <Offcanvas.Title className="tire-selection-title">
                        {view === "form" ? "Tire Selection" : view === "tires" ? "Available Tires" : "Install Confirmation"}
                    </Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    {loading && <div>Loading...</div>}
                    {error && <div>Error: {error}</div>}

                    {view === "form" && (
                        <Form className="tire-form" onSubmit={handleSubmit}>
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
                    )}

                    {view === "tires" && (
                        <Container className="tire-list-container">
                            {sortedTires.map((tire) => (
                                <Card key={tire.name} className="tire-cards">
                                    <Card.Title className="brand">{tire.brand}</Card.Title>
                                    <div className="tire-container">
                                        <Card.Img className="tire-image" src={tire.thumbnail} alt={tire.name} />
                                    </div>
                                    <Card.Body className="tire">
                                        <Card.Text className="tire-info">{selectedWheel}</Card.Text>
                                        <Card.Text className="tire-info">{tire.name}</Card.Text>
                                        <Card.Text className="tire-info">{tire.season}</Card.Text>
                                    </Card.Body>
                                    <Button className="tire-select-btn" onClick={() => handleScheduleInstall(tire)}>
                                        Schedule Install
                                    </Button>
                                </Card>
                            ))}
                        </Container>
                    )}

                    {view === "install" && selectedTire && (
                        <Container className="install-confirmation">
                            <Formik
                                validationSchema={validationSchema}
                                initialValues={{
                                    firstName: "",
                                    lastName: "",
                                    email: "",
                                    phone: "",
                                    time: date.time || "",
                                }}
                                onSubmit={handlePurchase}
                            >
                                {({ handleSubmit, handleChange, handleBlur, values, errors, touched, isValid, isSubmitting }) => (
                                    <Form className="customer-tire-form" noValidate onSubmit={handleSubmit}>
                                        <h4 className="contact-title">Contact Details</h4>
                                        <Form.Group className="customer-info">
                                            <Form.Label htmlFor="firstName">First Name</Form.Label>
                                            <Form.Control
                                                type="text"
                                                name="firstName"
                                                value={values.firstName}
                                                placeholder="First Name"
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                isInvalid={touched.firstName && !!errors.firstName}
                                                required
                                            />
                                            <Form.Control.Feedback type="invalid">{errors.firstName}</Form.Control.Feedback>
                                        </Form.Group>
                                        <Form.Group className="customer-info">
                                            <Form.Label htmlFor="lastName">Last Name</Form.Label>
                                            <Form.Control
                                                type="text"
                                                name="lastName"
                                                value={values.lastName}
                                                placeholder="Last Name"
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                isInvalid={touched.lastName && !!errors.lastName}
                                                required
                                            />
                                            <Form.Control.Feedback type="invalid">{errors.lastName}</Form.Control.Feedback>
                                        </Form.Group>
                                        <Form.Group className="customer-info">
                                            <Form.Label htmlFor="email">Email Address</Form.Label>
                                            <Form.Control
                                                type="email"
                                                name="email"
                                                value={values.email}
                                                placeholder="Email Address"
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                isInvalid={touched.email && !!errors.email}
                                                required
                                            />
                                            <Form.Control.Feedback type="invalid">{errors.email}</Form.Control.Feedback>
                                        </Form.Group>
                                        <Form.Group className="customer-info">
                                            <Form.Label htmlFor="phone">Phone Number</Form.Label>
                                            <Form.Control
                                                type="tel"
                                                name="phone"
                                                value={values.phone}
                                                placeholder="Phone Number"
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                isInvalid={touched.phone && !!errors.phone}
                                                required
                                            />
                                            <Form.Control.Feedback type="invalid">{errors.phone}</Form.Control.Feedback>
                                        </Form.Group>
                                        <Form.Group className="date">
                                            <Form.Label>Set Installation Date</Form.Label>
                                            <Form.Control
                                                type="date"
                                                name="date"
                                                value={`${date.year}-${date.month.padStart(2, "0")}-${date.day.padStart(2, "0")}`}
                                                onChange={(e) => {
                                                    const [year, month, day] = e.target.value.split("-");
                                                    const selectedDate = new Date(year, month - 1, day);
                                                    const today = new Date();
                                                    today.setHours(0, 0, 0, 0);
                                                    if (selectedDate < today) {
                                                        return;
                                                    }
                                                    setDate({ ...date, year, month, day });
                                                }}
                                                min={getCurrentDate()}
                                                required
                                            />
                                        </Form.Group>
                                        <Form.Group className="time">
                                            <Form.Label>Time</Form.Label>
                                            <Form.Control
                                                type="time"
                                                name="time"
                                                value={values.time}
                                                onChange={(e) => {
                                                    handleChange(e);
                                                    setDate({ ...date, time: e.target.value });
                                                }}
                                                onBlur={handleBlur}
                                                isInvalid={touched.time && !!errors.time}
                                                min="09:00"
                                                max="17:00"
                                                required
                                            />
                                            <Form.Control.Feedback type="invalid">{errors.time}</Form.Control.Feedback>
                                        </Form.Group>
                                        <Card className="install-card">
                                            <Card.Body className="vehicle-info-body">
                                                <Card.Title className="vehicle-type">Vehicle Details</Card.Title>
                                                <ListGroup className="vehicle-info">
                                                    <ListGroup.Item>Make: {selectedMake}</ListGroup.Item>
                                                    <ListGroup.Item>Model: {selectedModel}</ListGroup.Item>
                                                    <ListGroup.Item>Year: {selectedYear}</ListGroup.Item>
                                                    <ListGroup.Item>
                                                        Profile: {profiles.find((p) => p.slug === selectedProfile)?.name} (
                                                        {profiles.find((p) => p.slug === selectedProfile)?.type})
                                                    </ListGroup.Item>
                                                    <ListGroup.Item>Wheel Size: {selectedWheel}</ListGroup.Item>
                                                </ListGroup>
                                            </Card.Body>
                                            <Card.Body className="tire-detail-body">
                                                <Card.Title className="selected-tire">Tire Details</Card.Title>
                                                <ListGroup className="tire-type">
                                                    <ListGroup.Item>Brand: {selectedTire.brand}</ListGroup.Item>
                                                    <ListGroup.Item>Name: {selectedTire.name}</ListGroup.Item>
                                                    <ListGroup.Item>Season: {selectedTire.season}</ListGroup.Item>
                                                    <div className="tire-image-div">
                                                        <Card.Img className="tire-image" src={selectedTire.thumbnail} alt={selectedTire.name} />
                                                    </div>
                                                </ListGroup>
                                            </Card.Body>
                                            <Card.Body className="quantity-select">
                                                <Form.Group className="quantity">
                                                    <Form.Label>Quantity</Form.Label>
                                                    <div className="quantity-control">
                                                        <Button
                                                            className="number-btn"
                                                            onClick={() => setTireQuantity((prev) => Math.max(1, prev - 1))}
                                                            disabled={tireQuantity <= 1}
                                                        >
                                                            -
                                                        </Button>
                                                        <Form.Control
                                                            type="number"
                                                            value={tireQuantity}
                                                            onChange={(e) => setTireQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                                                            min="1"
                                                            className="tire-quantity"
                                                        />
                                                        <Button
                                                            className="number-btn"
                                                            onClick={() => setTireQuantity((prev) => prev + 1)}
                                                            disabled={tireQuantity >= 4}
                                                        >
                                                            +
                                                        </Button>
                                                    </div>
                                                </Form.Group>
                                            </Card.Body>
                                            <Card.Body className="cost-container">
                                                <ListGroup className="cost-details">
                                                    <ListGroup.Item>Wheel Balance: ${balancePrice}</ListGroup.Item>
                                                    <ListGroup.Item>TPMS Rebuild: ${rebuild}</ListGroup.Item>
                                                    <ListGroup.Item>Tire Disposal: ${fee}</ListGroup.Item>
                                                    <ListGroup.Item>Subtotal: ${subtotal.toFixed(2)}</ListGroup.Item>
                                                    <ListGroup.Item>Tax ${(subtotal * taxRate).toFixed(2)}</ListGroup.Item>
                                                    <ListGroup.Item>Total: ${total.toFixed(2)}</ListGroup.Item>
                                                </ListGroup>
                                                {date.month && date.day && date.year && date.time ? (
                                                    <>
                                                        <Card.Text>Date: {date.month}/{date.day}/{date.year}</Card.Text>
                                                        <Card.Text>Time: {formatTime(date.time) || "Not set"}</Card.Text>
                                                    </>
                                                ) : (
                                                    <></>
                                                )}
                                            </Card.Body>
                                        </Card>
                                        <Form.Group className="purchase-div">
                                            <Button className="submit-btn" type="submit" disabled={!isValid || isSubmitting}>
                                                Submit
                                            </Button>
                                        </Form.Group>
                                    </Form>
                                )}
                            </Formik>
                        </Container>
                    )}
                </Offcanvas.Body>
            </Offcanvas>
            <SuccessModal
                show={showModal}
                handleClose={handleModalClose}
                userData={customerPurchase}
            />
        </>
    );
};

export default ServiceModal;