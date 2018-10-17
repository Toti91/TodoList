import React from 'react';
import { FlatList, Switch, KeyboardAvoidingView } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import styled from 'styled-components';
import Swipeable from 'react-native-swipeable';
import { connect } from 'react-redux';
import { toggleItem, removeItem } from '../store/actions';
import AddItem from './AddItem';

const Container = styled.View`
  padding-top: 24px;
  position: relative;
  height: 100%;
`;

const Background = styled.View`
  position: absolute;
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  opacity: 0.2;
`;

const Item = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 10px;
  border-bottom-width: 1px;
  border-bottom-color: #ececec;
  background-color: rgba(255, 255, 255, 0.7);
`;

const ItemText = styled.Text`
  padding-left: 20px;
  font-size: 16px;
  max-width: 90%;
`;

const Remove = styled.TouchableOpacity`
  background-color: #db3236;
  height: 100%;
  display: flex;
  justify-content: center;
  padding-left: 16px;
`;

class TodoList extends React.Component {
  removeButton(item) {
    const { remove } = this.props;
    return [
      <Remove onPress={() => remove(item)}>
        <FontAwesome name="trash" color="white" size={32} />
      </Remove>,
    ];
  }

  renderListItem(item) {
    const { toggleSwitch } = this.props;
    return (
      <Swipeable rightButtons={this.removeButton(item)}>
        <Item>
          <Switch value={item.toggled} onValueChange={() => toggleSwitch(item)} />
          <ItemText>{item.value}</ItemText>
        </Item>
      </Swipeable>
    );
  }

  render() {
    const { list } = this.props;
    return (
      <Container>
        <Background pointerEvents="none">
          <FontAwesome name="check" color="#4885ed" size={384} />
        </Background>
        <FlatList data={list} renderItem={({ item }) => this.renderListItem(item)} />
        <KeyboardAvoidingView behavior="padding">
          <AddItem />
        </KeyboardAvoidingView>
      </Container>
    );
  }
}

const mapDispatch = dispatch => ({
  toggleSwitch: item => dispatch(toggleItem(item)),
  remove: item => dispatch(removeItem(item)),
});

const mapState = state => ({
  list: state.TodoList,
});

export default connect(
  mapState,
  mapDispatch,
)(TodoList);
