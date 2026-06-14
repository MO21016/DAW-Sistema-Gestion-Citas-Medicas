import MedicoEspecialidadRow from './MedicoEspecialidadRow';

const MedicoEspecialidadTable = ({ medicos, onGestionar }) => {
    return (
        <div className="card">
            <div className="list-header">
                <h2>Médicos</h2>
                <span className="badge">{medicos.length}</span>
            </div>

            <div className="table-responsive">
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Nombre</th>
                            <th>Apellido</th>
                            <th>Especialidades</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {medicos.length === 0 ? (
                            <tr>
                                <td colSpan={5}>
                                    <div className="empty-state">
                                        <p>No hay médicos registrados.</p>
                                    </div>
                                </td>
                            </tr>
                        ) : (
                            medicos.map((medico) => (
                                <MedicoEspecialidadRow
                                    key={medico.idMedico}
                                    medico={medico}
                                    onGestionar={() => onGestionar(medico)}
                                />
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default MedicoEspecialidadTable;