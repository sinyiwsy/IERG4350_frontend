import { Form, Field } from "react-final-form";
import { PaymentInputsWrapper, usePaymentInputs } from "react-payment-inputs";
import images from "react-payment-inputs/images";
import { ShoppingCartOutlined } from "@ant-design/icons";
import { Button } from "antd";
import { shoppingCartService } from "../Service";

const getLocalStorageKeys = () => {
  let res = [];
  for (var i = 0; i < localStorage.length; i++) {
    res.push(localStorage.key(i));
  }
  res.sort();
  return res;
};

export default function PaymentForm(props) {
  const {
    meta,
    getCardImageProps,
    getCardNumberProps,
    getExpiryDateProps,
    getCVCProps,
    wrapperProps,
  } = usePaymentInputs();

  const onSubmit = async (values) => {
    // await sleep(300);
    console.log(JSON.stringify(values, 0, 2));
    console.log(props.productList);
    onFinish();
  };

  const onFinish = () => {
    let order = [];
    var keys = getLocalStorageKeys();
    keys.forEach((key) => {
      order.push({ key: key, value: localStorage.getItem(key) });
    });
    shoppingCartService(order).then((res) => {
      console.log("got return");
    });
  };

  return (
    <Form
      onSubmit={onSubmit}
      validate={() => {
        let errors = {};
        if (meta.erroredInputs.cardNumber) {
          errors.cardNumber = meta.erroredInputs.cardNumber;
        }
        if (meta.erroredInputs.expiryDate) {
          errors.expiryDate = meta.erroredInputs.expiryDate;
        }
        if (meta.erroredInputs.cvc) {
          errors.cvc = meta.erroredInputs.cvc;
        }
        return errors;
      }}
    >
      {({ handleSubmit }) => (
        <form onSubmit={handleSubmit}>
          <div>
            <PaymentInputsWrapper {...wrapperProps}>
              <svg {...getCardImageProps({ images })} />
              <Field name="cardNumber">
                {({ input }) => (
                  <input
                    {...getCardNumberProps({
                      onBlur: input.onBlur,
                      onChange: input.onChange,
                    })}
                  />
                )}
              </Field>
              <Field name="expiryDate">
                {({ input }) => (
                  <input
                    {...getExpiryDateProps({
                      onBlur: input.onBlur,
                      onChange: input.onChange,
                    })}
                  />
                )}
              </Field>
              <Field name="cvc">
                {({ input }) => (
                  <input
                    {...getCVCProps({
                      onBlur: input.onBlur,
                      onChange: input.onChange,
                    })}
                  />
                )}
              </Field>
            </PaymentInputsWrapper>
          </div>
          <Button
            style={{ marginTop: 12 }}
            type="default"
            htmlType="submit"
            icon={<ShoppingCartOutlined />}
          >
            Checkout
          </Button>
        </form>
      )}
    </Form>
  );
}
