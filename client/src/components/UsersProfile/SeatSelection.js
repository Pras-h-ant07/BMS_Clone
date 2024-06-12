import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { hideLoading, showLoading } from "../../redux/loaderSlice";
import { getShowById } from "../../services/shows";
import { useNavigate, useParams } from "react-router-dom";
import { message, Card, Row, Col, Button } from "antd";
import moment from "moment";
import { bookShow, makePayment } from "../../services/bookings";
import StripeCheckout from "react-stripe-checkout";

const SeatSelection = () => {
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [show, setShow] = useState();
  const [selectedSeats, setSelectedSeats] = useState([]);
  const params = useParams();
  const navigate = useNavigate();

  const getData = async () => {
    try {
      dispatch(showLoading());
      const response = await getShowById({ showId: params.id });
      if (response.success) {
        setShow(response.data);
      } else {
        message.error(response.message);
      }
      dispatch(hideLoading());
    } catch (err) {
      message.error(err.message);
      dispatch(hideLoading());
    }
  };

  const getSeats = () => {
    let columns = 12;
    let totalSeats = show.totalSeats;
    let rows = Math.ceil(totalSeats / columns);

    return (
      <div className="d-flex flex flex-col items-center justify-center">
        <div className="w-100 max-width-600 mx-auto mb-25px">
          <p className="text-center mb-10px italic">
            Screen this side, you will be watching in this direction
          </p>
          <div className="screen-div"></div>
        </div>
        <ul className="seat-ul justify-content-center">
          {Array.from(Array(rows).keys()).map((row) => {
            return Array.from(Array(columns).keys()).map((column) => {
              let seatNumber = row * columns + column + 1;

              // Calculation for the first iteration
              // 0*12 + 0+1 = 1
              // 0*12 + 1+1 = 2
              // 0*12 + 2+1 = 3
              // So on up till 12th seat
              // then So on...

              let seatClass = "seat-btn";

              if (selectedSeats.includes(seatNumber)) {
                seatClass += " selected";
              }
              if (show.bookedSeats.includes(seatNumber)) {
                seatClass += " booked";
              }

              if (seatNumber <= totalSeats)
                return (
                  <li>
                    <button
                      className={seatClass}
                      onClick={() => {
                        if (selectedSeats.includes(seatNumber)) {
                          setSelectedSeats(
                            selectedSeats.filter(
                              (curSeatNumber) => curSeatNumber !== seatNumber
                            )
                          );
                        } else {
                          setSelectedSeats([...selectedSeats, seatNumber]);
                        }
                      }}
                    >
                      {seatNumber}
                    </button>
                  </li>
                );
            });
          })}
        </ul>

        <div className="d-flex bottom-card justify-content-between w-100 max-width-600 mx-auto mb-25px mt-11 mb-0">
          <div className="flex-1">
            Selected Seats : <span>{selectedSeats.join(", ")}</span>
          </div>
          <div className="flex-shrink-0 ms-3">
            Total Price:{" "}
            <span> &#8377; {selectedSeats.length * show.ticketPrice}</span><b className="text-xl">/-</b>
          </div>
        </div>
      </div>
    );
  };

  const book = async (transactionId) => {
    try {
      dispatch(showLoading());
      const response = await bookShow({
        show: params.id,
        transactionId,
        seats: selectedSeats,
        user: user._id,
      });
      if (response.success) {
        message.success("Show Booking done!");
        navigate("/usersActions");
      } else {
        message.error(response.message);
      }
      dispatch(hideLoading());
    } catch (err) {
      message.error(err.message);
      dispatch(hideLoading());
    }
  };

  const onToken = async (token) => {
    try {
      dispatch(showLoading());
      const response = await makePayment(
        token,
        selectedSeats.length * show.ticketPrice * 100
      );
      if (response.success) {
        message.success(response.message);
        book(response.data);
      } else {
        message.error(response.message);
      }
      dispatch(hideLoading());
    } catch (err) {
      message.error(err.message);
      dispatch(hideLoading());
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      {show && (
        <Row gutter={24}>
          <Col span={24}>
            <Card
              title={
                <div className="movie-title-details">
                  <h1 className="text-red-500 font-bold text-2xl">{show.movie.title}</h1>
                  <p>
                    Theatre: {show.theatre.name}, <i>{show.theatre.address}</i>
                  </p>
                </div>
              }
              extra={
                <div className="show-name py-3 text-base">
                  <h3>
                    <span>Show Name:</span> {show.name}
                  </h3>
                  <h3>
                    <span>Date & Time: </span>
                    {moment(show.date).format("MMM Do YYYY")} at{" "}
                    {moment(show.time, "HH:mm").format("hh:mm A")}
                  </h3>
                  <h3>
                    <span>Ticket Price:</span> Rs. {show.ticketPrice}/-
                  </h3>
                  <h3>
                    <span>Total Seats:</span> {show.totalSeats}
                    <span> &nbsp;|&nbsp; Available Seats:</span>{" "}
                    {show.totalSeats - show.bookedSeats.length}{" "}
                  </h3>
                </div>
              }
              style={{ width: "100%" }}
            >
              {getSeats()}

              {selectedSeats.length > 0 && (
                <StripeCheckout
                  token={onToken}
                  billingAddress
                  amount={selectedSeats.length * show.ticketPrice * 100}
                  stripeKey="pk_test_51PEu4jSBi50fYiGoC41KI3jXJ6JgltMdCL8fMdCj7biyJWpRWsYg480vKtqvhdpzAVI4LVLQcBelv65CaorBPOPX002VbP26SX"
                >
                  <div className="max-width-600 mx-auto">
                    <Button type="primary" danger shape="round" size="large" block>
                      Pay Now
                    </Button>
                  </div>
                </StripeCheckout>
              )}
            </Card>
          </Col>
        </Row>
      )}
    </>
  );
};
export default SeatSelection;
