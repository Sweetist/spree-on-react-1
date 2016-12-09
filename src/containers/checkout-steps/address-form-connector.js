import { connect } from 'react-redux';

import Actions from '../../actions';
import AddressForm from '../../components/checkout-steps/address-form';
import CheckoutAPI from '../../apis/checkout';
import CountryAPI from '../../apis/country';

const mapStateToProps = (state, ownProps) => {
  return {
    order: state.order,
    displayLoader: state.displayLoader,
    countries: state.countryList.countries
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    handleAddressFormSubmit: (formData, order) => {
      dispatch (Actions.displayLoader());
      CheckoutAPI.next(order.number, order.token, formData).then((response) =>{
        dispatch (Actions.hideLoader());
      },
      (error) => {
        dispatch(Actions.showFlash(error.response.body.error));
        dispatch (Actions.hideLoader());
      });
      // send submit request
      // hideLoader
    },
    fetchCountries: () => {
      dispatch (Actions.displayLoader());

      CountryAPI.getList().then((response) => {
        dispatch (Actions.addCountries(response.body));
        dispatch (Actions.hideLoader());
      },
      (error) => {
        dispatch(Actions.showFlash('Unable to connect to server... Please try again later.'));
      })
    }
  };
};

const AddressFormConnector = connect(mapStateToProps, mapDispatchToProps)(AddressForm);

export default AddressFormConnector;