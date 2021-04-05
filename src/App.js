import React, { useState } from 'react';
import { Navbar, Form, Button, Container, Row, Col, Nav, FormControl } from "react-bootstrap";
import {CosmosClient} from "@azure/cosmos";

const endpoint = "https://test-0.documents.azure.com:443/";
const key = "LOUTF2nykkTy3cHl0MXuuOQTjuz3amBLLj4O8XOFEE3Oka6wJK9rSrEds4rC2EpnOl9WWbcV4ec5lZknIRvkPg==";
const client = new CosmosClient({ endpoint, key });

function LandingPage() {
  const [userDetail, setUserDetail] = useState({
    FirstName: "",
    LastName: "",
    EmailAddress: "",
    MobileNumber: "",
    Gender: ""
  });

  const handleSubmitUserDetails = async () => {
    console.log(userDetail);
    const { database } = await client.databases.createIfNotExists({ id: "TestData" });
    const { container } = await database.containers.createIfNotExists({ id: "TestDataContainer" });
    container.items.create({ 
      EmailAddress: userDetail.EmailAddress, 
      FirstName: userDetail.FirstName, 
      Gender: userDetail.Gender, 
      LastName: userDetail.LastName, 
      MobileNumber: userDetail.MobileNumber
    });
  };

  return (
    <React.Fragment>
      <Navbar bg="light" variant="light">
        <Navbar.Brand href="#home">App Project</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="#link">Link</Nav.Link>
          </Nav>
          <Form inline>
            <FormControl type="text" placeholder="Search" className="mr-sm-2" />
          </Form>
        </Navbar.Collapse>
      </Navbar>
      <Container>
        <section>
          <Row>
            <Col>
              <h2>User Registration</h2>
            </Col>
          </Row>
          <Row>
            <Col md={7}>
              <section style={{ backgroundColor: "green", color: "white", padding: "20px" }}>
                <Col lg={10}>
                  <Form.Group>
                    <Form.Row>
                      <Form.Label column lg={4}>First Name </Form.Label>
                      <Col>
                        <Form.Control
                          placeholder="First Name"
                          type="text"
                          value={userDetail.FirstName}
                          onChange={(e) => setUserDetail({ ...userDetail, FirstName: e.target.value })}
                        />
                      </Col>
                    </Form.Row>
                    <br />
                    <Form.Row>
                      <Form.Label column lg={4}>Last Name</Form.Label>
                      <Col>
                        <Form.Control
                          placeholder="Last Name"
                          type="text"
                          value={userDetail.LastName}
                          onChange={(e) => setUserDetail({ ...userDetail, LastName: e.target.value })}
                        />
                      </Col>
                    </Form.Row>
                    <br />
                    <Form.Row>
                      <Form.Label column lg={4}>Email Address </Form.Label>
                      <Col>
                        <Form.Control
                          placeholder="Enter Email"
                          type="text"
                          value={userDetail.EmailAddress}
                          onChange={(e) => setUserDetail({ ...userDetail, EmailAddress: e.target.value })}
                        />
                        <Form.Text className="text-muted">
                          We'll never share your email with anyone else.
                          </Form.Text>
                      </Col>
                    </Form.Row>
                    <br />
                    <Form.Row>
                      <Form.Label column lg={4}>Mobile Number</Form.Label>
                      <Col>
                        <Form.Control
                          placeholder="Mobile Number"
                          type="text"
                          value={userDetail.MobileNumber}
                          onChange={(e) => setUserDetail({ ...userDetail, MobileNumber: e.target.value })}
                        />
                      </Col>
                    </Form.Row>
                    <br />
                    <Form.Row>
                      <Form.Label column lg={4}>Gender</Form.Label>
                      <Col>
                        <Form.Control as="select" defaultValue="Choose..."
                          value={userDetail.Gender}
                          onChange={(e) => setUserDetail({ ...userDetail, Gender: e.target.value })}
                        >
                          <option>Choose...</option>
                          <option>Male</option>
                          <option>Female</option>
                        </Form.Control>
                      </Col>
                    </Form.Row>
                  </Form.Group>
                </Col>
              </section>
              <Button style={{ border: "none" }} size="lg" block onClick={handleSubmitUserDetails}>
                Submit
                </Button>
            </Col>
          </Row>
        </section>
      </Container>



    </React.Fragment>

  );
}

export default LandingPage;
