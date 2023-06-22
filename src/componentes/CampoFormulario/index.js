import "./CampoFormulario.css";

export default function CampoFormulario({tituloCampo, id, erro, tagInput, required}) {
    return(
        <div className="row mb-3">
            <label htmlFor={id} className={`col-sm-2 col-form-label ${required}`}>{tituloCampo}</label>
            <div className="col-sm-10">
                {tagInput}
                {erro}
            </div>
        </div>               
    )
}