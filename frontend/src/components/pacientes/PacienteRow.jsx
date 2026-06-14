const PacienteRow = ({ paciente, onEdit, onDelete }) => {
  return (
    <tr>
      <td>{paciente.idPaciente}</td>
      <td>{paciente.nombrePaciente}</td>
      <td>{paciente.apellidoPaciente}</td>
      <td>{paciente.edad}</td>
      <td>{paciente.telefonoPaciente}</td>
      <td>{paciente.correoPaciente}</td>
      <td>{paciente.cantidadCitas}</td>

      <td className="actions-cell">
        <button
          className="btn btn-sm btn-edit"
          onClick={() => onEdit(paciente)}
        >
          Editar
        </button>

        <button
          className="btn btn-sm btn-danger"
          onClick={() => {
            console.log("CLICK ELIMINAR");
            onDelete();
          }}
        >
          Eliminar
        </button>
      </td>
    </tr>
  );
};

export default PacienteRow;