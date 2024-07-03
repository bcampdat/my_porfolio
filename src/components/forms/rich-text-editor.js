import React, { Component } from "react";
import { EditorState, convertToRaw } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import draftToHtml from "draftjs-to-html";
import htmlToDraft from "html-to-draftjs";

export default class RichTextEditor extends Component {
  constructor(props) {
    super(props);

    this.state = {
      editorState: EditorState.createEmpty(),
    };

    this.onEditorStateChange = this.onEditorStateChange.bind(this);
  }

  onEditorStateChange(editorState) {
    // this.setState({    
    //   editorState,
    // })
    // this.props.handleRichTextEditorChange(editorState);
//  }
     //   no funcionaria en este caso al ser setState asincrono  
     // no se renderiza la actualizacion del  estado a tiempo y pierde memoria

    // mejor escribirlo de esta forma 
    this.setState(
      { editorState },
      this.props.handleRichTextEditorChange(
        draftToHtml(convertToRaw(this.state.editorState.getCurrentContent()))
        // convertimos content en html   tags usables 
        // ej   <p>draft editor rich<strong>draft editor rich</strong></p>
      )
    );
  }
  render() {
    return (
      <div>
        {/* <h1>RichTextEditor</h1>
        <h1>RichTextEditor</h1> */}
        <Editor
          editorState={this.state.editorState}
          wrapperClassName="demo-wrapper"
          editorClassname="demo-editor"
          onEditorStateChange={this.onEditorStateChange}
        />
      </div>
    );
  }
}
