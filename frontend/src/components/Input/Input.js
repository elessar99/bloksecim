import "./Input.css"
import PropTypes from "prop-types";
const Input = ({name,type}) =>{


    return (
    <>
        <div className="inputContainer">
            <div class="form__group field">
                <input type={type} class="form__field" placeholder={name} name={name} id={name} required />
                <label for={name} class="form__label">{name}</label>
            </div>
        </div>
    </>
    
  );
}
Input.propTypes = {
    name: PropTypes.string,
    type: PropTypes.string,
}
Input.defaultProps = {
    name: "-",
    type: "input"

}

export default Input;

