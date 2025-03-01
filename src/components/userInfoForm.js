import { Container, Form, Card, ListGroup, Button } from "react-bootstrap";
import { Formik } from "formik";
import { useContext } from "react";
import { TireContext } from "../providers/TireProvider";
import "../styles/tireform/tireform.scss";

const UserInfoForm = () => {
    const { 
        handlePurchase, 
        validationSchema,
        formatTime,
        selectedMake,
        selectedModel,
        selectedYear,
        selectedProfile,
        selectedWheel,
        selectedTire,
        setTireQuantity,
        tireQuantity,
        profiles,
        date,
        setDate,
        getCurrentDate,
        balancePrice,
        rebuild,
        fee,
        total,
        subtotal,
        taxRate,

    } = useContext(TireContext);
    return (
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
    );
};

export default UserInfoForm;