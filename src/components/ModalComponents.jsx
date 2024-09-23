import { useContextApp } from "../store/context";


function ModalComponents() {
    const { funcRigioca, count, handleCloseModal } = useContextApp();
    
    return (
        <div className="modal d-flex justify-content-center align-items-center " style={{ display: 'block', backgroundColor: 'rgba(0,0,0,0.5)' }}>
            <div className="modal-dialog" style={{width:'380px'}}>
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Risultato: {count}</h5>
                        <button type="button" className="btn-close" onClick={handleCloseModal} aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <p>Hai sbagliato rigioca!</p>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="modalButton" onClick={() =>funcRigioca("ModalClosed")}>Rigioca</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ModalComponents;
