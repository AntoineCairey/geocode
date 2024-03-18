import { useLoaderData, useNavigate } from "react-router-dom";
import { DateTime } from "luxon";
import {
  MDBBtn,
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
} from "mdb-react-ui-kit";
import { useTheContext } from "../context/Context";

export default function Reservation() {
  const reservations = useLoaderData();
  const { apiService } = useTheContext();
  const navigate = useNavigate();

  const now = DateTime.local();
  const future = reservations
    .filter((r) => r.datetime > now)
    .sort((a, b) => a.datetime - b.datetime);
  const past = reservations
    .filter((r) => r.datetime < now)
    .sort((a, b) => b.datetime - a.datetime);

  const handleCancel = async (id) => {
    await apiService.put(`/reservation/cancel/${id}`);
    navigate(0);
  };

  return (
    <div className="reservation-container">
      <button
        type="submit"
        className="back"
        onClick={() => navigate("/myaccount")}
      >
        &larr; Retour
      </button>

      <h1 className="reservation-title">Mes Réservations</h1>
      <p className="reservation-subtitle">A venir</p>
      {future && future.length ? (
        future.map((r) => (
          <MDBCard border key={r.id}>
            <MDBCardBody>
              <div className="reservation-text">
                <MDBCardTitle>
                  {r.datetime.toFormat("dd/MM/yyyy HH:mm")}
                </MDBCardTitle>
                <MDBCardText>{r.station_name}</MDBCardText>
                <MDBCardText>{r.station_address}</MDBCardText>
                <MDBCardText>{r.charging_point_name}</MDBCardText>
              </div>
              <div className="btn-delete-reservation">
                <MDBBtn size="sm" onClick={() => handleCancel(r.id)}>
                  Annuler
                </MDBBtn>
              </div>
            </MDBCardBody>
          </MDBCard>
        ))
      ) : (
        <div className="info-text">Pas de réservation à venir</div>
      )}
      <p className="reservation-subtitle past">Passées</p>
      {past && past.length ? (
        past.map((r) => (
          <MDBCard border key={r.id}>
            <MDBCardBody>
              <div className="reservation-text">
                <MDBCardTitle>
                  {r.datetime.toFormat("dd/MM/yyyy HH:mm")}
                </MDBCardTitle>
                <MDBCardText>{r.station_name}</MDBCardText>
                <MDBCardText>{r.station_address}</MDBCardText>
                <MDBCardText>{r.charging_point_name}</MDBCardText>
              </div>
            </MDBCardBody>
          </MDBCard>
        ))
      ) : (
        <div className="info-text">Pas de réservation passée</div>
      )}
    </div>
  );
}
