import React, {PropTypes} from 'react';
import ReactDOM           from 'react-dom';
import {Button}           from 'react-bootstrap';

export default class CategorySelect extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      error: null,
      category: null,
      categoryValue: ''
    }
  }

  componentWillMount() {
    if (this.props.categories) {
      this.setState({categories: this.props.categories})
    }
  }

  handleChange(e) {
    this.setState({category: e.target.value.trim()})
  }

  addCategoryToUser(category) {
    if (!category || category == null) {
      return this.setState({error: "Input is empty"});
    }
    let categories = this.state.categories;
    if (_.contains(categories, category)) {
      return this.setState({category});
    }
    const userDoc = {
      $addToSet: {
        'profile.categories': category
      }
    };
    Meteor.call("updateUser", Meteor.userId(), userDoc, (err, result) => {
      if (err) {
        console.error("updateUser", err);
        return this.setState({error: err.reason});
      }
      categories.push(category);
      this.setState({categories, category});
      return result;
    });
  }

  categorySelectInputKeyPress(e) {
    if (e.charCode == 13 || e.keyCode == 13) {
      e.preventDefault();
      this.addCategoryToUser(this.state.categoryValue);
    }
  }
  categorySelectInputChange(e) {
    this.setState({categoryValue: e.target.value.trim()});
  }
  categorySelectInputAdd(e) {
    this.addCategoryToUser(this.state.categoryValue);
  }

  render() {
    const categories = this.state.categories;
    const defaultCategory = this.state.category || this.state.categories[0];
    return (
      <div className="form-group">
        <label htmlFor="categorySelectInput">Choose a category</label>
        <div className="input-group">
          <input type="text" ref="categorySelectInput" id="categorySelectInput"
            className="form-control" placeholder="Add category" value={this.state.categoryValue}
            onKeyPress={this.categorySelectInputKeyPress.bind(this)} onChange={this.categorySelectInputChange.bind(this)}
          />
          <span className="input-group-btn">
            <Button onClick={this.categorySelectInputAdd.bind(this)} className="btn btn-default">
              <span className="glyphicon glyphicon-plus"></span>
            </Button>
          </span>
        </div>
        <select ref="categorySelect" id="categorySelect" className="form-control"
          onChange={this.handleChange.bind(this)} defaultValue={defaultCategory}>
          {categories.map((category) => {
            return (<option key={category} value={category}>{category}</option>)
          })}
        </select>
      </div>
    )
  }
}

CategorySelect.propTypes = {
  categoryChange: PropTypes.func.isRequired,
  categories: PropTypes.array.isRequired
}
