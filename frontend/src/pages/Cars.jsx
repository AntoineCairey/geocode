import {
  MDBBtn,
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
} from "mdb-react-ui-kit";
import { useState } from "react";
import { Link, useLoaderData, useNavigate } from "react-router-dom";
import { useTheContext } from "../context/Context";

export default function Cars() {
  const { cars, plugTypes } = useLoaderData();
  const { apiService } = useTheContext();
  const navigate = useNavigate();

  const [showConfirmation, setShowConfirmation] = useState(false);
  const [vehicleToDelete, setVehicleToDelete] = useState(null);

  // Fonction pour ouvrir la boîte de dialogue de confirmation
  const openConfirmationDialog = (carId) => {
    setVehicleToDelete(carId);
    setShowConfirmation(true);
  };

  // Fonction pour confirmer la suppression du véhicule
  const confirmDeleteCar = async () => {
    try {
      await apiService.del(`/vehicle/${vehicleToDelete}`);
      setVehicleToDelete(null);
      navigate(0);
    } catch (error) {
      console.error("Error deleting car:", error);
    }
    setShowConfirmation(false);
  };

  function getPlugTypeName(plugTypeId) {
    const plugType = plugTypes.find((type) => type.id === plugTypeId);
    return plugType ? plugType.name : "Type inconnu";
  }

  return (
    <div className="cars-container">
      <button
        type="submit"
        className="back"
        onClick={() => navigate("/myaccount")}
      >
        &larr; Retour
      </button>

      <h1 className="cars-title">Mes véhicules</h1>
      <div className="my-cars">
        {cars.map((car) => (
          <MDBCard border className="one-car" key={car.model}>
            <MDBCardBody>
              <MDBCardTitle>
                {car.brand} {car.model}
              </MDBCardTitle>
              <MDBCardText>
                Type de prise : {getPlugTypeName(car.plug_type_id)}
              </MDBCardText>
              <div className="btn-delete-car">
                <MDBBtn
                  size="sm"
                  onClick={() => openConfirmationDialog(car.id)}
                >
                  Supprimer
                </MDBBtn>
              </div>
            </MDBCardBody>
          </MDBCard>
        ))}
      </div>

      {/* Boîte de dialogue de confirmation */}
      {showConfirmation && (
        <div className="confirmation-dialog">
          <div>Voulez-vous vraiment supprimer ce véhicule ?</div>
          <MDBBtn size="sm" onClick={confirmDeleteCar}>
            Oui
          </MDBBtn>
          <MDBBtn size="sm" onClick={() => setShowConfirmation(false)}>
            Annuler
          </MDBBtn>
        </div>
      )}

      <div className="add-car">
        <Link to="/newcar">
          <MDBBtn type="submit" className="mb-4" block>
            Ajouter un véhicule
          </MDBBtn>
        </Link>
      </div>
    </div>
  );
}
