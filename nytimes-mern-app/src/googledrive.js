import React from 'react';

class Gd extends React.Component {

    constructor(props){
      super(props);
      this.state = {
        gapi: null,
        signedIn: false,
        loginName: ''
      };
      this._updateSigninStatus = this._updateSigninStatus.bind(this);
    }

    getChildContext(){
        return {
          gapi: this.state.gapi
        };
      }

       gdUpdateFile(fileId, folderId, text, callback) {
        // set parameters for PUT request
        const boundary = '-------314159265358979323846';
        const delimiter = "\r\n--" + boundary + "\r\n";
        const close_delim = "\r\n--" + boundary + "--";
  
        var contentType = "text/html";
        var metadata = {
          'mimeType': contentType,
        };
  
        var multipartRequestBody =
          delimiter + 'Content-Type: application/json\r\n\r\n' +
          JSON.stringify(metadata) +
          delimiter + 'Content-Type: ' + contentType + '\r\n' + '\r\n' +
          text +
          close_delim;
  
        if (!callback) {
          callback = function (file) {
            console.log("Update Complete ", file)
          };
        }
        // google drive PUT request to add content
  
        gapi.client.request({
          'path': '/upload/drive/v2/files/' + folderId + "?fileId=" + fileId + "&uploadType=multipart",
          'method': 'PUT',
          'params': {
            'fileId': fileId,
            'uploadType': 'multipart'
          },
          'headers': {
            'Content-Type': 'multipart/mixed; boundary="' + boundary + '"'
          },
          'body': multipartRequestBody,
          callback: callback,
        });
      }





      saveFile() {
        //start of create file
        // first grab user email info from Oauth login
        var request = gapi.client.drive.about.get({
          fields: "user"
        });
        request.execute(function (resp) {
          console.log('Current email address: ' + resp.user.emailAddress);

        });

        // set params for google api request to google drive
        // media = info about type of file being saved 

        var media = {
          mimeType: 'text/plain',
        };
        // fileMetadata = info about how file should be created 
        var fileMetadata = {
          mimeType: 'application/vnd.google-apps.document',
        };
        //call the google drice API
        gapi.client.drive.files.create({
          name: 'Story Title.doc',
          // mimeType: 'application/vnd.google-apps.document',
          resource: fileMetadata,
          media: media,
          fields: 'id',
          params: {
            uploadType: 'media'
          },
        }).then(function (result) {
          // if file created add content next using update function gdUpdateFile
          console.log('File created: ', result);
          console.log('File id: ', result.result.id);
          var fileContent = "this is the content";
          gdUpdateFile(result.result.id, result.result.id, fileContent, function (err) {
            console.log(err);
          })
        }).catch(function (err) {
          console.log(err);
        })

        // if google request for files is succesfull then send list to appendPre function for display on screen
    };
    





      handleAuthClick(event) {
        gapi.auth2.getAuthInstance().signIn();
      }
      /**
       *  Sign out the user upon button click.
       */
      handleSignoutClick(event) {
        gapi.auth2.getAuthInstance().signOut();
      }

componentDidMount(){
  require('google-client-api')().then((gapi)=>{
         // Client ID and API key from the Developer Console
    var CLIENT_ID = '639223689097-jkc40rh6kfo4r7lranaq9kgnjhbqh55d.apps.googleusercontent.com';
    var API_KEY = 'AIzaSyB3-PZaoqLvKlGzno-cbJv4RXK-x751EJ0';

    // Array of API discovery doc URLs for APIs used by the quickstart
    var DISCOVERY_DOCS = ["https://www.googleapis.com/discovery/v1/apis/drive/v3/rest"];
    // Authorization scopes required by the API; multiple scopes can be
    // included, separated by spaces.
    // var SCOPES = 'https://www.googleapis.com/auth/drive.metadata.readonly';
    var SCOPES = 'https://www.googleapis.com/auth/drive';
    // var authorizeButton = document.getElementById('authorize-button');
    // var signoutButton = document.getElementById('signout-button');

    /**
     *  On load, called to load the auth2 library and API client library.
     */

    function handleClientLoad() {
        gapi.load('client:auth2', initClient);
      }

        
    console.log('initializing GAPI...');
    function initClient() {
                gapi.client.init({
                  apiKey: API_KEY,
                  clientId: CLIENT_ID,
                  discoveryDocs: DISCOVERY_DOCS,
                  scope: SCOPES
                }).then(function () {
                        console.log('GAPI Initialized.');
                     // Listen for sign-in state changes.
                     gapi.auth2.getAuthInstance().isSignedIn.listen(updateSigninStatus);
                     // Handle the initial sign-in state. This is not in sample
                      this.setState({gapi: gapi}, ()=>{
                   // Handle the initial sign-in state.
                   this._updateSigninStatus(this.state.gapi.auth2.getAuthInstance().isSignedIn.get());
                        //   authorizeButton.onclick = handleAuthClick;
                      //   signoutButton.onclick = handleSignoutClick;
                   });
          
                }.bind(this));

        
      } //end initClient   
    });//end require gapi

}//end compoent did mount     
    

render() {

  return (
  <div>
            {/* // const showLogControls = !(this.state.gapi === null);
         // <h1>Upload Your Story to Google Drive</h1> */}

        {/* <!--Add buttons to initiate auth sequence and sign out--> */}
        {/* //   <button id="authorize-button" style="display: none;">Authorize</button> */}
        {/* //   <button id="signout-button" style="display: none;">Sign Out</button> */}
        {/* //   <pre id="content"></pre> */}


    <Nav pullRight style={{display:showLogControls?'block':'none'}}>
    <NavItem onClick={()=>{
    if(this.state.signedIn){
      console.log('signing out');
      this.state.gapi.auth2.getAuthInstance().signOut();
      this.state.gapi.auth2.getAuthInstance().disconnect();
    } else {
      console.log('signing in');
      this.state.gapi.auth2.getAuthInstance().signIn();
        }
        }}>
        {this.state.signedIn?'logout':'login'}
    </NavItem>
    </Nav>

  {/* <script async defer src="https://apis.google.com/js/api.js" onload="this.onload=function(){};handleClientLoad()" onreadystatechange="if (this.readyState === 'complete') this.onload()">
  </script>
    */}
    <div className='container'>
        {this.props.children}
     </div>

</div>
);
}

_updateSigninStatus(isSignedIn) {

    if(isSignedIn){
      this.state.gapi.client.people.people.get({ resourceName: 'people/me' }).then((result)=>{
        this.setState({loginName: result.result.names[0].givenName});
        console.log("saving file");
        saveFile();

      });
    } else {
      this.setState({loginName: ''});
    }

    this.setState({signedIn: isSignedIn});
  }
}

export default Gd;

