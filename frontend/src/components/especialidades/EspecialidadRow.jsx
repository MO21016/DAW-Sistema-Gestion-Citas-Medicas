const EspecialidadRow = ({ especialidad, onEdit, onDelete }) => {
  return (
    <tr>
      <td>{especialidad.idEspecialidad}</td>
      <td>{especialidad.nombreEspecialidad}</td>
      <td>{especialidad.descripcion}</td>
      <td>{especialidad.cantidadMedicos ?? 0}</td>
      <td className="actions-cell">
        <button
          className="btn btn-sm btn-edit"
          onClick={() => onEdit(especialidad)}
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

export default EspecialidadRow;