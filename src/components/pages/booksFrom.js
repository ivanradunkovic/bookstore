import React from 'react';
import {Well, Panel, FormControl, FormGroup, ControlLabel, Button} from 'react-bootstrap';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {findDOMNode} from 'react-dom';

import {postBooks, deleteBooks} from '../../actions/booksActions'

class BooksFrom extends React.Component {

    handleSubmit() {
        const book = [{
            title: findDOMNode(this.refs.title).value,
            description: findDOMNode(this.refs.description).value,
            price: findDOMNode(this.refs.price).value
        }]
        this.props.postBooks(book);
    }

    onDelete() {
        let bookTitle = findDOMNode(this.refs.delete).value;

        this.props.deleteBooks(bookTitle);
    }

    render() {

        const booksList = this.props.books.map(function (booksArr) {
            return (
                <option key={booksArr.title}> {booksArr.title}</option>
            )
        })

        return (
            <Well>
                <Panel>
                    <FormGroup controlId="title">
                        <ControlLabel>Title</ControlLabel>
                        <FormControl
                            type= "text"
                            placeholder= "Enter Title"
                            ref= "title"  />
                    </FormGroup>
                    <FormGroup controlId="description">
                        <ControlLabel>Description</ControlLabel>
                        <FormControl
                            type= "text"
                            placeholder= "Enter description"
                            ref= "description"  />
                    </FormGroup>
                    <FormGroup controlId="price">
                        <ControlLabel>Price</ControlLabel>
                        <FormControl
                            type= "text"
                            placeholder= "Enter price"
                            ref= "price"  />
                    </FormGroup>
                    <Button onClick={this.handleSubmit.bind(this)} bsStyle='primary'>Save Book</Button>
                </Panel>
                <Panel style={{marginTop: '25px'}}>
                    <FormGroup controlId="formControlsSelect">
                    <ControlLabel>Select a book title to delete</ControlLabel>
                        <FormControl ref="delete" componentClass="select" placeholder="select">
                            <option value="select">select</option>
                            // List of options will be created dynamically
                            {booksList}
                        </FormControl>
                    </FormGroup>
                    <Button onClick={this.onDelete.bind(this)} bsStyle='danger'>Delete Books</Button>
                </Panel>
            </Well>
        )
    }
}

function mapStateToProps(state) {
    return {
        books: state.books.books
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        postBooks,
        deleteBooks
    }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(BooksFrom);