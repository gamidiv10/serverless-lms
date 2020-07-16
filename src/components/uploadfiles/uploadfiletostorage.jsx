import axios from 'axios';

import React,{Component} from 'react';

export class UploadFile extends Component {

    state = {

        // Initially, no file is selected
        selectedFile: null
    };

    // On file select (from the pop up)
    onFileChange = event => {

        // Update the state
        this.setState({ selectedFile: event.target.files[0] });

    };

    // On file upload (click the upload button)
    onFileUpload = () => {

        // Create an object of formData
        const formData = new FormData();

        // Update the formData object
        formData.append(
            "myFile",
            this.state.selectedFile,
            this.state.selectedFile.name
        );

        // Details of the uploaded file
        console.log(this.state.selectedFile);

        // Request made to the backend api
        // Send formData object
        var url = "https://storage.googleapis.com/storage/v1/b/" +"filesdir" + "/o/" + encodeURIComponent(this.state.selectedFile.name) + "?alt=text/plain";
        const endPointURL = "https://storage.googleapis.com/upload/storage/v1/b/filesdir/o?uploadType="+this.state.selectedFile.type+"&"+"name="+encodeURIComponent(this.state.selectedFile.name);
        console.log(endPointURL);
        axios.put(url, formData);



    };

    // File content to be displayed after
    // file upload is complete
    fileData = () => {

        if (this.state.selectedFile) {

            return (
                <div>
                    <h2>File Details:</h2>
                    <p>File Name: {this.state.selectedFile.name}</p>
                    <p>File Type: {this.state.selectedFile.type}</p>

                </div>
            );
        } else {
            return (
                <div>
                    <br />
                    <h4>Choose before Pressing the Upload button</h4>
                </div>
            );
        }
    };

    render() {

        return (
            <div>
                <h1>Upload Assignment File</h1>
                <form action="https://uploadfileservice-oeueo7ct2a-uc.a.run.app" method="POST"
                      encType="multipart/form-data">
                    <input type="file" name="file"/>
                    <input type="submit"/>
                </form>
            </div>

        );
    }
}



