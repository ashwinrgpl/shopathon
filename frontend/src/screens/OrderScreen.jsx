import React, { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Row, Col, ListGroup, Image, Card, Button } from "react-bootstrap";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { usePayPalScriptReducer, PayPalButtons } from "@paypal/react-paypal-js";
import {
  useGetOrderByIdQuery,
  usePayOrderMutation,
  useGetPaypalClientIdQuery,
  useDeliverOrderMutation,
} from "../redux/slices/ordersApiSlice";
import Loader from "../components/Loader";
import Message from "../components/Message";

const OrderScreen = () => {
  const { id: orderId } = useParams();
  const {
    data: order,
    refetch,
    isLoading,
    error,
  } = useGetOrderByIdQuery(orderId);

  const [payOrder] = usePayOrderMutation();

  const [deliverOrder, { isLoading: isDelivering }] = useDeliverOrderMutation();

  const [{ isPending }, paypalDispatch] = usePayPalScriptReducer();

  const {
    data: paypal,
    isLoading: isLoadingPaypal,
    error: errorPaypal,
  } = useGetPaypalClientIdQuery();

  const { userInfo } = useSelector((state) => state.auth);

  useEffect(() => {
    const loadPaypalScript = async () => {
      try {
        if (!errorPaypal && !isLoadingPaypal && paypal.clientId) {
          paypalDispatch({
            type: "resetOptions",
            value: {
              "client-id": paypal.clientId,
              currency: "USD",
            },
          });
          paypalDispatch({
            type: "setLoadingStatus",
            value: "pending",
          });
        }
      } catch (error) {
        toast.error(error.data.message || error.error);
      }
    };
    if (!errorPaypal && !isLoadingPaypal && paypal.clientId) {
      loadPaypalScript();
    }
  }, [errorPaypal, isLoadingPaypal, order, paypal, paypalDispatch]);

  const onApprove = (data, actions) => {
    return actions.order.capture().then(async (details) => {
      try {
        console.log(orderId);
        await payOrder({ orderId, details }).unwrap();
        toast.success("Payment successful");
        refetch();
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    });
  };

  const onError = (error) => {
    toast.error(error.data.message || error.error);
  };

  const createOrder = (data, actions) => {
    return actions.order
      .create({
        purchase_units: [{ amount: { value: order.totalPrice } }],
      })
      .then((orderId) => {
        return orderId;
      });
  };

  const deliverOrderHandler = async () => {
    try {
      await deliverOrder(orderId);
      toast.success("Order delivered");
      refetch();
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  return isLoading ? (
    <Loader />
  ) : error ? (
    <Message variant="danger">{error.data.message || error.error}</Message>
  ) : (
    <>
      <h1>Order ID: {order._id}</h1>
      <Row>
        <Col md={8}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h2>Shipping</h2>
              <p>
                <strong>Name:</strong> {order.user.name}
              </p>
              <p>
                <strong>Email:</strong> {order.user.email}
              </p>
              <p>
                <strong>Address:</strong> {order.shippingAddress.address},{" "}
                {order.shippingAddress.city}, {order.shippingAddress.postalCode}
                , {order.shippingAddress.country}
              </p>
              {order.isDelivered ? (
                <Message variant="success">
                  Delivered on {order.deliveredAt}
                </Message>
              ) : (
                <Message variant="danger">Not Delivered</Message>
              )}
            </ListGroup.Item>
            <ListGroup.Item>
              <h2>Payment</h2>
              <p>
                <strong>Method:</strong> {order.paymentMethod}
              </p>
              {order.isPaid ? (
                <Message variant="success">Paid</Message>
              ) : (
                <Message variant="danger">Not Paid</Message>
              )}
            </ListGroup.Item>
            <ListGroup.Item>
              <h2>Order Items</h2>
              {order.orderItems.map((item, index) => (
                <ListGroup.Item key={index}>
                  <Row>
                    <Col md={1}>
                      <Image src={item.image} alt={item.name} fluid rounded />
                    </Col>
                    <Col>
                      <Link to={`/product/${item.product}`}>{item.name}</Link>
                    </Col>
                    <Col md={4}>
                      {item.qty} x ${item.price} = ${item.qty * item.price}
                    </Col>
                  </Row>
                </ListGroup.Item>
              ))}
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={4}>
          <Card>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h2>Order Summary</h2>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Items</Col>
                  <Col>${order.itemsPrice}</Col>
                </Row>
                <Row>
                  <Col>Shipping</Col>
                  <Col>${order.shippingPrice}</Col>
                </Row>
                <Row>
                  <Col>Tax</Col>
                  <Col>${order.taxPrice}</Col>
                </Row>
                <Row>
                  <Col>Total</Col>
                  <Col>${order.totalPrice}</Col>
                </Row>
              </ListGroup.Item>
              {!order.isPaid && (
                <ListGroup.Item>
                  {isLoadingPaypal && <Loader />}
                  {isPending ? (
                    <Loader />
                  ) : (
                    <div>
                      {/* <Button
                        onClick={onApproveTest}
                        style={{ marginBottom: "10px" }}
                      >
                        Test Pay Order
                      </Button> */}
                      <div>
                        <PayPalButtons
                          createOrder={createOrder}
                          onApprove={onApprove}
                          onError={onError}
                        />
                      </div>
                    </div>
                  )}
                </ListGroup.Item>
              )}
              { isDelivering && <Loader /> }
              { userInfo && userInfo.isAdmin && !order.isDelivered && (
                <ListGroup.Item>
                  <Button
                    type="button"
                    className="btn btn-block"
                    onClick={deliverOrderHandler}
                  >
                    Mark As Delivered
                  </Button>
                </ListGroup.Item>
              )}
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default OrderScreen;
