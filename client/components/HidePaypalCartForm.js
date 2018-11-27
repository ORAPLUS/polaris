import React, { Component } from "react";
import {
  Page,
  Layout,
  Card,
  FormLayout,
  Checkbox,
  ContextualSaveBar,
  Toast
} from "@shopify/polaris";

class HidePaypalCartForm extends Component {
  defaultState = {
    checked: false
  };
  state = {
    checked: this.defaultState.checked,
    showToast: false,
    isDirty: false
  };
  render() {
    const { showToast, isDirty, checked } = this.state;
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
            title="Hide PayPal in Cart"
            description="Hide PayPal button to improve customer checkout experience."
          >
            <Card sectioned>
              <FormLayout>
                <Checkbox
                  checked={checked}
                  label="🔴Hide Me Now"
                  onChange={this.handleChange}
                />
              </FormLayout>
            </Card>
          </Layout.AnnotatedSection>
        </Layout>
      </Page>
    );
  }

  toggleState = (key, value) => {
    return () => {
      this.setState(prevState => ({ [key]: !prevState[key] }));
      console.log("test " + value);
    };
  };

  handleChange = value => {
    this.setState({ checked: value, isDirty: true });
  };

  handleSave = () => {
    this.defaultState.checked = this.state.checked;

    this.setState({
      isDirty: false,
      showToast: true
    });
  };

  handleDiscard = () => {
    this.setState({
      checked: this.defaultState.checked,
      isDirty: false
    });
  };
}

export default HidePaypalCartForm;
