import { MDBDatatable, MDBBtn } from "mdb-react-ui-kit";
import { useLoaderData, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import { useTheContext } from "../context/Context";
import NavBarBO from "../components/NavBarBO";

export default function BackOfficeUtilisateur() {
  const userData = useLoaderData();
  const { apiService, setModal, yesNoModal, setYesNoModal } = useTheContext();
  const navigate = useNavigate();

  const columns = [
    "ID",
    "Email",
    "Prénom",
    "Nom",
    "Date de naissance",
    "Code postal",
    "Ville",
    "Modifier",
    "Supprimer",
  ];

  const confirmDeleteUser = async (userId) => {
    try {
      await apiService.del(`/users/${userId}`);
      setYesNoModal(false);
      setModal("Le compte a bien été supprimé");
      navigate(0);
    } catch (error) {
      setModal("Error deleting user:");
    }
  };

  const rows =
    userData?.map((user) => [
      user.id,
      user.email,
      user.first_name,
      user.last_name,
      user.birth_date,
      user.postal_code,
      user.city,
      <FontAwesomeIcon
        icon={faEdit}
        onClick={() => navigate(`/backoffice/modifprofil/${user.id}`)}
      />,
      <FontAwesomeIcon
        icon={faTrash}
        onClick={() =>
          setYesNoModal({
            message: "Voulez-vous vraiment supprimer ce compte ?",
            userId: user.id,
          })
        }
      />,
    ]) ?? [];

  const basicData = { columns, rows };

  return (
    <div className="backofficeutilisateur_container">
      <NavBarBO />
      <h2 className="bo-title">Utilisateurs</h2>
      <div className="backoffidata">
        <MDBDatatable fixedHeader maxHeight="460px" data={basicData} />
      </div>
      {/* Boîte de dialogue de confirmation */}
      {yesNoModal && (
        <div className="confirmation-dialog">
          <p>{yesNoModal.message}</p>
          <div className="popup-btn">
            <MDBBtn
              size="sm"
              onClick={() => confirmDeleteUser(yesNoModal.userId)}
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
