import { useState, useEffect } from "react";
import { useUser } from "../contexts/UserContext";
import { getRecordService } from "..//Service";
import { Table, Tag, Space } from "antd";
import { Card, Row, Col } from "antd";
const { Column, ColumnGroup } = Table;

export default function PaymentRecord(props) {
  const user = useUser();
  const [paymentRecord, setpaymentRecord] = useState([]);
  const [updatePaymentRecord, setupdatePaymentRecord] = useState(true);

  useEffect(() => {
    if (updatePaymentRecord)
      getRecordService().then((res) => {
        if (res.data) {
          console.log(res.data.payments);
          setpaymentRecord(res.data.payments);
          setupdatePaymentRecord(false);
        }
      });
  });

  function covertDateTime(oldDate) {
    oldDate = new Date(oldDate);
    let year = oldDate.getUTCFullYear();
    let month = oldDate.getUTCMonth() + 1;
    let day = oldDate.getUTCDate();
    let hour = oldDate.getUTCHours();
    let min = oldDate.getUTCMinutes();
    let newDate = String(year) + "-" + String(month) + "-" + String(day) + "-" + String(hour) + ":" + String(min);
    console.log(newDate);
    return newDate;
    // return oldDate.getUTCFullYear() + "-" + oldDate.getUTCMonth() + 1 + "-" + oldDate.ggetUTCDate()
  }

  return (
    <>
      <div style={{ height: "100vh" }}>
        <h1>Hello {user} !</h1>
        <h1>This is Payment Record page</h1>

        {!updatePaymentRecord && (
          <Table dataSource={paymentRecord}>
            <Column title="Date&Time" dataIndex={covertDateTime(paymentRecord[0].createdAt)} key="date">
            </Column>
            <Column 
              title="Details"
              dataIndex="details"
              key="details"
              justify="start"
              render={(details) => (
                <>
                  {details.map((item, index) => (
                    <Card>
                      <Row>
                        <Col flex={2}>
                          <img
                            alt={item.price_data.product_data.name}
                            src={item.price_data.product_data.images[0]}
                            height="100px"
                          />
                        </Col>
                        <Col flex={3} justify="start">
                          {item.price_data.product_data.name}
                          <br />
                          ${item.price_data.unit_amount / 100}x{item.quantity}
                        </Col>
                      </Row>
                    </Card>
                  ))}
                </>
              )}
            />
            <Column title="Status" dataIndex="status" key="status" />
          </Table>
        )}
      </div>
    </>
  );
}
