import { Container, Card, Button } from "react-bootstrap";
import { useContext } from "react";
import TireContext from "../providers/TireProvider";
import "../styles/tireform/tireform.scss";
const TireSelection = () => {

    const { sortedTires, selectedWheel, handleScheduleInstall } = useContext(TireContext);
    return (
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
    );
};

export default TireSelection;