const MedicoEspecialidadRow = ({ medico, onGestionar }) => {
    return (
        <tr>
            <td>{medico.idMedico}</td>
            <td>{medico.nombreMedico}</td>
            <td>{medico.apellidoMedico}</td>
            <td>
                {medico.especialidades && medico.especialidades.length > 0 ? (
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
                        {medico.especialidades.map((esp, i) => (
                            <span key={i} className="badge">
                                {esp}
                            </span>
                        ))}
                    </div>
                ) : (
                    <span style={{ color: 'var(--text-muted)' }}>Sin especialidades</span>
                )}
            </td>
            <td className="actions-cell">
                <button
                    className="btn btn-sm btn-edit"
                    onClick={onGestionar}
                >
                    Gestionar
                </button>
            </td>
        </tr>
    );
};

export default MedicoEspecialidadRow;