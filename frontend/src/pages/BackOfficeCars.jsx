import { useLoaderData, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import { MDBDatatable, MDBBtn } from "mdb-react-ui-kit";
import { useTheContext } from "../context/Context";
import NavBarBO from "../components/NavBarBO";

export default function BackOfficeCars() {
  const { cars, plugTypes } = useLoaderData();
  const { apiService, setModal, yesNoModal, setYesNoModal } = useTheContext();
  const navigate = useNavigate();

  function getPlugTypeName(plugTypeId) {
    const plugType = plugTypes.find((type) => type.id === plugTypeId);
    return plugType ? plugType.name : "Type inconnu";
  }

  const confirmDeleteCar = async (carToDelete) => {
    try {
      await apiService.del(`/vehicle/${carToDelete}`);
      setYesNoModal(false);
      setModal("Votre vehicle a bien été supprimé");
      navigate(0);
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  const columns = [
    "ID",
    "Marque",
    "Modèle",
    "Type de prise",
    "Modifier",
    "Supprimer",
  ];

  const rows = cars.map((vehicle) => [
    vehicle.id,
    vehicle.brand,
    vehicle.model,
    getPlugTypeName(vehicle.plug_type_id),
    <FontAwesomeIcon
      icon={faEdit}
      onClick={() => navigate(`/backoffice/modifcar/${vehicle.id}`)}
    />,
    <FontAwesomeIcon
      icon={faTrash}
      onClick={() =>
        setYesNoModal({
          message: "Voulez-vous vraiment supprimer ce véhicule ?",
          vehicleId: vehicle.id,
        })
      }
    />,
  ]);

  const basicData = { columns, rows };

  return (
    <div className="backofficeutilisateur_container">
      <NavBarBO />
      <h2 className="bo-title">Véhicules</h2>

      <div className="backoffidata">
        <MDBDatatable data={basicData} />
      </div>

      {/* Boîte de dialogue de confirmation */}
      {yesNoModal && (
        <div className="confirmation-dialog">
          <p>{yesNoModal.message}</p>
          <div className="popup-btn">
            <MDBBtn
              size="sm"
              onClick={() => confirmDeleteCar(yesNoModal.vehicleId)}
            >
              Oui
            </MDBBtn>
            <MDBBtn size="sm" onClick={() => setYesNoModal(false)}>
              Annuler
            </MDBBtn>
          </div>
        </div>
      )}
    </div>
  );
}
