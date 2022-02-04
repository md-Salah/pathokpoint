import axios from "axios";
import * as actionTypes from './actionTypes';

export const loadBooks = (books) => {
    return {
        type: actionTypes.LOAD_BOOKS,
        payload: books,
    }
}

export const loadCart = (cart) => {
    return {
        type: actionTypes.LOAD_CART,
        payload: cart,
    }
}

export const booksCollection = () => dispatch => {
    axios.get('http://localhost:3001/BookCollection')
        .then(response => dispatch(loadBooks(response.data)))
}

export const updateCartDetails = (book, isSelected) => dispatch => {
    axios.put(`http://localhost:3001/Cart/${book.id}`, { ...book, isSelected: isSelected })
        .then(response => console.log(response.data.isSelected))
}

export const CartDetails = () => dispatch => {
    axios.get('http://localhost:3001/Cart')
        .then(response => dispatch(loadCart(response.data)))
}

export const CartInput = (bookId, bookName, bookPrice, bookPublisher, bookCondition, bookCover) => dispatch => {
    let cartData = {
        bookId: bookId,
        bookName: bookName,
        bookPublisher: bookPublisher,
        bookPrice: bookPrice,
        bookCondition: bookCondition,
        bookCover: bookCover,
    }

    axios.post('http://localhost:3001/Cart', cartData)
        .then(response => console.log(response))
}