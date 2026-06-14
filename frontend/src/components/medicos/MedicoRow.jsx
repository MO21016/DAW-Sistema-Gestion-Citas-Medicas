const MedicoRow = ({ medico, onEdit, onDelete }) => {
  return (
    <tr>
      <td>{medico.idMedico}</td>
      <td>{medico.nombreMedico}</td>
      <td>{medico.apellidoMedico}</td>
      <td>{medico.telefonoMedico}</td>
      <td>{medico.correoMedico}</td>
      <td className="actions-cell">
        <button
          className="btn btn-sm btn-edit"
          onClick={() => onEdit(medico)}
        >
          Editar
        </button>
        <button
          className="btn btn-sm btn-danger"
          onClick={onDelete}
        >
          Eliminar
        </button>
      </td>
    </tr>
  );
};

export default MedicoRow;
