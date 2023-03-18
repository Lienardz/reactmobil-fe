import {
  ORDER_LIST_REQUEST,
  ORDER_LIST_SUCCESS,
  ORDER_LIST_FAIL,
    ORDER_CREATE_FAIL,
    ORDER_CREATE_REQUEST,
    ORDER_CREATE_RESET,
    ORDER_CREATE_SUCCESS,
    ORDER_DETAILS_FAIL,
    ORDER_DETAILS_REQUEST,
    ORDER_DETAILS_SUCCESS,
    ORDER_MINE_LIST_FAIL,
  ORDER_MINE_LIST_REQUEST,
  ORDER_MINE_LIST_SUCCESS,
  ORDER_DELETE_REQUEST,
  ORDER_DELETE_SUCCESS,
  ORDER_DELETE_FAIL,
  ORDER_DELETE_RESET,
  ORDER_DELIVERANDPAID_REQUEST,
  ORDER_DELIVERANDPAID_SUCCESS,
  ORDER_DELIVERANDPAID_FAIL,
  ORDER_DELIVERANDPAID_RESET,
  ORDER_SUMMARY_REQUEST,
  ORDER_SUMMARY_SUCCESS,
  ORDER_SUMMARY_FAIL,
  } from '../constants/orderConstants';
  
  export const orderCreateReducer = (state = {}, action) => {
    switch (action.type) {
      case ORDER_CREATE_REQUEST:
        return { loading: true };
      case ORDER_CREATE_SUCCESS:
        return { loading: false, success: true, order: action.payload };
      case ORDER_CREATE_FAIL:
        return { loading: false, error: action.payload };
      case ORDER_CREATE_RESET:
        return {};
      default:
        return state;
    }
  };

  export const orderDetailsReducer = (
    state = { loading: true, order: {} },
    action
  ) => {
    switch (action.type) {
      case ORDER_DETAILS_REQUEST:
        return { loading: true };
      case ORDER_DETAILS_SUCCESS:
        return { loading: false, order: action.payload };
      case ORDER_DETAILS_FAIL:
        return { loading: false, error: action.payload };
      default:
        return state;
    }
  };

  export const orderMineListReducer = (state = { orders: [] }, action) => {
    switch (action.type) {
      case ORDER_MINE_LIST_REQUEST:
        return { loading: true };
      case ORDER_MINE_LIST_SUCCESS:
        return { loading: false, orders: action.payload };
      case ORDER_MINE_LIST_FAIL:
        return { loading: false, error: action.payload };
      default:
        return state;
    }
  };

  export const orderListReducer = (state = { orders: [] }, action) => {
    switch (action.type) {
      case ORDER_LIST_REQUEST:
        return { loading: true };
      case ORDER_LIST_SUCCESS:
        return { loading: false, orders: action.payload };
      case ORDER_LIST_FAIL:
        return { loading: false, error: action.payload };
      default:
        return state;
    }
  };

  export const orderDeleteReducer = (state = {}, action) => {
    switch (action.type) {
      case ORDER_DELETE_REQUEST:
        return { loading: true };
      case ORDER_DELETE_SUCCESS:
        return { loading: false, success: true };
      case ORDER_DELETE_FAIL:
        return { loading: false, error: action.payload };
      case ORDER_DELETE_RESET:
        return {};
      default:
        return state;
    }
  };

  export const orderDeliverAndPaidReducer = (state = {}, action) => {
    switch (action.type) {
      case ORDER_DELIVERANDPAID_REQUEST:
        return { loading: true };
      case ORDER_DELIVERANDPAID_SUCCESS:
        return { loading: false, success: true };
      case ORDER_DELIVERANDPAID_FAIL:
        return { loading: false, error: action.payload };
      case ORDER_DELIVERANDPAID_RESET:
        return {};
      default:
        return state;
    }
  };

  export const orderSummaryReducer = (
    state = { loading: true, summary: {} },
    action
  ) => {
    switch (action.type) {
      case ORDER_SUMMARY_REQUEST:
        return { loading: true };
      case ORDER_SUMMARY_SUCCESS:
        return { loading: false, summary: action.payload };
      case ORDER_SUMMARY_FAIL:
        return { loading: false, error: action.payload };
      default:
        return state;
    }
  };