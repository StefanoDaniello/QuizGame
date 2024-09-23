import { useContextApp } from "../store/context";

function ModalEdit(){
    const { handleCloseModalEdit, handleEditGame, setNumber, number, setDifficulty, CategoryList, setCategory, paramArray } = useContextApp();
    // const [validazione,setValidazione]=useState(false)
    // useEffect(()=>{
    //     const pattern = /^[0-9]+$/;
    //     if(!pattern.test(number)){
    //         setValidazione(true)
    //     }
    // },[number])
    
    const difficulty = [
        { name: 'easy' },
        { name: 'medium' },
        { name: 'hard' } 
    ];


    return (
        <div className="modal d-flex justify-content-center align-items-center " style={{ display: 'block', backgroundColor: 'rgba(0,0,0,0.5)' }}>
            <div className="modal-dialog" style={{ width: '380px' }}>
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Modifica il gioco come preferisci!</h5>
                        <button type="button" className="btn-close" aria-label="Close" onClick={handleCloseModalEdit}></button>
                    </div>
                    <div className="modal-body">
                        <div className="d-flex flex-column ">
                            <div className="d-flex align-items-center justify-content-center">
                                <label htmlFor="number" className="mx-2"> Domande Massime: </label>
                                <input type="number"  className="w-25 form-control"  value={number}  max={50} onChange={(e) => setNumber(e.target.value)}/>
                            </div>
                            <div className="my-3 d-flex align-items-center justify-content-center">
                                <label htmlFor="difficulty" className="mx-2">Difficoltà: </label>
                                <select name="difficulty" className="w-50 form-control" onChange={(e) => setDifficulty(e.target.value)}>
                                    <option value=" " selected >Any Difficulty</option>
                                    {difficulty.map(item =>(
                                        <option selected={paramArray.diff == item.name} value={item.name} >{item.name}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="my-3 d-flex align-items-center justify-content-center">
                                <label htmlFor="category" className="mx-2">Categorie: </label>
                                <select name="category" className="w-50 form-control" onChange={(e) => setCategory(e.target.value)}>
                                    <option value=" " selected >Any Category</option>
                                    {CategoryList.map(item=>(
                                        <option key={item.id} value={item.id} selected={paramArray.cat == item.id}>{item.name}</option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    </div>
                    <div className="modal-footer d-flex flex-column">
                        <button type="sumbit" className="modalButton" onClick={handleEditGame} disabled={number > 50 }>Gioca</button>
                        {number > 50  &&(
                            <span className="text-danger">inserisci un valore inferiore a 50</span>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ModalEdit