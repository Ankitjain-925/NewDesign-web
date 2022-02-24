import * as React from "react";
import Grid from "@material-ui/core/Grid";


export class ComponentToPrint extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            header: this.props.header,
            footer: this.props.footer,
            first_name: this.props.first_name,
            last_name: this.props.last_name,
            DoB: this.props.DoB,
            mobile: this.props.mobile,
            editor: this.props.editor,

        }
    }
    componentDidUpdate = (prevProps) => {
        console.log("prevProps", prevProps)
        console.log("b", this.props.editor)
        if (prevProps.editor !== this.props.editor) {
            this.setState({ editor: this.props.editor });
        }
        if (prevProps.header !== this.props.header) {
            this.setState({ header: this.props.header });
        }
        if (prevProps.footer !== this.props.footer) {
            this.setState({ footer: this.props.footer });
        }
        if (prevProps.first_name !== this.props.first_name) {
            this.setState({ first_name: this.props.first_name });
        }
        if (prevProps.last_name !== this.props.last_name) {
            this.setState({ last_name: this.props.last_name });
        }
        if (prevProps.mobile !== this.props.mobile) {
            this.setState({ mobile: this.props.mobile });
        }
        if (prevProps.DoB !== this.props.DoB) {
            this.setState({ DoB: this.props.DoB });
        }

    };

    render() {
        var { first_name, last_name, DoB, mobile, header, editor, footer } = this.state
        const divStyle = {
            height: (header * 96) + 'px',
        };

        const divStyle2 = {
            height: (footer * 96) + 'px',

        }
        return (
            <div>

                <Grid>

                    <div style={divStyle}>
                    </div>

                    <Grid className="printSec">
                        <p>Patient Name:</p>
                        <p>{first_name}</p>
                        <p>{last_name}</p>
                    </Grid>
                    <Grid className="printSec">
                        <p>DoB:</p>
                        <p>{DoB}</p>
                    </Grid>
                    <Grid className="printSec">
                        <p>Mobile:</p>
                        <p>{mobile}</p>
                    </Grid>
                    <Grid className="editorSec">
                        <p dangerouslySetInnerHTML={{ __html: editor }} />
                        </Grid>
                    <div style={divStyle2}></div>
                </Grid>


            </div>
        );
    }
}


export const FunctionalComponentToPrint = React.forwardRef((ref) => {
    return <ComponentToPrint ref={ref} />;
});
