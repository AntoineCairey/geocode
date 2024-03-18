import { MDBInput, MDBBtn, MDBSelect } from "mdb-react-ui-kit";
import { useState } from "react";
import { useLoaderData, useNavigate } from "react-router-dom";
import { useTheContext } from "../context/Context";

export default function BackOfficeModifCar() {
  const navigate = useNavigate();
  const { car, plugTypes } = useLoaderData();
  const { apiService } = useTheContext();

  const [vFormData, setvFormData] = useState({
    brand: car?.brand ?? "",
    model: car?.model ?? "",
    plug_type_id: car?.plug_type_id ?? "",
  });

  const editCar = async (newData) => {
    try {
      const response = await apiService.put(`/vehicle/${car.id}`, newData);
      console.info(response);
    } catch (err) {
      console.error(err);
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    await editCar(vFormData);
    navigate("/backoffice/cars");
  };

  const handleChange = (e) =>
    setvFormData({
      ...vFormData,
      [e.target.name]: e.target.value,
    });

  // le composant select de mdbootstrap fonctionne différement des autres ("e.value" au lieu de "e.target.value")
  const handleSelect = (e) =>
    setvFormData({
      ...vFormData,
      plug_type_id: e.value,
    });

  const options = plugTypes;

  return (
    <div className="registerInfos-container">
      <div className="login-form">
        <h1>Modidfier un véhicule</h1>
        <MDBInput
          className="mb-4"
          type="string"
          name="brand"
          label="Marque"
          value={vFormData.brand}
          onChange={handleChange}
        />
        <MDBInput
          className="mb-4"
          type="string"
          name="model"
          label="Modèle"
          value={vFormData.model}
          onChange={handleChange}
        />

        <MDBSelect
          name="plug_type_id"
          label="Type de prise"
          className="select-btn"
          value={vFormData.plug_type_id}
          data={options.map((plugType) => ({
            text: plugType.name,
            value: plugType.id,
          }))}
          onValueChange={handleSelect}
        />

        <MDBBtn type="submit" className="mb-4" block onClick={onSubmit}>
          Enregistrer le nouveau véhicule
        </MDBBtn>
      </div>
    </div>
  );
}
