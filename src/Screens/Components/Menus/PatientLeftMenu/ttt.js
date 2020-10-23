
import FormikInput from "../components/common/formik-input";
import { useFormik } from "formik";
class profile extends Component {
    constructor(props) {
        super(props)
        this.state = {
            formik : {
                initialValues: {
                startDate: "",
                endDate: "",
                },
            }
        };
    } 
    render() {
        return (
            <div>
                <FormikInput
                label="Start date"
                placeholder="choose date"
                type="date"
                name="startDate"
                className="form-control"
                formik={this.state.formik}
                />
            </div>
        );
    }
}
export default profile;