import React, { Component } from "react";
import {
  Page,
  Layout,
  Card,
  FormLayout,
  TextField,
  ContextualSaveBar,
  Toast,
  ColorPicker
} from "@shopify/polaris";

class HeaderForm extends Component {
  defaultState = {
    messageValue: "",
    colorValue: ""
  };
  state = {
    showToast: false,
    isDirty: false,
    messageValue: this.defaultState.messageValue,
    colorValue: this.defaultState.colorValue
  };
  render() {
    const { showToast, isDirty, messageValue, colorValue } = this.state;
    const contextualSaveBarMarkup = isDirty ? (
      <ContextualSaveBar
        message="Unsaved changes"
        saveAction={{
          onAction: this.handleSave
        }}
        discardAction={{
          onAction: this.handleDiscard
        }}
      />
    ) : null;
    const toastMarkup = showToast ? (
      <Toast
        onDismiss={this.toggleState("showToast")}
        content="Changes saved"
      />
    ) : null;
    return (
      <Page title="Theme settings">
        {contextualSaveBarMarkup}
        {toastMarkup}
        <Layout>
          <Layout.AnnotatedSection
            title="Customize your Header Bar"
            description="Add your custom Header Bar to Promote Your Best Deals and Increase Shares."
          >
            <Card sectioned>
              <FormLayout>
                <TextField
                  label="Your message (Use HTML Tag 🌐)"
                  value={messageValue}
                  onChange={this.handleMessageChange}
                  labelAction={{
                    content: "⭐ You can use Facebook Symbols",
                    onAction: this.toggleSymbols
                  }}
                  multiline
                />
                Define a Custom Background Color
                <ColorPicker
                  onChange={this.handleColorChange}
                  color={colorValue}
                  allowAlpha
                />
              </FormLayout>
            </Card>
          </Layout.AnnotatedSection>
        </Layout>
      </Page>
    );
  }
  toggleSymbols = () => {
    window.open("https://www.piliapp.com/facebook-symbols/", "_target");
  };
  toggleState = (key, value) => {
    return () => {
      this.setState(prevState => ({ [key]: !prevState[key] }));
    };
  };

  handleMessageChange = messageValue => {
    this.setState({ messageValue });
    if (messageValue !== "") {
      this.setState({ isDirty: true });
    }
  };

  handleColorChange = colorValue => {
    this.setState({ colorValue });
    if (colorValue !== "") {
      this.setState({ isDirty: true });
    }
  };

  handleSave = () => {
    this.defaultState.messageValue = this.state.messageValue;
    this.defaultState.colorValue = this.state.colorValue;

    this.setState({
      isDirty: false,
      showToast: true
    });
  };

  handleDiscard = () => {
    this.setState({
      messageValue: this.defaultState.messageValue,
      colorValue: this.defaultState.colorValue,
      isDirty: false
    });
  };
}

export default HeaderForm;
