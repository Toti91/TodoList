import React from "react";
import { Text } from "react-native";
import styled from "styled-components";
import { connect } from "react-redux";
import { addItem } from "../store/actions";
import { FontAwesome } from "@expo/vector-icons";

const InputContainer = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: center;
  width: 100%;
  padding: 24px 0;
`;

const Input = styled.TextInput`
  border: 1px solid #ececec;
  width: 50%;
  padding: 0 10px;
  font-size: 16px;
  border-bottom-left-radius: 6px;
  border-top-left-radius: 6px;
`;

const Button = styled.TouchableOpacity`
  background-color: #4885ed;
  padding: 14px 0;
  width: 65%;
  border-radius: 6px;
`;

const Submit = styled.TouchableOpacity`
  background-color: #4885ed;
  padding: 14px 0;
  width: 15%;
  border-bottom-right-radius: 6px;
  border-top-right-radius: 6px;
`;

const ButtonText = styled.Text`
  color: white;
  font-size: 16px;
  font-weight: bold;
  text-align: center;
`;

class AddItem extends React.Component {
  state = { adding: false, text: "" };
  input;

  constructor() {
    super();
  }

  render() {
    const { adding, text } = this.state;
    const empty = !/\S/.test(text);

    return adding ? (
      <InputContainer>
        <Input
          placeholder="What to do..."
          onChangeText={text => this.setState({ text: text })}
          value={text}
          returnKeyType="go"
          onSubmitEditing={() => this.onAdd()}
          ref={input => {
            this.input = input;
          }}
          autoFocus={adding}
          onBlur={() => empty && this.setState({ adding: !adding })}
        />
        <Submit
          onPress={() => this.onAdd()}
          disabled={empty}
          style={empty ? { opacity: 0.5 } : {}}
        >
          <ButtonText>Add</ButtonText>
        </Submit>
      </InputContainer>
    ) : (
      <InputContainer>
        <Button onPress={() => this.setState({ adding: !adding })}>
          <ButtonText>New note</ButtonText>
        </Button>
      </InputContainer>
    );
  }

  onAdd() {
    const { addToList } = this.props;
    const { adding, text } = this.state;
    addToList(text);
    this.setState({ text: "", adding: !adding });
  }
}

const mapDispatch = dispatch => ({
  addToList: newItem => dispatch(addItem(newItem))
});

export default connect(
  null,
  mapDispatch
)(AddItem);
