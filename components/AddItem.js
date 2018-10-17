import React from "react";
import styled from "styled-components";
import { FontAwesome } from "@expo/vector-icons";
import { connect } from "react-redux";
import { addItem, clearAllItems } from "../store/actions";
import { Alert } from 'react-native';

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
  background-color: white;
  border-bottom-left-radius: 6px;
  border-top-left-radius: 6px;
`;

const Button = styled.TouchableOpacity`
  align-self: flex-end;
  background-color: #4885ed;
  padding: 16px 0;
  width: 64px;
  border-radius: 32px;
  display: flex;
  align-items: center;
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

  constructor() {
    super();
  }

  render() {
    const { adding, text } = this.state;
    const empty = !/\S/.test(text);

    return adding ? (
      <InputContainer style={adding && { backgroundColor: "white" }}>
        <Input
          placeholder="What to do..."
          onChangeText={text => this.setState({ text: text })}
          value={text}
          returnKeyType="go"
          onSubmitEditing={() => this.onAdd()}
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
        <InputContainer pointerEvents={"box-none"}>
          <Button onPress={() => this.setState({ adding: !adding })}
            delayLongPress={1500}
            onLongPress={() => this.onLongPress()}

          >
            <FontAwesome name="plus" size={32} color="white" />
          </Button>
        </InputContainer>
      );
  }

  onLongPress() {
    const { clearAll } = this.props;
    return (
      Alert.alert(
        'Be careful',
        'Do you want to delete all messages?',
        [
          { text: 'Cancel', onPress: () => { } },
          { text: 'OK', onPress: () => clearAll() },
        ],
        { cancelable: false }
      )
    )
  }

  onAdd() {
    const { addToList } = this.props;
    const { adding, text } = this.state;
    addToList(text);
    this.setState({ text: "", adding: !adding });
  }
}


const mapDispatch = dispatch => ({
  addToList: newItem => dispatch(addItem(newItem)),
  clearAll: () => dispatch(clearAllItems())
});


export default connect(
  null,
  mapDispatch
)(AddItem);
