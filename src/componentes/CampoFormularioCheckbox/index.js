export default function CampoFormularioCheckbox({id, nomeCampo, tagInput}) {
    return(
        <div className="form-check form-check-inline">
            {tagInput}
            <label className="form-check-label" htmlFor={id}>{nomeCampo}</label>
        </div>
    )
}